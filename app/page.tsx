'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Package, FileText, BarChart3, Search, Settings } from 'lucide-react'
import InventoryForm from './components/InventoryForm'

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

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])

  useEffect(() => {
    setMounted(true)
    // Load inventory items for stats
    try {
      const savedItems = localStorage.getItem('luxeloop-inventory')
      if (savedItems) {
        setInventoryItems(JSON.parse(savedItems))
      }
    } catch (error) {
      console.error('Error loading inventory:', error)
    }
  }, [])

  // Calculate stats
  const totalItems = inventoryItems.length
  const totalValue = inventoryItems.reduce((sum, item) => sum + parseInt(item.purchasePrice || '0'), 0)
  const availableItems = inventoryItems.length // For now, all items are available
  const rentedItems = 0 // This could be enhanced later with rental status

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Luxeloop
                </h1>
              </div>
            </div>
            <nav className="flex space-x-6">
              <Link 
                href="/inventory" 
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Reports</span>
              </Link>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors font-medium">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">{availableItems}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rented</p>
                <p className="text-2xl font-bold text-orange-600">{rentedItems}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatPrice(totalValue)}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Inventory Management</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Add New Item */}
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-lg transition-colors text-left group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Add New Item</h3>
                  <p className="text-blue-100">Register new inventory item</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm">
                Add clothing items to inventory with automatic ID generation and receipt printing
              </p>
            </button>

            {/* View Inventory */}
            <Link href="/inventory">
              <div className="bg-gray-900 hover:bg-gray-800 text-white p-8 rounded-lg transition-colors text-left group cursor-pointer">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">View Inventory</h3>
                    <p className="text-gray-300">Browse & manage all items</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  View all inventory items, update status, and manage rental tracking
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="w-6 h-6 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Quick Search</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Find items by ID, type, or status</p>
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="w-6 h-6 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <p className="text-gray-600 text-sm">No recent activity</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-6 h-6 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Quick Reports</h3>
            </div>
            <div className="space-y-2 text-sm">
              <button className="text-blue-600 hover:text-blue-700 block">Monthly Summary</button>
              <button className="text-blue-600 hover:text-blue-700 block">Rental Status</button>
              <button className="text-blue-600 hover:text-blue-700 block">Inventory Value</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Form Modal */}
      {showForm && mounted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Add New Inventory Item
                  </h3>
                  <p className="text-gray-600 mt-1">Register new item and generate receipt</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <InventoryForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </main>
  )
} 