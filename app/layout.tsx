import './globals.css'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Luxeloop - Premium Designer Clothing',
  description: 'Premium Designer Clothing Rental & Resale Inventory Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-luxe-gradient font-playfair">
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-red-50 to-stone-100">
          {children}
        </div>
      </body>
    </html>
  )
} 