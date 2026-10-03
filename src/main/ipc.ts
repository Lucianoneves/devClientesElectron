import { app, ipcMain } from 'electron'

ipcMain.handle('fetch-users', () => {  
    console.log('new-customer') 

    return [ 
    {id: 1, name: 'John Doe'} ,
    {id: 2, name: 'Luciano'}
    ]
}) 

ipcMain.handle('get-version', () => {
  return app.getVersion()
})