import Link from 'next/link'
import { getTranslation } from '@/lib/translations'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{getTranslation('footer.title')}</h3>
            <p className="text-gray-300">
              {getTranslation('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{getTranslation('footer.sections.navigation')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  {getTranslation('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/kategorie" className="text-gray-300 hover:text-white transition-colors">
                  {getTranslation('nav.categories')}
                </Link>
              </li>
              <li>
                <Link href="/dodaj-artykul" className="text-gray-300 hover:text-white transition-colors">
                  {getTranslation('nav.addArticle')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{getTranslation('footer.sections.admin')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
                  {getTranslation('nav.admin')}
                </Link>
              </li>
              <li>
                <Link href="/admin/kategorie" className="text-gray-300 hover:text-white transition-colors">
                  {getTranslation('nav.adminCategories')}
                </Link>
              </li>
              <li>
                <Link href="/admin/artykuly" className="text-gray-300 hover:text-white transition-colors">
                  {getTranslation('nav.adminArticles')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{getTranslation('footer.sections.contact')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: {getTranslation('footer.contact.email')}</li>
              <li>Telefon: {getTranslation('footer.contact.phone')}</li>
              <li>Adres: {getTranslation('footer.contact.address')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>{getTranslation('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}