import * as React from "react"
import { NavLink, useLocation } from "react-router-dom";
import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items
})
 {
  // return (
  //   <SidebarGroup>
  //     <SidebarGroupContent className="flex flex-col gap-2">
        
  //       <SidebarMenu>
  //         {items.map((item) => (
  //           <SidebarMenuItem key={item.title}>
  //             <SidebarMenuButton tooltip={item.title}>
  //               <NavLink to={item.path} className={({ isActive }) => `flex items-center gap-2 ${isActive ? "bg-accent" : ""}`}>
  //               {item.icon && <item.icon stroke={1.5} size={20} />}
  //               <span>{item.title}</span>
  //               </NavLink>
  //             </SidebarMenuButton>
  //           </SidebarMenuItem>
  //         ))}
  //       </SidebarMenu>
  //     </SidebarGroupContent>
  //   </SidebarGroup>
  // );
  const location = useLocation();
  
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  tooltip={item.title}
                  isActive={isActive}
                  asChild
                >
                  <NavLink to={item.path} className="flex items-center gap-2">
                    {item.icon && <item.icon size={20} stroke={1.5} />}
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
