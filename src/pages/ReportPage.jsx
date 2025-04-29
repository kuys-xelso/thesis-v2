import GenerateReport from '@/components/generate-report'
import { SiteHeader } from '@/components/site-header'
import React from 'react'

function ReportPage() {
  return (
    <div>
      <SiteHeader title="Reports" />
      <GenerateReport />
    </div>
  )
}

export default ReportPage