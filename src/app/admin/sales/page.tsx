import React from 'react'
import db from '@/lib/db'
import {
  Table,
  TableBody,
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
import { OrderActionsToggleStatus } from '@/components/sections/OrderActionsToggleStatus'

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
      productId: true,
      user: {
        select: {
          email: true
        }
      },
      product: {
        select:{
          name: true
        }
      }
    },
    orderBy:{
      createdAt: "desc"
    }
  })

async function ProductUserData(productId: string, userId: string){
  const [productName, userEmail] = await Promise.all([
    db.product.findUnique({
      where: {
        id: productId
      },
      select:{
        name: true
      }
    }),
    db.user.findUnique({
      where:{
        id: userId
      },
      select: {
        email: true
      }
    })
  ]);

  return {
    productData: productName?.name as string,
    userData: userEmail?.email as string
  }
}

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
            <TableHead className='w-0'>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            salesData.map((sale) => (
              <TableRow key={sale.id}>
                  <TableCell >{sale.id}</TableCell>
                  <TableCell >{sale.product.name}</TableCell>
                  <TableCell>{sale.user.email}</TableCell>
                  <TableCell>{formatCurrency(sale.pricePaidInCents/100)}</TableCell>
                  <TableCell>{sale.country}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={`${sale.fulfilled ? 'outline':'destructive'}`}>{sale.fulfilled ? 'Shipped':'Pending'}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger >
                      <Ellipsis/>
                      <span className='sr-only'>Actions</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      <DropdownMenuSeparator />

                        <OrderActionsToggleStatus 
                          id={sale.id}
                          fulfilled={sale.fulfilled}
                        />
                        
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
  )
}
export default AdminSales