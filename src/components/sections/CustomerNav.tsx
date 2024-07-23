"use client"
import { CUSTOMER_NAV_LINKS } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"

const CustomerNav = () => {

  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const isActive = (href: string) => href === usePathname();

  return (
    <nav className='fixed top-0 left-0 z-40 bg-white w-full text-black flex flex-row justify-between items-center p-4 lg:px-10 border-b-2 border-slate-200 '>
        <Link href='/' className="flex flex-row justify-center items-center z-40 lg:text-lg">
          <span className="font-bold text-black text-lg">Fabric Fusion</span>
        </Link>
        <Image 
          src={mobileNavVisible ? '/icons/closeCustomerFacing.svg':'/icons/HamburgerMenuCustomerFacing.svg'}
          alt="Hamburger Menu"
          width={23}
          height={23}
          onClick={() => setMobileNavVisible(prevVis => !prevVis)}
          className="lg:hidden z-40 hover:cursor-pointer"
        />

        <div onClick={() => setMobileNavVisible(false)} className={`z-20 fixed top-0 left-0 w-full h-full  bg-slate-300 bg-opacity-20 ${mobileNavVisible ? 'block' : 'hidden'} lg:hidden`}></div>

        <div className={`bg-white rounded-bl-md rounded-br-md px-4 pb-8 pt-16 left-0 fixed w-full z-30 flex flex-col justify-center items-end gap-2 ${mobileNavVisible ? 'top-0':'-top-96'} transition-all duration-500 ease-in-out lg:hidden`}>
          {
            CUSTOMER_NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`${isActive(link.href) ? 'bg-gray-300 ' : 'hover:bg-slate-100'} w-full flex flex-row justify-start items-center gap-3 py-2 px-3 rounded-sm transition-all duration-300 ease-in-out`}
                onClick={() => setMobileNavVisible(false)}
              >
                <span className={`${isActive(link.href) ? 'font-bold' : ''} transition-all duration-33 ease-in-out`}>{link.label}</span>
              </Link>
            ))
          }
        </div>

        <div className='hidden lg:flex lg:flex-row lg:justify-between lg:items-start gap-5'>
          {
            CUSTOMER_NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`${isActive(link.href) ? 'bg-gray-300 ' : 'hover:bg-slate-100'} w-32 flex py-2 flex-row justify-center items-center gap-3 rounded-sm transition-all duration-300 ease-in-out`}
                onClick={() => setMobileNavVisible(false)}
              >
                <span className={`${isActive(link.href) ? 'font-bold' : ''} transition-all duration-33 ease-in-out`}>{link.label}</span>
              </Link>
            ))
          }
        </div>
        <Button className="hidden lg:flex " asChild>
            <Link href="/products">
                See Collection                
            </Link>
        </Button>
    </nav>
  )
}

export default CustomerNav