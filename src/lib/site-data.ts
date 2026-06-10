export const SITE = {
  name: "BearLand Network",
  tagline: "Play. Survive. Conquer.",
  ip: "play.bear-land.net",
  bedrockIp: "bedrock.bear-land.net",
  bedrockPort: 19132,
  discord: "https://discord.gg/bearland",
  store: "/store",
  description:
    "BearLand Network is a premium Minecraft Java & Bedrock gaming community featuring SkyPvP, Anarchy, Survival, KitPvP, Prison, custom events and the legendary BearCoin economy.",
};

export interface Post {
  id: number;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  cover: string;
  body: string[];
  tags: string[];
}

export const POSTS: Post[] = [
  {
    id: 4,
    slug: "4-rangi-za-pokupky-bearcoin",
    title: "Ранги за покупки BearCoin — новая система наград",
    category: "Updates",
    author: "BearAdmin",
    date: "2023-08-14",
    excerpt:
      "Теперь каждое пополнение BearCoin приближает вас к эксклюзивным рангам, кейсам и привилегиям на всех серверах сети BearLand.",
    cover: "bearcoin",
    tags: ["bearcoin", "ranks", "economy", "rewards"],
    body: [
      "Команда BearLand Network с гордостью представляет полностью переработанную систему рангов за покупки внутриигровой валюты BearCoin. Долгие месяцы мы анализировали обратную связь от тысяч игроков, изучали лучшие практики мировых сетей вроде Hypixel и Mineplex, и пришли к решению создать прогрессивную систему, в которой каждое пополнение приносит ощутимую пользу.",
      "Раньше пополнение BearCoin давало только саму валюту. С новым обновлением вы получаете долгосрочные привилегии, которые сохраняются навсегда: чем больше совокупная сумма пополнений за всю историю аккаунта, тем выше ваш постоянный ранг.",
      "Список новых рангов: Bronze Bear (от 500 BC), Silver Bear (от 2 000 BC), Golden Bear (от 5 000 BC), Diamond Bear (от 12 000 BC), Mythic Bear (от 30 000 BC) и легендарный Eternal Bear (от 75 000 BC). Каждый ранг открывает дополнительные слоты в /ah аукционе, эксклюзивные префиксы в чате, доступ к закрытым PvP-аренам, увеличенный множитель опыта и ежемесячные кейсы с косметикой.",
      "Особое внимание мы уделили балансу между Pay-to-Win и Pay-to-Cosmetic. Все механические преимущества доступны и обычным игрокам через игровой гринд — донат лишь ускоряет получение визуальных эффектов, доступ к ивентам и сокращает рутину. Это принципиальная позиция BearLand Network: сервер должен оставаться честным.",
      "Кроме того, каждый донатер теперь получает уникальный значок в форуме и Discord, отображающий накопленный ранг. Значок синхронизируется автоматически благодаря нашему интеграционному API. Если вы хотите проверить свой текущий прогресс — введите команду /bearcoin progress прямо в игре.",
      "В рамках запуска обновления мы проводим двойное начисление BearCoin при любом пополнении до конца месяца. Это лучший момент, чтобы поддержать сервер и одновременно открыть себе доступ к новому контенту. Подробные условия акции опубликованы на странице магазина.",
      "Мы благодарим всё сообщество за идеи, баг-репорты и тесты на PTR-сервере. Ваш отклик — главная причина, по которой BearLand растёт. Вступайте в Discord, делитесь скриншотами своих новых префиксов и встречаемся на серверах!",
    ],
  },
  {
    id: 5,
    slug: "5-griferskoe-obnovlenie",
    title: "Гриферское обновление: Anarchy 2.0",
    category: "Updates",
    author: "WildBear",
    date: "2023-09-02",
    excerpt:
      "Полностью обновлённый режим Anarchy с улучшенной защитой от лагов, новой картой 60 000 × 60 000 и системой союзов.",
    cover: "anarchy",
    tags: ["anarchy", "pvp", "update", "griefing"],
    body: [
      "Anarchy — это душа BearLand Network. Режим без правил, где побеждает сильнейший, существует у нас уже больше трёх лет. Сегодня мы выпускаем самое крупное обновление в истории режима, которое мы внутри команды называем «Anarchy 2.0».",
      "Главное изменение — новая бесшовная карта размером 60 000 × 60 000 блоков с динамически генерируемыми руинами, заброшенными базами и природными ловушками. Карта построена на собственной форкнутой версии TerraFork, оптимизированной под нагрузку до 800 игроков онлайн без падения TPS.",
      "Мы внедрили новую античит-систему BearGuard, которая использует серверную верификацию хитов, скоростей и проверок взаимодействий. По нашим внутренним тестам количество ложных банов снизилось на 73%, а отлов читеров вырос в 4,2 раза. Если вас всё же неправильно забанила система — обжалование на форуме рассматривается в течение 24 часов.",
      "Система союзов /alliance позволяет объединяться до 50 игроков, делить общий хранилище, ставить общие точки уважения (TPA), помечать врагов и союзников цветами на карте. Альянсы могут вести войны: победа над вражеским альянсом приносит трофеи, которые отображаются в публичном таблоиде Hall of Fame.",
      "Гриф остаётся официально разрешённым. Однако теперь мы добавили механику Insurance: за определённую плату BearCoin вы можете застраховать сундук от взрыва на 72 часа. Эта механика создаёт интересный экономический выбор и не убивает дух Anarchy.",
      "В дополнение мы добавили 18 новых биомов: Ash Wastes, Bloodforest, Mirror Lakes и другие. В каждом биоме своя редкая добыча и уникальные мобы, многие из которых дроп BearCoin при убийстве. Карта будет жить минимум 6 месяцев без вайпа.",
      "Все изменения уже работают на основном Anarchy-сервере. Заходите на anarchy.bear-land.net, проверяйте новый контент и пишите свои отзывы в разделе форума «Обновления». До встречи в пустошах!",
    ],
  },
  {
    id: 6,
    slug: "6-obnovlenie-skypvp",
    title: "Обновление SkyPvP: новые киты и арены",
    category: "Updates",
    author: "SkyMaster",
    date: "2023-09-20",
    excerpt:
      "Шесть новых китов, четыре полностью переработанные арены и сезонная рейтинговая лестница ждут вас в SkyPvP.",
    cover: "skypvp",
    tags: ["skypvp", "pvp", "kits", "arena"],
    body: [
      "SkyPvP всегда оставался одним из самых динамичных режимов BearLand. Сегодня мы выкатываем сезонное обновление, которое подняло его на новый уровень. Шесть новых китов, четыре полностью переработанные арены, рейтинговая ladder с сезонными наградами — обо всём по порядку.",
      "Новые киты: Tempest (молниевый призыв), Inquisitor (стянуть оппонента с любой точки арены), Phoenix (одно автоматическое возрождение в бою), Nomad (увеличенная скорость и +2 сердца), Warden (мощный щит на 6 секунд) и легендарный Bear King (комбо-кит, доступный только Mythic ранга).",
      "Арены переработаны с нуля: Sky Citadel — вертикальное сражение на колоннах, Frost Bridge — узкие ледяные мосты с риском падения, Volcano Pit — арена с движущейся лавой и взрывами, и Throne — закрытая турнирная карта для финалов сезонов.",
      "Главная новинка — Ranked Mode. Каждые две недели начинается новый сезон. Игроки получают очки SR за победы, теряют за поражения. По итогам сезона топ-100 игроков получают эксклюзивные плащи, тег [Champion] и до 5 000 BearCoin призовых.",
      "Мы также сбалансировали несколько старых китов: Bowman потерял 0,5 урона стрелы, Tank получил +1 секунду к щиту, а у Berserk теперь меньшая длительность раш-эффекта. Подробный changelog ниже.",
      "Все изменения протестированы на закрытом PTR в течение трёх недель. Спасибо игрокам, помогавшим тестировать. SkyPvP уже доступен по адресу skypvp.bear-land.net — заходите и доминируйте!",
      "В следующем сезоне мы планируем добавить кооперативные дуэли 2v2 и систему предматчевых бан-пиков китов. Голосование за самые ожидаемые фичи открыто на форуме.",
    ],
  },
  {
    id: 7,
    slug: "7-anarhicheskoe-obnovlenie",
    title: "Анархическое обновление: Война Альянсов",
    category: "Events",
    author: "BearAdmin",
    date: "2023-10-15",
    excerpt:
      "Главное событие осени — глобальная война альянсов на Anarchy с призовым фондом 250 000 BearCoin.",
    cover: "anarchy",
    tags: ["anarchy", "war", "events", "alliance"],
    body: [
      "BearLand Network объявляет о старте крупнейшего ивента года — Войны Альянсов. Это месячное противостояние между всеми зарегистрированными альянсами Anarchy-режима с общим призовым фондом 250 000 BearCoin и эксклюзивными косметическими наградами.",
      "Регистрация открыта до конца недели через команду /war register. К участию допускаются альянсы от 5 до 50 человек. Каждая зарегистрированная группа получает контрольную точку на карте и должна защищать её, одновременно атакуя точки соперников.",
      "Очки начисляются за: захват чужой контрольной точки (+100), убийство вражеского альянсиста (+5), удержание точки в течение часа (+10), уничтожение базы противника (+50). Система ведения счёта полностью автоматизирована и публикуется в реальном времени на странице war.bear-land.net.",
      "Главный приз — 100 000 BearCoin и эксклюзивный плащ Warlord, который никогда больше не появится в магазине. Второе место — 60 000 BC, третье — 30 000 BC. Места с 4 по 10 получают по 8 000 BC и косметические значки.",
      "Особое внимание уделено античиту: на время ивента включён усиленный режим BearGuard, любые попытки использования X-Ray, KillAura или ESP караются мгновенным баном без права обжалования. Все матчи записываются нашим серверным реплеер-плагином.",
      "В рамках ивента также пройдут ежедневные мини-задания: «Убить 25 врагов за сутки», «Захватить точку первым в зоне», «Защитить базу от 3 атак подряд». Каждое задание приносит по 200 BearCoin лично игроку.",
      "Не упустите шанс войти в историю BearLand. Зарегистрируйте свой альянс, соберите команду и начинайте подготовку. Подробные правила — на форуме в разделе «События». Удачной охоты!",
    ],
  },
  {
    id: 8,
    slug: "8-bearland-bedrock-edition",
    title: "BearLand Bedrock Edition — мы официально запускаемся!",
    category: "News",
    author: "BearAdmin",
    date: "2023-11-01",
    excerpt:
      "Долгожданное расширение BearLand Network на Minecraft Bedrock Edition: телефоны, консоли, Windows 10 — играйте откуда угодно.",
    cover: "bedrock",
    tags: ["bedrock", "launch", "crossplay", "mobile"],
    body: [
      "Сегодня великий день для BearLand Network. После 11 месяцев разработки, портирования плагинов и закрытого бета-тестирования с 4 000 участников мы официально запускаем BearLand Bedrock Edition.",
      "Адрес сервера: bedrock.bear-land.net, порт 19132. Сервер поддерживает все актуальные платформы Bedrock: Android, iOS, Windows 10, Xbox, PlayStation и Nintendo Switch. Кроссплей работает полноценно — игроки с разных устройств встречаются на одних серверах.",
      "На старте доступны три режима: Survival (классический выживач с экономикой и шопом), SkyPvP (адаптированная версия с теми же китами, что и на Java) и Lobby с мини-играми. В декабре добавим Anarchy и KitPvP.",
      "Все BearCoin между Java и Bedrock версиями полностью объединены. Вы можете пополнить кошелёк в одной редакции и тратить в другой. Привязка аккаунтов делается одним кликом через сайт в личном кабинете.",
      "Мы переработали интерфейсы под управление с пальца: меню магазина, /ah аукциона и кейсы используют крупные иконки и удобные категории. Голосовой чат через прокси-сервер Lunar также поддерживается.",
      "Главная техническая особенность — собственный прокси на базе GeyserMC с кастомными форками, позволяющими использовать практически все механики Java-плагинов. Мы потратили огромные ресурсы, чтобы Bedrock-игроки получили полноценный опыт.",
      "В честь запуска первые 7 дней действуют двойные награды за вход и +50% к получаемым BearCoin. Заходите, тестируйте, оставляйте отзывы. Это только начало большого пути BearLand Bedrock.",
    ],
  },
  {
    id: 9,
    slug: "9-podpiska-bearprime",
    title: "BearPrime — премиум подписка от BearLand Network",
    category: "News",
    author: "BearAdmin",
    date: "2023-11-22",
    excerpt:
      "Представляем BearPrime: месячная подписка с приоритетной очередью, ежемесячными BearCoin, эксклюзивной косметикой и доступом к закрытым ивентам.",
    cover: "bearcoin",
    tags: ["bearprime", "subscription", "premium", "membership"],
    body: [
      "Мы анализировали, что просят наши самые активные игроки уже несколько лет, и сегодня официально запускаем BearPrime — премиум-подписку нового поколения. Это не разовая покупка ранга, а живая ежемесячная программа, которая постоянно приносит ценность.",
      "За 5,99 € в месяц подписчик BearPrime получает: 1 500 BearCoin сразу в первый день, приоритетную очередь на все сервера (заход моментально, даже когда лобби заполнено), эксклюзивные косметические плащи, обновляемые каждый месяц, +1 слот для домашних точек /sethome, увеличенный кэп аукциона до 12 одновременных лотов.",
      "Кроме того, подписчики получают доступ к закрытым ежемесячным ивентам Prime-Only: турниры с гарантированным призовым фондом, кооперативные пвп-баттлы и сюжетные приключения с уникальными лорными квестами.",
      "Любая косметика, полученная по BearPrime, остаётся с вами навсегда, даже если подписка закончится. Это принципиально важно: мы не «арендуем» вам контент, мы делимся им.",
      "Подписка интегрирована с Discord. Подписчики получают цветную роль Prime, доступ в закрытые войс-каналы и приоритет в очереди техподдержки. Среднее время ответа модератора в Prime-канале — менее 10 минут.",
      "Мы понимаем, что подписочные модели часто пугают игроков. Поэтому в BearPrime нет авто-продления по умолчанию: вы платите вручную каждый месяц и сами решаете, продлевать ли. Никаких скрытых списаний.",
      "Запуск BearPrime — большой шаг для нашей сети. Прибыль от подписки полностью идёт на разработку нового контента, серверные мощности и зарплаты модераторам. Поддерживая BearPrime, вы напрямую инвестируете в развитие BearLand.",
    ],
  },
];

export interface ForumCategory {
  id: number;
  slug: string;
  title: string;
  description: string;
  topics: number;
  posts: number;
  lastPost: { title: string; author: string; date: string };
}

export const FORUM_CATEGORIES: ForumCategory[] = [
  { id: 6, slug: "6-novosti-servera", title: "Новости сервера", description: "Официальные анонсы и новости BearLand Network", topics: 142, posts: 4_823, lastPost: { title: "BearPrime официально запущен!", author: "BearAdmin", date: "2 часа назад" } },
  { id: 7, slug: "7-obnovleniya", title: "Обновления", description: "Список обновлений, патчей и changelog-ов всех режимов", topics: 318, posts: 9_124, lastPost: { title: "SkyPvP 4.2 — баланс китов", author: "SkyMaster", date: "5 часов назад" } },
  { id: 8, slug: "8-konkursi-i-sobitiya", title: "Конкурсы и события", description: "Анонсы ивентов, турниров, конкурсов и призовых раздач", topics: 86, posts: 2_341, lastPost: { title: "Война Альянсов — итоги недели", author: "EventMod", date: "1 день назад" } },
  { id: 11, slug: "11-otveti-na-voprosi", title: "Ответы на вопросы", description: "FAQ и ответы администрации на популярные вопросы", topics: 412, posts: 6_209, lastPost: { title: "Как привязать Java и Bedrock?", author: "HelpBear", date: "12 минут назад" } },
  { id: 14, slug: "14-zhalobi-na-igrokov", title: "Жалобы на игроков", description: "Подача жалоб на нарушителей правил с доказательствами", topics: 1_482, posts: 8_731, lastPost: { title: "Жалоба на DarkHunter — KillAura", author: "ProGamer", date: "8 минут назад" } },
  { id: 15, slug: "15-obzhalovanie-nakazaniya", title: "Обжалование наказания", description: "Если вас забанили несправедливо — подайте обжалование здесь", topics: 967, posts: 5_402, lastPost: { title: "Обжалование бана за X-Ray", author: "NotCheater", date: "1 час назад" } },
  { id: 16, slug: "16-soobshenie-o-bagah", title: "Сообщение о багах", description: "Нашли баг? Расскажите команде разработки — получите BearCoin", topics: 521, posts: 3_104, lastPost: { title: "Дюп в /ah аукционе", author: "BugFinder", date: "30 минут назад" } },
  { id: 17, slug: "17-youtube-status", title: "YouTube статус", description: "Заявки на получение YouTube/Twitch статуса на сервере", topics: 245, posts: 1_120, lastPost: { title: "Заявка от MineTubeRus (12k подп.)", author: "MineTubeRus", date: "4 часа назад" } },
  { id: 18, slug: "18-otzivi-o-rabote-personala", title: "Отзывы о работе персонала", description: "Похвалите или покритикуйте работу модераторов и админов", topics: 178, posts: 982, lastPost: { title: "Спасибо WildBear за быстрый ответ", author: "GoldenSky", date: "6 часов назад" } },
  { id: 19, slug: "19-zagruzka-skina", title: "Загрузка скина", description: "Загрузка кастомных скинов для Bedrock и Java версий", topics: 730, posts: 1_812, lastPost: { title: "Скин самурая для Bedrock", author: "PixelArt", date: "3 часа назад" } },
  { id: 20, slug: "20-permanentnie-nakazaniya", title: "Перманентные наказания", description: "Список перманентно забаненных игроков и причины", topics: 312, posts: 312, lastPost: { title: "PermBan: HackUser123 (X-Ray)", author: "BearGuard", date: "20 минут назад" } },
];

export interface ForumThread {
  id: number;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastReply: string;
  pinned?: boolean;
  hot?: boolean;
}

export const FORUM_THREADS: Record<string, ForumThread[]> = {
  "6-novosti-servera": [
    { id: 1, title: "BearPrime официально запущен — все детали", author: "BearAdmin", replies: 312, views: 14_802, lastReply: "2 часа назад", pinned: true, hot: true },
    { id: 2, title: "Запуск BearLand Bedrock Edition", author: "BearAdmin", replies: 287, views: 11_204, lastReply: "1 день назад", pinned: true },
    { id: 3, title: "Новый дизайн сайта и форума", author: "WebTeam", replies: 142, views: 6_120, lastReply: "3 дня назад", hot: true },
    { id: 4, title: "Партнёрство с MinePlay Studios", author: "BearAdmin", replies: 89, views: 3_402, lastReply: "1 неделя назад" },
    { id: 5, title: "Мы достигли 2 000 000 уникальных игроков", author: "BearAdmin", replies: 421, views: 18_900, lastReply: "2 недели назад", hot: true },
    { id: 6, title: "Обновление политики конфиденциальности", author: "BearAdmin", replies: 32, views: 1_204, lastReply: "3 недели назад" },
    { id: 7, title: "Открыт набор в команду модерации", author: "HRBear", replies: 98, views: 4_320, lastReply: "1 месяц назад" },
    { id: 8, title: "Итоги фестиваля BearFest 2023", author: "EventMod", replies: 176, views: 7_201, lastReply: "1 месяц назад" },
  ],
  "7-obnovleniya": [
    { id: 1, title: "SkyPvP 4.2 — баланс китов и новые арены", author: "SkyMaster", replies: 218, views: 9_402, lastReply: "5 часов назад", pinned: true, hot: true },
    { id: 2, title: "Anarchy 2.0 — полный changelog", author: "WildBear", replies: 487, views: 21_300, lastReply: "1 день назад", pinned: true },
    { id: 3, title: "Прайс-лист новых рангов BearCoin", author: "EconomyBear", replies: 142, views: 5_120, lastReply: "2 дня назад" },
    { id: 4, title: "Bedrock 1.20 совместимость", author: "TechBear", replies: 76, views: 2_402, lastReply: "4 дня назад" },
    { id: 5, title: "Античит BearGuard v3 — что нового", author: "GuardLead", replies: 312, views: 12_402, lastReply: "1 неделя назад", hot: true },
    { id: 6, title: "Reworked /ah аукцион — улучшения интерфейса", author: "EconomyBear", replies: 89, views: 3_120, lastReply: "2 недели назад" },
  ],
  "8-konkursi-i-sobitiya": [
    { id: 1, title: "Война Альянсов — итоги недели", author: "EventMod", replies: 142, views: 6_402, lastReply: "1 день назад", pinned: true, hot: true },
    { id: 2, title: "Halloween 2023 — конкурс построек", author: "EventMod", replies: 218, views: 8_120, lastReply: "3 дня назад" },
    { id: 3, title: "Турнир SkyPvP — призовой фонд 50 000 BC", author: "TourneyMod", replies: 312, views: 11_402, lastReply: "1 неделя назад", hot: true },
    { id: 4, title: "Лотерея BearCoin — каждую пятницу", author: "EventMod", replies: 87, views: 3_120, lastReply: "2 недели назад" },
  ],
  "11-otveti-na-voprosi": [
    { id: 1, title: "FAQ: как привязать Java и Bedrock аккаунт", author: "HelpBear", replies: 412, views: 18_402, lastReply: "12 минут назад", pinned: true, hot: true },
    { id: 2, title: "Как купить BearCoin без карты?", author: "PaymentBear", replies: 218, views: 7_402, lastReply: "1 час назад", pinned: true },
    { id: 3, title: "Что делать если потерял пароль?", author: "HelpBear", replies: 142, views: 4_120, lastReply: "3 часа назад" },
    { id: 4, title: "Можно ли играть с друзьями на разных платформах?", author: "HelpBear", replies: 87, views: 2_402, lastReply: "5 часов назад" },
    { id: 5, title: "Где найти список команд сервера?", author: "HelpBear", replies: 56, views: 1_802, lastReply: "1 день назад" },
  ],
  "14-zhalobi-na-igrokov": [
    { id: 1, title: "Правила подачи жалобы — обязательно к прочтению", author: "BearAdmin", replies: 0, views: 24_120, lastReply: "Прикреплено", pinned: true },
    { id: 2, title: "Жалоба на DarkHunter — KillAura (видео)", author: "ProGamer", replies: 12, views: 320, lastReply: "8 минут назад", hot: true },
    { id: 3, title: "Жалоба на XCheaterX — FlyHack", author: "FairPlay", replies: 8, views: 412, lastReply: "30 минут назад" },
    { id: 4, title: "Жалоба на ToxicUser — оскорбления", author: "PeaceBear", replies: 5, views: 180, lastReply: "1 час назад" },
    { id: 5, title: "Жалоба на GriefKing — реклама стороннего сервера", author: "Loyal", replies: 18, views: 720, lastReply: "2 часа назад" },
  ],
  "15-obzhalovanie-nakazaniya": [
    { id: 1, title: "Правила подачи обжалования", author: "BearAdmin", replies: 0, views: 18_402, lastReply: "Прикреплено", pinned: true },
    { id: 2, title: "Обжалование бана за X-Ray (ID #28491)", author: "NotCheater", replies: 6, views: 320, lastReply: "1 час назад" },
    { id: 3, title: "Мут за капс — обжалование", author: "Loudy", replies: 3, views: 87, lastReply: "3 часа назад" },
    { id: 4, title: "Бан по IP — снять пожалуйста", author: "FairUser", replies: 12, views: 412, lastReply: "5 часов назад" },
  ],
  "16-soobshenie-o-bagah": [
    { id: 1, title: "Как правильно сообщить о баге — гайд", author: "BearAdmin", replies: 0, views: 8_402, lastReply: "Прикреплено", pinned: true },
    { id: 2, title: "Дюп в /ah аукционе при отмене лота", author: "BugFinder", replies: 14, views: 920, lastReply: "30 минут назад", hot: true },
    { id: 3, title: "Глюк с телепортацией на SkyPvP", author: "TestUser", replies: 8, views: 412, lastReply: "2 часа назад" },
    { id: 4, title: "Невидимый блок на спавне Anarchy", author: "Explorer", replies: 5, views: 218, lastReply: "1 день назад" },
  ],
  "17-youtube-status": [
    { id: 1, title: "Условия получения YouTube статуса", author: "BearAdmin", replies: 0, views: 12_402, lastReply: "Прикреплено", pinned: true },
    { id: 2, title: "Заявка от MineTubeRus (12k подписчиков)", author: "MineTubeRus", replies: 8, views: 412, lastReply: "4 часа назад" },
    { id: 3, title: "Заявка от BearGamerPro (5k подписчиков)", author: "BearGamerPro", replies: 5, views: 218, lastReply: "1 день назад" },
  ],
  "18-otzivi-o-rabote-personala": [
    { id: 1, title: "Спасибо WildBear за быстрый ответ", author: "GoldenSky", replies: 12, views: 412, lastReply: "6 часов назад" },
    { id: 2, title: "Отличная работа модерации в чате", author: "HappyUser", replies: 18, views: 620, lastReply: "1 день назад" },
    { id: 3, title: "Критика работы HelpBear", author: "Critic", replies: 28, views: 1_120, lastReply: "3 дня назад", hot: true },
  ],
  "19-zagruzka-skina": [
    { id: 1, title: "Как загрузить скин на Bedrock", author: "SkinHelper", replies: 0, views: 6_402, lastReply: "Прикреплено", pinned: true },
    { id: 2, title: "Скин самурая для Bedrock (4D)", author: "PixelArt", replies: 12, views: 412, lastReply: "3 часа назад" },
    { id: 3, title: "Делюсь паком скинов — фентези", author: "ArtBear", replies: 28, views: 1_120, lastReply: "1 день назад", hot: true },
  ],
  "20-permanentnie-nakazaniya": [
    { id: 1, title: "PermBan: HackUser123 — X-Ray", author: "BearGuard", replies: 0, views: 412, lastReply: "20 минут назад" },
    { id: 2, title: "PermBan: ToxicLord — рецидив оскорблений", author: "BearGuard", replies: 0, views: 320, lastReply: "1 час назад" },
    { id: 3, title: "PermBan: ScamUser — мошенничество с BearCoin", author: "BearGuard", replies: 0, views: 612, lastReply: "3 часа назад" },
    { id: 4, title: "PermBan: GriefAlt — обход бана альтами", author: "BearGuard", replies: 0, views: 412, lastReply: "1 день назад" },
  ],
};

export const LEADERBOARDS = {
  pvp: [
    { rank: 1, name: "DragonSlayer_99", kills: 28_412, kd: 8.42, prestige: "Mythic" },
    { rank: 2, name: "BearHunter", kills: 24_320, kd: 7.81, prestige: "Mythic" },
    { rank: 3, name: "Shadow_King", kills: 22_120, kd: 6.94, prestige: "Diamond" },
    { rank: 4, name: "IceQueenXD", kills: 21_802, kd: 6.21, prestige: "Diamond" },
    { rank: 5, name: "ProGamer42", kills: 19_402, kd: 5.87, prestige: "Diamond" },
    { rank: 6, name: "WolfPack", kills: 18_120, kd: 5.42, prestige: "Golden" },
    { rank: 7, name: "ArcherX", kills: 17_402, kd: 5.18, prestige: "Golden" },
    { rank: 8, name: "BlitzBear", kills: 16_820, kd: 4.92, prestige: "Golden" },
    { rank: 9, name: "FireFist", kills: 15_402, kd: 4.71, prestige: "Silver" },
    { rank: 10, name: "NightOwl", kills: 14_820, kd: 4.52, prestige: "Silver" },
  ],
  economy: [
    { rank: 1, name: "TycoonBear", balance: "8 412 320 BC" },
    { rank: 2, name: "MerchantKing", balance: "6 820 412 BC" },
    { rank: 3, name: "GoldFarmer", balance: "5 312 820 BC" },
    { rank: 4, name: "AuctionMaster", balance: "4 902 120 BC" },
    { rank: 5, name: "TradeBear", balance: "4 312 412 BC" },
    { rank: 6, name: "RichKid_22", balance: "3 820 320 BC" },
    { rank: 7, name: "EmeraldQueen", balance: "3 402 820 BC" },
    { rank: 8, name: "MineLord", balance: "3 120 412 BC" },
    { rank: 9, name: "VaultKeeper", balance: "2 920 820 BC" },
    { rank: 10, name: "BankerBear", balance: "2 720 412 BC" },
  ],
  playtime: [
    { rank: 1, name: "BearForever", time: "4 821 ч" },
    { rank: 2, name: "NoSleepGamer", time: "4 312 ч" },
    { rank: 3, name: "GrindMaster", time: "3 920 ч" },
    { rank: 4, name: "AlwaysOnline", time: "3 712 ч" },
    { rank: 5, name: "AddictedBear", time: "3 402 ч" },
    { rank: 6, name: "MineAllDay", time: "3 120 ч" },
    { rank: 7, name: "BlockyLife", time: "2 920 ч" },
    { rank: 8, name: "PixelDream", time: "2 720 ч" },
    { rank: 9, name: "CraftKing", time: "2 520 ч" },
    { rank: 10, name: "ChunkLoader", time: "2 320 ч" },
  ],
};

export type LbRow = any;
