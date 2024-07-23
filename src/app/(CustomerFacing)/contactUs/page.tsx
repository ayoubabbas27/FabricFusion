"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'


const contactUs = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='w-full flex flex-row  justify-center items-center gap-3 xl:px-44 pt-4 pb-4 mb-28'>
      <div className='w-full max-w-xl border-2 border-slate-300 shadow-sm p-4 rounded-md flex flex-col justify-center items-center gap-5'>
        <h1 className='text-xl font-bold'>Fabric Fusion.</h1>
        <h2 className='font-semibold text-4xl text-center'>Contact Us</h2>
        <p className='text-muted-foreground text-center'>
          We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to share some feedback, feel free to get in touch.
        </p>
        <form 
          method='POST' 
          action={`https://formsubmit.co/${process.env.CONTACT_EMAIL}`}
          className='w-full flex flex-col justify-center items-center gap-6'
          onSubmit={() => setIsLoading(true)}
        >
          <div className='w-full flex flex-col justify-center items-start gap-3'>
            <Label htmlFor='subject'>Subject :</Label>
            <Input required type="text" name='subject' id="subject" placeholder='Message Subject...' className='w-full p-3 shadow-sm border-2 border-slate-300 rounded-md'/>
          </div>
          <div className='w-full flex flex-col justify-center items-start gap-3'>
            <Label htmlFor='email'>Email :</Label>
            <Input required type="email" name='email' id="email" placeholder='Your Email...' className='w-full p-3 shadow-sm border-2 border-slate-300 rounded-md'/>
          </div>
          <div className='w-full flex flex-col justify-center items-start gap-3'>
            <Label htmlFor='message'>Message :</Label>
            <Textarea required  name='message' id="message" placeholder='Write Your Message Here...' className='w-full p-3 shadow-sm border-2 border-slate-300 rounded-md'/>
          </div>
          <div className='w-full flex flex-row justify-end items-center gap-5'>
            <Button type='reset' variant="outline">Reset</Button>
            <Button 
              type='submit'
              disabled={isLoading}
              className={`${ isLoading ? 'animate-pulse':''}`}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default contactUs