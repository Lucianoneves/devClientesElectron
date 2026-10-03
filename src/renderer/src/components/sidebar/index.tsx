import * as Collapsible from '@radix-ui/react-collapsible' 
import { ArrowBendDoubleUpLeft  } from 'phosphor-react' 
import clsx from 'clsx'  
import { LinkContent } from '../link';

export function Sidebar() { 

    const isMacOs = process.platform === 'darwin';
    return ( 
        <Collapsible.Content
        forceMount
        className="group relative h-screen shrink-0 overflow-hidden border-r border-slate-600 bg-gray-950 data-[state=open]:animate-[sidebar-in_300ms_ease-out_forwards] data-[state=closed]:animate-[sidebar-out_300ms_ease-in_forwards]"
        >
            <Collapsible.Trigger 
            className={
                clsx(                     
                    {
                        'absolute  h-7 w-7 right-4  z-[99] text-white items-center justify-center  ': isMacOs,
                        'top-[1.125rem]': isMacOs,
                        'to-6': !isMacOs,
                    }
                )
            }
            >
                <ArrowBendDoubleUpLeft className='h-4 w-4' />
            </Collapsible.Trigger> 
       <div
        className={clsx(
          'flex h-full w-55 flex-1 flex-col gap-8 overflow-y-auto transition-opacity duration-300 group-data-[state=closed]:opacity-0',
          {
            'pt-6': !isMacOs,
          }
        )}
       >
       
       <nav  className='flex flex-col gap-6 mx-2 text-slate-100'> 
        <div className='flex flex-col gap-2'>
           <div className=' text-white font-semibold uppercase mb-2 ml-2 text-sm'> 
             MENU
             </div>
           </div>

           <section className='flex flex-col gap-2'> 
            <LinkContent  to="/">Clientes</LinkContent>  

            <LinkContent  to="/create">Cadastrar Cliente</LinkContent>  

            <LinkContent  to="/about">Sobre  Cliente</LinkContent> 
            
           </section>
            </nav>
       </div>

        </Collapsible.Content>
        
    )
}