import { Metadata } from 'next'
import Layout from '@/components/Layout'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

interface Article {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  url: string
  category: {
    id: number
    name: string
    slug: string
  }
  publishedAt: string
}

// Mock data - replace with database queries later
const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Najlepszy Lekarz Rodzinny w Warszawie - Opieka Medyczna dla Całej Rodziny',
    slug: 'najlepszy-lekarz-rodzinny-warszawa',
    content: `
      <h2>Kompleksowa Opieka Medyczna</h2>
      <p>Nasz lekarz rodzinny w Warszawie oferuje kompleksową opiekę medyczną dla pacjentów w każdym wieku. Specjalizujemy się w profilaktyce zdrowotnej, diagnostyce chorób oraz leczeniu chorób przewlekłych.</p>

      <h3>Usługi Medyczne</h3>
      <ul>
        <li>Konsultacje lekarskie pierwszego kontaktu</li>
        <li>Profilaktyczne badania okresowe</li>
        <li>Szczepienia ochronne</li>
        <li>Leczenie chorób przewlekłych</li>
        <li>Diagnostyka laboratoryjna</li>
      </ul>

      <h3>Dlaczego Warto Wybrać Naszą Poradnię?</h3>
      <p>Dysponujemy nowoczesnym sprzętem medycznym oraz doświadczonym personelem. Dbamy o indywidualne podejście do każdego pacjenta, poświęcając odpowiednią ilość czasu na diagnozę i leczenie.</p>

      <p>Nasza poradnia lekarska w Warszawie jest otwarta od poniedziałku do piątku w godzinach 8:00-18:00. Zapraszamy do rejestracji wizyt telefonicznej lub online.</p>
    `,
    excerpt: 'Kompleksowa opieka medyczna dla całej rodziny w centrum Warszawy. Doświadczony lekarz rodzinny z wieloletnim stażem.',
    seoTitle: 'Lekarz Rodzinny Warszawa - Opieka Medyczna dla Rodziny',
    seoDescription: 'Najlepszy lekarz rodzinny w Warszawie. Kompleksowa opieka medyczna, szczepienia, diagnostyka. Umów wizytę online.',
    seoKeywords: 'lekarz rodzinny, Warszawa, opieka medyczna, szczepienia, diagnostyka',
    url: 'https://przykladowy-lekarz.pl',
    category: {
      id: 2,
      name: 'Lekarze Rodzinni',
      slug: 'lekarze-rodzinni'
    },
    publishedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Kardiologia Serca - Nowoczesna Klinika Kardiologiczna w Warszawie',
    slug: 'kardiologia-serca-klinika-serdeczna',
    content: `
      <h2>Specjalistyczna Opieka Kardiologiczna</h2>
      <p>Nasza klinika kardiologiczna oferuje nowoczesne metody diagnostyki i leczenia chorób serca. Dysponujemy najnowocześniejszym sprzętem medycznym oraz doświadczonym zespołem specjalistów.</p>

      <h3>Zakres Usług</h3>
      <ul>
        <li>EKG spoczynkowe i wysiłkowe</li>
        <li>Echokardiografia</li>
        <li>Holter EKG</li>
        <li>Test wysiłkowy</li>
        <li>Angiografia wieńcowa</li>
        <li>Stenty wieńcowe</li>
      </ul>

      <h3>Dlaczego Wybrać Naszą Klinikę?</h3>
      <p>Jesteśmy liderem w dziedzinie kardiologii interwencyjnej. Nasz zespół składa się z wybitnych specjalistów z wieloletnim doświadczeniem. Stosujemy najnowsze technologie i metody leczenia.</p>

      <p>Posiadamy pełne zaplecze diagnostyczne oraz sale zabiegowe wyposażone w najnowocześniejszy sprzęt. Dbamy o bezpieczeństwo i komfort naszych pacjentów.</p>
    `,
    excerpt: 'Nowoczesna klinika kardiologiczna w Warszawie. Diagnostyka i leczenie chorób serca z wykorzystaniem najnowszych technologii.',
    seoTitle: 'Kardiologia Warszawa - Leczenie Chorób Serca',
    seoDescription: 'Profesjonalna kardiologia w Warszawie. Echokardiografia, EKG, angiografia. Doświadczeni kardiolodzy.',
    seoKeywords: 'kardiologia, choroby serca, Warszawa, echokardiografia, EKG',
    url: 'https://klinika-serdeczna.pl',
    category: {
      id: 3,
      name: 'Kardiologowie',
      slug: 'kardiologowie'
    },
    publishedAt: '2024-01-10'
  }
]

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
  }
]

function findArticleBySlug(slug: string): Article | undefined {
  return mockArticles.find(article => article.slug === slug)
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = findArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Artykuł nie znaleziony',
    }
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    keywords: article.seoKeywords,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = findArticleBySlug(slug)

  if (!article) {
    return (
      <Layout categories={mockCategories}>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Artykuł nie znaleziony</h1>
          <p className="text-gray-600">Przepraszamy, ale szukany artykuł nie istnieje.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout categories={mockCategories}>
      <div className="space-y-8">
        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <a
              href={`/kategorie/${article.category.slug}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {article.category.name}
            </a>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between border-t pt-6">
            <div className="text-sm text-gray-500">
              Opublikowano: {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Odwiedź stronę
            </a>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Podobne Artykuły
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockArticles
              .filter(a => a.id !== article.id && a.category.id === article.category.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <div key={relatedArticle.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    <a
                      href={`/artykuly/${relatedArticle.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {relatedArticle.title}
                    </a>
                  </h4>

                  <p className="text-gray-600 text-sm mb-4">
                    {relatedArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(relatedArticle.publishedAt).toLocaleDateString('pl-PL')}
                    </span>
                    <a
                      href={relatedArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Zobacz →
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}