import React from 'react'
import { SectionCards } from "@/components/DashBoard/section-cards"
import DataTableDemo from "@/components/DashBoard/table-data"
import RecentTransactions from "@/components/DashBoard/recent-transaction"
import { SiteHeader } from '@/components/site-header'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-4'>
      {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
      <SiteHeader title="Dashboard" /> 
      <SectionCards />
      
      <div className="px-4 grid grid-cols-1 gap-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl:grid-cols-1 @5xl:grid-cols-3">
        <div className="data-[slot=card] col-span-2">
          <DataTableDemo />
        </div>
        <div className="data-[slot=card]">
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}

export default Dashboard