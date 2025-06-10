'use client'

import React, { useState } from 'react'
import { Save, Sparkles, Crown, User, Phone, Package, Calendar, IndianRupee } from 'lucide-react'

interface InventoryFormProps {
  onClose: () => void
}

interface FormData {
  ownerName: string
  ownerMobile: string
  clothCategory: string
  clothAge: string
  purchasePrice: string
  rentalPrice: string
  resalePrice: string
}

export default function InventoryForm({ onClose }: InventoryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    ownerName: '',
    ownerMobile: '',
    clothCategory: '',
    clothAge: '',
    purchasePrice: '',
    rentalPrice: '',
    resalePrice: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateClothId = (category: string): string => {
    const categoryCode: { [key: string]: string } = {
      'Evening Gown': 'EVG',
      'Cocktail Dress': 'CDR', 
      'Formal Dress': 'FDR'
    }
    
    const timestamp = Date.now()
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `LUX-${categoryCode[category]}-${timestamp}-${randomNum}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const clothId = generateClothId(formData.clothCategory)
      const currentDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      const inventoryItem = {
        id: clothId,
        ...formData,
        clothId,
        date: currentDate,
        createdAt: new Date().toISOString()
      }

      // Save to localStorage
      const existingItems = JSON.parse(localStorage.getItem('luxeloop-inventory') || '[]')
      existingItems.push(inventoryItem)
      localStorage.setItem('luxeloop-inventory', JSON.stringify(existingItems))

      // Open receipt in new tab
      const receiptUrl = `/receipt/${encodeURIComponent(clothId)}`
      window.open(receiptUrl, '_blank')

      // Reset form and close
      setFormData({
        ownerName: '',
        ownerMobile: '',
        clothCategory: '',
        clothAge: '',
        purchasePrice: '',
        rentalPrice: '',
        resalePrice: ''
      })
      
      // Show success message
      const successDiv = document.createElement('div')
      successDiv.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl z-[60]'
      successDiv.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <span class="font-medium">Item added and receipt generated!</span>
        </div>
      `
      document.body.appendChild(successDiv)
      setTimeout(() => document.body.removeChild(successDiv), 4000)
      
      onClose()
    } catch (error) {
      console.error('Error saving item:', error)
      
      // Show error message
      const errorDiv = document.createElement('div')
      errorDiv.className = 'fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-xl shadow-xl z-[60] animate-fade-in'
      errorDiv.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="w-5 h-5 bg-white rounded-full flex items-center justify-center">⚠</div>
          <span class="font-inter font-medium">Error saving item. Please try again.</span>
        </div>
      `
      document.body.appendChild(errorDiv)
      setTimeout(() => document.body.removeChild(errorDiv), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const categoryOptions = [
    { value: '', label: 'Select Category', icon: Package },
    { value: 'Evening Gown', label: 'Evening Gown', icon: Crown },
    { value: 'Cocktail Dress', label: 'Cocktail Dress', icon: Sparkles },
    { value: 'Formal Dress', label: 'Formal Dress', icon: Package }
  ]

  return (
    <div className="relative">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">Owner Details</h4>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Owner's Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="ownerMobile"
                  value={formData.ownerMobile}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Garment Information Section */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-gray-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">Garment Specifications</h4>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="clothCategory"
                  value={formData.clothCategory}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                  required
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (months)</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="clothAge"
                  value={formData.clothAge}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Age in months"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        {/* Pricing Section */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-gray-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900">Valuation</h4>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Original price"
                  min="0"
                  step="1"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rental Price <span className="text-green-600 text-xs">(Optional)</span></label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="rentalPrice"
                  value={formData.rentalPrice}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Rental rate"
                  min="0"
                  step="1"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Resale Price <span className="text-green-600 text-xs">(Optional)</span></label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="resalePrice"
                  value={formData.resalePrice}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Resale value"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 pt-8">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 px-8 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-8 rounded-lg transition-colors flex items-center justify-center space-x-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Adding Item...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Add Item</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 