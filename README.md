# Medical Websites Catalog

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748)](https://prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)](https://mysql.com/)

The largest medical websites catalog in Poland. Find trusted sources of health information, clinics, doctors, and specialists.

## ✨ Features

- 🏥 **Medical catalog** - organized categories of medical services
- 📝 **SEO articles** - high-quality content optimized for search engines
- 💳 **Paid submissions** - secure PayPal and TPay payment for article submissions
- 🌐 **Multilingual** - translation system with centralized language file
- 🔐 **CRUD API** - REST API with authentication for content management
- 📱 **Responsive Design** - optimal display on all devices
- 🔍 **SEO Optimized** - meta tags, Schema.org, Open Graph
- 🌳 **Category tree** - intuitive navigation through specializations

## 🛠️ Technologies Used

### Frontend
- **Next.js 16.0.1** - React framework with App Router for server-side rendering and static site generation
- **React 19.2.0** - UI library for building interactive user interfaces
- **TypeScript 5** - Typed superset of JavaScript for better code quality and developer experience
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development

### Backend & Database
- **Prisma 6.19.0** - Next-generation ORM for type-safe database access and migrations
- **MySQL 8.0** - Relational database management system (via mysql2 driver)
- **NextAuth 4.24.13** - Complete authentication solution for Next.js applications

### Payment Integration
- **PayPal** - International payment gateway (paypal-checkout SDK)
- **TPay** - Polish payment gateway supporting BLIK, bank transfers, and cards (tpay-webhook-auth)

### Security & Utilities
- **bcryptjs 3.0.3** - Password hashing library for secure user authentication
- **dotenv** - Environment variable management
- **ESLint** - Code linting and quality assurance

### Development Tools
- **tsx** - TypeScript execution engine for running scripts
- **TypeScript** - Type checking and compilation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gmaxsoft/katalog.git
   cd katalog-stron-medycznych
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the database**
   - Make sure MySQL is running
   - Create database: `med_catalog`
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update environment variables in `.env` file with your actual values

4. **Configure Prisma**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Configuration

### Environment Variables (.env)

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Update the `.env` file** with your actual values. See `.env.example` for all available variables:

   ```env
   # Database
   DATABASE_URL="mysql://root:@localhost:3306/med_catalog"

   # NextAuth (for authentication)
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # API Authentication (for REST API endpoints)
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="your-secure-password-here"

   # PayPal (use real credentials in production)
   PAYPAL_CLIENT_ID="your-paypal-client-id"
   PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
   PAYPAL_ENVIRONMENT="sandbox"

   # TPay (Polish payments)
   TPAY_API_KEY="your-tpay-api-key"
   TPAY_API_PASSWORD="your-tpay-api-password"
   TPAY_MERCHANT_ID="your-tpay-merchant-id"
   TPAY_ENVIRONMENT="sandbox"
   ```

**⚠️ Security Note**: 
- Never commit `.env` file to version control
- `.env.example` is a template file and is safe to commit
- Always use strong passwords in production
- Generate a secure `NEXTAUTH_SECRET` using: `openssl rand -base64 32`

### API Authentication

The API uses HTTP Basic Authentication. Credentials are configured via environment variables:
- **Username**: Set via `ADMIN_USERNAME` (defaults to `admin`)
- **Password**: Set via `ADMIN_PASSWORD` (required)

**⚠️ Security Note**: Never commit credentials to version control. Always use environment variables.

Example usage:
```bash
# Set credentials in your .env file first
curl -u admin:your-secure-password http://localhost:3000/api/articles
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── articles/      # Article management
│   │   └── categories/    # Category management
│   ├── artykuly/          # Individual article pages
│   ├── kategorie/         # Category pages
│   ├── dodaj-artykul/     # Article submission form
│   ├── layout.tsx         # Main application layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Page header
│   ├── Footer.tsx         # Page footer
│   ├── Layout.tsx         # Main layout wrapper
│   └── CategoryTree.tsx   # Category tree
└── lib/                   # Helper libraries
    ├── prisma.ts          # Prisma client
    ├── paypal.ts          # PayPal integration
    ├── tpay.ts            # TPay integration
    └── translations/      # Translation system
        ├── index.ts       # Translation helper functions
        └── pl.json        # Polish translation file
```

## 🔧 Available Scripts

```bash
# Run development server
npm run dev

# Build production application
npm run build

# Run production application
npm start

# Run tests (if added)
npm test

# Code formatting
npm run lint

# Seed database
npm run prisma:seed
```

## 📊 Database

### Schema

- **users** - system users
- **categories** - medical service categories (hierarchical)
- **articles** - SEO content articles
- **payments** - PayPal payment history

### Migrations

```bash
# Generate migrations
npx prisma migrate dev

# Update database schema
npx prisma db push

# Generate Prisma client
npx prisma generate
```

## 🌐 API Endpoints

### Articles
- `GET /api/articles` - list articles
- `POST /api/articles` - add new article

### Categories
- `GET /api/categories` - list categories
- `POST /api/categories` - add new category

### Query Parameters
- `?categoryId=1` - filter by category
- `?published=true` - only published articles

## 💰 Payments

The project supports two payment methods: PayPal (international) and TPay (Polish payments).

**Article submission cost**: 50.00 PLN

### PayPal

1. Create an account on [PayPal Developer](https://developer.paypal.com/)
2. Create an application and obtain Client ID and Secret
3. Update environment variables
4. Use `sandbox` environment for testing

### TPay (Polish Payments)

TPay is a popular Polish payment gateway supporting BLIK, bank transfers, payment cards, and other methods.

#### TPay Configuration

1. Create an account on [TPay](https://tpay.com/)
2. Obtain API Key, API Password, and Merchant ID
3. Update environment variables:
   ```env
   TPAY_API_KEY="your-tpay-api-key"
   TPAY_API_PASSWORD="your-tpay-api-password"
   TPAY_MERCHANT_ID="your-tpay-merchant-id"
   TPAY_ENVIRONMENT="sandbox"
   ```

#### Supported Payment Methods (TPay)
- BLIK
- Bank transfer
- Payment card
- Google Pay / Apple Pay
- PayPo (buy now, pay later)

## 🌐 Internationalization (i18n)

The project includes a translation system that allows easy language switching for the application.

### Translation Structure

All texts are stored in `src/lib/translations/pl.json`. The structure includes:

- **nav** - navigation elements
- **header** - page header
- **footer** - page footer
- **sidebar** - side panel
- **home** - home page
- **addArticle** - article submission form
- **errors** - error messages
- **success** - success messages
- **common** - common elements

### Adding a New Language

1. Create a new file `src/lib/translations/[lang].json`
2. Copy the structure from `pl.json`
3. Translate all values
4. Update the `getTranslation` function if needed

### Using Translations in Components

```typescript
import { getTranslation } from '@/lib/translations'

const title = getTranslation('header.title')
const errorMessage = getTranslationWithParams('errors.contentTooShort', { count: 1000 })
```

## 🎨 Customization

### Styling
The project uses Tailwind CSS. Main classes can be found in:
- `src/app/globals.css` - global styles
- Components have inline styles with Tailwind

### SEO
- Automatic meta tag generation for each page
- Schema.org markup for better search engine visibility
- Open Graph for social media sharing

## 🚢 Deployment

### Deploy to Vercel

1. **Connect to GitHub**
   ```bash
   # Vercel will automatically detect Next.js
   vercel --prod
   ```

2. **Configure environment variables**
   - Add all variables from `.env` in the Vercel dashboard

3. **Configure database**
   - Use PlanetScale, Railway, or another MySQL host
   - Update `DATABASE_URL`

### Deploy to Your Own Server

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Run the server**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the project
2. Create a branch for new features (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **GitHub**: [gmaxsoft](https://github.com/gmaxsoft)

---

⭐ If the project was helpful, give it a star on GitHub!
