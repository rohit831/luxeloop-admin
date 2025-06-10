'use client'

import React from 'react'
import QRCode from 'qrcode.react'
import { Package, Calendar, IndianRupee, Phone, User } from 'lucide-react'

interface ReceiptProps {
  item: {
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
}

export default function Receipt({ item }: ReceiptProps) {
  const formatPrice = (price: string) => {
    if (!price) return null
    const numPrice = parseInt(price)
    return `₹${numPrice.toLocaleString('en-IN')}`
  }

  const printReceipt = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Print Button - Hidden when printing */}
      <div className="text-center mb-8 print:hidden">
        <button
          onClick={printReceipt}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Print Receipt
        </button>
      </div>

      {/* Receipt Content */}
      <div className="max-w-md mx-auto bg-white border-2 border-gray-300 p-8">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-dashed border-gray-300 pb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Luxeloop</h1>
          </div>
          <p className="text-gray-600 text-sm">Luxury Fashion Boutique</p>
          <p className="text-gray-600 text-sm">Inventory Receipt</p>
        </div>

        {/* QR Code */}
        <div className="text-center mb-6">
          <div className="inline-block p-4 border border-gray-300 rounded-lg">
            <QRCode
              value={item.clothId}
              size={120}
              fgColor="#000000"
              bgColor="#FFFFFF"
              includeMargin={false}
            />
          </div>
          <p className="text-sm font-mono text-gray-700 mt-2 bg-gray-100 px-3 py-1 rounded inline-block">
            {item.clothId}
          </p>
        </div>

        {/* Item Details */}
        <div className="space-y-4 mb-6 border-b border-gray-300 pb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Category:</span>
            <span className="font-semibold text-gray-900">{item.clothCategory}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Age:</span>
            <span className="font-semibold text-gray-900">{item.clothAge} months</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Date Added:</span>
            <span className="font-semibold text-gray-900">{item.date}</span>
          </div>
        </div>

        {/* Owner Information */}
        <div className="space-y-4 mb-6 border-b border-gray-300 pb-6">
          <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Owner Details</span>
          </h3>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Name:</span>
            <span className="font-semibold text-gray-900">{item.ownerName}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Mobile:</span>
            <span className="font-semibold text-gray-900">{item.ownerMobile}</span>
          </div>
        </div>

        {/* Pricing Information */}
        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center space-x-2">
            <IndianRupee className="w-5 h-5" />
            <span>Valuation</span>
          </h3>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Purchase Price:</span>
            <span className="font-bold text-gray-900">{formatPrice(item.purchasePrice)}</span>
          </div>
          
          {item.rentalPrice && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Rental Price:</span>
              <span className="font-bold text-green-600">{formatPrice(item.rentalPrice)}</span>
            </div>
          )}
          
          {item.resalePrice && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Resale Price:</span>
              <span className="font-bold text-blue-600">{formatPrice(item.resalePrice)}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center border-t-2 border-dashed border-gray-300 pt-6">
          <p className="text-xs text-gray-500 mb-2">Generated on: {new Date().toLocaleDateString('en-IN')}</p>
          <p className="text-xs text-gray-500">Keep this receipt for your records</p>
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-700">Thank you for choosing Luxeloop!</p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
} 