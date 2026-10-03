import {app, ipcMain} from 'electron' 
import PouchDB from 'pouchdb' 
import path from 'node:path' 
import fs from 'node:fs' 
import { Customer, NewCustomer } from '../shared/types/ipc' 
import {randomUUID} from 'node:crypto'



// Determina o caminho do banco de dados  com base no sistema operacional

let dbPath;
if(process.platform === 'darwin') {

    //caminho para macos
    dbPath = path.join(app.getPath('appData'), 'devClientes', 'my_db')
}else{
    dbPath = path.join(app.getPath('appData'),  'my_db')
}

 // verificar e criar o diretoria se nao existir  
 const dbDir = path.dirname(dbPath) 
 if(!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, {recursive: true})
 }

 // criar o banco de dados  inicializar  
 const db = new PouchDB<NewCustomer>(dbPath) 

 // função paraadiconar no banco 

 async function addCustomer(doc: NewCustomer): Promise<PouchDB.Core.Response | void> {   
    const id = randomUUID() 
    
    const data: Customer = {
        ...doc, 
        _id: id,
    }
    
    

    return db.put(data)
    .then (response => response)
    .catch(error => { console.error('Erro ao adicionar cliente', error)
            throw error
        })
 }

 ipcMain.handle('add-customers', async (_event, doc: NewCustomer) => {
    return addCustomer(doc)
  })


  async function fetchCustomers(): Promise<Customer[]> {
try{
    const result = await db.allDocs({include_docs: true}) 
    return result.rows.map(row => row.doc as Customer)  
} catch (error) {
    console.error('Erro ao buscar clientes', error)
    return []
}
}

ipcMain.handle('fetch-all-customers', async () => {
    return await fetchCustomers() 
})

async function fetchCustomerById(docId: string) {
    return db.get(docId)  

        .then(doc => doc as Customer)
        .catch(error => {
            console.error('Erro ao buscar cliente por id', error)
            throw error
        })

}

ipcMain.handle('fetch-customer-id', async (_event, docId: string) => { 
    const result = await fetchCustomerById(docId)
    return result;

})

async function deleteCustomer(docId: string): Promise<PouchDB.Core.Response | void> {
    try{  
        const doc = await db.get(docId)   
        const result = await db.remove(doc._id, doc._rev) 
        return result


    }catch(error) {
        console.error('Erro ao deletar cliente', error)
        throw error
    }
}

ipcMain.handle('delete-customer', async (_event, docId: string): Promise<PouchDB.Core.Response | void> => {  
    return await deleteCustomer(docId)
})


