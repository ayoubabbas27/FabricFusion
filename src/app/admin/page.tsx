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
import {PieChartLegend} from '@/components/sections/PieChartLegend'

async function getSamesAggregate() {
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

async function getTopSellingProducts (){
  const data = await db.product.findMany({ 
      select: {
          id: true,
          name: true,
          priceInCents: true,
          imagePath: true,
          isAvailableForPurchase: true,
          _count:{
              select: {
                  orders: true
              }
          }
      },
      orderBy: {
          orders:{
              _count: "desc"
          }
      },
      take: 5
  });
  
  const result = data.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.priceInCents / 100,
      isAvailableForPurchase: product.isAvailableForPurchase,
      sales: product._count.orders,
      image: product.imagePath
  }))
  return result;
}

async function getUsersSixMonths (){
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const data = await db.user.groupBy({
    where:{
      createdAt: {
        gte: sixMonthsAgo
      }
    },
    by: ["createdAt"],
    _count: true
  })

  return data;
}

async function getOrdersFulfillmentStates(){
  const data = await db.order.groupBy({
    by: ["fulfilled"],
    _count: true
  });
  return data;
}

async function getSalesSixMonths (){
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const data = await db.order.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo
      }
    }
  })

  return data;
}

async function getSalesPerCountry(){
  const data = await db.order.groupBy({
    by: ["country"],
    _count: {
      country: true
    }
  })
  return data;
}

const AdminDashboard = async () => {
  const [
    salesData, 
    usersData, 
    productsData, 
    topSellingProductsData, 
    salesSixMonths,
    salesPerCountry,
    usersSixMonths,
    orderFulfillmentStates
  ] = await Promise.all([
    getSamesAggregate(),
    getUserData(),
    getProductData(),
    getTopSellingProducts(),
    getSalesSixMonths(),
    getSalesPerCountry(),
    getUsersSixMonths(),
    getOrdersFulfillmentStates()
  ])
  console.log(salesSixMonths);
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

        <AdminDashboardTable data={topSellingProductsData}/>

        <AriaChart data={salesSixMonths}/>

        <DashboardPieChart data={salesPerCountry}/>

        <DashboardBarChart data={usersSixMonths}/>

        <PieChartLegend data={orderFulfillmentStates}/>

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