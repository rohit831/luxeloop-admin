'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Receipt from '../../components/Receipt'

interface InventoryItem {
  id: string
  ownerName: string
  ownerMobile: string
  clothCategory: string
  clothId: string
  clothAge: string
  purchasePrice: string
  rentalPrice: string
  resalePrice: string
  date: string
  createdAt: string
}

export default function ReceiptPage() {
  const params = useParams()
  const [item, setItem] = useState<InventoryItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const clothId = params.id as string
    
    try {
      const savedItems = localStorage.getItem('luxeloop-inventory')
      if (savedItems) {
        const items: InventoryItem[] = JSON.parse(savedItems)
        const foundItem = items.find(item => item.clothId === clothId)
        setItem(foundItem || null)
      }
    } catch (error) {
      console.error('Error loading receipt data:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading receipt...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Receipt Not Found</h1>
          <p className="text-gray-600">The requested receipt could not be found.</p>
        </div>
      </div>
    )
  }

  return <Receipt item={item} />
} 