# Katalog Stron Medycznych

[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748)](https://prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)](https://mysql.com/)

Największy katalog stron medycznych w Polsce. Znajdź zaufane źródła informacji zdrowotnej, kliniki, lekarzy i specjalistów.

## ✨ Funkcjonalności

- 🏥 **Katalog medyczny** - zorganizowane kategorie usług medycznych
- 📝 **Artykuły SEO** - wysokiej jakości treści zoptymalizowane pod wyszukiwarki
- 💳 **Płatne dodawanie** - bezpieczna płatność PayPal i TPay za dodanie artykułów
- 🌐 **Wielojęzyczność** - system tłumaczeń z centralnym plikiem językowym
- 🔐 **API CRUD** - REST API z uwierzytelnianiem dla zarządzania treścią
- 📱 **Responsive Design** - optymalne wyświetlanie na wszystkich urządzeniach
- 🔍 **SEO Optimized** - meta tagi, Schema.org, Open Graph
- 🌳 **Drzewo kategorii** - intuicyjna nawigacja po specjalizacjach

## 🚀 Szybki start

### Wymagania wstępne

- Node.js 18+
- MySQL 8.0+
- npm lub yarn

### Instalacja

1. **Sklonuj repozytorium**
   ```bash
   git clone https://github.com/your-username/katalog-stron-medycznych.git
   cd katalog-stron-medycznych
   ```

2. **Zainstaluj zależności**
   ```bash
   npm install
   ```

3. **Skonfiguruj bazę danych**
   - Upewnij się, że MySQL jest uruchomiony
   - Utwórz bazę danych: `med_catalog`
   - Zaktualizuj zmienne środowiskowe w pliku `.env`

4. **Skonfiguruj Prisma**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Uruchom serwer deweloperski**
   ```bash
   npm run dev
   ```

6. **Otwórz aplikację**
   - Przejdź do [http://localhost:3000](http://localhost:3000)

## 🛠️ Konfiguracja

### Zmienne środowiskowe (.env)

```env
# Baza danych
DATABASE_URL="mysql://root:@localhost:3306/med_catalog"

# NextAuth (dla uwierzytelniania)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# PayPal (produkcyjnie należy użyć prawdziwych danych)
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
PAYPAL_ENVIRONMENT="sandbox"
```

### Uwierzytelnianie API

API używa podstawowego uwierzytelniania HTTP:
- **Użytkownik**: `admin`
- **Hasło**: `admin123`

Przykład użycia:
```bash
curl -u admin:admin123 http://localhost:3000/api/articles
```

## 📁 Struktura projektu

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── articles/      # Zarządzanie artykułami
│   │   └── categories/    # Zarządzanie kategoriami
│   ├── artykuly/          # Strony pojedynczych artykułów
│   ├── kategorie/         # Strony kategorii
│   ├── dodaj-artykul/     # Formularz dodawania artykułu
│   ├── layout.tsx         # Główny layout aplikacji
│   └── page.tsx           # Strona główna
├── components/            # Komponenty React
│   ├── Header.tsx         # Nagłówek strony
│   ├── Footer.tsx         # Stopka strony
│   ├── Layout.tsx         # Główny layout wrapper
│   └── CategoryTree.tsx   # Drzewo kategorii
└── lib/                   # Biblioteki pomocnicze
    ├── prisma.ts          # Klient Prisma
    ├── paypal.ts          # Integracja PayPal
    ├── tpay.ts            # Integracja TPay
    └── translations/      # System tłumaczeń
        ├── index.ts       # Funkcje pomocnicze tłumaczeń
        └── pl.json        # Plik tłumaczeń polski
```

## 🔧 Dostępne skrypty

```bash
# Uruchomienie serwera deweloperskiego
npm run dev

# Budowanie aplikacji produkcyjnej
npm run build

# Uruchomienie aplikacji produkcyjnej
npm start

# Uruchomienie testów (jeśli dodane)
npm test

# Formatowanie kodu
npm run lint
```

## 📊 Baza danych

### Schemat

- **users** - użytkownicy systemu
- **categories** - kategorie usług medycznych (hierarchiczne)
- **articles** - artykuły z treścią SEO
- **payments** - historia płatności PayPal

### Migracje

```bash
# Generowanie migracji
npx prisma migrate dev

# Aktualizacja schematu bazy danych
npx prisma db push

# Generowanie klienta Prisma
npx prisma generate
```

## 🌐 API Endpoints

### Artykuły
- `GET /api/articles` - lista artykułów
- `POST /api/articles` - dodanie nowego artykułu

### Kategorie
- `GET /api/categories` - lista kategorii
- `POST /api/categories` - dodanie nowej kategorii

### Parametry zapytania
- `?categoryId=1` - filtrowanie po kategorii
- `?published=true` - tylko opublikowane artykuły

## 💰 Płatności

Projekt obsługuje dwie metody płatności: PayPal (międzynarodowe) oraz TPay (polskie płatności).

**Koszt dodania artykułu**: 50.00 PLN

### PayPal

1. Załóż konto na [PayPal Developer](https://developer.paypal.com/)
2. Utwórz aplikację i uzyskaj Client ID oraz Secret
3. Zaktualizuj zmienne środowiskowe
4. Dla testów użyj środowiska `sandbox`

### TPay (Polskie płatności)

TPay to popularna polska bramka płatności obsługująca BLIK, przelewy bankowe, karty płatnicze i inne metody.

#### Konfiguracja TPay

1. Załóż konto na [TPay](https://tpay.com/)
2. Uzyskaj API Key, API Password oraz Merchant ID
3. Zaktualizuj zmienne środowiskowe:
   ```env
   TPAY_API_KEY="your-tpay-api-key"
   TPAY_API_PASSWORD="your-tpay-api-password"
   TPAY_MERCHANT_ID="your-tpay-merchant-id"
   TPAY_ENVIRONMENT="sandbox"
   ```

#### Obsługiwane metody płatności (TPay)
- BLIK
- Przelew bankowy
- Karta płatnicza
- Google Pay / Apple Pay
- PayPo (kup teraz, zapłać później)

## 🌐 Internacjonalizacja (i18n)

Projekt zawiera system tłumaczeń umożliwiający łatwą zmianę języka aplikacji.

### Struktura tłumaczeń

Wszystkie teksty są przechowywane w pliku `src/lib/translations/pl.json`. Struktura obejmuje:

- **nav** - elementy nawigacji
- **header** - nagłówek strony
- **footer** - stopka strony
- **sidebar** - panel boczny
- **home** - strona główna
- **addArticle** - formularz dodawania artykułu
- **errors** - komunikaty błędów
- **success** - komunikaty sukcesu
- **common** - wspólne elementy

### Dodanie nowego języka

1. Utwórz nowy plik `src/lib/translations/[lang].json`
2. Skopiuj strukturę z `pl.json`
3. Przetłumacz wszystkie wartości
4. Zaktualizuj funkcję `getTranslation` w razie potrzeby

### Użycie tłumaczeń w komponentach

```typescript
import { getTranslation } from '@/lib/translations'

const title = getTranslation('header.title')
const errorMessage = getTranslationWithParams('errors.contentTooShort', { count: 1000 })
```

## 🎨 Personalizacja

### Stylizacja
Projekt używa Tailwind CSS. Główne klasy można znaleźć w:
- `src/app/globals.css` - style globalne
- Komponenty mają style inline z Tailwind

### SEO
- Automatyczne generowanie meta tagów dla każdej strony
- Schema.org markup dla lepszej widoczności w wyszukiwarkach
- Open Graph dla udostępniania w mediach społecznościowych

## 🚢 Wdrożenie

### Wdrożenie na Vercel

1. **Połącz z GitHub**
   ```bash
   # Vercel automatycznie wykryje Next.js
   vercel --prod
   ```

2. **Skonfiguruj zmienne środowiskowe**
   - Dodaj wszystkie zmienne z `.env` w panelu Vercel

3. **Skonfiguruj bazę danych**
   - Użyj PlanetScale, Railway lub innego hosta MySQL
   - Zaktualizuj `DATABASE_URL`

### Wdrożenie na własnym serwerze

1. **Zbuduj aplikację**
   ```bash
   npm run build
   ```

2. **Uruchom serwer**
   ```bash
   npm start
   ```

## 🤝 Przyczynianie się

1. Forkuj projekt
2. Utwórz branch dla nowych funkcjonalności (`git checkout -b feature/nowa-funkcja`)
3. Zatwierdź zmiany (`git commit -am 'Dodaj nową funkcję'`)
4. Wypchnij branch (`git push origin feature/nowa-funkcja`)
5. Utwórz Pull Request

## 📄 Licencja

Ten projekt jest objęty licencją MIT - zobacz plik [LICENSE](LICENSE) dla szczegółów.

## 📞 Kontakt

- **Email**: kontakt@katalogmedyczny.pl
- **GitHub**: [your-username](https://github.com/your-username)

---

⭐ Jeśli projekt okazał się przydatny, daj mu gwiazdkę na GitHub!
