import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { CaretRight } from 'phosphor-react'


interface HeaderProps {
  isSidebarOpen: boolean
}

export default function Header({ isSidebarOpen }: HeaderProps) {
  const isMacOs = process.platform === 'darwin'
  

  return (
    <div
      id="header"
      className={clsx(
        'flex w-full items-center justify-between gap-4 border-b border-gray-800 px-6 py-4.5 leading-tight transition-all duration-300',
        {
          'pl-24': !isSidebarOpen && isMacOs,
        }
      )}
    >
      <Collapsible.Trigger
        className={clsx(
          'flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 p-1 text-gray-800',
          {
            hidden: isSidebarOpen,
            block: !isSidebarOpen,
          }
        )}
      >
        <CaretRight />
      </Collapsible.Trigger>

      <h1 className="font-medium text-white">appClientes Electron</h1>
    </div>
  )
}
