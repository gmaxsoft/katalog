'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'

interface FormData {
  title: string
  content: string
  excerpt: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  url: string
  categoryId: string
}

const mockCategories = [
  { id: '2', name: 'Lekarze Rodzinni' },
  { id: '3', name: 'Kardiologowie' },
  { id: '4', name: 'Dermatolodzy' },
  { id: '6', name: 'Szpitale Publiczne' },
  { id: '7', name: 'Szpitale Prywatne' },
  { id: '8', name: 'Apteki' },
  { id: '9', name: 'Poradnie' },
]

export default function AddArticlePage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    excerpt: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    url: '',
    categoryId: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentStep, setPaymentStep] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validation
    if (!formData.title || !formData.content || !formData.url || !formData.categoryId) {
      alert('Proszę wypełnić wszystkie wymagane pola.')
      setIsSubmitting(false)
      return
    }

    // Check content length for SEO (minimum 1000 characters)
    if (formData.content.length < 1000) {
      alert('Treść artykułu musi mieć co najmniej 1000 znaków dla optymalizacji SEO.')
      setIsSubmitting(false)
      return
    }

    // Move to payment step
    setPaymentStep(true)
    setIsSubmitting(false)
  }

  const handlePayment = async (paymentMethod: 'paypal' | 'tpay' = 'paypal') => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          paymentMethod,
          amount: 50.00 // Price for adding an article
        })
      })

      if (response.ok) {
        alert(`Artykuł został dodany pomyślnie! Płatność zrealizowana przez ${paymentMethod.toUpperCase()}.`)
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          seoTitle: '',
          seoDescription: '',
          seoKeywords: '',
          url: '',
          categoryId: ''
        })
        setPaymentStep(false)
      } else {
        alert('Wystąpił błąd podczas dodawania artykułu.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Wystąpił błąd podczas przetwarzania płatności.')
    }

    setIsSubmitting(false)
  }

  const mockCategoriesForLayout = [
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
    { id: 8, name: 'Apteki', slug: 'apteki' },
    { id: 9, name: 'Poradnie', slug: 'poradnie' }
  ]

  if (paymentStep) {
    return (
      <Layout categories={mockCategoriesForLayout}>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Płatność za Dodanie Artykułu</h1>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Podsumowanie</h3>
              <p className="text-blue-800 mb-4">{formData.title}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-800">Koszt dodania artykułu:</span>
                <span className="text-2xl font-bold text-blue-900">50.00 PLN</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Wybierz metodę płatności. Po dokonaniu płatności artykuł zostanie automatycznie dodany do katalogu.
              </p>

              <div className="space-y-4 max-w-md mx-auto">
                <button
                  onClick={() => handlePayment('paypal')}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.622 1.612 1.035.995 1.484 2.496 1.184 4.035-.04.262-.163.514-.36.735a.642.642 0 0 1-.576.362h1.725c.602 0 1.073.53 1.022 1.13-.286 3.414-2.688 5.956-6.308 5.956h-1.582c-.486 0-.877.377-.917.86l-1.35 14.49a.641.641 0 0 1-.633.578z"/>
                  </svg>
                  {isSubmitting ? 'Przetwarzanie...' : 'Zapłać z PayPal (50.00 PLN)'}
                </button>

                <button
                  onClick={() => handlePayment('tpay')}
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  {isSubmitting ? 'Przetwarzanie...' : 'Zapłać z TPay (50.00 PLN)'}
                </button>
              </div>

              <button
                onClick={() => setPaymentStep(false)}
                className="block mx-auto mt-6 text-gray-600 hover:text-gray-800 underline"
              >
                Wróć do formularza
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout categories={mockCategoriesForLayout}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dodaj Artykuł do Katalogu</h1>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  <strong>Ważne:</strong> Dodanie artykułu do katalogu kosztuje 50.00 PLN.
                  Płatność zostanie pobrana po wypełnieniu formularza.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informacje Podstawowe</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Tytuł Artykułu *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Np. Najlepszy Lekarz Rodzinny w Warszawie"
                  />
                </div>

                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                    Kategoria *
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Wybierz kategorię</option>
                    {mockCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Krótki Opis (Excerpt)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Krótki opis artykułu wyświetlany w wynikach wyszukiwania"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  URL Strony *
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://przykladowa-strona.pl"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Treść Artykułu</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Wymagania SEO:</strong> Treść artykułu musi mieć co najmniej 1000 znaków
                  (obecnie: {formData.content.length} znaków) aby zapewnić dobrą widoczność w wyszukiwarkach.
                </p>
              </div>

              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Pełna Treść Artykułu *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Wpisz szczegółową treść artykułu. Pamiętaj o optymalizacji SEO - używaj słów kluczowych, nagłówków H2, H3, list itp."
              />
            </div>

            {/* SEO Settings */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ustawienia SEO</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Tytuł SEO
                  </label>
                  <input
                    type="text"
                    id="seoTitle"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tytuł wyświetlany w wynikach wyszukiwania"
                  />
                </div>

                <div>
                  <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Opis SEO
                  </label>
                  <input
                    type="text"
                    id="seoDescription"
                    name="seoDescription"
                    onChange={handleInputChange}
                    value={formData.seoDescription}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Opis wyświetlany w wynikach wyszukiwania"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="seoKeywords" className="block text-sm font-medium text-gray-700 mb-2">
                  Słowa Kluczowe SEO
                </label>
                <input
                  type="text"
                  id="seoKeywords"
                  name="seoKeywords"
                  value={formData.seoKeywords}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="słowo1, słowo2, słowo3"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Przetwarzanie...' : 'Przejdź do Płatności (50.00 PLN)'}
              </button>

              <p className="text-sm text-gray-600 text-center mt-4">
                Po kliknięciu przycisku zostaniesz przekierowany do płatności PayPal.
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}