import clsx from "clsx";
import { NavLink } from "react-router-dom";

interface LinkProps {
    to: string
    children: React.ReactNode
}


export function LinkContent({ to, children }: LinkProps) {
    return (
        <div>
            <NavLink 
            to={to}  
            className={({ isActive  }) =>{
                return clsx( 
                             'flex items-center gap-2 text-sm  rounded group px-2 py-1', 
                             
                             {
                                "bg-gray-50  font-semibold": isActive,
                                "text-black": isActive,
                                "text-gray-300": !isActive,
                             }
                )
            }}
            
            >
          <span className="truncate flex-1">
          {children} 
          </span>
            </NavLink> 
        </div>
    )
}