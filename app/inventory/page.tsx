'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Package, Calendar, IndianRupee, Plus, BarChart3, Filter, Search } from 'lucide-react'
import QRCode from 'qrcode.react'

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

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Load items from localStorage
    try {
      const savedItems = localStorage.getItem('luxeloop-inventory')
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }
    } catch (error) {
      console.error('Error loading inventory:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const formatPrice = (price: string) => {
    if (!price) return null
    const numPrice = parseInt(price)
    return `₹${numPrice.toLocaleString('en-IN')}`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Evening Gown':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Cocktail Dress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Formal Dress':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredItems = items.filter(item =>
    item.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.clothId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.clothCategory.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading inventory...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium group"
              >
                <div className="w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <span>Back to Dashboard</span>
              </Link>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Inventory Management
                  </h1>
                  <p className="text-gray-500 text-sm">
                    View and manage all inventory items
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
                <BarChart3 className="w-5 h-5" />
                <span>Reports</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats and Search */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{items.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(items.map(item => item.clothCategory)).size}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {items.length > 0 ? 
                    `₹${Math.round(items.reduce((sum, item) => sum + parseInt(item.purchasePrice || '0'), 0) / items.length).toLocaleString('en-IN')}` 
                    : '₹0'
                  }
                </p>
              </div>
              <IndianRupee className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Inventory Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No items found' : 'No inventory items'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first inventory item'}
            </p>
            {!searchTerm && (
              <Link 
                href="/" 
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add First Item</span>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  {/* QR Code Section */}
                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(item.clothCategory)}`}>
                        {item.clothCategory}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                    </div>
                    
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <QRCode
                          value={item.clothId}
                          size={80}
                          fgColor="#374151"
                          bgColor="#FFFFFF"
                          includeMargin={false}
                        />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-600 font-mono bg-gray-200 px-2 py-1 rounded inline-block">
                        {item.clothId}
                      </p>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="p-4 space-y-3">
                    {/* Owner Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {item.ownerName}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.ownerMobile}</p>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Purchase</span>
                        <span className="font-semibold text-gray-900">
                          {formatPrice(item.purchasePrice)}
                        </span>
                      </div>

                      {item.rentalPrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Rental</span>
                          <span className="font-semibold text-green-600">
                            {formatPrice(item.rentalPrice)}
                          </span>
                        </div>
                      )}

                      {item.resalePrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Resale</span>
                          <span className="font-semibold text-blue-600">
                            {formatPrice(item.resalePrice)}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-gray-600">Age</span>
                        <span className="font-medium text-gray-900">
                          {item.clothAge} months
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Item Button */}
            <div className="text-center mt-8 pt-8 border-t">
              <Link 
                href="/" 
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Item</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
} 