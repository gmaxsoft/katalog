import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
    const parentId = searchParams.get('parentId')

    const where: {
      parentId?: number | null
    } = {}

    if (parentId) {
      where.parentId = parentId === 'null' ? null : parseInt(parentId)
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        children: true,
        _count: {
          select: {
            articles: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, slug, description, parentId } = body

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 })
    }

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    })

    if (existingCategory) {
      return NextResponse.json({ error: 'Category with this slug already exists' }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        parentId: parentId ? parseInt(parentId) : null
      },
      include: {
        children: true,
        _count: {
          select: {
            articles: true
          }
        }
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}