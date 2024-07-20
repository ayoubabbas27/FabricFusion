"use server"

import { z } from "zod"
import db from "@/lib/db"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: 'Required' });
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInCents: z.coerce.number().int().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required")
})
const editProductSchema = addProductSchema.extend({
    image: imageSchema.optional(),
})


export async function addProduct (prevState: unknown, formData: FormData){
    const result = addProductSchema.safeParse(Object.fromEntries(formData.entries()));
    if(result.success === false){
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;

    await fs.mkdir("public/products", {recursive: true});
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))

    console.log(data);

    await db.product.create({ data: {
        name: data.name,
        priceInCents: data.priceInCents,
        imagePath,
        description: data.description,
        isAvailableForPurchase: false
    }})

    redirect('/admin/products');
}

export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean){
    await db.product.update({ where: {id}, data: { isAvailableForPurchase }})
}

export async function deleteProduct (id: string){
    const product = await db.product.delete({ where: {id} });
    if (product == null) return notFound();

    await fs.unlink(`public${product.imagePath}`)
}

export async function editProduct (id: string, prevState: unknown, formData: FormData){
    const result = editProductSchema.safeParse(Object.fromEntries(formData.entries()));
    if(result.success === false){
        return result.error.formErrors.fieldErrors;
    }

    const data = result.data;
    const product = await db.product.findUnique({ where: {id}});

    if (product == null) return notFound();

    let imagePath = product.imagePath;
    if (data.image != null && data.image.size > 0){
        await fs.unlink(`public${product.imagePath}`);
        imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    console.log(data);

    await db.product.update({ where: {id}, data: {
        name: data.name,
        priceInCents: data.priceInCents,
        imagePath,
        description: data.description,
        isAvailableForPurchase: false
    }})

    redirect('/admin/products');
}