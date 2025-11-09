import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Rozpoczynam wypełnianie bazy danych...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: '$2b$10$dqGzJYq6p8yQK8nKj8n4LeXKJ4QK8nKj8n4LeXKJ4QK8nKj8n4Le', // hashed 'admin123'
      role: 'admin'
    }
  })
  console.log('✅ Utworzono użytkownika admin:', adminUser.username)

  // Create categories
  const lekarzeCategory = await prisma.category.upsert({
    where: { slug: 'lekarze' },
    update: {},
    create: {
      name: 'Lekarze',
      slug: 'lekarze',
      description: 'Znajdź najlepszych lekarzy w swojej okolicy'
    }
  })

  const lekarzeRodzinniCategory = await prisma.category.upsert({
    where: { slug: 'lekarze-rodzinni' },
    update: {},
    create: {
      name: 'Lekarze Rodzinni',
      slug: 'lekarze-rodzinni',
      description: 'Pierwsza pomoc medyczna',
      parentId: lekarzeCategory.id
    }
  })

  const kardiolodzyCategory = await prisma.category.upsert({
    where: { slug: 'kardiologowie' },
    update: {},
    create: {
      name: 'Kardiolodzy',
      slug: 'kardiologowie',
      description: 'Specjaliści chorób serca',
      parentId: lekarzeCategory.id
    }
  })

  const dermatolodzyCategory = await prisma.category.upsert({
    where: { slug: 'dermatolodzy' },
    update: {},
    create: {
      name: 'Dermatolodzy',
      slug: 'dermatolodzy',
      description: 'Specjaliści chorób skóry',
      parentId: lekarzeCategory.id
    }
  })

  const szpitaleCategory = await prisma.category.upsert({
    where: { slug: 'szpitale' },
    update: {},
    create: {
      name: 'Szpitale',
      slug: 'szpitale',
      description: 'Szpitale i kliniki w Polsce'
    }
  })

  const szpitalePubliczneCategory = await prisma.category.upsert({
    where: { slug: 'szpitale-publiczne' },
    update: {},
    create: {
      name: 'Szpitale Publiczne',
      slug: 'szpitale-publiczne',
      description: 'Publiczne placówki medyczne',
      parentId: szpitaleCategory.id
    }
  })

  const szpitalePrywatneCategory = await prisma.category.upsert({
    where: { slug: 'szpitale-prywatne' },
    update: {},
    create: {
      name: 'Szpitale Prywatne',
      slug: 'szpitale-prywatne',
      description: 'Prywatne kliniki i szpitale',
      parentId: szpitaleCategory.id
    }
  })

  const aptekiCategory = await prisma.category.upsert({
    where: { slug: 'apteki' },
    update: {},
    create: {
      name: 'Apteki',
      slug: 'apteki',
      description: 'Apteki i punkty farmaceutyczne'
    }
  })

  const poradnieCategory = await prisma.category.upsert({
    where: { slug: 'poradnie' },
    update: {},
    create: {
      name: 'Poradnie',
      slug: 'poradnie',
      description: 'Specjalistyczne poradnie medyczne'
    }
  })

  console.log('✅ Utworzono kategorie')

  // Create articles
  const article1 = await prisma.article.upsert({
    where: { slug: 'najlepszy-lekarz-rodzinny-warszawa' },
    update: {},
    create: {
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

        <h3>Kontakt i Rejestracja</h3>
        <p>Aby umówić wizytę, prosimy o kontakt telefoniczny pod numerem +48 123 456 789 lub skorzystanie z formularza rejestracji online dostępnego na naszej stronie internetowej.</p>

        <p>Doświadczony lekarz rodzinny, nowoczesne wyposażenie medyczne, indywidualne podejście do pacjenta - to wszystko czeka na Ciebie w naszej przychodni.</p>
      `,
      excerpt: 'Kompleksowa opieka medyczna dla całej rodziny w centrum Warszawy. Doświadczony lekarz rodzinny z wieloletnim stażem.',
      seoTitle: 'Lekarz Rodzinny Warszawa - Opieka Medyczna dla Rodziny',
      seoDescription: 'Najlepszy lekarz rodzinny w Warszawie. Kompleksowa opieka medyczna, szczepienia, diagnostyka. Umów wizytę online.',
      seoKeywords: 'lekarz rodzinny, Warszawa, opieka medyczna, szczepienia, diagnostyka',
      url: 'https://przykladowy-lekarz.pl',
      categoryId: lekarzeRodzinniCategory.id,
      isPublished: true,
      publishedAt: new Date('2024-01-15')
    }
  })

  const article2 = await prisma.article.upsert({
    where: { slug: 'kardiologia-serca-klinika-serdeczna' },
    update: {},
    create: {
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

        <h3>Innowacyjne Metody Leczenia</h3>
        <p>Wykorzystujemy najnowsze osiągnięcia medycyny w leczeniu chorób serca. Nasze procedury minimalnie inwazyjne zapewniają szybki powrót do zdrowia oraz minimalizują ryzyko powikłań.</p>

        <p>Specjalizujemy się w kompleksowej opiece nad pacjentami kardiologicznymi, od diagnostyki po rehabilitację kardiologiczną.</p>
      `,
      excerpt: 'Nowoczesna klinika kardiologiczna w Warszawie. Diagnostyka i leczenie chorób serca z wykorzystaniem najnowszych technologii.',
      seoTitle: 'Kardiologia Warszawa - Leczenie Chorób Serca',
      seoDescription: 'Profesjonalna kardiologia w Warszawie. Echokardiografia, EKG, angiografia. Doświadczeni kardiolodzy.',
      seoKeywords: 'kardiologia, choroby serca, Warszawa, echokardiografia, EKG',
      url: 'https://klinika-serdeczna.pl',
      categoryId: kardiolodzyCategory.id,
      isPublished: true,
      publishedAt: new Date('2024-01-10')
    }
  })

  const article3 = await prisma.article.upsert({
    where: { slug: 'najlepsza-apteka-warszawa' },
    update: {},
    create: {
      title: 'Najlepsza Apteka w Warszawie - Profesjonalne Usługi Farmaceutyczne',
      slug: 'najlepsza-apteka-warszawa',
      content: `
        <h2>Profesjonalne Usługi Farmaceutyczne</h2>
        <p>Nasza apteka w centrum Warszawy oferuje szeroki zakres usług farmaceutycznych oraz kosmetycznych. Dysponujemy doświadczonym personelem oraz nowoczesnym wyposażeniem.</p>

        <h3>Oferta Apteki</h3>
        <ul>
          <li>Leki na receptę i bez recepty</li>
          <li>Środki przeciwbólowe i przeciwgorączkowe</li>
          <li>Preparaty witaminowe i suplementy diety</li>
          <li>Kosmetyki farmaceutyczne</li>
          <li>Pomoc w doborze leków</li>
          <li>Porady farmaceutyczne</li>
        </ul>

        <h3>Dlaczego Wybrać Naszą Aptekę?</h3>
        <p>Oferujemy konkurencyjne ceny oraz szeroki wybór produktów. Nasz zespół farmaceutów służy pomocą w doborze odpowiednich preparatów oraz udziela porad dotyczących zdrowia i pielęgnacji.</p>

        <p>Posiadamy nowoczesny system zarządzania zapasami, co gwarantuje dostępność wszystkich potrzebnych leków i produktów.</p>

        <h3>Usługi Dodatkowe</h3>
        <p>Oprócz sprzedaży leków oferujemy również usługi takie jak mierzenie ciśnienia krwi, poziomu cukru oraz temperatury ciała. Prowadzimy również edukację zdrowotną dla naszych klientów.</p>

        <p>Zapraszamy do odwiedzenia naszej apteki przy Alejach Jerozolimskich w Warszawie. Jesteśmy otwarci od poniedziałku do soboty w godzinach 8:00-20:00.</p>
      `,
      excerpt: 'Profesjonalna apteka w centrum Warszawy. Szeroki wybór leków, kosmetyków i suplementów diety. Doświadczony personel.',
      seoTitle: 'Apteka Warszawa Centrum - Leki, Kosmetyki, Suplementy',
      seoDescription: 'Najlepsza apteka w Warszawie centrum. Leki na receptę i bez, kosmetyki, suplementy diety. Profesjonalne porady.',
      seoKeywords: 'apteka, Warszawa, leki, kosmetyki, suplementy diety, farmaceuta',
      url: 'https://apteka-warszawa.pl',
      categoryId: aptekiCategory.id,
      isPublished: true,
      publishedAt: new Date('2024-01-12')
    }
  })

  console.log('✅ Utworzono artykuły')

  console.log('🎉 Baza danych została wypełniona przykładowymi danymi!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })