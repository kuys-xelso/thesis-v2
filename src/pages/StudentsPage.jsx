import   BatchUpload  from '@/components/Students/batch-upload'
import FormStudent from '@/components/Students/form-student'
import { SiteHeader } from '@/components/site-header'
import React from 'react'

const StudentsPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <SiteHeader title="Students" />
        <div className='flex flex-col lg:flex-row gap-4 mt-4 px-4'>
          <div className='flex-2'>
            <FormStudent />
          </div>
          <div className='flex-1'>
            <BatchUpload />
          </div>
        </div>
        
        
    </div>
  )
}

export default StudentsPage