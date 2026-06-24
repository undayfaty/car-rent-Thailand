'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // MOCK LOGIN FOR TESTING (runs first to avoid Supabase fetch issues in dev)
  if (password === 'password123') {
    const cookieStore = await cookies()
    if (email === 'admin@carrent.com') {
      cookieStore.set('mock_role', 'admin')
      redirect('/dashboard')
    } else if (email === 'staff@carrent.com') {
      cookieStore.set('mock_role', 'staff')
      redirect('/dashboard')
    } else if (email === 'driver@carrent.com') {
      cookieStore.set('mock_role', 'driver')
      redirect('/dashboard')
    }
  }

  let authError: unknown = null
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    authError = error
  } catch (e) {
    authError = e
  }

  if (!authError) {
    redirect('/dashboard')
  }

  return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง (Invalid credentials)' }
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const phone = formData.get('phone') as string
  
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      }
    }
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  const cookieStore = await cookies()
  cookieStore.delete('mock_role')
  redirect('/login')
}
