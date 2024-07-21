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
  
type PropsObject = {
  id: string,
  name: string,
  price: number,
  isAvailableForPurchase: Boolean,
  sales: number
}

const AdminDashboardTable = ({ data }: { data: PropsObject[]}) => {
  return (
    <Card className="w-full md:col-span-2">
        <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>List of the Top 10 Products by Sales Volume</CardDescription>
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

                    {/*Loop throw the content's object that will contain the top 10 selling products , and create a tableRow for each one and fill it with the correct data*/}
                    {
                      data.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.id}</TableCell>
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