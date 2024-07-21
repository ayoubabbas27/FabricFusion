import CustomerNav from "@/components/sections/CustomerNav"

export const dynamic = "force-dynamic"

export default function AdminLayout ({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <CustomerNav />
            <div className="w-full px-4 pb-4 pt-16 lg:pt-20 bg-[#ffffff] h-screen">
                {children}
            </div>
        </>
    )
}