import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TopMenu from '@/components/TopMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import NextAuthProvider from '@/providers/NextAuthProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hotel Booking',
  description: 'Hotel Booking',
}


export default async function RootLayout(
  {children,}: {children: React.ReactNode}){
  
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className='h-full w-full font-kanit'>
      <body className='h-full bg-gray-900'>
        
        <NextAuthProvider session={session}>
          <TopMenu/>
          {children}
        </NextAuthProvider>
        
      </body>
    </html>
  )
}
