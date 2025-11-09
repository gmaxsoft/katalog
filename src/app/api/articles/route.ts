import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { paypalService } from '@/lib/paypal'

// Basic authentication check
function authenticate(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false
  }

  const credentials = authHeader.slice(6) // Remove 'Basic '
  const decoded = Buffer.from(credentials, 'base64').toString()
  const [username, password] = decoded.split(':')

  // Simple authentication - in production, use proper user management
  return username === 'admin' && password === 'admin123'
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const published = searchParams.get('published')

    const where: {
      categoryId?: number
      isPublished?: boolean
    } = {}

    if (categoryId) {
      where.categoryId = parseInt(categoryId)
    }

    if (published === 'true') {
      where.isPublished = true
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      content,
      excerpt,
      seoTitle,
      seoDescription,
      seoKeywords,
      url,
      categoryId,
      paymentMethod
    } = body

    // Validate required fields
    if (!title || !content || !url || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check content length for SEO
    if (content.length < 1000) {
      return NextResponse.json({
        error: 'Article content must be at least 1000 characters for SEO optimization'
      }, { status: 400 })
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 400 })
    }

    // Check if URL already exists
    const existingArticle = await prisma.article.findUnique({
      where: { url }
    })

    if (existingArticle) {
      return NextResponse.json({ error: 'Article with this URL already exists' }, { status: 400 })
    }

    // Handle payment
    if (paymentMethod === 'paypal') {
      const { paypalService } = await import('@/lib/paypal')

      // Create PayPal payment
      const payment = await paypalService.createPayment({
        amount: 50.00,
        currency: 'PLN',
        description: `Dodanie artykułu: ${title}`,
        returnUrl: `${process.env.NEXTAUTH_URL}/api/articles/payment/success`,
        cancelUrl: `${process.env.NEXTAUTH_URL}/dodaj-artykul`
      })

      // Create payment record
      await prisma.payment.create({
        data: {
          userId: 1, // Default admin user - in production, get from session
          amount: 50.00,
          currency: 'PLN',
          paypalOrderId: payment.id,
          status: 'completed'
        }
      })

      // Create article
      const article = await prisma.article.create({
        data: {
          title,
          content,
          excerpt,
          seoTitle,
          seoDescription,
          seoKeywords,
          url,
          categoryId: parseInt(categoryId),
          isPublished: true,
          publishedAt: new Date()
        },
        include: {
          category: true
        }
      })

      return NextResponse.json({
        message: 'Article created successfully',
        article,
        payment: payment
      })
    } else if (paymentMethod === 'tpay') {
      const { tpayService } = await import('@/lib/tpay')

      // Create TPay payment
      const payment = await tpayService.createPayment({
        amount: 50.00,
        currency: 'PLN',
        description: `Dodanie artykułu: ${title}`,
        returnUrl: `${process.env.NEXTAUTH_URL}/api/articles/payment/success`,
        cancelUrl: `${process.env.NEXTAUTH_URL}/dodaj-artykul`
      })

      // Create payment record
      await prisma.payment.create({
        data: {
          userId: 1, // Default admin user - in production, get from session
          amount: 50.00,
          currency: 'PLN',
          paypalOrderId: payment.id, // Using same field for simplicity
          status: 'completed'
        }
      })

      // Create article
      const article = await prisma.article.create({
        data: {
          title,
          content,
          excerpt,
          seoTitle,
          seoDescription,
          seoKeywords,
          url,
          categoryId: parseInt(categoryId),
          isPublished: true,
          publishedAt: new Date()
        },
        include: {
          category: true
        }
      })

      return NextResponse.json({
        message: 'Article created successfully',
        article,
        payment: payment
      })
    }

    return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}