import React from 'react'
import SalesCharts from '@/components/SalesCharts'
import { auth } from '@/auth'
export default async function SalesPage() {
    const session = await auth()
  return (
    <SalesCharts salerId={session?.user.userId}/>
  )
}
