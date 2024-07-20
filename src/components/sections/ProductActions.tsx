"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { toggleProductAvailability, deleteProduct } from "@/app/admin/_actions/products";
import { useRouter } from "next/navigation";

export function ProductStatusToggleDropdownItem ({ 
    id, 
    isAvailableForPurchase
}: {
    id: string, 
    isAvailableForPurchase: boolean
}){

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <DropdownMenuItem 
             disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await toggleProductAvailability(id, !isAvailableForPurchase);
                    router.refresh();
                })
            }}
        >
            {isAvailableForPurchase ? 'Deactivate':'Activate'}
        </DropdownMenuItem>
    )
}

export function DeleteDropDownItem ({ 
    id, 
    disabled
}: {
    id: string, 
    disabled: boolean
}){

    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <DropdownMenuItem 
            disabled={disabled || isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteProduct(id);
                    router.refresh();
                })
            }}
            className="p-0"
        >
           <span className="rounded-sm px-2 py-1.5 text-red-600 hover:bg-red-100 w-full h-full">Delete</span> 
        </DropdownMenuItem>
    )
}