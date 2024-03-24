import './globals.css'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

import TopMenu from '@/components/TopMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import NextAuthProvider from '@/providers/NextAuthProvider'

import ReduxProvider from '@/redux/ReduxProvider'

const kanit = Kanit({
  weight: '400',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: 'Hotel Booking',
  description: 'Hotel Booking',
}


export default async function RootLayout(
  {children,}: {children: React.ReactNode}){
  
  const session = await getServerSession(authOptions);
  console.log(session)

  return (
    <html lang="en" className={`h-full w-full ${kanit.className}`}>
      <body className='h-full bg-gray-900'>
        <ReduxProvider>
          <NextAuthProvider session={session}>
            <TopMenu/>
            {children}
          </NextAuthProvider>
        </ReduxProvider>
        
      </body>
    </html>
  )
}
