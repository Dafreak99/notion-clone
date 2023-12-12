'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import * as z from 'zod'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import Logo from '../../../../public/cypresslogo.svg'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loader from '@/components/global/Loader'
import { actionLoginUser } from '@/lib/server-action/auth-actions'
const LoginPage = () => {
  const router = useRouter()
  const [submitError, setSubmitError] = useState('')

  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    // ✅ This will be type-safe and validated.
    console.log('formData', formData)
    const { error } = await actionLoginUser(formData)

    if (error) {
      form.reset()
      setSubmitError(error.message)
    }

    router.replace('/dashboard')
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Form {...form}>
        <form
          onChange={() => {
            if (submitError) setSubmitError('')
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col'
        >
          <Link
            href='/'
            className='
          w-full
          flex
          justify-left
          items-center'
          >
            <Image src={Logo} alt='cypress Logo' width={50} height={50} />
            <span
              className='font-semibold
          dark:text-white text-4xl first-letter:ml-2'
            >
              cypress.
            </span>
          </Link>
          <FormDescription
            className='
        text-foreground/60'
          >
            An all-In-One Collaboration and Productivity Platform
          </FormDescription>
          <FormField
            disabled={isLoading}
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='email' placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <Button
            type='submit'
            className='w-full p-6 text-white'
            size='lg'
            disabled={isLoading}
          >
            {!isLoading ? 'Login' : <Loader />}
          </Button>
          <span className='self-container'>
            Dont have an account?{' '}
            <Link href='/signup' className='text-primary'>
              Sign Up
            </Link>
          </span>
        </form>
      </Form>
    </div>
  )
}

export default LoginPage
