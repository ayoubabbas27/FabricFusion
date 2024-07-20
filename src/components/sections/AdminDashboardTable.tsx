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
  


const AdminDashboardTable = () => {
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
                    
                    <TableRow>
                        <TableCell className="font-medium">product's id</TableCell>
                        <TableCell>product's name</TableCell>
                        <TableCell>product's price</TableCell>
                        <TableCell>product's sales number</TableCell>
                        <TableCell className="text-right">product's status</TableCell>
                    </TableRow>

                </TableBody>
            </Table>

        </CardContent>
    </Card>
  )
}

export default AdminDashboardTable