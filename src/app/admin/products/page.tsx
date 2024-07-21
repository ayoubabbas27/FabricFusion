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

const AdminProducts = () => {
  return (
    <div className='w-full pb-4 pt-2 md:pb-4 xl:px-44'>
      <div className='w-full flex flex-row justify-between items-center mb-4'>
        <h1 className='text-4xl'>Products</h1>
        <Button asChild>
          <Link href='/admin/products/new'>Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </div>
  )
}

async function ProductsTable (){
  const productsData = await db.product.findMany({ 
    select: {
      id: true, 
      name: true, 
      description: true, 
      priceInCents: true , 
      imagePath: true, 
      isAvailableForPurchase: true, 
      createdAt: true,
      orders: true,
      _count: {select: {orders: true}}
    },
    orderBy: {name: "asc"}
  });

  if (productsData.length === 0) return (<div className=' font-semibold text-xl text-center'>No Products Found !</div>)

  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto">
              <span className='sr-only'>Image</span>
            </TableHead>
            <TableHead >Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>ID</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className='w-0'>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            productsData.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image 
                    src={product.imagePath} 
                    alt='product image' 
                    width={80} 
                    height={80}
                    className='p-0 m-0 min-w-16 min-h-16 rounded-md'
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.priceInCents/100)}</TableCell>
                <TableCell>{formatNumber(product._count.orders)}</TableCell>
                <TableCell >{formatDate(product.createdAt.toString())}</TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={`${product.isAvailableForPurchase ? 'outline':'destructive'}`}>{product.isAvailableForPurchase ? 'Active':'Inactive'}</Badge>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/products/${product.id}/edit`}>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <ProductStatusToggleDropdownItem 
                          id={product.id}
                          isAvailableForPurchase={product.isAvailableForPurchase}
                        />
                        <DeleteDropDownItem 
                          id={product.id}
                          disabled={product.orders.some((order) => order.fulfilled === false)}
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
export default AdminProducts