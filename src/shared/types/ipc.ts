export interface Customer {
    _id: string 
    _rev?: string 
    name: string
    email: string  
    status: boolean
    role:  string;
    address?: string; 
    phone?: string;  

}

export interface NewCustomer  { 
    name: string 
    address?: string  
    email: string 
    phone?: string 
    role: string 
    status: boolean

}