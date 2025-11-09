'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getTranslation } from '@/lib/translations'

interface Category {
  id: number
  name: string
  slug: string
  children?: Category[]
}

interface CategoryTreeProps {
  categories: Category[]
}

export default function CategoryTree({ categories }: CategoryTreeProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set())

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const renderCategory = (category: Category, level = 0) => {
    const hasChildren = category.children && category.children.length > 0
    const isExpanded = expandedCategories.has(category.id)

    return (
      <div key={category.id}>
        <div
          className={`flex items-center py-2 px-4 hover:bg-gray-50 cursor-pointer ${
            level > 0 ? 'ml-4' : ''
          }`}
          onClick={() => hasChildren && toggleCategory(category.id)}
        >
          {hasChildren && (
            <button className="mr-2 text-gray-500">
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          {!hasChildren && <span className="mr-2 w-4"></span>}

          <Link
            href={`/kategorie/${category.slug}`}
            className="text-gray-700 hover:text-blue-600 transition-colors flex-1"
            onClick={(e) => hasChildren && e.stopPropagation()}
          >
            {category.name}
          </Link>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {category.children!.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">{getTranslation('sidebar.categories')}</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {categories.map(category => renderCategory(category))}
      </div>
    </div>
  )
}