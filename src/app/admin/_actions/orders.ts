"use server"
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function toggleOrderStatus(orderId: string, newState: boolean) {
    await db.order.update({ where: {id: orderId}, data: { fulfilled: newState }})

    revalidatePath("/");
}