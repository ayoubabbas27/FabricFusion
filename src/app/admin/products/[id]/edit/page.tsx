import ProductForm from "@/components/sections/ProductForm"
import db from "@/lib/db"

const EditProductPage = async ({ params: { id }}:{ params: {id:string}}) => {
    const product = await db.product.findUnique({ where: {id}});

  return (
    <div className='w-full pb-4 pt-2 md:pb-4 xl:px-44'>
      <h1 className='text-4xl mb-4'>Edit Product</h1>
      <ProductForm product={product}/>
    </div>
  )
}

export default EditProductPage