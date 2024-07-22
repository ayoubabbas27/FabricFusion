import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import db from '@/lib/db'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { formatCurrency, formatDate, formatNumber } from '@/lib/formatters'
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react'
import { ProductStatusToggleDropdownItem, DeleteDropDownItem } from '@/components/sections/ProductActions'

const AdminSales = () => {
  return (
    <div className='w-full pb-4 pt-2 md:pb-4 xl:px-44'>
      <div className='w-full flex flex-row justify-between items-center mb-4'>
        <h1 className='text-4xl'>Sales</h1>
      </div>
      <SalesTable />
    </div>
  )
}

async function SalesTable (){
  const salesData = await db.order.findMany({
    select:{
      id: true,
      pricePaidInCents: true,
      country: true,
      fulfilled: true,
      createdAt: true,
      userId: true,
      productId: true
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  if (salesData.length === 0) return (<div className=' font-semibold text-xl text-center'>No Sales Found !</div>)

  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Transaction ID</TableHead>
            <TableHead >Product ID</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Country</TableHead>
            <TableHead className="text-right">Shipping Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            salesData.map((sale) => (
              <TableRow key={sale.id}>
                  <TableCell >{sale.id}</TableCell>
                  <TableCell >{sale.productId}</TableCell>
                  <TableCell>{sale.userId}</TableCell>
                  <TableCell>{formatCurrency(sale.pricePaidInCents/100)}</TableCell>
                  <TableCell>{sale.country}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={`${sale.fulfilled ? 'outline':'destructive'}`}>{sale.fulfilled ? 'Shipped':'Pending'}</Badge>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
  )
}
export default AdminSales