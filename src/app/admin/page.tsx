import React from 'react'
import db from '@/lib/db'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {formatCurrency , formatNumber} from '@/lib/formatters'
import {AriaChart} from '@/components/sections/AreaChart'
import AdminDashboardTable from '@/components/sections/AdminDashboardTable'
import {DashboardPieChart} from '@/components/sections/PieChart'
import {DashboardBarChart} from '@/components/sections/BarChart'

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: {pricePaidInCents: true},
    _count: true
  });
  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count
  }
}

async function getUserData(){
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true}
    })
  ]);
  return {
    userCount,
    averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0 ) / 100 / userCount
  }
}

async function getProductData(){
  const [activeProductsCount, inactiveProductsCount] = await Promise.all([
    db.product.count({where: {isAvailableForPurchase: true}}),
    db.product.count({where: {isAvailableForPurchase: false}})
  ]);
  return {
    activeProductsCount,
    inactiveProductsCount
  }
}

const AdminDashboard = async () => {
  const [salesData, usersData, productsData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData()
  ])

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-4 pt-2 md:pb-4 gap-4 xl:px-44'>
        <DashboardCard 
          title='Sales'
          description={`${formatNumber(salesData.numberOfSales)} items sold`}
          content={formatCurrency(salesData.amount)}
        />
        <DashboardCard 
          title='Customers'
          description={`Customer's Average Value : ${formatCurrency(usersData.averageValuePerUser)}`}
          content={formatNumber(usersData.userCount)}
        />
        <DashboardCard 
          title='Products'
          description={`${formatNumber(productsData.activeProductsCount)} Active | ${formatNumber(productsData.inactiveProductsCount)} Inactive`}
          content={formatNumber(productsData.activeProductsCount + productsData.inactiveProductsCount)}
        />

        <AriaChart />
        <DashboardPieChart />


        <DashboardBarChart />

        <AdminDashboardTable />

    </div>
  )
}

type DashboardCardProps = {
  title: string
  description: string
  content: string
}

export function DashboardCard ({title, description, content}: DashboardCardProps){
  return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
      </Card>
  )
}

export default AdminDashboard