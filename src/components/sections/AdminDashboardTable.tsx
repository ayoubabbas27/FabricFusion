import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import Image from "next/image"
  
type PropsObject = {
  id: string,
  name: string,
  price: number,
  isAvailableForPurchase: Boolean,
  sales: number,
  image: string
}

const AdminDashboardTable = ({ data }: { data: PropsObject[]}) => {
  return (
    <Card className="w-full md:col-span-2">
        <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>List of the Top 5 Products by Sales Volume</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]" >ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                  <TableBody>

                      {
                        data.map((product) => (
                          <TableRow key={product.id}>

                          <TableCell>
                            <Image 
                              src={product.image} 
                              alt='product image' 
                              width={80} 
                              height={80}
                              className='p-0 m-0 min-w-16 min-h-16 rounded-md'
                            />
                          </TableCell>


                            <TableCell>{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.price)}</TableCell>
                            <TableCell>{formatNumber(product.sales)}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant={`${product.isAvailableForPurchase ? 'outline':'destructive'}`}>{product.isAvailableForPurchase ? 'Active':'Inactive'}</Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      }

                  </TableBody>
                
            </Table>
        </CardContent>
    </Card>
  )
}

export default AdminDashboardTable