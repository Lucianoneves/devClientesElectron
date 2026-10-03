/// <reference types="vite/client" />

import { Customer, NewCustomer } from '../../shared/types/ipc'

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
