"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { formatCurrency } from "@/lib/formatters"
import { Button } from "../ui/button"
import { addProduct, editProduct } from "@/app/admin/_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"

const ProductForm = ({product}: {product?: Product | null}) => {
    const [error, action] = useFormState(product == null ? addProduct : editProduct.bind(null, product.id), {})
    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents);


  return (
    <form className="space-y-8" action={action}>
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required defaultValue={product?.name || ""}/>
            {error.name && <div className='text-destructive'>{error.name}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInCents">Price In Cents</Label>
            <Input 
                type="number" 
                id="priceInCents" 
                name="priceInCents" 
                required 
                value={priceInCents}
                onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
            />
            <div className="text-muted-foreground">{formatCurrency((priceInCents || 0)/100)}</div>
            {error.priceInCents && <div className='text-destructive'>{error.priceInCents}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={product?.description || ""}/>
            {error.description && <div className='text-destructive'>{error.description}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" name="image" required={product == null}/>
            {product != null && (
                <Image src={product?.imagePath || ""} alt="product image" width={120} height={120} className="rounded-md shadow-md border-2 border-slate-100"/>
            )}
            {error.image && <div className='text-destructive'>{error.image}</div>}
        </div>
        <div className="space-x-3">
            <SubmitButton />
            <Button type="reset" variant="outline">Reset</Button>
        </div>
    </form>
  )
}

function SubmitButton (){
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>{pending ? 'Saving...':'Save'}</Button>
    )
}

export default ProductForm