import React from 'react'
import { Button } from '../ui/button'

const StoreFrontBanner = () => {
  return (
    <section className='w-full relative mt-1.5 md:max-h-[600px] xl:max-h-[700px] overflow-hidden rounded-lg'>
        <div className='absolute top-0 left-0 inset-0 w-full text-white flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-12 z-10'>
            <span className='font-bold text-2xl sm:text-4xl lg:text-6xl'>Welcome to Fabric Fusion</span>
            <p className='text-base text-center px-3 sm:px-14 sm:text-xl md:text-2xl md:px-11 xl:text-3xl xl:w-3/4'>At Fabric Fusion, we bring you the finest fabrics and designs to transform your wardrobe with elegance and style.</p>
            <div className='flex flex-row flex-wrap justify-center items-center gap-3 xl:gap-6'>
                <Button variant="secondary">
                    See Collection
                </Button>
                <Button variant="ghost">
                    Contact us
                </Button>
            </div>
        </div>
        <div className='absolute top-0 left-0 w-full h-full bg-slate-800 bg-opacity-40 rounded-lg z-0'></div>
        <img 
            src="/images/heroSectionImage.webp" 
            alt="hero section image" 
            className=' rounded-lg  w-full h-full object-cover'
        />
    </section>
  )
}

export default StoreFrontBanner