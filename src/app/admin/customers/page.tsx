import db from '@/lib/db'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate, formatNumber } from '@/lib/formatters'


const AdminCustomers = () => {
  return (
    <div className='w-full pb-4 pt-2 md:pb-4 xl:px-44'>
      <div className='w-full flex flex-row justify-between items-center mb-4'>
        <h1 className='text-4xl'>Customers</h1>
      </div>
      <CustomersTable />
    </div>
  )
}

async function CustomersTable (){
  const customersData = await db.user.findMany({ 
    select: {
      id: true, 
      email: true, 
      createdAt: true,
      _count: {
        select:{
          orders: true
        }
      }
    },
    orderBy: {createdAt: "desc"}
  });

  if (customersData.length === 0) return (<div className=' font-semibold text-xl text-center'>No Customers Found !</div>)

  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            customersData.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{formatNumber(customer._count.orders)}</TableCell>
                <TableCell >{formatDate(customer.createdAt.toString())}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
  )
}
export default AdminCustomers