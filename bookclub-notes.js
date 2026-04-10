const translations = {
  en: {
    navAria: "Main navigation",
    navAbout: "About",
    navWork: "Work",
    navResearch: "Research",
    navCorner: "Personal Archive",
    navJournal: "Journal",
    navContact: "Contact",
    backToBookClub: "Back to Book Club",
    unknownSession: "Unknown session",
    authorLabel: "Author",
    moderatorLabel: "Moderator",
    dateLabel: "Date",
    noModerator: "Open moderator",
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
    backToBookClub: "Kitap Kulubune Don",
    unknownSession: "Bilinmeyen oturum",
    authorLabel: "Yazar",
    moderatorLabel: "Moderator",
    dateLabel: "Tarih",
    noModerator: "Moderator acik",
    footerText: "Son guncelleme: 2026-04-04",
  },
};

const state = {
  lang: localStorage.getItem("enk_lang") || "en",
};

function getSharedLastUpdated() {
  const value = typeof siteData !== "undefined" ? siteData?.lastUpdated : "";
  return typeof value === "string" && value.trim() ? value.trim() : "2026-04-10";
}

function getFooterText() {
  const date = getSharedLastUpdated();
  return state.lang === "tr" ? `Son guncelleme: ${date}` : `Last updated in ${date}`;
}

function t(key) {
  return translations[state.lang][key] || key;
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

function formatBookClubDate(value) {
  const raw = (value || "").trim();
  if (!raw) {
    return "";
  }

  const dotDateMatch = raw.match(/^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4})$/);
  if (dotDateMatch) {
    const monthNumber = parseInt(dotDateMatch[2], 10);
    const year = dotDateMatch[3];
    if (monthNumber >= 1 && monthNumber <= 12) {
      return `${englishMonthNames[monthNumber - 1]} ${year}`;
    }
  }

  const words = normalizeLetters(raw).split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    const yearCandidate = words.find((part) => /^\d{4}$/.test(part));
    const monthCandidate = words.find((part) => monthNameToNumber[part]);
    if (yearCandidate && monthCandidate) {
      const monthNumber = monthNameToNumber[monthCandidate];
      return `${englishMonthNames[monthNumber - 1]} ${yearCandidate}`;
    }
  }

  return raw;
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

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.langSwitch === state.lang);
  });
}

function renderNotesHeader() {
  const title = document.querySelector("#notes-title");
  const meta = document.querySelector("#notes-meta");
  if (!title || !meta || typeof bookClubEntries === "undefined" || !Array.isArray(bookClubEntries)) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("entry");
  const entry = bookClubEntries.find((item) => item.slug === slug);

  if (!entry) {
    title.textContent = t("unknownSession");
    meta.textContent = "";
    return;
  }

  title.textContent = entry.book;
  const authorText = Array.isArray(entry.authors) ? entry.authors.join(", ") : "";
  const dateText = formatBookClubDate(entry.date);
  const metaParts = [
    authorText ? `${t("authorLabel")}: ${authorText}` : "",
    dateText ? `${t("dateLabel")}: ${dateText}` : "",
    `${t("moderatorLabel")}: ${entry.moderator || t("noModerator")}`,
  ].filter(Boolean);
  meta.textContent = metaParts.join(" • ");
}

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.langSwitch;
    localStorage.setItem("enk_lang", state.lang);
    applyLanguage();
    renderNotesHeader();
  });
});

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

document.querySelectorAll(".section-reveal").forEach((section) => observer.observe(section));

applyLanguage();
renderNotesHeader();
