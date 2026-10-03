import { Outlet } from 'react-router-dom'
import Header from '../header'
import  * as Collapsible from '@radix-ui/react-collapsible'
import { Sidebar } from '../sidebar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { 

    function handleNavigate() { 
      navigate('/create')

    }

    if (!window.api) return

    const unsub = window.api.onNewCustomer(handleNavigate)
    return () => {
      unsub()
    }
  }, [navigate])

  return (
    <Collapsible.Root
    defaultOpen 
    className= "h-screen bg-gray-950 text-slate-100 flex"
    onOpenChange={setIsSidebarOpen}
    >


    <Sidebar />
    <div className="flex h-screen min-w-0 flex-1 flex-col overflow-auto text-red-950">
    <Header isSidebarOpen={isSidebarOpen} />  

      <Outlet />
    </div>
    </Collapsible.Root>
  )
}
