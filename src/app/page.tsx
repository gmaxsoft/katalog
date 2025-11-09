import Layout from '@/components/Layout'
import { prisma } from '@/lib/prisma'
import { getTranslation } from '@/lib/translations'

export default async function HomePage() {
  // Mock data for now - we'll replace with actual data from database
  const mockCategories = [
    {
      id: 1,
      name: 'Lekarze',
      slug: 'lekarze',
      children: [
        { id: 2, name: 'Lekarze Rodzinni', slug: 'lekarze-rodzinni' },
        { id: 3, name: 'Kardiologowie', slug: 'kardiologowie' },
        { id: 4, name: 'Dermatolodzy', slug: 'dermatolodzy' },
      ]
    },
    {
      id: 5,
      name: 'Szpitale',
      slug: 'szpitale',
      children: [
        { id: 6, name: 'Szpitale Publiczne', slug: 'szpitale-publiczne' },
        { id: 7, name: 'Szpitale Prywatne', slug: 'szpitale-prywatne' },
      ]
    },
    {
      id: 8,
      name: 'Apteki',
      slug: 'apteki'
    },
    {
      id: 9,
      name: 'Poradnie',
      slug: 'poradnie'
    }
  ]

  return (
    <Layout categories={mockCategories}>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getTranslation('home.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {getTranslation('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder={getTranslation('home.searchPlaceholder')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              {getTranslation('home.searchButton')}
            </button>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {getTranslation('home.categoriesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.slice(0, 4).map((category) => (
              <div key={category.id} className="p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {getTranslation('home.categoriesSubtitle')}
                </p>
                <a
                  href={`/kategorie/${category.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {getTranslation('home.seeMore')}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">{getTranslation('home.stats.doctors')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">{getTranslation('home.stats.clinics')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">{getTranslation('home.stats.pharmacies')}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
