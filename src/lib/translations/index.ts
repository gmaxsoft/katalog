import plTranslations from './pl.json'

export type TranslationKey = keyof typeof plTranslations

export function getTranslation(key: string): string {
  const keys = key.split('.')
  let value: unknown = plTranslations

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return key // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key
}

export function getTranslationWithParams(key: string, params: Record<string, string | number>): string {
  let translation = getTranslation(key)

  // Replace placeholders like {count}, {method}, etc.
  Object.entries(params).forEach(([paramKey, paramValue]) => {
    translation = translation.replace(`{${paramKey}}`, String(paramValue))
  })

  return translation
}

export default plTranslations