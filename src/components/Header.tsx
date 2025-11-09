import Link from 'next/link'
import { getTranslation } from '@/lib/translations'

export default function Header() {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              {getTranslation('header.title')}
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              {getTranslation('nav.home')}
            </Link>
            <Link href="/kategorie" className="text-gray-700 hover:text-blue-600 transition-colors">
              {getTranslation('nav.categories')}
            </Link>
            <Link href="/dodaj-artykul" className="text-gray-700 hover:text-blue-600 transition-colors">
              {getTranslation('nav.addArticle')}
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
              {getTranslation('nav.admin')}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}