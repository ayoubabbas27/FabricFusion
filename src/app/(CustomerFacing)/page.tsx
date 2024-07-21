import Image from "next/image";
import { Button } from "@/components/ui/button"
import StoreFrontBanner from "@/components/sections/StoreFrontBanner"
import SkeletonCard from "@/components/sections/SkeletonCard"
import db from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import {cache} from '@/lib/cache'

const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 10
  });
}, ["/", "getNewestProducts"], { revalidate: 60 * 60 * 24 })

const getMostPopularProducts = cache(() => {
  return db.product.findMany({
    where:{
      isAvailableForPurchase: true
    },
    orderBy: {
      orders: {
        _count: "desc"
      }
    },
    take: 10
  })
}, ["/", "getMostPopularProducts"], { revalidate: 60 * 60 * 24 });

export default function Home() {
  return (
    <main className="w-full pb-4 pt-2 md:pb-4 space-y-12">
      <StoreFrontBanner />
      <ProductsGridSection productsFetcher={getMostPopularProducts} title="Most Popular Products"/>
      <ProductsGridSection productsFetcher={getNewestProducts} title="Newest Products Products"/>
    </main>
  );
}

type ProductsGridSectionProps = {
  title: string,
  productsFetcher: () => Promise<Product[]>
}

function ProductsGridSection ({productsFetcher, title}: ProductsGridSectionProps){

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3 self-center xl:px-44">

      <div className="w-full flex flex-row justify-start items-center gap-3">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant='outline' asChild>
          <Link href='/products' className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4"/>
          </Link>
        </Button>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        <Suspense fallback={
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        }>
          <ProductSuspense productsFetcher={productsFetcher}/>
        </Suspense>
      </div>
    </div>
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
          <span className="text-muted-foreground mb-3 italic">{product.description}</span>
          <span className="text-xl font-bold text-black">{formatCurrency(product.priceInCents/100)}</span>
        </CardContent>
        <CardFooter className="w-full flex flex-row justify-end items-center">
        <Button asChild>
            <Link href={`/products/${product.id}/purchase`}>Add To Cart</Link> 
          </Button>
        </CardFooter>
      </Card>
    ))
  )
}









