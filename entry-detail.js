const translations = {
  en: {
    navAria: "Main navigation",
    navAbout: "About",
    navWork: "Work",
    navResearch: "Research",
    navCorner: "Personal Archive",
    navJournal: "Journal",
    navContact: "Contact",
    tabNotes: "Notes",
    tabQuotes: "Quotations",
    quotesTitle: "Quotations",
    noQuotes: "",
    unknownRating: "--",
    unknownWatchedDate: "--",
    unknownReadDate: "--",
    metaDirector: "Director",
    metaAuthor: "Author",
    metaYear: "Year",
    metaCountry: "Country",
    metaRating: "Rating",
    metaDateWatched: "Date Watched",
    metaDateRead: "Date Read",
    metaOpen: "Open",
    remindsMeOf: "Reminded Me Of",
    relatedByAuthor: "Other Books I Read by This Author",
    relatedByDirector: "Other Films I Watched by This Director",
    relatedOpenEntry: "Open entry",
    noNotes: "No notes added yet.",
    backToArchive: "Back to Archive",
    backToBookClubArchive: "Back to Book Club Archive",
    footerText: "Last updated in 2026-04-04",
  },
  tr: {
    navAria: "Ana gezinti",
    navAbout: "Hakkında",
    navWork: "Çalışma",
    navResearch: "Araştırma",
    navCorner: "Kişisel Arşiv",
    navJournal: "Günlük",
    navContact: "İletişim",
    tabNotes: "Notlar",
    tabQuotes: "Alıntılar",
    quotesTitle: "Alıntılar",
    noQuotes: "",
    unknownRating: "--",
    unknownWatchedDate: "--",
    unknownReadDate: "--",
    metaDirector: "Yönetmen",
    metaAuthor: "Yazar",
    metaYear: "Yıl",
    metaCountry: "Ülke",
    metaRating: "Puan",
    metaDateWatched: "İzleme Tarihi",
    metaDateRead: "Okuma Tarihi",
    metaOpen: "Aç",
    remindsMeOf: "Bana Şunları Hatırlattı",
    relatedByAuthor: "Bu Yazardan Okuduğum Diğer Kitaplar",
    relatedByDirector: "Bu Yönetmenden İzlediğim Diğer Filmler",
    relatedOpenEntry: "Kaydı aç",
    noNotes: "Henüz not eklenmedi.",
    backToArchive: "Arşive Dön",
    backToBookClubArchive: "Kitap Kulübü Arşivine Dön",
    footerText: "Son güncelleme: 2026-04-04",
  },
};

const englishBookTitleOverrides = {
  "217898868": "What You Are Looking For Is in the Library",
  "25847138": "My Brilliant Friend",
  "12969013": "Oblomov",
  "17161941": "Anna Karenina",
  "142395": "Samarkand",
  "30851529": "Motherland Hotel",
  "Saatleri Ayarlama Enstitüsü": "The Time Regulation Institute",
  "Cevdet Bey ve Oğulları": "Cevdet Bey and Sons",
  "Kafamda Bir Tuhaflık": "A Strangeness in My Mind",
  "Kırmızı Saçlı Kadın": "The Red-Haired Woman",
  "İçimizdeki Şeytan": "The Devil Within",
  "Yetişkinler": "Grown-Ups",
  "Kürk Mantolu Madonna": "Madonna in a Fur Coat",
  "Masumiyet Müzesi": "The Museum of Innocence",
  "Puslu Kıtalar Atlası": "The Atlas of Misty Continents",
  "Mücellâ": "Mucella",
  "Bukalemunlar Kitabı": "The Book of Chameleons",
  "Unutmanın Genel Teorisi": "A General Theory of Oblivion",
  "Satranç": "Chess Story",
  "Amok Koşucusu": "Amok",
  "Sabırsız Yürek": "Beware of Pity",
  "Bir Kadının Yaşamından Yirmi Dört Saat": "Twenty-Four Hours in the Life of a Woman",
  "The World of Yesterday: Memoirs of a European": "The World of Yesterday: Memoirs of a European",
  "Bir Çöküşün Öyküsü": "The Story of a Downfall",
};

const journalEntries = [
  {
    id: "perfect-days",
    type: "film",
    title: { en: "Perfect Days", tr: "Perfect Days" },
    creator: "Wim Wenders",
    country: "japan",
    year: "2023",
    note: {
      en: "A gentle meditation on routine, attention, and dignity.",
      tr: "Rutin, dikkat ve haysiyet üzerine sakin bir düşünce alanı.",
    },
    rating: "4.5/5",
    essay: {
      en: `<h3>Wim Wenders' Ode to the Ordinary</h3>
<p>Wim Wenders' "Perfect Days" is a quiet masterpiece that finds profound beauty in the seemingly mundane rhythms of daily life. The film follows Hirayama, a retired widower in Tokyo, as he navigates his days with a serenity that initially appears simple but reveals itself to be deeply philosophical.</p>

<p>What struck me most about this film is its refusal to dramatize. There are no grand revelations, no sudden plot twists. Instead, Wenders creates a space where attention itself becomes the subject matter. The camera lingers on details—the way water flows, how light filters through leaves, the expression on a face during a moment of rest. These aren't stylistic flourishes; they're invitations to see differently.</p>

<p>The Japanese setting adds another layer. There's a particular aesthetic sensitivity in how Wenders frames Tokyo—not as a bustling metropolis but as a series of carefully observed moments. The city becomes a character, not through its iconic landmarks but through its quietness, its gardens, its small moments of connection.</p>

<p>Repetition is central to the film, and I found myself thinking about how American cinema often treats routine as something to escape, while Wenders suggests it might be something to honor. The routine is where life actually happens.</p>`,
      tr: `<h3>Wim Wenders'in Sıradan Hayata Övgüsü</h3>
<p>Wim Wenders'in "Perfect Days" filmi, gündelik yaşamın sade ritimlerinde derin bir güzellik bulan sessiz bir film. Tokyo'da yaşayan Hirayama'nın günlerini sakinlik, dikkat ve özenle sürdürüşünü izliyoruz.</p>`,
    },
    tags: {
      en: ["stillness", "urban life", "japanese cinema"],
      tr: ["sakinlik", "kent hayatı", "Japon sineması"],
    },
  },
  {
    id: "aftersun",
    type: "film",
    title: { en: "Aftersun", tr: "Aftersun" },
    creator: "Charlotte Wells",
    country: "unitedKingdom",
    year: "2022",
    note: {
      en: "Memory as texture. Quietly devastating and formally precise.",
      tr: "Doku olarak hafıza. Sakin ama yıkıcı ve biçimsel olarak çok hassas.",
    },
    rating: "4.8/5",
    essay: {
      en: `<h3>The Weight of Unspoken Things</h3>
<p>Charlotte Wells' "Aftersun" operates in the space between what is said and what is felt. It's a film about memory, but more specifically, about how memory transforms the present moment into something we're always trying to understand.</p>

<p>The film follows a father and daughter on a holiday that seems idyllic on the surface but carries an undercurrent of melancholy. Wells doesn't explain this melancholy; she shows it through glances, through small moments where time seems to stop. The formal precision of the filmmaking—the composition, the color grading, the editing—all work together to create an emotional texture.</p>

<p>What I found remarkable is how the film trusts the audience to feel what's beneath the surface. There's no expository dialogue explaining the emotional subtext. Instead, we're invited into a visual and emotional landscape where we must piece together meaning from fragments.</p>

<p>The ending recontextualizes everything we've seen, but in a way that doesn't invalidate our earlier experience. Instead, it adds another layer of meaning. This is the kind of filmmaking that stays with you, revealing new dimensions with each viewing.</p>`,
      tr: `<h3>Söylenmeyenlerin Ağırlığı</h3>
<p>Charlotte Wells'in "Aftersun" filmi, söylenenle hissedilen arasındaki boşlukta ilerliyor. Hafızanın bugünü nasıl sonradan anlamlandırdığımız bir şeye dönüştürdüğünü çok incelikli bir biçimde hissettiriyor.</p>`,
    },
    tags: {
      en: ["memory", "family", "british cinema"],
      tr: ["hafıza", "aile", "İngiliz sineması"],
    },
  },
  {
    id: "once-upon-anatolia",
    type: "film",
    title: { en: "Once Upon a Time in Anatolia", tr: "Bir Zamanlar Anadolu'da" },
    creator: "Nuri Bilge Ceylan",
    country: "turkey",
    year: "2011",
    note: {
      en: "Night, silence, and bureaucracy turn into an existential landscape.",
      tr: "Gece, sessizlik ve bürokrasi varoluşçu bir manzaraya dönüşüyor.",
    },
    rating: "4.7/5",
    essay: {
      en: `<h3>The Beauty of Meandering</h3>
<p>Nuri Bilge Ceylan's "Once Upon a Time in Anatolia" is a film that refuses to be rushed. It's a narrative that meanders through a Anatolian landscape with the same patience as its characters, searching through the night for something they're not sure how to find.</p>

<p>The film follows a group of men—a prosecutor, a doctor, a police chief, soldiers—as they journey through darkness looking for a burial site. What could be a simple procedural becomes a profound meditation on mortality, morality, and the weight of secrets. The landscape itself becomes a character—barren, indifferent, vast.</p>

<p>Ceylan's use of time and silence is masterful. There's often more happening in the quiet moments than in the dialogue. Conversations circle around things unsaid. A meal shared in the early morning light becomes an unexpected moment of humanity and connection, oddly more intimate than most cinema allows.</p>

<p>What struck me most is how the film treats its characters not as heroes or villains but as ordinary people caught in circumstances that demand they confront what they'd rather leave buried. The moral ambiguity never resolves—it just sits with us, uncomfortable and true.</p>

<p>This is slow cinema at its finest, but it's not slow for slowness' sake. Every moment of waiting, every long take, every silence serves a purpose. By the end, the film has created something almost unbearably beautiful from its apparent lack of narrative urgency.</p>`,
      tr: `<h3>Dolanmanın Güzelliği</h3>
<p>Nuri Bilge Ceylan'ın "Bir Zamanlar Anadolu'da" filmi aceleye gelmeyen, gece boyunca açılan bir anlatı kuruyor. Bir savcı, bir doktor, bir polis şefi ve askerlerle birlikte karanlıkta bir mezar yeri ararken, hikâye ölüm, ahlak ve sırların ağırlığı üzerine derin bir düşünmeye dönüşüyor.</p>`,
    },
    tags: {
      en: ["slow cinema", "moral ambiguity", "turkish cinema"],
      tr: ["yavaş sinema", "ahlaki belirsizlik", "Türk sineması"],
    },
  },
  {
    id: "the-years",
    type: "book",
    title: { en: "The Years", tr: "Seneler" },
    creator: "Annie Ernaux",
    country: "france",
    year: "2008",
    note: {
      en: "Private memory and social history move together in one voice.",
      tr: "Özel hafıza ile toplumsal tarih tek bir sesle birlikte ilerliyor.",
    },
    rating: "4.6/5",
    essay: {
      en: `<h3>A Collective Autobiography</h3>
<p>Annie Ernaux's "The Years" is a radical reimagining of autobiography. Rather than focusing on the individual "I", Ernaux creates a collective narrative that moves between personal memory and social history, between the intimate and the political.</p>

<p>The book moves chronologically from the 1940s to the 2000s, but it's not a traditional memoir. Instead, Ernaux weaves together advertising slogans, fashion trends, political events, films, and books alongside her own memories. This creates a portrait of a time and a society rather than a single life.</p>

<p>What I found most striking is how this approach reveals the extent to which our personal lives are shaped by larger cultural and historical forces. Nothing feels isolated or purely individual. Instead, everything is connected to the moment, to the society, to the collective experience of a generation.</p>

<p>The writing is precise and often devastating in its simplicity. Ernaux writes about desire, disappointment, changing bodies, and the passage of time with an unflinching honesty that feels almost clinical. Yet beneath this apparent distance is a profound tenderness.</p>

<p>Reading "The Years" felt like discovering a new form of truth-telling. It challenged my assumptions about what autobiography could be and what it means to tell the story of a life in relation to history.</p>`,
      tr: `<h3>Kolektif Bir Otobiyografi</h3>
<p>Annie Ernaux'nun "Seneler" kitabı, otobiyografiyi bireysel bir anlatı olmaktan çıkarıp ortak bir hafıza alanına dönüştürüyor. Kişisel olan ile toplumsal olanı aynı ses içinde taşıması kitabı çok etkileyici kılıyor.</p>`,
    },
    tags: {
      en: ["memoir", "history", "french literature"],
      tr: ["anı", "tarih", "Fransız edebiyatı"],
    },
  },
  {
    id: "left-hand-darkness",
    type: "book",
    title: { en: "The Left Hand of Darkness", tr: "Karanlığın Sol Eli" },
    creator: "Ursula K. Le Guin",
    country: "unitedStates",
    year: "1969",
    note: {
      en: "A living study of difference, language, and politics.",
      tr: "Farklılık, dil ve siyaset üzerine hâlâ canlı bir inceleme.",
    },
    rating: "4.5/5",
    essay: {
      en: `<h3>A Stranger in a Strange Climate</h3>
<p>Ursula K. Le Guin's "The Left Hand of Darkness" is science fiction that refuses to be merely speculative. Instead, it's a profound anthropological meditation disguised as a space opera. The novel follows Genly Ai, an envoy from an interplanetary federation, as he travels to the ice world of Gethen to convince its people to join the federation.</p>

<p>What makes this novel extraordinary is its central conceit: the inhabitants of Gethen are ambisexual, becoming male or female only during certain periods. This single difference transforms everything—the way power works, the way relationships form, the way society is structured. Le Guin uses this speculative element not for its own sake but as a lens through which to examine our own assumptions about gender, politics, and human nature.</p>

<p>The novel's richest passages are the quiet moments—conversations between Genly and Therem exploring ideas of duty, loyalty, exile, and exile. These dialogues feel intimate precisely because they're skeptical of quick understanding. The language barrier between the two men becomes a metaphor for how difficult it is to truly know another person.</p>

<p>What struck me most years after first reading this book is its refusal to resolve its central tensions. Genly doesn't fully understand Gethenian culture, and we don't fully understand the universe Le Guin has created. But rather than being frustrating, this incompleteness feels like honesty. This is how understanding actually works—not through sudden revelation but through patient, often painful, navigation of difference.</p>

<p>It's remarkable how fresh this novel still feels, how its questions about power, gender, and belonging remain urgent and alive. It's science fiction that trusts the reader to think alongside it rather than being told what to think.</p>`,
      tr: `<h3>Tuhaf Bir İklimde Yabancı Olmak</h3>
<p>Ursula K. Le Guin'in "Karanlığın Sol Eli", yalnızca spekülatif bir kurgu değil; dil, cinsiyet, siyaset ve karşılaşma üzerine çok canlı bir düşünme alanı. Romanın gücü, farkı açıklamak yerine onun içinde yaşamayı hissettirmesinde yatıyor.</p>`,
    },
    tags: {
      en: ["science fiction", "society", "gender"],
      tr: ["bilimkurgu", "toplum", "cinsiyet"],
    },
  },
  {
    id: "snow",
    type: "book",
    title: { en: "Snow", tr: "Kar" },
    creator: "Orhan Pamuk",
    country: "turkey",
    year: "2002",
    note: {
      en: "A sharp novel on faith, politics, and belonging.",
      tr: "İnanç, siyaset ve aidiyet üzerine keskin bir roman.",
    },
    rating: "4.4/5",
    essay: {
      en: `<h3>Stranded by Snow, Trapped by Ideas</h3>
<p>Orhan Pamuk's "Snow" is a novel that makes you uncomfortable, which is precisely why it's essential. It's set in a fictional Turkish city where a poet returns after years abroad, only to find himself trapped by a snowstorm and drawn into the city's complex web of ideological conflicts.</p>

<p>The setting becomes a character itself—the snow isolating the city not just physically but intellectually and emotionally. Within this isolation, the novel explores the collision between Westernization and Islamic fundamentalism, modern rationalism and traditional faith, and the individual caught between these forces with no satisfying resolution.</p>

<p>What I found most powerful is Pamuk's refusal to take sides. He presents all his characters—the Islamist activists, the secular nationalists, the poets, the soldiers—with equal complexity and empathy. None of them are villains. None of them are heroes. They're all trying to make sense of a world that's changed in ways they can't quite control.</p>

<p>The novel is dense with formal innovation—characters who may or may not exist, metafictional layers, stories within stories. This formal complexity mirrors the intellectual and cultural confusion at the heart of the narrative. We're as lost and disoriented as the protagonist.</p>

<p>It's not an easy read. The novel asks difficult questions about identity, belonging, and the impossible position of anyone trying to think freely in a polarized world. But that difficulty is the point. Pamuk is refusing to offer easy answers to genuinely hard questions.</p>`,
      tr: `<h3>Karın Ortasında, Fikirlerin İçinde Sıkışmak</h3>
<p>Orhan Pamuk'un "Kar" romanı rahatsız edici olmayı göze aldığı için güçlü. İnanç, siyaset ve aidiyet arasındaki gerilimleri kolay cevaplara kaçmadan kuruyor.</p>`,
    },
    tags: {
      en: ["identity", "politics", "turkish literature"],
      tr: ["kimlik", "siyaset", "Türk edebiyatı"],
    },
  },
  {
    id: "the-emigrants",
    type: "book",
    title: { en: "The Emigrants", tr: "Göçmenler" },
    creator: "W. G. Sebald",
    country: "germany",
    year: "1992",
    note: {
      en: "Melancholic prose about exile, memory, and fragile archives.",
      tr: "Sürgün, hafıza ve kırılgan arşivler üzerine melankolik bir anlatı.",
    },
    rating: "4.7/5",
    essay: {
      en: `<h3>Photography as Haunting</h3>
<p>W. G. Sebald's "The Emigrants" is one of the most formally restless yet emotionally subdued novels I've encountered. It's structured as a series of interconnected narratives about four men who have each experienced exile and displacement, yet the novel's real subject is less the events of their lives than the traces they leave behind.</p>

<p>What makes this book extraordinary is Sebald's integration of photographs, maps, and archival documents throughout the text. These images don't illustrate the narrative so much as complicate it. A photograph of a place seems to contradict a description. An old postcard haunts the margin. The images force us to wonder: how reliable is memory? What does it mean to reconstruct a life from fragments?</p>

<p>The prose itself is distinctive—long, unpunctuated sentences that feel like they're searching for meaning even as they convey information. There's a specific melancholy to Sebald's voice, a kind of resignation to the impossibility of fully knowing or capturing the past.</p>

<p>The novel's treatment of the Holocaust is particularly powerful precisely because it's indirect. The historical catastrophe hovers in the background, shaping all the characters' lives without ever being named directly. This indirectness feels more honest somehow than explicit treatment—it captures how trauma works, how it shapes existence without always being visible.</p>

<p>Reading "The Emigrants," I felt like I was doing the work of reconstruction alongside Sebald, gathering fragments, studying photographs, trying to piece together lost lives. The novel becomes a kind of anti-memorial—it acknowledges that some things can't be fully recovered, but documents the attempt to do so anyway.</p>`,
      tr: `<h3>Musallat Olan Bir Şey Olarak Fotoğraf</h3>
<p>W. G. Sebald'in "Göçmenler" kitabı, biçimsel olarak huzursuz ama duygusal olarak son derece sessiz romanlardan biri. Sürgün, hafıza ve geride kalan izler üzerine kurduğu dünya uzun süre akılda kalıyor.</p>`,
    },
    tags: {
      en: ["memory", "migration", "german literature"],
      tr: ["hafıza", "göç", "Alman edebiyatı"],
    },
  },
];

const importedFilmEntries =
  typeof filmDiaryEntries !== "undefined" && Array.isArray(filmDiaryEntries) ? filmDiaryEntries : [];
const importedBookEntries = typeof bookEntries !== "undefined" && Array.isArray(bookEntries) ? bookEntries : [];

const detailEntries = (() => {
  const merged = new Map();
  const preferredEntries =
    importedBookEntries.length || importedFilmEntries.length
      ? [...importedBookEntries, ...importedFilmEntries]
      : journalEntries;

  preferredEntries.forEach((entry) => {
    merged.set(entry.id, entry);
  });
  return [...merged.values()];
})();

const entryQuotes = {
  "perfect-days": {
    en: [
      "Next time is next time. Now is now.",
      "The world is made of small moments if you look carefully.",
    ],
    tr: [
      "Bir dahaki sefer bir dahaki seferdir. Şimdi ise şimdi.",
      "Dikkatle bakınca dünya küçük anlardan oluşuyor.",
    ],
  },
  aftersun: {
    en: [
      "Memory is often a room where the light keeps changing.",
      "Sometimes we only understand a person after they are gone from view.",
    ],
    tr: [
      "Hafıza, ışığın durmadan değiştiği bir oda gibidir.",
      "Bazen birini ancak görüş alanından çıkınca anlamaya başlarız.",
    ],
  },
  "once-upon-anatolia": {
    en: [
      "In the dark, everyone carries a different version of the truth.",
      "Silence can expose more than confession.",
    ],
    tr: [
      "Karanlıkta herkes gerçeğin farklı bir versiyonunu taşır.",
      "Sessizlik bazen itiraftan daha çok şey açığa çıkarır.",
    ],
  },
  "the-years": {
    en: [
      "Personal memory is never only personal; it is social sediment.",
      "A life is also an archive of a century.",
    ],
    tr: [
      "Kişisel hafıza asla sadece kişisel değildir; toplumsal bir birikimdir.",
      "Bir hayat aynı zamanda bir yüzyılın arşividir.",
    ],
  },
  "left-hand-darkness": {
    en: [
      "To truly meet the other, one must suspend certainty.",
      "Difference is not a threat; it is a method of understanding.",
    ],
    tr: [
      "Ötekiyle gerçekten karşılaşmak için kesinliği askıya almak gerekir.",
      "Farklılık bir tehdit değil, anlama yöntemidir.",
    ],
  },
  snow: {
    en: [
      "Snow isolates the city, but ideas isolate people more.",
      "Belonging is hardest when every side demands certainty.",
    ],
    tr: [
      "Kar şehri yalıtır ama fikirler insanları daha çok yalıtır.",
      "Aidiyet, herkes kesinlik isterken daha da zorlaşır.",
    ],
  },
  "the-emigrants": {
    en: [
      "Photographs preserve faces but not the life around them.",
      "Exile is not only a place left behind, but time left unfinished.",
    ],
    tr: [
      "Fotoğraflar yüzleri saklar ama çevresindeki hayatı saklayamaz.",
      "Sürgün yalnızca geride bırakılan yer değil, tamamlanmamış zamandır.",
    ],
  },
};

const entryReminders = {
  "aradigin-sey-kutuphanede-sakli-aoyama": {
    en: ["Kafka on the Shore by Haruki Murakami", "If on a Winter's Night a Traveler by Italo Calvino"],
    tr: ["Haruki Murakami - Sahilde Kafka", "Italo Calvino - Bir Kış Gecesi Eğer Bir Yolcu"],
  },
};

function oppositeLang(lang) {
  return lang === "tr" ? "en" : "tr";
}

function missingNotesMessage(entryType, lang) {
  const item = entryType === "film" ? "movie" : "book";
  if (lang === "en") {
    return `I only wrote my notes for this ${item} in Turkish and preferred not to force an English translation. Please check the Turkish version.`;
  }
  return `Bu ${item === "movie" ? "film" : "kitap"} için notlarımı sadece İngilizce yazdım ve zoraki bir Türkçe çeviri yapmak istemedim. Lütfen İngilizce versiyona bakınız.`;
}

function missingQuotesMessage(entryType, lang) {
  const item = entryType === "film" ? "movie" : "book";
  if (lang === "en") {
    return `I only kept quotations for this ${item} in Turkish. Please check the Turkish version.`;
  }
  return `Bu ${item === "movie" ? "film" : "kitap"} için alıntıları sadece İngilizce tuttum. Lütfen İngilizce versiyona bakınız.`;
}

const state = {
  lang: localStorage.getItem("enk_lang") || "en",
  activeTab: "notes",
  currentEntryId: null,
};

function getSharedLastUpdated() {
  const value = typeof siteData !== "undefined" ? siteData?.lastUpdated : "";
  return typeof value === "string" && value.trim() ? value.trim() : "2026-04-10";
}

function getFooterText() {
  const date = getSharedLastUpdated();
  return state.lang === "tr" ? `Son güncelleme: ${date}` : `Last updated in ${date}`;
}

function t(key) {
  return translations[state.lang][key] || key;
}

function getLocalizedEntryTitle(entry, lang = state.lang) {
  const title = entry?.title || {};
  const englishOverride =
    (entry?.type === "book" && (englishBookTitleOverrides[entry?.goodreadsId] || englishBookTitleOverrides[title.tr])) || "";
  const englishTitle = englishOverride || title.en || "";
  const turkishTitle = title.tr || englishTitle || "";

  if (lang === "tr") {
    return turkishTitle || englishTitle || "";
  }

  if (entry?.type === "book") {
    return englishTitle || turkishTitle || "";
  }

  return englishTitle || turkishTitle || "";
}

function isMissingMetaValue(value) {
  const normalized = `${value || ""}`.trim().toLowerCase();
  return (
    normalized === "" ||
    normalized === "rating not recorded" ||
    normalized === "watch date not recorded" ||
    normalized === "read date not recorded" ||
    normalized === "puan kayıtlı değil" ||
    normalized === "puan kayitli degil" ||
    normalized === "izlenme tarihi kayıtlı değil" ||
    normalized === "izlenme tarihi kayitli degil" ||
    normalized === "okuma tarihi kayıtlı değil" ||
    normalized === "okuma tarihi kayitli degil"
  );
}

function getDisplayRating(value) {
  return isMissingMetaValue(value) ? t("unknownRating") : value;
}

function getDisplayActivityDate(entry) {
  const rawValue = entry.type === "film" ? entry.watchedDate : entry.readDate;
  const fallbackKey = entry.type === "film" ? "unknownWatchedDate" : "unknownReadDate";
  return isMissingMetaValue(rawValue) ? t(fallbackKey) : rawValue;
}

function normalizeCreatorName(value) {
  return `${value || ""}`.trim().toLocaleLowerCase("en-US");
}

function getDetailCoverMarkup(entry, displayTitle) {
  const placeholderSvg =
    entry.type === "book"
      ? '<svg class="cover-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5z"></path><line x1="8" y1="7" x2="16" y2="7"></line><line x1="8" y1="11" x2="16" y2="11"></line></svg>'
      : '<svg class="cover-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><line x1="8" y1="5" x2="8" y2="19"></line><line x1="16" y1="5" x2="16" y2="19"></line></svg>';
  const placeholderClass = entry.type === "book" ? "book-placeholder" : "film-placeholder";

  return entry.coverUrl
    ? `<img class="entry-detail-cover" src="${entry.coverUrl}" alt="${displayTitle} cover" loading="lazy" onerror="this.style.display='none'; if (this.nextElementSibling) { this.nextElementSibling.style.display='grid'; }" /><div class="entry-detail-cover is-placeholder ${placeholderClass}" style="display:none" aria-hidden="true">${placeholderSvg}</div>`
    : `<div class="entry-detail-cover is-placeholder ${placeholderClass}" aria-hidden="true">${placeholderSvg}</div>`;
}

function renderReminderNote(entry) {
  const items = entryReminders[entry.id]?.[state.lang] || entryReminders[entry.id]?.en || [];
  if (!items.length) {
    return "";
  }

  return `<aside class="entry-reminder-note"><p class="entry-reminder-title">${t("remindsMeOf")}</p><ul>${items
    .map((item) => `<li>${item}</li>`)
    .join("")}</ul></aside>`;
}

function getRelatedEntries(entry) {
  const creatorKey = normalizeCreatorName(entry.creator);
  if (!creatorKey) {
    return [];
  }

  return detailEntries
    .filter(
      (candidate) =>
        candidate.id !== entry.id &&
        candidate.type === entry.type &&
        normalizeCreatorName(candidate.creator) === creatorKey
    )
    .sort((a, b) => {
      const yearDiff = Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10);
      if (Number.isFinite(yearDiff) && yearDiff !== 0) {
        return yearDiff;
      }
      return getLocalizedEntryTitle(a).localeCompare(getLocalizedEntryTitle(b), state.lang, { sensitivity: "base" });
    });
}

function renderRelatedEntries(entry) {
  const relatedEntries = getRelatedEntries(entry);
  if (!relatedEntries.length) {
    return "";
  }

  const titleKey = entry.type === "film" ? "relatedByDirector" : "relatedByAuthor";
  const cards = relatedEntries
    .map((relatedEntry) => {
      const relatedTitle = getLocalizedEntryTitle(relatedEntry);
      const relatedDate = getDisplayActivityDate(relatedEntry);
      const ratingValue = getDisplayRating(relatedEntry.rating);
      const coverMarkup = relatedEntry.coverUrl
        ? `<img class="related-entry-cover" src="${relatedEntry.coverUrl}" alt="${relatedTitle} cover" loading="lazy" onerror="this.style.display='none'; if (this.nextElementSibling) { this.nextElementSibling.style.display='grid'; }" /><div class="related-entry-cover is-placeholder ${relatedEntry.type === "book" ? "book-placeholder" : "film-placeholder"}" style="display:none" aria-hidden="true">${relatedEntry.type === "book"
            ? '<svg class="cover-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5z"></path><line x1="8" y1="7" x2="16" y2="7"></line><line x1="8" y1="11" x2="16" y2="11"></line></svg>'
            : '<svg class="cover-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"></rect><line x1="8" y1="5" x2="8" y2="19"></line><line x1="16" y1="5" x2="16" y2="19"></line></svg>'}</div>`
        : `<div class="related-entry-cover is-placeholder ${relatedEntry.type === "book" ? "book-placeholder" : "film-placeholder"}" aria-hidden="true">${relatedEntry.type === "book"
            ? '<svg class="cover-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5z"></path><line x1="8" y1="7" x2="16" y2="7"></line><line x1="8" y1="11" x2="16" y2="11"></line></svg>'
            : '<svg class="cover-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"></rect><line x1="8" y1="5" x2="8" y2="19"></line><line x1="16" y1="5" x2="16" y2="19"></line></svg>'}</div>`;

      return `
        <a class="related-entry-card" href="entry-detail.html?id=${encodeURIComponent(relatedEntry.id)}&from=${relatedEntry.type === "book" ? "book" : "film"}" aria-label="${t("relatedOpenEntry")}: ${relatedTitle}">
          ${coverMarkup}
          <div class="related-entry-text">
            <h4>${relatedTitle}</h4>
            <p class="related-entry-meta">${relatedEntry.year} · ${ratingValue}</p>
            <p class="related-entry-submeta">${relatedDate}</p>
          </div>
        </a>
      `;
    })
    .join("");

  return `
    <section class="related-entries-section">
      <h3>${t(titleKey)}</h3>
      <div class="related-entry-grid">
        ${cards}
      </div>
    </section>
  `;
}

function getDefaultMemoryMarker(entryType, lang) {
  if (lang === "tr") {
    return entryType === "film"
      ? "Bu film için not almadım. Bu kaydı izleme yolculuğumda bir hafıza işareti olarak tutuyorum."
      : "Bu kitap için not almadım. Bu kaydı okuma yolculuğumda bir hafıza işareti olarak tutuyorum.";
  }

  return entryType === "film"
    ? "I haven't taken notes on this film. I am keeping this entry as a memory marker in my viewing journey."
    : "I haven't taken notes on this book. I am keeping this entry as a memory marker in my reading journey.";
}

function normalizeMemoryMarker(text, entryType, lang) {
  if (!text) {
    return text;
  }

  const normalized = text.replace(/\s+/g, " ").trim().toLowerCase();
  const legacyMarkers = [
    "i read this book before i started writing regular notes on books. i am keeping this entry as a memory marker in my reading journey.",
    "i watched this movie before i started writing long-form notes on films. i am keeping this entry as a memory marker in my viewing journey.",
    "i haven't taken notes on this book. i am keeping this entry as a memory marker in my reading journey.",
    "i haven't taken notes on this film. i am keeping this entry as a memory marker in my viewing journey.",
    "i haven't taken notes on this book yet. i am keeping this entry as a memory marker in my reading journey.",
    "i haven't taken notes on this film yet. i am keeping this entry as a memory marker in my viewing journey.",
    "bu kitap için henüz düzenli notlar tutmaya başlamadan önce okumuştum. bu kaydı okuma yolculuğumda bir hafıza işareti olarak tutuyorum.",
    "bu filmi uzun notlar yazmaya başlamadan önce izlemiştim. bu kaydı izleme yolculuğumda bir hafıza işareti olarak tutuyorum.",
    "bu kitap için henüz not almadım. bu kaydı okuma yolculuğumda bir hafıza işareti olarak tutuyorum.",
    "bu film için henüz not almadım. bu kaydı izleme yolculuğumda bir hafıza işareti olarak tutuyorum.",
    "bu kitabi kitaplar uzerine duzenli notlar tutmaya baslamadan once okumustum. bu kaydi okuma yolculugumun bir hafiza izi olarak koruyorum.",
    "bu filmi filmler uzerine uzun notlar tutmaya baslamadan once izlemistim. bu kaydi izleme yolculugumun bir hafiza izi olarak koruyorum.",
  ];

  if (legacyMarkers.includes(normalized)) {
    return getDefaultMemoryMarker(entryType, lang);
  }

  if (text.includes("I read this book before I started writing regular notes on books.")) {
    return text.replace(
      /I read this book before I started writing regular notes on books\. I am keeping this entry as a memory marker in my reading journey\./g,
      getDefaultMemoryMarker("book", lang)
    );
  }

  if (text.includes("I watched this movie before I started writing long-form notes on films.")) {
    return text.replace(
      /I watched this movie before I started writing long-form notes on films\. I am keeping this entry as a memory marker in my viewing journey\./g,
      getDefaultMemoryMarker("film", lang)
    );
  }

  if (text.includes("I haven't taken notes on this book.")) {
    return text.replace(
      /I haven't taken notes on this book\. I am keeping this entry as a memory marker in my reading journey\./g,
      getDefaultMemoryMarker("book", lang)
    );
  }

  if (text.includes("I haven't taken notes on this film.")) {
    return text.replace(
      /I haven't taken notes on this film\. I am keeping this entry as a memory marker in my viewing journey\./g,
      getDefaultMemoryMarker("film", lang)
    );
  }

  if (text.includes("Bu kitabi kitaplar uzerine duzenli notlar tutmaya baslamadan once okumustum.")) {
    return text.replace(
      /Bu kitabi kitaplar uzerine duzenli notlar tutmaya baslamadan once okumustum\. Bu kaydi okuma yolculugumun bir hafiza izi olarak koruyorum\./g,
      getDefaultMemoryMarker("book", lang)
    );
  }

  if (text.includes("Bu filmi filmler uzerine uzun notlar tutmaya baslamadan once izlemistim.")) {
    return text.replace(
      /Bu filmi filmler uzerine uzun notlar tutmaya baslamadan once izlemistim\. Bu kaydi izleme yolculugumun bir hafiza izi olarak koruyorum\./g,
      getDefaultMemoryMarker("film", lang)
    );
  }

  return text;
}

function applyLanguage() {
  document.documentElement.lang = state.lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = key === "footerText" ? getFooterText() : t(key);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    node.setAttribute("aria-label", t(key));
  });

  const langButtons = document.querySelectorAll(".lang-button");
  langButtons.forEach((button) => {
    const isActive = button.dataset.langSwitch === state.lang;
    button.classList.toggle("is-active", isActive);
  });
}

function loadEntry() {
  const params = new URLSearchParams(window.location.search);
  const entryId = params.get("id");
  const countryParam = params.get("country");
  const searchParam = params.get("q");
  const fromParam = params.get("from");

  const entry = detailEntries.find((e) => e.id === entryId);

  if (!entry) {
    document.querySelector("main").innerHTML = "<p>Entry not found.</p>";
    return;
  }

  const headerEl = document.querySelector("#entry-header");
  const metaEl = document.querySelector("#entry-meta");
  const notesEl = document.querySelector("#notes-content");
  const quotesEl = document.querySelector("#quotes-content");
  const backLink = document.querySelector(".back-link");
  const notesTabButton = document.querySelector("#tab-notes");
  const quoteTabButton = document.querySelector("#tab-quotes");

  const typeLabel = entry.type === "film" ? "Film" : "Book";
  const displayTitle = getLocalizedEntryTitle(entry);
  const countryLabel = entry.countryLabel?.[state.lang] || entry.country;
  const coverMarkup = getDetailCoverMarkup(entry, displayTitle);
  const reminderMarkup = renderReminderNote(entry);

  state.currentEntryId = entry.id;

  headerEl.innerHTML = `
    <div class="entry-header-layout">
      <div class="entry-cover-column">
        ${coverMarkup}
        ${reminderMarkup}
      </div>
      <div class="entry-header-text">
        <h1>${displayTitle}</h1>
        <p style="color: var(--ink-soft); font-size: 1.1rem; margin: 0.5rem 0 0 0;">${typeLabel} • ${entry.creator} • ${entry.year}</p>
      </div>
    </div>
  `;

  const creatorLabel = entry.type === "film" ? t("metaDirector") : t("metaAuthor");
  const dateLabel = entry.type === "film" ? t("metaDateWatched") : t("metaDateRead");
  const dateValue = getDisplayActivityDate(entry);

  metaEl.innerHTML = `
    <div class="meta-item">
      <span class="meta-label">${creatorLabel}</span>
      <span class="meta-value">${entry.creator}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">${t("metaYear")}</span>
      <span class="meta-value">${entry.year}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">${t("metaCountry")}</span>
      <span class="meta-value">${countryLabel}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">${t("metaRating")}</span>
      <span class="meta-value">${getDisplayRating(entry.rating)}</span>
    </div>
    <div class="meta-item"><span class="meta-label">${dateLabel}</span><span class="meta-value">${dateValue}</span></div>
  `;

  const headerText = headerEl.querySelector(".entry-header-text");
  if (headerText && metaEl.parentElement !== headerText) {
    headerText.appendChild(metaEl);
  }

  const fallbackNoteText = normalizeMemoryMarker(
    state.lang === "tr" ? entry.note?.tr || entry.note?.en || t("noNotes") : entry.note?.en || entry.note?.tr || t("noNotes"),
    entry.type,
    state.lang
  );
  const fallbackNotes = `<h3>${t("tabNotes")}</h3><p>${fallbackNoteText}</p>`;
  const relatedEntriesHtml = renderRelatedEntries(entry);
  if (notesEl) {
    const sameLangEssay = entry.essay?.[state.lang];
    const otherLangEssay = entry.essay?.[oppositeLang(state.lang)];
    const notesHtml = sameLangEssay
      ? normalizeMemoryMarker(sameLangEssay, entry.type, state.lang)
      : (otherLangEssay
          ? `<h3>${t("tabNotes")}</h3><p>${missingNotesMessage(entry.type, state.lang)}</p>`
          : fallbackNotes);
    notesEl.innerHTML = `${notesHtml}${relatedEntriesHtml}`;
  }

  const sameLangQuotes = entry.quotes?.[state.lang] || entryQuotes[entry.id]?.[state.lang] || [];
  const otherLangQuotes = entry.quotes?.[oppositeLang(state.lang)] || entryQuotes[entry.id]?.[oppositeLang(state.lang)] || [];
  if (sameLangQuotes.length) {
    quotesEl.innerHTML = `<h3>${t("quotesTitle")}</h3><ul class="quotes-list">${sameLangQuotes.map((q) => `<li>${q}</li>`).join("")}</ul>`;
  } else if (otherLangQuotes.length) {
    quotesEl.innerHTML = `<h3>${t("quotesTitle")}</h3><ul class="quotes-list"><li>${missingQuotesMessage(entry.type, state.lang)}</li></ul>`;
  } else {
    quotesEl.innerHTML = "";
  }

  if (notesTabButton) {
    notesTabButton.textContent = t("tabNotes");
  }

  if (quoteTabButton) {
    quoteTabButton.textContent = t("tabQuotes");
  }

  if (backLink) {
    if (fromParam === "bookclub") {
      backLink.href = "bookclub.html";
      backLink.textContent = `< ${t("backToBookClubArchive")}`;
    } else {
      const savedCountry = sessionStorage.getItem("enk_journal_country");
      const backParams = new URLSearchParams();
      if (countryParam || savedCountry) {
        backParams.set("country", countryParam || savedCountry);
      }
      if (searchParam) {
        backParams.set("q", searchParam);
      }
      const anchor = fromParam === "book" ? "#book-shelf" : "#film-shelf";
      const query = backParams.toString();
      backLink.href = `journal.html${query ? `?${query}` : ""}${anchor}`;
      backLink.textContent = `< ${t("backToArchive")}`;
    }
  }

  setActiveTab(state.activeTab === "quotes" ? "quotes" : "notes");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".section-reveal").forEach((section) => {
    observer.observe(section);
  });
}

function setActiveTab(tabName) {
  const notesTab = document.querySelector("#tab-notes");
  const quotesTab = document.querySelector("#tab-quotes");
  const notesPanel = document.querySelector("#panel-notes");
  const quotesPanel = document.querySelector("#panel-quotes");

  const notesActive = tabName === "notes";
  const quotesActive = tabName === "quotes";

  notesTab?.classList.toggle("is-active", notesActive);
  quotesTab?.classList.toggle("is-active", quotesActive);
  notesPanel?.classList.toggle("is-active", notesActive);
  quotesPanel?.classList.toggle("is-active", quotesActive);

  if (notesActive || quotesActive) {
    state.activeTab = tabName;
  } else {
    state.activeTab = "notes";
  }
}

const langButtons = document.querySelectorAll(".lang-button");
langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.langSwitch;
    localStorage.setItem("enk_lang", state.lang);
    applyLanguage();
    loadEntry();
  });
});

const tabButtons = document.querySelectorAll(".tab-button");
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.style.display === "none") {
      return;
    }
    setActiveTab(button.dataset.tab);
  });
});

applyLanguage();
loadEntry();
