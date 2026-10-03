import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Customer, NewCustomer } from '../shared/types/ipc'


declare global {
  interface Window {
    api: {
      onNewCustomer: (callback: () => void) => () => void
      fetchUsers: () => Promise<{ id: number; name: string }[]>
      addCustomer: (doc: NewCustomer) => Promise<PouchDB.Core.Response>
      fetchAllCustomers: () => Promise<Customer[]>
      fetchCustomerById: (docId: string) => Promise<Customer>
      deleteCustomer: (docId: string) => Promise<PouchDB.Core.Response>
      getVersionApp: () => Promise<string>
    }
  
  } 
}

const api: Window['api'] = {
  onNewCustomer: (callback) => {
    const listener = (): void => callback()
    ipcRenderer.on('new-customer', listener)

    return () => {
      ipcRenderer.removeListener('new-customer', listener)
    }
  },
  fetchUsers:  () => {
    return ipcRenderer.invoke('fetch-users')
  },
  
  addCustomer: (doc: NewCustomer): Promise<PouchDB.Core.Response> => {
    return ipcRenderer.invoke('add-customers', doc)
  },
  fetchAllCustomers: (): Promise<Customer[]> => {
    return ipcRenderer.invoke('fetch-all-customers')
  },
  fetchCustomerById: (docId: string): Promise<Customer> => {
    return ipcRenderer.invoke('fetch-customer-id', docId)
  },
  deleteCustomer: (docId: string): Promise<PouchDB.Core.Response> => {
    return ipcRenderer.invoke('delete-customer', docId)
  },
  getVersionApp: (): Promise<string> => {
    return ipcRenderer.invoke('get-version')
  }
}


if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  }
