import AdminNav from "@/components/sections/AdminNav"

export const dynamic = "force-dynamic"

export default function AdminLayout ({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <AdminNav />
            <div className="w-full px-4 pb-4 pt-16 lg:pt-20 bg-[#F8F8F8] h-screen">
                {children}
            </div>
        </>
    )
}