// Deterministic procedural data generator for BearLand Network community.
// Produces 500+ members, 1100+ forum topics, 5000+ replies, paginated.
// Uses a seeded RNG so SSR and client hydrate identically.

import { FORUM_CATEGORIES } from "./site-data";

/* ----------------------------- Seeded RNG ----------------------------- */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20180714); // BearLand founding seed
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
const intBetween = (a: number, b: number) => a + Math.floor(rand() * (b - a + 1));
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[ёе]/g, "e")
    .replace(/[^a-zа-я0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

/* ------------------------------ Members ------------------------------ */
const PREFIX = [
  "Bear", "Wild", "Shadow", "Iron", "Gold", "Sky", "Night", "Storm", "Frost",
  "Fire", "Dragon", "Wolf", "Tiger", "Lion", "Phoenix", "Mystic", "Cyber",
  "Pixel", "Block", "Mine", "Craft", "Diamond", "Emerald", "Ruby", "Crystal",
  "Dark", "Light", "Pro", "Epic", "Legend", "King", "Queen", "Lord", "Master",
  "Slayer", "Hunter", "Reaper", "Ghost", "Demon", "Angel", "Bear", "Toxic",
  "Silent", "Loud", "Quick", "Slow", "Mad", "Cool", "Hot", "Cold", "Sharp",
];
const SUFFIX = [
  "_99", "Pro", "_X", "RU", "MC", "King", "TV", "YT", "Plays", "Gaming",
  "Crafter", "Miner", "Builder", "Bear", "Wolf", "228", "777", "1337", "_HD",
  "Real", "OG", "Boss", "Slayer", "Master", "_2K", "Live", "Hero", "_xX",
];
const FIRST = [
  "Alex", "Max", "Ivan", "Dmitry", "Nikita", "Anton", "Sergey", "Vlad", "Andrey",
  "Mike", "John", "Chris", "Daniel", "Roman", "Pavel", "Yan", "Egor", "Ilya",
  "Anna", "Mary", "Olga", "Kate", "Nika", "Sasha", "Lera", "Polina",
];

function genUsername(i: number) {
  const r = rand();
  if (r < 0.4) return pick(PREFIX) + pick(SUFFIX);
  if (r < 0.7) return pick(PREFIX) + pick(PREFIX);
  if (r < 0.85) return pick(FIRST) + intBetween(10, 9999);
  return pick(PREFIX) + intBetween(10, 9999);
}

const STAFF: { username: string; role: string; bio: string }[] = [
  { username: "BearAdmin", role: "Owner", bio: "Основатель BearLand Network. С 2018 года." },
  { username: "WildBear", role: "Co-Owner", bio: "Сооснователь, разработчик Anarchy 2.0." },
  { username: "SkyMaster", role: "Lead Dev", bio: "Главный разработчик режима SkyPvP." },
  { username: "EconomyBear", role: "Economy Lead", bio: "Куратор BearCoin и аукциона." },
  { username: "TechBear", role: "Sysadmin", bio: "Инфраструктура и Bedrock прокси." },
  { username: "GuardLead", role: "Anti-Cheat", bio: "Разработчик BearGuard." },
  { username: "EventMod", role: "Head of Events", bio: "Ивенты, турниры и конкурсы." },
  { username: "HelpBear", role: "Support Lead", bio: "Координатор техподдержки." },
  { username: "HRBear", role: "HR", bio: "Набор и обучение модерации." },
  { username: "WebTeam", role: "Web", bio: "Сайт и форум BearLand." },
  { username: "BearGuard", role: "Anti-Cheat Bot", bio: "Автоматический античит." },
  { username: "PaymentBear", role: "Payments", bio: "Платежи и BearCoin." },
  { username: "TourneyMod", role: "Tournament Mod", bio: "Турниры SkyPvP и KitPvP." },
  { username: "SkinHelper", role: "Skin Moderator", bio: "Проверка кастомных скинов." },
  { username: "ArtBear", role: "Community Artist", bio: "Арт и оформление." },
];

export interface Member {
  username: string;
  joined: string;
  posts: number;
  reputation: number;
  rank: string;
  isStaff: boolean;
  role?: string;
  bio?: string;
  hue: number;
}

const RANKS = ["Default", "Bronze Bear", "Silver Bear", "Golden Bear", "Diamond Bear", "Mythic Bear", "Eternal Bear", "BearPrime"];

function memberFromUsername(username: string, i: number, isStaff = false, role?: string, bio?: string): Member {
  const joinYear = intBetween(2018, 2025);
  const joinMonth = intBetween(1, 12);
  const joinDay = intBetween(1, 28);
  return {
    username,
    joined: `${joinYear}-${String(joinMonth).padStart(2, "0")}-${String(joinDay).padStart(2, "0")}`,
    posts: isStaff ? intBetween(800, 6000) : intBetween(0, 1200),
    reputation: isStaff ? intBetween(200, 2000) : intBetween(-20, 400),
    rank: isStaff ? "Eternal Bear" : RANKS[Math.min(RANKS.length - 1, Math.floor(rand() * RANKS.length))],
    isStaff,
    role,
    bio,
    hue: Math.floor(rand() * 360),
  };
}

const MEMBERS_TARGET = 520;
const usernameSet = new Set<string>();
export const MEMBERS: Member[] = [];

STAFF.forEach((s, i) => {
  usernameSet.add(s.username.toLowerCase());
  MEMBERS.push(memberFromUsername(s.username, i, true, s.role, s.bio));
});

while (MEMBERS.length < MEMBERS_TARGET) {
  const u = genUsername(MEMBERS.length);
  if (usernameSet.has(u.toLowerCase())) continue;
  usernameSet.add(u.toLowerCase());
  MEMBERS.push(memberFromUsername(u, MEMBERS.length));
}

export const MEMBERS_BY_NAME: Record<string, Member> = {};
MEMBERS.forEach((m) => (MEMBERS_BY_NAME[m.username.toLowerCase()] = m));

export const STAFF_MEMBERS = MEMBERS.filter((m) => m.isStaff);

/* ------------------------------ Topics ------------------------------- */

interface TitleTemplate {
  patterns: string[];
  pinned?: string[];
}

const TEMPLATES: Record<string, TitleTemplate> = {
  "6-novosti-servera": {
    pinned: [
      "Прочитайте перед публикацией: правила раздела «Новости»",
      "Архив новостей BearLand 2018–2024",
    ],
    patterns: [
      "Анонс нового сезона {mode}",
      "BearLand преодолел {n} миллионов уникальных игроков",
      "Партнёрство с {brand}",
      "Открытие нового сервера {mode}",
      "Релиз BearLand {year}.{minor}",
      "Итоги месяца на BearLand — {month}",
      "Обновление политики конфиденциальности",
      "Открыт набор модераторов на {mode}",
      "Возвращение легендарного режима {mode}",
      "Новый дизайн сайта — обратная связь",
      "Большое интервью с {staff}",
      "BearLand на конференции {brand}",
      "Запуск официального магазина BearCoin",
      "Поддержка Minecraft {year}.{minor} добавлена",
      "Юбилей сервера — {n} лет вместе",
    ],
  },
  "7-obnovleniya": {
    pinned: ["Где смотреть полный changelog", "Как тестировать на PTR"],
    patterns: [
      "{mode} {ver} — полный changelog",
      "Патч {ver}: баланс китов на {mode}",
      "Hotfix {ver} — исправление дюпа",
      "Новые мобы в режиме {mode}",
      "Bedrock {ver} — совместимость и фиксы",
      "BearGuard {ver}: античит улучшен",
      "Reworked /ah аукцион — patch {ver}",
      "Оптимизация TPS на {mode}",
      "Новая карта для {mode}",
      "Patch {ver}: новые киты и арены",
      "Обновление лобби и навигации",
      "Серверная миграция — что изменится",
      "Новый бэкап-сценарий миров",
      "Java {year}.{minor} полная поддержка",
      "Smart-Drop система — патч {ver}",
    ],
  },
  "8-konkursi-i-sobitiya": {
    pinned: ["Календарь ивентов на год", "Правила участия в конкурсах"],
    patterns: [
      "Турнир {mode} — призовой фонд {n}k BC",
      "Конкурс построек: тема «{theme}»",
      "Хеллоуин {year} — ивент-квест",
      "Новогодний ивент BearFest {year}",
      "Война Альянсов — сезон {n}",
      "Лотерея BearCoin — неделя {n}",
      "Speedrun турнир по {mode}",
      "Конкурс скинов «{theme}»",
      "PvP-баттл 2v2 — открытая регистрация",
      "Конкурс ремейков билдов 2018 года",
      "Скриншот-марафон от EventMod",
      "Конкурс мемов про BearLand",
      "Викторина по лору сервера",
      "Кубок {mode} — финал {month}",
      "Гильдийная битва — отбор",
    ],
  },
  "11-otveti-na-voprosi": {
    pinned: ["FAQ: первые шаги новичка", "Список команд сервера"],
    patterns: [
      "Как привязать Java и Bedrock?",
      "Как купить BearCoin без карты?",
      "Что делать если потерял пароль?",
      "Как открыть приватный регион?",
      "Команда /tpa не работает — что делать?",
      "Можно ли играть с другом на разных платформах?",
      "Где найти список команд {mode}?",
      "Как сменить ник на сервере?",
      "Почему меня кикает при заходе?",
      "Как пожаловаться на читера?",
      "Как получить YouTube статус?",
      "Как поднять FPS на Bedrock-клиенте?",
      "Почему не зачисляется BearCoin?",
      "Куда писать о баге?",
      "Как выйти из альянса?",
    ],
  },
  "14-zhalobi-na-igrokov": {
    pinned: ["Шаблон жалобы — обязательно", "Какие доказательства принимаются"],
    patterns: [
      "Жалоба на {user} — KillAura",
      "Жалоба на {user} — FlyHack",
      "Жалоба на {user} — оскорбления в чате",
      "Жалоба на {user} — реклама стороннего сервера",
      "Жалоба на {user} — X-Ray",
      "Жалоба на {user} — гриф приватной зоны",
      "Жалоба на {user} — скам с BearCoin",
      "Жалоба на {user} — угрозы DDoS",
      "Жалоба на {user} — спам в /msg",
      "Жалоба на {user} — обход мута",
      "Жалоба на {user} — Reach 4.5",
      "Жалоба на {user} — Auto-Clicker",
      "Жалоба на {user} — токсичность",
      "Жалоба на {user} — обман в /trade",
      "Жалоба на {user} — фейк-донат",
    ],
  },
  "15-obzhalovanie-nakazaniya": {
    pinned: ["Шаблон обжалования", "Сроки рассмотрения обжалований"],
    patterns: [
      "Обжалование бана за X-Ray (ID #{id})",
      "Мут за капс — обжалование",
      "Бан по IP — снять пожалуйста",
      "Обжалование мута за оскорбление",
      "Бан за рекламу — это был мой друг",
      "Обжалование кика за никнейм",
      "Бан за читы — играл с альта (ID #{id})",
      "Обжалование warn за капс",
      "Бан за гриф — был приват",
      "Обжалование 30d бана (ID #{id})",
      "Сняли BearCoin — не понимаю причину",
      "Обжалование перм-бана от {year}",
      "Бан за дюп — не дюпил",
      "Обжалование автоматического бана BearGuard",
      "Снятие ника — обжалование",
    ],
  },
  "16-soobshenie-o-bagah": {
    pinned: ["Как сообщить о баге правильно", "Что НЕ считается багом"],
    patterns: [
      "Дюп в /ah при отмене лота",
      "Глюк телепортации на {mode}",
      "Невидимый блок на спавне {mode}",
      "Падение TPS при 200+ онлайн",
      "Чат пропадает после /msg",
      "Скин не отображается на Bedrock",
      "Команда /kit не работает",
      "Краш клиента при заходе на {mode}",
      "Зависание мобов в чанке",
      "BearCoin не зачислился после доната",
      "Звук дождя не выключается",
      "Карта /map выдаёт пустоту",
      "Воркшоп бан — баг с временем",
      "Очередь лагает на {mode}",
      "Команда /home теряет точку",
    ],
  },
  "17-youtube-status": {
    pinned: ["Условия получения YouTube статуса", "Условия Twitch статуса"],
    patterns: [
      "Заявка от {user} ({n}k подписчиков)",
      "Twitch-заявка от {user} (avg {n} зрителей)",
      "Повторная заявка YT — {user}",
      "Заявка TikTok-канал {user} ({n}k подп.)",
      "Заявка на статус Streamer — {user}",
      "Заявка от {user} — YouTube Shorts ({n}k)",
      "Заявка от {user} — обновлённая статистика",
      "Заявка на статус Partner — {user}",
      "Заявка от {user} ({n}k подп., {n} видео по серверу)",
    ],
  },
  "18-otzivi-o-rabote-personala": {
    patterns: [
      "Спасибо {staff} за быстрый ответ",
      "Отличная работа модерации в чате",
      "Критика работы {staff}",
      "{staff} — лучший модератор",
      "Жалоба на бездействие модерации",
      "Положительный отзыв о {staff}",
      "Хвала отделу ивентов",
      "Слишком долгое рассмотрение жалоб",
      "Спасибо команде поддержки",
      "Конструктивная критика правил",
      "{staff} реально помог",
      "Просьба к {staff} ответить в ЛС",
    ],
  },
  "19-zagruzka-skina": {
    pinned: ["Как загрузить скин на Bedrock", "Правила публикации скинов"],
    patterns: [
      "Скин «{theme}» для Bedrock (4D)",
      "Делюсь паком скинов — {theme}",
      "Скин-кастом {theme} Java",
      "Анимированный скин «{theme}»",
      "Скин на конкурс {theme}",
      "Скин Anime — {theme}",
      "Скин «{theme}» (high-res)",
      "HD-скин {theme} для PvP",
      "Скин с эмиссией {theme}",
      "Прозрачный скин-эффект {theme}",
      "Скин под BearPrime — {theme}",
      "Серия скинов {theme} — 5 шт",
    ],
  },
  "20-permanentnie-nakazaniya": {
    patterns: [
      "PermBan: {user} — X-Ray",
      "PermBan: {user} — рецидив оскорблений",
      "PermBan: {user} — мошенничество с BearCoin",
      "PermBan: {user} — обход бана альтами",
      "PermBan: {user} — DDoS-угрозы",
      "PermBan: {user} — реклама сторонних серверов",
      "PermBan: {user} — KillAura + Reach",
      "PermBan: {user} — дюп аукциона",
      "PermBan: {user} — фейк-донат скам",
      "PermBan: {user} — гриф приватных зон",
      "PermBan: {user} — обход анти-чита",
      "PermBan: {user} — фишинг ссылок",
    ],
  },
};

const MODES = ["SkyPvP", "Anarchy", "Survival", "KitPvP", "Prison", "Bedrock Lobby", "Economy", "BedWars", "Lobby"];
const BRANDS = ["MinePlay Studios", "GeyserMC", "Lunar Client", "Modrinth", "BadlionTeam", "PaperMC Foundation"];
const THEMES = ["Средневековый замок", "Космический корабль", "Самурай", "Викинги", "Стимпанк", "Магический лес", "Зимний город", "Пустыня", "Подводный мир", "Дракон", "Робот", "Зомби"];
const MONTHS = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

function fillTemplate(t: string): string {
  return t
    .replace(/\{mode\}/g, () => pick(MODES))
    .replace(/\{brand\}/g, () => pick(BRANDS))
    .replace(/\{theme\}/g, () => pick(THEMES))
    .replace(/\{month\}/g, () => pick(MONTHS))
    .replace(/\{year\}/g, () => String(intBetween(2023, 2026)))
    .replace(/\{minor\}/g, () => String(intBetween(1, 20)))
    .replace(/\{ver\}/g, () => `${intBetween(1, 5)}.${intBetween(0, 9)}.${intBetween(0, 9)}`)
    .replace(/\{n\}/g, () => String(intBetween(2, 250)))
    .replace(/\{id\}/g, () => String(intBetween(10000, 99999)))
    .replace(/\{user\}/g, () => pick(MEMBERS).username)
    .replace(/\{staff\}/g, () => pick(STAFF_MEMBERS).username);
}

export interface Topic {
  id: number;
  slug: string;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  author: string;
  authorHue: number;
  createdAt: string; // ISO
  lastReplyAt: string;
  lastReplyAuthor: string;
  views: number;
  replyCount: number;
  pinned?: boolean;
  hot?: boolean;
}

const START = Date.parse("2023-01-01T00:00:00Z");
const END = Date.parse("2026-06-10T00:00:00Z");
function randomDate(min = START, max = END): number {
  return min + Math.floor(rand() * (max - min));
}
function isoDate(ts: number) {
  return new Date(ts).toISOString().slice(0, 10);
}

export const TOPICS: Topic[] = [];
const topicsByCat: Record<string, Topic[]> = {};
let nextTopicId = 1000;

for (const cat of FORUM_CATEGORIES) {
  const tpl = TEMPLATES[cat.slug];
  if (!tpl) continue;
  topicsByCat[cat.slug] = [];
  const target = intBetween(100, 130);

  // Pinned first
  (tpl.pinned ?? []).forEach((title) => {
    const id = nextTopicId++;
    const author = pick(STAFF_MEMBERS);
    const created = randomDate(START, START + (END - START) * 0.2);
    TOPICS.push({
      id,
      slug: `${id}-${slugify(title)}`,
      title,
      categorySlug: cat.slug,
      categoryTitle: cat.title,
      author: author.username,
      authorHue: author.hue,
      createdAt: isoDate(created),
      lastReplyAt: isoDate(randomDate(created, END)),
      lastReplyAuthor: pick(MEMBERS).username,
      views: intBetween(8000, 40000),
      replyCount: intBetween(0, 4),
      pinned: true,
    });
  });

  for (let i = 0; i < target; i++) {
    const author = pick(MEMBERS);
    const title = fillTemplate(pick(tpl.patterns));
    const id = nextTopicId++;
    const created = randomDate();
    const replyCount = Math.max(0, Math.round((rand() * rand()) * 60));
    const lastReply = replyCount === 0 ? created : randomDate(created, Math.min(END, created + 1000 * 60 * 60 * 24 * 90));
    TOPICS.push({
      id,
      slug: `${id}-${slugify(title)}`.slice(0, 80),
      title,
      categorySlug: cat.slug,
      categoryTitle: cat.title,
      author: author.username,
      authorHue: author.hue,
      createdAt: isoDate(created),
      lastReplyAt: isoDate(lastReply),
      lastReplyAuthor: replyCount === 0 ? author.username : pick(MEMBERS).username,
      views: intBetween(20, 12000),
      replyCount,
      hot: replyCount > 40,
    });
  }
}

// Sort each category by lastReplyAt desc (pinned first)
for (const t of TOPICS) {
  if (!topicsByCat[t.categorySlug]) topicsByCat[t.categorySlug] = [];
  topicsByCat[t.categorySlug].push(t);
}
for (const slug of Object.keys(topicsByCat)) {
  topicsByCat[slug].sort((a, b) => {
    if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
    return b.lastReplyAt.localeCompare(a.lastReplyAt);
  });
}

export const TOPICS_BY_CATEGORY = topicsByCat;
export const TOPICS_BY_SLUG: Record<string, Topic> = {};
TOPICS.forEach((t) => (TOPICS_BY_SLUG[t.slug] = t));

// Topic counts per category (real)
export const CATEGORY_STATS: Record<string, { topics: number; posts: number; lastTopic?: Topic }> = {};
for (const cat of FORUM_CATEGORIES) {
  const list = topicsByCat[cat.slug] ?? [];
  const posts = list.reduce((s, t) => s + 1 + t.replyCount, 0);
  CATEGORY_STATS[cat.slug] = { topics: list.length, posts, lastTopic: list.find((t) => !t.pinned) ?? list[0] };
}

// Recent topics for sidebars / search
export const RECENT_TOPICS = [...TOPICS]
  .filter((t) => !t.pinned)
  .sort((a, b) => b.lastReplyAt.localeCompare(a.lastReplyAt))
  .slice(0, 50);

/* ------------------------------ Replies ------------------------------ */

const REPLY_TEMPLATES = [
  "Поддерживаю, давно ждал этого.",
  "А что насчёт Bedrock-версии?",
  "У меня та же проблема, +1.",
  "Спасибо команде за работу.",
  "Можно подробнее про баланс?",
  "Скрин в студию.",
  "В прошлый раз обещали то же самое.",
  "Когда выкатят на основной сервер?",
  "Лично проверял — работает.",
  "Не воспроизводится у меня.",
  "Тестировал на PTR — норм.",
  "Это уже обсуждали в другой теме.",
  "Согласен с автором.",
  "Категорически против.",
  "BearCoin вернули?",
  "Ждём официального ответа модерации.",
  "Подниму тему, актуально.",
  "Старый баг, удивлён что вернулся.",
  "А логи приложишь?",
  "Видео есть?",
  "Закрывайте, дубль.",
  "Перенесите в правильный раздел.",
  "BearGuard ловит таких автоматом.",
  "С этим в /support.",
  "Уже исправили в патче 4.2.",
  "Скоро будет ответ от админа.",
];

export interface Reply {
  id: number;
  author: string;
  authorHue: number;
  body: string;
  createdAt: string;
}

export function getReplies(topic: Topic): Reply[] {
  if (topic.replyCount === 0) return [];
  // Local RNG seeded by topic id for stability without polluting global rand state
  const local = mulberry32(topic.id * 9973 + 7);
  const startTs = Date.parse(topic.createdAt + "T12:00:00Z");
  const endTs = Date.parse(topic.lastReplyAt + "T12:00:00Z");
  const out: Reply[] = [];
  for (let i = 0; i < topic.replyCount; i++) {
    const m = MEMBERS[Math.floor(local() * MEMBERS.length)];
    const tpl = REPLY_TEMPLATES[Math.floor(local() * REPLY_TEMPLATES.length)];
    const ts = startTs + Math.floor(local() * Math.max(1, endTs - startTs));
    out.push({
      id: i + 1,
      author: m.username,
      authorHue: m.hue,
      body: tpl,
      createdAt: new Date(ts).toISOString().slice(0, 10),
    });
  }
  out.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  return out;
}

/* ------------------------------ Helpers ------------------------------ */

export function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const p = Math.min(Math.max(1, page), pages);
  const start = (p - 1) * perPage;
  return { items: items.slice(start, start + perPage), page: p, pages, total };
}

export function searchAll(q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return { topics: [] as Topic[], members: [] as Member[] };
  return {
    topics: TOPICS.filter((t) => t.title.toLowerCase().includes(needle)).slice(0, 60),
    members: MEMBERS.filter((m) => m.username.toLowerCase().includes(needle)).slice(0, 40),
  };
}

export const TOTAL_TOPICS = TOPICS.length;
export const TOTAL_POSTS = TOPICS.reduce((s, t) => s + 1 + t.replyCount, 0);
export const TOTAL_MEMBERS = MEMBERS.length;
