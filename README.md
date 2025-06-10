# 🌟 Luxeloop - Premium Designer Clothing Inventory

A modern, sophisticated inventory management system for premium designer clothing boutiques, built with Next.js 13+ and Tailwind CSS.

## ✨ Features

- **Premium UI/UX**: Elegant red-themed design with Playfair Display typography
- **Responsive Design**: Fully responsive layout that works on all devices
- **Auto QR Codes**: Automatically generated QR codes for each inventory item using `qrcode.react`
- **Local Storage**: Data persistence using browser localStorage
- **Form Validation**: Comprehensive form validation with TypeScript
- **Modern Architecture**: Built with Next.js 13+ App Router and TypeScript
- **Tailwind CSS**: Custom design system with luxury color palette
- **Real-time Updates**: Instant UI updates when adding new items

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or create the project**
   ```bash
   mkdir luxeloop-inventory
   cd luxeloop-inventory
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
luxeloop-inventory/
├── app/
│   ├── components/
│   │   └── InventoryForm.tsx     # Form component for adding items
│   ├── inventory/
│   │   └── page.tsx              # Inventory listing page
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Home page component
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.js             # PostCSS configuration
└── package.json                  # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary Red**: `#8B0000` (Dark Red)
- **Accent Red**: `#DC143C` (Crimson)
- **Secondary Red**: `#B22222` (Fire Brick)
- **Background**: Gradient from stone to red tones
- **Cards**: Soft white gradients with red accents

### Typography
- **Primary Font**: Playfair Display (Google Fonts)
- **Weights**: 300, 400, 600, 700, 900
- **Usage**: Serif font for premium, luxurious feel

### Components
- **Buttons**: `.btn-luxe` - Gradient background with hover effects
- **Cards**: `.card-luxe` - Elegant white cards with subtle shadows
- **Inputs**: `.input-luxe` - Premium form inputs with red focus states
- **Labels**: `.label-luxe` - Consistent form labels

## 📱 Pages

### Home Page (`/`)
- Welcome screen with Luxeloop branding
- Two main action cards: "Add New Item" and "View Inventory"
- Feature highlights with icons
- Modal form for adding new inventory items

### Inventory Page (`/inventory`)
- Responsive grid layout (1-4 columns based on screen size)
- Each item displays:
  - QR code generated from cloth ID
  - Item category badge
  - Owner name and contact
  - Pricing information (purchase, rental, resale)
  - Item age and date added
- Empty state with call-to-action
- Back navigation to home page

## 🔧 Key Features

### Automatic Cloth ID Generation
```typescript
// Format: LUX-[CATEGORY]-[TIMESTAMP]-[RANDOM]
// Example: LUX-LHG-1703123456789-342
const generateClothId = (category: string): string => {
  const categoryCode = {
    'Lehenga': 'LHG',
    'Onepiece': 'OPC', 
    'Indo-western': 'IWN'
  }
  const timestamp = Date.now()
  const randomNum = Math.floor(Math.random() * 1000)
  return `LUX-${categoryCode[category]}-${timestamp}-${randomNum}`
}
```

### QR Code Generation
Uses `qrcode.react` to generate QR codes with:
- Custom red color scheme (`#8B0000`)
- 120px size for optimal scanning
- Includes margin for better readability
- Displays cloth ID below QR code

### Local Storage
```typescript
// Save items
localStorage.setItem('luxeloop-inventory', JSON.stringify(items))

// Load items
const items = JSON.parse(localStorage.getItem('luxeloop-inventory') || '[]')
```

## 🛠️ Technologies Used

- **Framework**: Next.js 14.0.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **QR Codes**: qrcode.react
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **Font**: Playfair Display (Google Fonts)

## 📋 Form Fields

### Required Fields
- **Owner's Name**: Text input
- **Owner's Mobile**: Tel input (10 digits)
- **Cloth Category**: Select (Lehenga, Onepiece, Indo-western)
- **Cloth Age**: Number input (months)
- **Purchase Price**: Number input (integers only)

### Optional Fields
- **Rental Price**: Number input (integers only)
- **Resale Price**: Number input (integers only)

## 🎯 Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- User authentication and multi-store support
- Barcode scanning functionality
- Analytics and reporting dashboard
- Image upload for items
- Search and filtering capabilities
- Export functionality (PDF, CSV)
- Real-time synchronization

## 📞 Support

For customizations or support, contact your developer.

---

**Built with ❤️ for Premium Fashion Boutiques** 