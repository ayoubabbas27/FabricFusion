import CustomerNav from "@/components/sections/CustomerNav"
import Footer from "@/components/sections/Footer"

export const dynamic = "force-dynamic"

export default function AdminLayout ({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <CustomerNav />
            <main className="flex-grow w-full px-4 pb-4 pt-16 lg:pt-20 bg-[#ffffff]">
                {children}
            </main>
            <Footer />
        </div>
    )
}