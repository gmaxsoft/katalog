import { Metadata } from 'next'
import Layout from '@/components/Layout'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

interface Category {
  id: number
  name: string
  slug: string
  description: string
  children?: Category[]
}

// Mock data - replace with database queries later
const mockCategories: Category[] = [
  {
    id: 1,
    name: 'Lekarze',
    slug: 'lekarze',
    description: 'Znajdź najlepszych lekarzy w swojej okolicy',
    children: [
      { id: 2, name: 'Lekarze Rodzinni', slug: 'lekarze-rodzinni', description: 'Pierwsza pomoc medyczna' },
      { id: 3, name: 'Kardiologowie', slug: 'kardiologowie', description: 'Specjaliści chorób serca' },
      { id: 4, name: 'Dermatolodzy', slug: 'dermatolodzy', description: 'Specjaliści chorób skóry' },
    ]
  },
  {
    id: 5,
    name: 'Szpitale',
    slug: 'szpitale',
    description: 'Szpitale i kliniki w Polsce',
    children: [
      { id: 6, name: 'Szpitale Publiczne', slug: 'szpitale-publiczne', description: 'Publiczne placówki medyczne' },
      { id: 7, name: 'Szpitale Prywatne', slug: 'szpitale-prywatne', description: 'Prywatne kliniki i szpitale' },
    ]
  }
]

const mockArticles = [
  {
    id: 1,
    title: 'Najlepszy Lekarz Rodzinny w Warszawie',
    slug: 'najlepszy-lekarz-rodzinny-warszawa',
    excerpt: 'Kompleksowa opieka medyczna dla całej rodziny',
    url: 'https://przykladowy-lekarz.pl',
    seoTitle: 'Lekarz Rodzinny Warszawa - Opieka Medyczna',
    seoDescription: 'Znajdź najlepszego lekarza rodzinnego w Warszawie. Kompleksowa opieka medyczna dla dorosłych i dzieci.',
    publishedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Kardiologia Serca - Klinika Serdeczna',
    slug: 'kardiologia-serca-klinika-serdeczna',
    excerpt: 'Nowoczesne metody leczenia chorób serca',
    url: 'https://klinika-serdeczna.pl',
    seoTitle: 'Kardiologia Warszawa - Leczenie Chorób Serca',
    seoDescription: 'Profesjonalna kardiologia w Warszawie. Diagnostyka i leczenie chorób serca.',
    publishedAt: '2024-01-10'
  }
]

function findCategoryBySlug(slug: string) {
  return mockCategories.find(cat => cat.slug === slug) ||
         mockCategories.flatMap(cat => cat.children || []).find(child => child.slug === slug)
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = findCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Kategoria nie znaleziona',
    }
  }

  return {
    title: `${category.name} - Katalog Stron Medycznych`,
    description: category.description || `Znajdź najlepsze ${category.name.toLowerCase()} w Polsce`,
    keywords: `${category.name}, medycyna, zdrowie, ${category.name.toLowerCase()}`,
    openGraph: {
      title: `${category.name} - Katalog Stron Medycznych`,
      description: category.description || `Znajdź najlepsze ${category.name.toLowerCase()} w Polsce`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = findCategoryBySlug(slug)

  if (!category) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Kategoria nie znaleziona</h1>
          <p className="text-gray-600">Przepraszamy, ale szukana kategoria nie istnieje.</p>
        </div>
      </Layout>
    )
  }

  // Filter articles by category
  const categoryArticles = mockArticles.filter(article =>
    article.slug.includes(category.slug.split('-')[0])
  )

  return (
    <Layout categories={mockCategories}>
      <div className="space-y-8">
        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-600 mb-6">
              {category.description}
            </p>
          )}

          {/* Subcategories */}
          {category.children && category.children.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Podkategorie</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.children.map((subcategory) => (
                  <div key={subcategory.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {subcategory.name}
                    </h3>
                    {subcategory.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {subcategory.description}
                      </p>
                    )}
                    <a
                      href={`/kategorie/${subcategory.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Zobacz więcej →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Articles List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Artykuły w kategorii {category.name}
          </h2>

          {categoryArticles.length === 0 ? (
            <p className="text-gray-600">Brak artykułów w tej kategorii.</p>
          ) : (
            <div className="space-y-6">
              {categoryArticles.map((article) => (
                <article key={article.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <a
                      href={`/artykuly/${article.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p className="text-gray-600 mb-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Opublikowano: {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Odwiedź stronę
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}