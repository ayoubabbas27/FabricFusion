"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { startTransition, useTransition } from "react";
import { toggleOrderStatus } from "@/app/admin/_actions/orders";
import { useRouter } from "next/navigation";


export function OrderActionsToggleStatus ({ 
    id, 
    fulfilled
}: {
    id: string, 
    fulfilled: boolean
}){
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const newState = !fulfilled;
    return (
        <DropdownMenuItem 
            disabled={isPending}

            onClick={() => {
                startTransition(async () => {
                    await toggleOrderStatus(id, newState);
                    router.refresh();
                })
            }}
        >
            {fulfilled ? 'To Pending':'To Shipped'}
        </DropdownMenuItem>
    )
}