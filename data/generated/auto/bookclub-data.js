const bookClubEntries = [
  {
    "book": "Venedik'te Ölüm",
    "englishTitle": "Death in Venice",
    "authors": [
      "Thomas Mann"
    ],
    "date": "October 2023",
    "sortKey": "2023-10-01",
    "moderator": "Berfin",
    "nobel": "Nobel",
    "rating": "",
    "participants": "",
    "photoUrl": null,
    "slug": "venedik-te-olum"
  },
  {
    "book": "İklimler",
    "englishTitle": "Climates",
    "authors": [
      "André Maurois"
    ],
    "date": "November 2023",
    "sortKey": "2023-11-01",
    "moderator": "Zeyneb",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/İklimler.jpeg",
    "slug": "iklimler"
  },
  {
    "book": "Büyük Defter - Kanıt - Üçüncü Yalan",
    "englishTitle": "The Notebook / The Proof / The Third Lie",
    "authors": [
      "Agota Kristof"
    ],
    "date": "January 2024",
    "sortKey": "2024-01-01",
    "moderator": "Erva",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Büyük Defter - Kanıt - Üçüncü Yalan.jpeg",
    "slug": "buyuk-defter-kanit-ucuncu-yalan"
  },
  {
    "book": "Yalın Tutku",
    "englishTitle": "Simple Passion",
    "authors": [
      "Annie Ernaux"
    ],
    "date": "January 2024",
    "sortKey": "2024-01-01",
    "moderator": "Seda",
    "nobel": "Nobel",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Yalın Tutku.jpeg",
    "slug": "yalin-tutku"
  },
  {
    "book": "Onca Yoksulluk Varken",
    "englishTitle": "The Life Before Us",
    "authors": [
      "Romain Gary (Émile Ajar)"
    ],
    "date": "February 2024",
    "sortKey": "2024-02-01",
    "moderator": "Zeyneb",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Onca Yoksulluk Varken.jpeg",
    "slug": "onca-yoksulluk-varken"
  },
  {
    "book": "Hamlet",
    "englishTitle": "Hamlet",
    "authors": [
      "William Shakespeare"
    ],
    "date": "March 2024",
    "sortKey": "2024-03-01",
    "moderator": "Berfin",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Hamlet.jpeg",
    "slug": "hamlet"
  },
  {
    "book": "On Buçuk Bölümde Dünya Tarihi",
    "englishTitle": "A History of the World in 10½ Chapters",
    "authors": [
      "Julian Barnes"
    ],
    "date": "April 2024",
    "sortKey": "2024-04-01",
    "moderator": "Seda",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/On Buçuk Bölümde Dünya Tarihi.jpeg",
    "slug": "on-bucuk-bolumde-dunya-tarihi"
  },
  {
    "book": "Masumiyet Müzesi",
    "englishTitle": "The Museum of Innocence",
    "authors": [
      "Orhan Pamuk"
    ],
    "date": "May 2024",
    "sortKey": "2024-05-01",
    "moderator": "Erva",
    "nobel": "Nobel",
    "rating": "7.5",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Masumiyet Müzesi.jpeg",
    "slug": "masumiyet-muzesi"
  },
  {
    "book": "Kambur",
    "englishTitle": "Kambur",
    "authors": [
      "Şule Gürbüz"
    ],
    "date": "June 2024",
    "sortKey": "2024-06-01",
    "moderator": "Zeynep",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Kambur.jpeg",
    "slug": "kambur"
  },
  {
    "book": "Utanç",
    "englishTitle": "Disgrace",
    "authors": [
      "J.M. Coetzee"
    ],
    "date": "June 2024",
    "sortKey": "2024-06-01",
    "moderator": "Zeyneb",
    "nobel": "Nobel",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Utanç (Disgrace)-Coetzee.jpeg",
    "slug": "utanc"
  },
  {
    "book": "Unutmanın Genel Teorisi",
    "englishTitle": "A General Theory of Oblivion",
    "authors": [
      "José Eduardo Agualusa"
    ],
    "date": "July 2024",
    "sortKey": "2024-07-01",
    "moderator": "Seda",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Unutmanın Genel Teorisi.jpeg",
    "slug": "unutmanin-genel-teorisi"
  },
  {
    "book": "Drina Köprüsü",
    "englishTitle": "The Bridge on the Drina",
    "authors": [
      "Ivo Andrić"
    ],
    "date": "September 2024",
    "sortKey": "2024-09-01",
    "moderator": "Berfin",
    "nobel": "Nobel",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Drina Köprüsü.jpeg",
    "slug": "drina-koprusu"
  },
  {
    "book": "Naif, Süper",
    "englishTitle": "Naïve. Super.",
    "authors": [
      "Erlend Loe"
    ],
    "date": "October 2024",
    "sortKey": "2024-10-01",
    "moderator": "Zeynep",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Naif, Süper.jpeg",
    "slug": "naif-super"
  },
  {
    "book": "Huzur",
    "englishTitle": "A Mind at Peace",
    "authors": [
      "Ahmet Hamdi Tanpınar"
    ],
    "date": "January 2025",
    "sortKey": "2025-01-01",
    "moderator": "Berfin",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Huzur.jpeg",
    "slug": "huzur"
  },
  {
    "book": "Dünün Dünyası",
    "englishTitle": "The World of Yesterday: Memoirs of a European",
    "authors": [
      "Stefan Zweig"
    ],
    "date": "June 2025",
    "sortKey": "2025-06-01",
    "moderator": "",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Dünün Dünyası.jpeg",
    "slug": "dunun-dunyasi"
  },
  {
    "book": "Usta ile Margarita",
    "englishTitle": "The Master and Margarita",
    "authors": [
      "Mikhail Bulgakov"
    ],
    "date": "September 2025",
    "sortKey": "2025-09-01",
    "moderator": "",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": null,
    "slug": "usta-ile-margarita"
  },
  {
    "book": "Aşk Dersleri",
    "englishTitle": "Essays in Love",
    "authors": [
      "Alain de Botton"
    ],
    "date": "November 2025",
    "sortKey": "2025-11-01",
    "moderator": "",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Aşk Dersleri.jpeg",
    "slug": "ask-dersleri"
  },
  {
    "book": "Bir Psikiyatristin Anıları",
    "englishTitle": "Becoming Myself: A Psychiatrist's Memoir",
    "authors": [
      "Irvin D. Yalom"
    ],
    "date": "December 2025",
    "sortKey": "2025-12-01",
    "moderator": "Zeynep",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Becoming Myself.jpeg",
    "slug": "bir-psikiyatristin-anilari"
  },
  {
    "book": "Kapı",
    "englishTitle": "The Door",
    "authors": [
      "Magda Szabó"
    ],
    "date": "February 2026",
    "sortKey": "2026-02-01",
    "moderator": "",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Kapı.jpeg",
    "slug": "kapi"
  },
  {
    "book": "Lolita",
    "englishTitle": "Lolita",
    "authors": [
      "Vladimir Nabokov"
    ],
    "date": "March 2026",
    "sortKey": "2026-03-01",
    "moderator": "Zeyneb",
    "nobel": "",
    "rating": "",
    "participants": "Zeyneb, Erva, Seda, Berfin, Z Peker, Rana",
    "photoUrl": "assets/images/bookclub/Lolita.jpeg",
    "slug": "lolita"
  },
  {
    "book": "Okuma Alışkanlıkları",
    "englishTitle": "Reading Habits",
    "authors": [],
    "date": "September 2024",
    "sortKey": "2024-09-01",
    "moderator": "Erva",
    "nobel": "",
    "rating": "",
    "participants": "",
    "photoUrl": "assets/images/bookclub/Eylül 2024.jpeg",
    "slug": "reading-habits",
    "isReadingHabits": true,
    "relatedBooksTr": [
      "Ben Burdan Okuyorum",
      "Roman Gibi",
      "Okumamak",
      "Eğer Bir Kış Gecesi Bir Yolcu"
    ],
    "relatedBooksEn": [
      "Where I'm Reading From",
      "Like a Novel",
      "—",
      "If on a Winter's Night a Traveler"
    ]
  }
];
