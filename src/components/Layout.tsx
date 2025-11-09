import Header from './Header'
import Footer from './Footer'
import CategoryTree from './CategoryTree'

interface Category {
  id: number
  name: string
  slug: string
  children?: Category[]
}

interface LayoutProps {
  children: React.ReactNode
  categories?: Category[]
  showSidebar?: boolean
}

export default function Layout({ children, categories = [], showSidebar = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {showSidebar && (
            <aside className="w-80 flex-shrink-0">
              <CategoryTree categories={categories} />
            </aside>
          )}

          <main className={`flex-1 ${showSidebar ? '' : 'max-w-none'}`}>
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}