const translations = {
  en: {
    navAria: "Main navigation",
    navAbout: "About",
    navWork: "Work",
    navResearch: "Research",
    navCorner: "Personal Archive",
    navJournal: "Journal",
    navContact: "Contact",
    backToHome: "Back to Homepage",
    bookClubTitle: "Book Club",
    bookClubIntro:
      "What began in 2023 as a small gathering of three friends has gradually grown into a circle that now stretches across countries and time zones. Yet, distance and difference have not kept us apart. For over three years, we have continued reading and discussing together. Over time, our group has expanded, and today we continue this journey with Berfin, Zeyneb, Seda, Zeynep, Rana, and myself. We remain open to curious readers who find joy in books as we do.",
    moderatorLabel: "Moderator",
    authorLabel: "Author",
    dateLabel: "Date",
    timelineSummary: "21 book club sessions since 2023",
    readingHabitsLabel: "Reading Habits",
    relatedBooksLabel: "Discussed books",
    openNotesLabel: "Open meeting notes",
    openBookPageLabel: "Open book page",
    noPhotoText: "Sometimes we forgot to take photos :(",
    noDate: "Who knows when",
    noModerator: "Open moderator",
    bookClubCount: "{count} sessions",
    empty: "No book club entries found yet.",
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
    backToHome: "Ana Sayfaya Don",
    bookClubTitle: "Kitap Kulubu",
    bookClubIntro:
      "2023'te uc arkadasin kucuk bir bulusmasi olarak baslayan bu kitap kulubu, zamanla ulkeleri ve saat dilimlerini asan bir cevree donustu. Buna ragmen mesafe ve farklilik bizi ayirmadi. Uc yili askin suredir birlikte okumaya ve tartismaya devam ediyoruz. Zaman icinde grubumuz buyudu; bugun bu yolculugu Berfin, Zeyneb, Seda, Zeynep, Rana ve ben surduruyoruz. Kitaplarda bizim gibi keyif bulan merakli okurlara kapimiz acik.",
    moderatorLabel: "Moderator",
    authorLabel: "Yazar",
    dateLabel: "Tarih",
    timelineSummary: "2023'ten bu yana 21 kitap kulubu oturumu",
    readingHabitsLabel: "Okuma Aliskanliklari",
    relatedBooksLabel: "Konusulan kitaplar",
    openNotesLabel: "Toplanti notlarini ac",
    openBookPageLabel: "Kitap sayfasini ac",
    noPhotoText: "Bazen foto cekmeyi unutmusuz :(",
    noDate: "Kim bilir ne zaman",
    noModerator: "Moderator acik",
    bookClubCount: "{count} oturum",
    empty: "Henuz kitap kulubu kaydi yok.",
    footerText: "Son guncelleme: 2026-04-04",
  },
};

const state = {
  lang: localStorage.getItem("enk_lang") || "en",
};

function t(key) {
  return translations[state.lang][key] || key;
}

function applyLanguage() {
  document.documentElement.lang = state.lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    node.setAttribute("aria-label", t(key));
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    const isActive = button.dataset.langSwitch === state.lang;
    button.classList.toggle("is-active", isActive);
  });
}

function sortByLatest(entries) {
  return [...entries].sort((a, b) => {
    const sa = a.sortKey || "";
    const sb = b.sortKey || "";
    if (sa && sb) {
      return sb.localeCompare(sa);
    }
    if (sb) {
      return 1;
    }
    if (sa) {
      return -1;
    }
    return (a.book || "").localeCompare(b.book || "", state.lang);
  });
}

const englishMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const turkishMonthNames = [
  "Ocak",
  "Subat",
  "Mart",
  "Nisan",
  "Mayis",
  "Haziran",
  "Temmuz",
  "Agustos",
  "Eylul",
  "Ekim",
  "Kasim",
  "Aralik",
];

const monthNameToNumber = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
  ocak: 1,
  subat: 2,
  mart: 3,
  nisan: 4,
  mayis: 5,
  haziran: 6,
  temmuz: 7,
  agustos: 8,
  eylul: 9,
  ekim: 10,
  kasim: 11,
  aralik: 12,
};

function normalizeLetters(value) {
  return (value || "")
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u");
}

function compactText(value) {
  return normalizeLetters(value || "").replace(/[^a-z0-9]/g, "");
}

function buildBookEntryLookup() {
  const entries = typeof bookEntries !== "undefined" && Array.isArray(bookEntries) ? bookEntries : [];
  const lookup = new Map();

  entries.forEach((entry) => {
    const trTitle = entry?.title?.tr || "";
    const enTitle = entry?.title?.en || "";
    const creator = entry?.creator || "";
    const keys = [compactText(trTitle), compactText(enTitle)].filter(Boolean);
    keys.forEach((key) => {
      if (!lookup.has(key)) {
        lookup.set(key, []);
      }
      lookup.get(key).push(entry);
    });
    if (creator) {
      const creatorKey = compactText(creator);
      if (creatorKey) {
        if (!lookup.has(creatorKey)) {
          lookup.set(creatorKey, []);
        }
        lookup.get(creatorKey).push(entry);
      }
    }
  });

  return lookup;
}

function resolveBookEntryForClubItem(entry, bookLookup) {
  const candidates = [];
  const keys = [compactText(entry.book), compactText(entry.englishTitle)].filter(Boolean);

  keys.forEach((key) => {
    const items = bookLookup.get(key) || [];
    items.forEach((item) => {
      if (!candidates.includes(item)) {
        candidates.push(item);
      }
    });
  });

  if (!candidates.length) {
    return null;
  }

  const authorKeys = (Array.isArray(entry.authors) ? entry.authors : [])
    .map((author) => compactText(author))
    .filter(Boolean);

  if (authorKeys.length) {
    const byAuthor = candidates.find((item) => {
      const creatorKey = compactText(item?.creator || "");
      return creatorKey && authorKeys.some((authorKey) => creatorKey.includes(authorKey) || authorKey.includes(creatorKey));
    });
    if (byAuthor) {
      return byAuthor;
    }
  }

  return candidates[0];
}

function formatBookClubDate(value) {
  const parsed = parseBookClubDate(value);
  if (!parsed) {
    return (value || "").trim() || t("noDate");
  }
  const monthNames = state.lang === "tr" ? turkishMonthNames : englishMonthNames;
  return `${monthNames[parsed.monthNumber - 1]} ${parsed.year}`;
}

function parseBookClubDate(value) {
  const raw = (value || "").trim();
  if (!raw) {
    return null;
  }

  const dotDateMatch = raw.match(/^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4})$/);
  if (dotDateMatch) {
    const monthNumber = parseInt(dotDateMatch[2], 10);
    const year = parseInt(dotDateMatch[3], 10);
    if (monthNumber >= 1 && monthNumber <= 12) {
      return { monthNumber, year };
    }
  }

  const words = normalizeLetters(raw).split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    const yearCandidate = words.find((part) => /^\d{4}$/.test(part));
    const monthCandidate = words.find((part) => monthNameToNumber[part]);
    if (yearCandidate && monthCandidate) {
      const monthNumber = monthNameToNumber[monthCandidate];
      return { monthNumber, year: parseInt(yearCandidate, 10) };
    }
  }

  return null;
}

function buildTimelineSummary(entries) {
  if (!entries.length) {
    return "";
  }
  return t("timelineSummary");
}

function renderBookClubPage() {
  const grid = document.querySelector("#bookclub-grid");
  const count = document.querySelector("#bookclub-count");
  const timeline = document.querySelector("#bookclub-timeline");

  if (!grid || typeof bookClubEntries === "undefined" || !Array.isArray(bookClubEntries)) {
    if (grid) {
      grid.innerHTML = `<p class="empty-state">${t("empty")}</p>`;
    }
    if (count) {
      count.textContent = t("bookClubCount").replace("{count}", "0");
    }
    return;
  }

  const sorted = sortByLatest(bookClubEntries);
  const bookLookup = buildBookEntryLookup();
  count.textContent = t("bookClubCount").replace("{count}", `${sorted.length}`);
  if (timeline) {
    timeline.textContent = buildTimelineSummary(sorted);
  }

  if (sorted.length === 0) {
    grid.innerHTML = `<p class="empty-state">${t("empty")}</p>`;
    return;
  }

  grid.innerHTML = sorted
    .map((entry) => {
      const displayTitle =
        state.lang === "tr"
          ? (entry.book || entry.englishTitle)
          : (entry.englishTitle || entry.book);
      const authorText = Array.isArray(entry.authors) ? entry.authors.join(", ") : "";
      const authorLine = authorText ? `<p class="journal-meta">${t("authorLabel")}: ${authorText}</p>` : "";
      const dateValue = formatBookClubDate(entry.date);
      const parsedDate = parseBookClubDate(entry.date);
      const fancyDate = parsedDate
        ? `<div class="bookclub-date-stack"><p class="journal-meta bookclub-date-caption">${t("dateLabel")}</p><div class="bookclub-date-badge"><span class="bookclub-date-month">${dateValue}</span></div></div>`
        : `<p class="journal-meta">${t("dateLabel")}: ${dateValue}</p>`;
      const moderatorLine = `<p class="journal-meta">${t("moderatorLabel")}: ${entry.moderator || t("noModerator")}</p>`;
      const photoHtml = entry.photoUrl
        ? `<img class="bookclub-cover" src="${entry.photoUrl}" alt="${displayTitle} cover" loading="lazy" onerror="this.style.display='none'" />`
        : `<div class="bookclub-cover bookclub-cover-fallback">${t("noPhotoText")}</div>`;
      const relatedBookList =
        state.lang === "tr"
          ? (entry.relatedBooksTr || entry.relatedBooks || [])
          : (entry.relatedBooksEn || entry.relatedBooks || []);
      const relatedBooks = Array.isArray(relatedBookList) && relatedBookList.length > 0
        ? `<p class="journal-meta"><strong>${t("relatedBooksLabel")}:</strong> ${relatedBookList.join(", ")}</p>`
        : "";
      const description = entry.description ? `<p class="journal-meta">${entry.description}</p>` : "";
      const linkedBook = resolveBookEntryForClubItem(entry, bookLookup);
      const linkedBookHref = linkedBook ? `entry-detail.html?id=${encodeURIComponent(linkedBook.id)}&from=book` : "";
      const linkedBookHtml = linkedBookHref
        ? `<p class="journal-meta"><a href="${linkedBookHref}">${t("openBookPageLabel")}</a></p>`
        : "";
      const innerHtml = `
        <article class="bookclub-entry">
          ${photoHtml}
          <div class="bookclub-entry-body">
            <h3>${displayTitle}</h3>
            ${authorLine}
            ${fancyDate}
            ${moderatorLine}
            ${description}
            ${relatedBooks}
            ${linkedBookHtml}
          </div>
        </article>
      `;

      if (entry.isReadingHabits) {
        return innerHtml.replace(`<h3>${displayTitle}</h3>`, `<h3>${t("readingHabitsLabel")}</h3>`);
      }

      const href = `bookclub-notes.html?entry=${encodeURIComponent(entry.slug || "entry")}`;
      return `
        <a class="bookclub-entry-link" href="${href}" aria-label="${t("openNotesLabel")}: ${displayTitle}">
          ${innerHtml}
        </a>
      `;
    })
    .join("");
}

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.langSwitch;
    localStorage.setItem("enk_lang", state.lang);
    applyLanguage();
    renderBookClubPage();
  });
});

document.querySelectorAll(".section-reveal").forEach((section) => section.classList.add("is-visible"));

applyLanguage();
renderBookClubPage();
