'use server'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import * as z from 'zod'
import { FormSchema } from '../types'

export const actionLoginUser = async ({
  email,
  password,
}: z.infer<typeof FormSchema>) => {
  const cookieStore = cookies()

  const supabase = createClientComponentClient({})

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return response
}
