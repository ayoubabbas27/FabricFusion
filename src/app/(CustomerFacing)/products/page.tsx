import SkeletonCard from '@/components/sections/SkeletonCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import db from '@/lib/db'
import { formatCurrency } from '@/lib/formatters'
import { Product } from '@prisma/client'
import React, { Suspense } from 'react'
import { cache } from '@/lib/cache'
import Link from 'next/link'

const getProductsData = cache(() => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true
    },
    orderBy:{
      name: "asc"
    }
  })
}, ["/products", "getProductsData"], { revalidate: 60 * 60 * 24 });

const products = () => {
  return (
    <main className='w-full flex flex-col justify-center items-center gap-3 self-center xl:px-44 pt-4 pb-4 mb-28'>

      <h2 className="text-3xl font-bold text-start w-full">Products</h2>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
        <Suspense fallback={
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        }>
          <ProductSuspense productsFetcher={getProductsData}/>
        </Suspense>
      </div>
    </main>
  )
}

async function ProductSuspense({productsFetcher}:{productsFetcher: () => Promise<Product[]>}){
  return (
    (await productsFetcher()).map((product) => (
      <Card key={product.id} className="flex flex-col justify-between items-center">
        <CardHeader>
          <img src={product.imagePath} alt="product image" className="rounded-md aspect-square"/>
        </CardHeader>
        <CardContent className="w-full h-full flex flex-col justify-between items-start gap-3">
          <span className="text-2xl font-bold text-black">{product.name}</span>
          <span className="text-muted-foreground mb-3 line-clamp-3">{product.description}</span>
          <span className="text-xl font-bold text-black">{formatCurrency(product.priceInCents/100)}</span>
        </CardContent>
        <CardFooter className="w-full flex flex-row justify-end items-center">
          <Button asChild>
            <Link href={`/products/${product.id}/purchase`}>Purchase</Link> 
          </Button>
        </CardFooter>
      </Card>
    ))
  )
}

export default products