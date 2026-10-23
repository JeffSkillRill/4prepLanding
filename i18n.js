/* UZ / RU / EN switch. English lives in the HTML; this file holds Uzbek and the runtime strings. */
(function () {
  'use strict';
  var UZ = {
    'skip': 'Asosiy qismga o‘tish',
    'cta': 'Bepul konsultatsiya',
    'nav.route': 'Yo‘l',
    'nav.results': 'Natijalar',
    'nav.unis': 'Universitetlar',
    'nav.faq': 'Savollar',

    'hero.badge': 'Fall 2027 qabuli ochiq',
    'quiz.h': 'Qaysi muhrdan<br>boshlaysiz?',
    'quiz.sub': 'Uchta qisqa savol. Boshlang‘ich nuqtani aytamiz, keyin bepul konsultatsiyaga yozilishingiz mumkin.',
    'tgfab': 'Telegram’da yozish',
    'theme.aria': 'Mavzuni almashtirish',

    'hero.l1': 'Avval <span class="mint">sertifikat.</span>',
    'hero.l2': 'Keyin <span class="pill-word">Amerika.</span>',
    'hero.lead': 'IELTS va SAT kurslari, AQSh universitetlariga hujjat topshirish, 100% gacha grant va viza suhbatiga tayyorgarlik. Toshkentdan kampusingizgacha bitta jamoa.',
    'hero.results': 'Natijalarni ko‘rish',
    'reels.all': 'YouTube’dagi barcha videolar',

    'proof.grant': 'AQSh universitetlarida <b>100% gacha grant</b>',
    'proof.courses': '<b>SAT va IELTS</b> online va offline',
    'proof.visa': '<b>Ariza va viza suhbatiga</b> tayyorgarlik',
    'proof.tg': 'Telegram’da <b>12&nbsp;600+</b>, YouTube’da <b>7&nbsp;500+</b> obunachi',

    'dep.title': 'Uchishlar · <b>Toshkent</b>',
    'dep.time': 'Mahalliy vaqt',
    'dep.c1': 'Manzil',
    'dep.c2': 'Yo‘nalish',
    'dep.c3': 'Holat',
    'dep.note': 'Manzillar o‘quvchilarimiz intilayotgan maqsadlar. Bu hamkorlik yoki qabul kafolati emas.',

    'route.h': 'Uchta muhr.<br>Bitta viza.',
    'route.sub': 'Har bir bosqich pasportingizga muhr bo‘lib tushadi: avval sertifikatlar, keyin qabul, so‘ng elchixona. Istalgan muhrdan boshlang.',
    'route.t1': 'Eshikni ochadigan ingliz tili sertifikati. General English va IELTS guruhlari, online va offline, amerikacha muhitda.',
    'route.b1': 'IELTS’ni tanlash',
    'route.t2': 'Profilingiz va grant imkoniyatingizni kuchaytiradigan ball. Raqamli SAT’ning ikkala bo‘limi bo‘yicha tizimli tayyorgarlik, online va offline.',
    'route.b2': 'SAT’ni tanlash',
    'route.n3': 'Qabul',
    'route.t3': 'To‘g‘ri universitetlar ro‘yxati, kuchli esse va hujjatlar, profilingizni taklif xatiga aylantiradigan grant strategiyasi.',
    'route.n4b': 'AQSh vizasi',
    'route.t4b': 'Hujjatlar tayyor, grant qo‘lda. Endi elchixona: DS-160 anketasidan suhbatning o‘zigacha har bir savolni siz bilan mashq qilamiz.',
    'route.g5': 'Suhbat mashqlari',
    'route.g1': 'Universitetlar ro‘yxati',
    'route.g2': 'Esse',
    'route.g3': 'Grantlar',
    'route.b3': 'Qabulni tanlash',
    'route.b4': 'To‘liq yo‘lni rejalashtirish',

    'res.h': 'Ular yetib keldi.<br><span class="mint">Navbat sizda.</span>',
    'res.sub': 'Haqiqiy o‘quvchilar, haqiqiy ismlar, haqiqiy grantlar — akademiyaning o‘z YouTube va Telegram kanallarida e’lon qilingan. O‘ynatish belgisi bor kartochkalar to‘liq videoni ochadi.',
    'w.husnora': '$195,000 grant · AQSh vizasi',
    'w.sixty': 'AQSh student vizasi — soni o‘sib bormoqda',
    'w.sixtySub': 'Shundan 40+ tasi faqat 2026-yil iyulida. Bir kunda to‘rttasi.',
    'w.ixtiyor': '95% grant · AQSh vizasi',
    'w.fazliddin': 'Grant · viza 1-urinishda, sertifikatsiz',
    'w.abdulatif': 'TOP-160 universitetda grant · AQSh vizasi',
    'w.abdulloh': 'Grant · F-1 student vizasi',
    'w.ibrohimjon': 'AQSh vizasi 3-urinishda',
    'w.bahrom': '3 yillik gap year’dan keyin AQSh vizasi',
    'w.azizjon': 'Grant · viza 4-urinishda',
    'w.bexruz': '2006-yilda tug‘ilgan · AQSh student vizasi',
    'w.abdulhafiz': 'IELTS 6.5 bilan AQSh vizasi',
    'w.kamronBig': '1-urinish',
    'w.kamron': 'Toshkentdagi AQSh elchixonasida viza',
    'w.sardor': 'TOP-200 universitet · viza 1-urinishda',
    'w.ozodbekBig': 'Qabul',
    'w.ozodbek': 'Mississippi College, AQSh',
    'w.lax': 'Yana 2 ta student yetib keldi',
    'res.quote': '“Amerikani orzu qilishning o‘zi yetmaydi. Harakat qilish kerak!”',
    'res.quoteBy': '4Prep’da tayyorlangan, viza birinchi urinishda',

    'unis.h': 'Toshkentdan<br>dunyoga.',
    'unis.sub': 'Har bir yo‘l Toshkentdan boshlanadi. Harvard, Oxford, MIT: o‘quvchilarimiz ko‘zlagan kampuslar va biz ularga mos qurgan tayyorgarlik.',
    'unis.cta': 'Yo‘lni rejalashtirish',
    'unis.end': 'Shu universitetlardan biridan kelgan taklif xatida sizning ismingiz bo‘lishi mumkin.',
    'unis.legal': 'Universitet nomlari o‘quvchilar maqsadi sifatida ko‘rsatilgan. 4Prep Academy bu muassasalar bilan bog‘liq emas. Masofalar Toshkentdan hisoblangan.',

    'mani.l1': 'IELTS eshikni ochadi.',
    'mani.l2': 'SAT tayyorligingizni isbotlaydi.',
    'mani.l3': 'Ariza esa kimligingizni ko‘rsatadi.',
    'mani.foot': 'Kuchli sertifikatlar arizangizning poydevori. Avval shu poydevorni quramiz, keyin undan to‘g‘ri foydalanishga yordam beramiz.',

    'con.h': 'Yangi bobingiz bitta suhbatdan boshlanadi.',
    'con.sub': 'Konsultatsiya bepul, telefon orqali ham. Fall 2027 qabuli ochiq, ko‘p universitetlarda Early Action muddatlari 1-noyabrdan boshlanadi.',
    'f.name': 'Ism va familiya',
    'f.contact': 'Telefon yoki Telegram',
    'f.route': 'Yo‘nalish',
    'f.goal': 'Orzu universiteti',
    'f.opt': '(ixtiyoriy)',
    'f.consent': '4Prep Academy bu ma’lumotlardan faqat konsultatsiya bo‘yicha men bilan bog‘lanish uchun foydalanishiga roziman.',
    'f.submit': 'Konsultatsiyaga yozilish',
    'opt.0': 'Yo‘nalishni tanlang',
    'opt.1': 'To‘liq yo‘l: IELTS + SAT + Qabul',
    'opt.2': 'IELTS tayyorgarlik',
    'opt.3': 'SAT tayyorgarlik',
    'opt.4': 'AQSh qabuli va grantlar',
    'opt.5': 'Viza suhbatiga tayyorgarlik',
    'opt.6': 'Hali bilmayman',

    'tk.class': 'Toifa: F-1 student',
    'tk.from': 'Qayerdan',
    'tk.tas': 'Toshkent',
    'tk.to': 'Qayerga',
    'tk.pass': 'Yo‘lovchi',
    'tk.route': 'Yo‘nalish',
    'tk.seat': 'O‘rin',
    'tk.gate': 'Chiqish',
    'tk.gateV': 'Konsultatsiya',
    'tk.stamp': 'Bortda',
    'tk.alt': 'Yozish qulayroqmi?',

    'faq.h': 'Uchishdan oldin.',
    'faq.sub': 'Boshqa savolingiz bormi? Konsultatsiyada to‘g‘ridan-to‘g‘ri so‘rang.',
    'faq.q0': '4Prep Academy qanday dasturlarni taklif qiladi?',
    'faq.a0': 'General English va IELTS kurslari, SAT kurslari, grant bilan AQSh universitetlariga hujjat topshirish va viza suhbatiga tayyorgarlik. Bittasini tanlang yoki to‘liq yo‘lni bitta jamoa bilan bosib o‘ting.',
    'faq.q1': 'IELTS yoki SAT’siz topshirsa bo‘ladimi?',
    'faq.a1': 'Ko‘pincha, ha. Ko‘plab AQSh universitetlarida SAT ixtiyoriy, ba’zi o‘quvchilarimiz esa hech qanday sertifikatsiz katta grant olgan. Talablar universitetga qarab farq qiladi, shuning uchun ro‘yxatingizdagi har bir universitetni birga tekshiramiz.',
    'faq.q2': 'Qabulni kafolatlaysizmi?',
    'faq.a2': 'Yo‘q, buni hech kim halol kafolatlay olmaydi. Qarorni universitetlar qabul qiladi. Biz sizni sertifikatlarga puxta tayyorlaymiz va arizaning har bir qadamida yoningizda bo‘lamiz.',
    'faq.q3': 'Qachon boshlash kerak?',
    'faq.a3': 'Bu boshlang‘ich darajangiz, maqsadli ballingiz va topshirish muddatlariga bog‘liq. Fall 2027 qabuli hozir ochiq, shuning uchun vaqt rejangizni konsultatsiyada tuzib chiqamiz.',
    'faq.q4': 'Narxlar qancha?',
    'faq.a4': 'Konsultatsiya bepul. Kurs va xizmat narxlari tanlagan yo‘nalishingizga bog‘liq, ularni biror qarorga kelishingizdan oldin ochiq aytamiz.',
    'faq.q5': 'Akademiya bilan qanday bog‘lansam bo‘ladi?',
    'faq.a5': 'Yuqoridagi chiptani to‘ldiring, Telegram’da <a href="https://t.me/fourprepusa" target="_blank" rel="noopener">@fourprepusa</a> ga yozing yoki <a href="tel:+998555144441">+998 55 514 44 41</a> raqamiga qo‘ng‘iroq qiling. Darslar online va offline, Toshkent, Olmazor tumanida.',


    'tag.from': 'Qayerdan',
    'tag.tas': 'Toshkent',
    'tag.lax': 'Los Angeles · AQSh',
    'tag.name': 'Ism',
    'tag.date': 'Sana',
    'tag.seat': 'O‘rin',
    'tag.visas': 'AQSh student vizasi',
    'tag.grant': 'gacha grant',
    'tag.adm': 'Qabul',
    'tag.visa': 'Viza',
    'tag.flip': 'Yorliqni ag‘darish',
    'tag.aria': 'Bagaj yorlig‘i',

    'final.p': 'Katta orzular reja talab qiladi. O‘z rejangizni 4Prep&nbsp;Academy bilan bugun boshlang.',

    'ft.tag': 'IELTS va SAT kurslari, AQSh qabuli, grantlar va viza tayyorgarligi.',
    'ft.programs': 'Dasturlar',
    'ft.contact': 'Aloqa',
    'ft.academy': 'Akademiya',
    'ft.addr': 'Toshkent, Olmazor tumani',
    'ft.rights': '© 2026 4Prep Academy. Barcha huquqlar himoyalangan.',
    'ft.photos': 'Kampus fotolari: Wikimedia Commons'
  };

  var RU = {
    'skip': 'Перейти к содержимому',
    'cta': 'Бесплатная консультация',
    'nav.route': 'Маршрут',
    'nav.results': 'Результаты',
    'nav.unis': 'Университеты',
    'nav.faq': 'Вопросы',

    'hero.badge': 'Набор на Fall 2027 открыт',
    'hero.l1': 'Сначала <span class="mint">сертификат.</span>',
    'hero.l2': 'Потом <span class="pill-word">Америка.</span>',
    'hero.lead': 'Курсы IELTS и SAT, подача документов в университеты США, гранты до 100% и подготовка к визовому интервью. Одна команда: от Ташкента до вашего кампуса.',
    'hero.results': 'Смотреть результаты',
    'reels.all': 'Все видео на YouTube',

    'proof.grant': '<b>Гранты до 100%</b> в университетах США',
    'proof.courses': '<b>SAT и IELTS</b> онлайн и офлайн',
    'proof.visa': 'Подготовка к <b>подаче и визовому интервью</b>',
    'proof.tg': '<b>12&nbsp;600+</b> подписчиков в Telegram, <b>7&nbsp;500+</b> на YouTube',

    'dep.title': 'Вылеты · <b>Ташкент</b>',
    'dep.time': 'Местное время',
    'dep.c1': 'Пункт назначения',
    'dep.c2': 'Маршрут',
    'dep.c3': 'Статус',
    'dep.note': 'Направления — цели, к которым готовятся наши ученики. Это не партнёрство и не гарантия поступления.',

    'route.h': 'Три штампа.<br>Одна виза.',
    'route.sub': 'Каждый этап оставляет штамп в вашем паспорте: сначала сертификаты, затем поступление, потом посольство. Начните с любого штампа.',
    'route.t1': 'Сертификат английского, который открывает дверь. Группы General English и IELTS, онлайн и офлайн, в американской атмосфере.',
    'route.b1': 'Выбрать IELTS',
    'route.t2': 'Балл, который усиливает ваш профиль и шансы на грант. Системная подготовка к обеим частям цифрового SAT, онлайн и офлайн.',
    'route.b2': 'Выбрать SAT',
    'route.n3': 'Поступление',
    'route.t3': 'Правильный список университетов, сильные эссе и документы, а также стратегия гранта, которая превращает ваш профиль в приглашение.',
    'route.n4b': 'Виза США',
    'route.t4b': 'Документы готовы, грант в руках. Теперь посольство: от анкеты DS-160 до самого интервью мы отрабатываем с вами каждый вопрос.',
    'route.g5': 'Тренировка интервью',
    'route.g1': 'Список университетов',
    'route.g2': 'Эссе',
    'route.g3': 'Гранты',
    'route.b3': 'Выбрать поступление',
    'route.b4': 'Спланировать весь маршрут',

    'res.h': 'Они долетели.<br><span class="mint">Теперь ваша очередь.</span>',
    'res.sub': 'Реальные ученики, реальные имена, реальные гранты — как опубликовано на YouTube и в Telegram академии. Карточки с кнопкой воспроизведения открывают полное видео.',
    'w.husnora': 'Грант $195,000 · виза США',
    'w.sixty': 'студенческих виз США — и счёт растёт',
    'w.sixtySub': 'Из них 40+ только в июле 2026 года. Четыре — за один день.',
    'w.ixtiyor': 'Грант 95% · виза США',
    'w.fazliddin': 'Грант · виза с 1-й попытки, без сертификата',
    'w.abdulatif': 'Грант в университете TOP-160 · виза США',
    'w.abdulloh': 'Грант · студенческая виза F-1',
    'w.ibrohimjon': 'Виза США с 3-й попытки',
    'w.bahrom': 'Виза США после 3 лет перерыва',
    'w.azizjon': 'Грант · виза с 4-й попытки',
    'w.bexruz': 'Родился в 2006 · студенческая виза США',
    'w.abdulhafiz': 'Виза США с IELTS 6.5',
    'w.kamronBig': '1-я попытка',
    'w.kamron': 'Виза в посольстве США в Ташкенте',
    'w.sardor': 'Университет TOP-200 · виза с 1-й попытки',
    'w.ozodbekBig': 'Зачислен',
    'w.ozodbek': 'Mississippi College, США',
    'w.lax': 'Ещё двое студентов долетели',
    'res.quote': '«Мечтать об Америке недостаточно. Нужно действовать».',
    'res.quoteBy': 'готовился в 4Prep, виза одобрена с первой попытки',

    'unis.h': 'Из Ташкента<br>в мир.',
    'unis.sub': 'Каждый маршрут начинается в Ташкенте. Harvard, Oxford, MIT: кампусы, к которым стремятся наши ученики, и подготовка, выстроенная под них.',
    'unis.cta': 'Спланировать маршрут',
    'unis.end': 'Ваше имя может быть в письме о зачислении одного из этих университетов.',
    'unis.legal': 'Названия университетов указаны как цели учеников. 4Prep Academy не связана с этими учреждениями. Расстояния считаются от Ташкента.',

    'mani.l1': 'IELTS открывает дверь.',
    'mani.l2': 'SAT доказывает готовность.',
    'mani.l3': 'Заявка показывает, кто вы.',
    'mani.foot': 'Сильные сертификаты — фундамент вашей заявки. Сначала мы строим этот фундамент, а затем помогаем им воспользоваться.',

    'quiz.h': 'С какого штампа<br>начать вам?',
    'quiz.sub': 'Три коротких вопроса. Мы подскажем стартовую точку, а затем вы сможете записаться на бесплатную консультацию.',

    'con.h': 'Ваша новая глава начинается с одного разговора.',
    'con.sub': 'Консультация бесплатна, в том числе по телефону. Набор на Fall 2027 открыт, а дедлайны Early Action во многих университетах начинаются 1 ноября.',
    'f.name': 'Имя и фамилия',
    'f.contact': 'Телефон или Telegram',
    'f.route': 'Направление',
    'f.goal': 'Университет мечты',
    'f.opt': '(необязательно)',
    'f.consent': 'Я согласен(на), что 4Prep Academy использует эти данные только для связи со мной по поводу консультации.',
    'f.submit': 'Записаться на бесплатную консультацию',
    'opt.0': 'Выберите направление',
    'opt.1': 'Весь маршрут: IELTS + SAT + Поступление',
    'opt.2': 'Подготовка к IELTS',
    'opt.3': 'Подготовка к SAT',
    'opt.4': 'Поступление в США и гранты',
    'opt.5': 'Подготовка к визовому интервью',
    'opt.6': 'Пока не знаю',

    'tk.class': 'Класс: студент F-1',
    'tk.from': 'Откуда',
    'tk.tas': 'Ташкент',
    'tk.to': 'Куда',
    'tk.pass': 'Пассажир',
    'tk.route': 'Маршрут',
    'tk.seat': 'Место',
    'tk.gate': 'Выход',
    'tk.gateV': 'Консультация',
    'tk.stamp': 'На борту',
    'tk.alt': 'Удобнее написать?',

    'faq.h': 'Перед посадкой.',
    'faq.sub': 'Остались вопросы? Задайте их напрямую на консультации.',
    'faq.q0': 'Какие программы предлагает 4Prep Academy?',
    'faq.a0': 'General English и IELTS, курсы SAT, подача в университеты США с поддержкой по грантам и подготовка к визовому интервью. Выберите что-то одно или пройдите весь маршрут с одной командой.',
    'faq.q1': 'Можно ли подавать без IELTS или SAT?',
    'faq.a1': 'Часто — да. Многие университеты США не требуют SAT, а некоторые наши ученики получили крупные гранты вообще без сертификатов. Требования зависят от университета, поэтому мы вместе проверяем каждый вуз из вашего списка.',
    'faq.q2': 'Вы гарантируете поступление?',
    'faq.a2': 'Нет, и честно этого не может сделать никто. Решения принимают университеты. Мы тщательно готовим вас к сертификатам и сопровождаем на каждом шаге подачи.',
    'faq.q3': 'Когда лучше начинать?',
    'faq.a3': 'Это зависит от вашего стартового уровня, целевого балла и сроков подачи. Набор на Fall 2027 открыт уже сейчас, поэтому план по срокам мы составляем на консультации.',
    'faq.q4': 'Сколько это стоит?',
    'faq.a4': 'Консультация бесплатна. Стоимость курсов и услуг зависит от выбранного маршрута, и мы называем её открыто, до того как вы на что-либо решитесь.',
    'faq.q5': 'Как связаться с академией?',
    'faq.a5': 'Заполните посадочный талон выше, напишите в Telegram <a href="https://t.me/fourprepusa" target="_blank" rel="noopener">@fourprepusa</a> или позвоните по номеру <a href="tel:+998555144441">+998 55 514 44 41</a>. Занятия проходят онлайн и офлайн в Ташкенте, Олмазорский район.',

    'tag.from': 'Откуда',
    'tag.tas': 'Ташкент',
    'tag.lax': 'Лос-Анджелес · США',
    'tag.name': 'Имя',
    'tag.date': 'Дата',
    'tag.seat': 'Место',
    'tag.visas': 'студенческих виз США',
    'tag.grant': 'максимальный грант',
    'tag.adm': 'Поступление',
    'tag.visa': 'Виза',
    'tag.flip': 'Перевернуть бирку',
    'tag.aria': 'Багажная бирка',

    'final.p': 'Большим мечтам нужен план. Начните строить свой вместе с 4Prep&nbsp;Academy.',
    'tgfab': 'Написать в Telegram',
    'theme.aria': 'Переключить тему',

    'ft.tag': 'Курсы IELTS и SAT, поступление в США, гранты и подготовка к визе.',
    'ft.programs': 'Программы',
    'ft.contact': 'Контакты',
    'ft.academy': 'Академия',
    'ft.addr': 'Ташкент, Олмазорский район',
    'ft.rights': '© 2026 4Prep Academy. Все права защищены.',
    'ft.photos': 'Фото кампусов: Wikimedia Commons'
  };

  // strings used from JavaScript
  var RT = {
    en: {
      yourName: 'Your name', yourUni: 'Your dream university', chooseRoute: 'Choose your route',
      errName: 'Please enter your full name.',
      errContact: 'Please add a phone number or Telegram username.',
      errContactFmt: 'Enter a phone number (+998 90 123 45 67) or a Telegram username (@username).',
      errRoute: 'Please choose a route, or “Not sure yet”.', sent: 'Request sent',
      errConsent: 'Please confirm you agree to be contacted.',
      checkFields: 'Please check the highlighted fields.',
      sending: 'Issuing your pass',
      tgMsg: 'Consultation request from 4prep.vercel.app:',
      tgFallback: '<strong>One more tap.</strong> Send your request to our team on Telegram, the message is already written for you.',
      tgSend: 'Send on Telegram',
      ok: '<strong>You are on board.</strong> Our team will contact you using the details you provided.',
      preview: ' <em>(Preview server: nothing was sent.)</em>',
      fail: '<strong>Your request was not sent.</strong> Please try again, or message us on Telegram at <a href="https://t.me/fourprepusa" target="_blank" rel="noopener">@fourprepusa</a>.',
      eaDays: '{n} days left to Early Action (Nov 1)',
      eaToday: 'Early Action deadline is today',
      quizStep: 'Question {n} of 3',
      q1: 'Do you have an IELTS score?',
      q1a: 'Not yet',
      q1b: 'Yes, I do',
      q1c: 'Not sure I need it',
      q2: 'And the SAT?',
      q2a: 'Not yet',
      q2b: 'Yes, I do',
      q2c: 'Not sure it is required',
      q3: 'Where is your application?',
      q3a: 'Haven’t started',
      q3b: 'List and essays in progress',
      q3c: 'Admitted, I need the visa',
      quizRes: 'Your starting stamp',
      quizCta: 'Book this route',
      quizRetry: 'Start over',
      quizBack: 'Back',
      why0: 'Not sure yet is a fine answer. In a free 20-minute call we map your level, goals and deadlines, then pick the first stamp together.',
      why1: 'You are missing both certificates, so we build the whole path: IELTS, SAT, admissions and the visa, in the right order.',
      why2: 'The English certificate is the next stamp to earn. Join an IELTS group, online or offline, and aim for your target band.',
      why3: 'Your IELTS is in hand. A structured SAT plan will strengthen your profile and your grant chances.',
      why4: 'Certificates are ready or in progress. Time to build the university list, essays and a grant strategy.',
      why5: 'You are admitted, so the embassy is the last gate. We rehearse the DS-160 and every interview question with you.'
    },
    uz: {
      yourName: 'Ismingiz', yourUni: 'Orzuingizdagi universitet', chooseRoute: 'Yo‘nalishni tanlang',
      errName: 'Ism va familiyangizni kiriting.',
      errContact: 'Telefon raqam yoki Telegram username kiriting.',
      errContactFmt: 'Telefon raqam (+998 90 123 45 67) yoki Telegram username (@username) kiriting.',
      errRoute: 'Yo‘nalishni yoki «Hali bilmayman» variantini tanlang.', sent: 'So‘rov yuborildi',
      errConsent: 'Bog‘lanishga roziligingizni tasdiqlang.',
      checkFields: 'Belgilangan maydonlarni tekshiring.',
      sending: 'Chipta tayyorlanmoqda',
      tgMsg: '4prep.vercel.app orqali konsultatsiya so‘rovi:',
      tgFallback: '<strong>Yana bitta bosish.</strong> So‘rovingizni Telegram orqali jamoamizga yuboring, xabar allaqachon tayyor.',
      tgSend: 'Telegram’da yuborish',
      ok: '<strong>Siz bortdasiz.</strong> Jamoamiz siz qoldirgan ma’lumotlar orqali bog‘lanadi.',
      preview: ' <em>(Preview server: hech narsa yuborilmadi.)</em>',
      fail: '<strong>So‘rov yuborilmadi.</strong> Qayta urinib ko‘ring yoki Telegram’da <a href="https://t.me/fourprepusa" target="_blank" rel="noopener">@fourprepusa</a> ga yozing.',
      eaDays: 'Early Action’gacha {n} kun (1-noyabr)',
      eaToday: 'Early Action muddati bugun',
      quizStep: '{n}-savol, jami 3 ta',
      q1: 'IELTS ballingiz bormi?',
      q1a: 'Hali yo‘q',
      q1b: 'Ha, bor',
      q1c: 'Kerakmi, bilmayman',
      q2: 'SAT-chi?',
      q2a: 'Hali yo‘q',
      q2b: 'Ha, bor',
      q2c: 'Majburiymi, bilmayman',
      q3: 'Arizangiz qaysi bosqichda?',
      q3a: 'Hali boshlamaganman',
      q3b: 'Ro‘yxat va esse ustida ishlayapman',
      q3c: 'Qabul qilinganman, viza kerak',
      quizRes: 'Sizning boshlang‘ich muhringiz',
      quizCta: 'Shu yo‘nalishni tanlash',
      quizRetry: 'Qayta boshlash',
      quizBack: 'Orqaga',
      why0: 'Hali bilmayman, bu ham yaxshi javob. Bepul 20 daqiqalik suhbatda darajangiz, maqsadingiz va muddatlaringizni birga aniqlab, birinchi muhrni tanlaymiz.',
      why1: 'Ikkala sertifikat ham hali yo‘q, shuning uchun butun yo‘lni quramiz: IELTS, SAT, qabul va viza, to‘g‘ri tartibda.',
      why2: 'Keyingi muhr: ingliz tili sertifikati. IELTS guruhiga qo‘shiling, online yoki offline, va maqsadli ballga intiling.',
      why3: 'IELTS tayyor. Tizimli SAT rejasi profilingiz va grant imkoniyatingizni kuchaytiradi.',
      why4: 'Sertifikatlar tayyor yoki yo‘lda. Endi universitetlar ro‘yxati, esse va grant strategiyasini quramiz.',
      why5: 'Qabul qilingansiz, demak oxirgi eshik: elchixona. DS-160 va suhbatning har bir savolini siz bilan mashq qilamiz.'
    },
    ru: {
      yourName: 'Ваше имя',
      yourUni: 'Ваш университет мечты',
      chooseRoute: 'Выберите направление',
      errName: 'Введите имя и фамилию.',
      errContact: 'Добавьте номер телефона или Telegram.',
      errContactFmt: 'Введите телефон (+998 90 123 45 67) или Telegram (@username).',
      errRoute: 'Выберите направление или «Пока не знаю».',
      sent: 'Заявка отправлена',
      errConsent: 'Подтвердите согласие на связь.',
      checkFields: 'Проверьте выделенные поля.',
      sending: 'Оформляем талон',
      tgMsg: 'Заявка на консультацию с 4prep.vercel.app:',
      tgFallback: '<strong>Ещё одно нажатие.</strong> Отправьте заявку нашей команде в Telegram, сообщение уже готово.',
      tgSend: 'Отправить в Telegram',
      ok: '<strong>Вы на борту.</strong> Наша команда свяжется с вами по указанным данным.',
      preview: ' <em>(Тестовый сервер: ничего не отправлено.)</em>',
      fail: '<strong>Заявка не отправлена.</strong> Попробуйте ещё раз или напишите в Telegram <a href="https://t.me/fourprepusa" target="_blank" rel="noopener">@fourprepusa</a>.',
      eaDays: 'До дедлайнов Early Action (1 ноября): {n} дн.',
      eaToday: 'Дедлайн Early Action — сегодня',
      quizStep: 'Вопрос {n} из 3',
      q1: 'Есть ли у вас балл IELTS?',
      q1a: 'Пока нет',
      q1b: 'Да, есть',
      q1c: 'Не уверен(а), что нужен',
      q2: 'А SAT?',
      q2a: 'Пока нет',
      q2b: 'Да, есть',
      q2c: 'Не уверен(а), что обязателен',
      q3: 'На каком этапе ваша заявка?',
      q3a: 'Ещё не начинал(а)',
      q3b: 'Список и эссе в работе',
      q3c: 'Уже принят(а), нужна виза',
      quizRes: 'Ваш стартовый штамп',
      quizCta: 'Выбрать этот маршрут',
      quizRetry: 'Начать заново',
      quizBack: 'Назад',
      why0: '«Пока не знаю» — тоже ответ. На бесплатном 20-минутном звонке мы вместе определим ваш уровень, цели и сроки и выберем первый штамп.',
      why1: 'Пока нет обоих сертификатов, поэтому строим весь путь: IELTS, SAT, поступление и виза, в правильном порядке.',
      why2: 'Следующий штамп — сертификат английского. Присоединяйтесь к группе IELTS, онлайн или офлайн, и идите к целевому баллу.',
      why3: 'IELTS уже есть. Структурированный план по SAT усилит ваш профиль и шансы на грант.',
      why4: 'Сертификаты готовы или на подходе. Пора собирать список университетов, эссе и стратегию гранта.',
      why5: 'Вы приняты, значит, остались ворота посольства. Мы отрабатываем с вами DS-160 и каждый вопрос интервью.'
    }
  };

  var D = { uz: UZ, ru: RU };
  var EN = {}, ENA = {};
  var META = {
    uz: { title: '4Prep Academy | IELTS, SAT, AQSh universitetlari va grantlar', desc: '4Prep Academy, Toshkent: IELTS va SAT kurslari, AQSh universitetlariga hujjat topshirish, 100% gacha grant va viza suhbatiga tayyorgarlik. Bepul konsultatsiya.' },
    ru: { title: '4Prep Academy | IELTS, SAT, университеты США и гранты', desc: '4Prep Academy, Ташкент: курсы IELTS и SAT, поступление в университеты США, гранты до 100% и подготовка к визовому интервью. Бесплатная консультация.' },
    en: { title: '4Prep Academy | IELTS, SAT, US universities and grants', desc: '4Prep Academy, Tashkent: IELTS and SAT courses, US university applications, grants of up to 100% and visa interview prep. Free consultation.' }
  };
  var lang = 'uz';
  try { var saved = localStorage.getItem('4prep-lang'); if (saved === 'en' || saved === 'uz' || saved === 'ru') lang = saved; } catch (e) {}

  function apply(l) {
    lang = l;
    document.documentElement.lang = l;
    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], key = el.getAttribute('data-i18n');
      if (!(key in EN)) EN[key] = el.innerHTML;
      var html = D[l] && D[l][key] != null ? D[l][key] : EN[key];
      if (el.innerHTML !== html) el.innerHTML = html;
    }
    var ar = document.querySelectorAll('[data-i18n-aria]');
    for (var a = 0; a < ar.length; a++) {
      var el2 = ar[a], k2 = el2.getAttribute('data-i18n-aria');
      if (!(k2 in ENA)) ENA[k2] = el2.getAttribute('aria-label');
      el2.setAttribute('aria-label', D[l] && D[l][k2] != null ? D[l][k2] : ENA[k2]);
    }
    document.title = META[l].title;
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', META[l].desc);
    var btns = document.querySelectorAll('[data-lang]');
    for (var j = 0; j < btns.length; j++) btns[j].setAttribute('aria-pressed', String(btns[j].getAttribute('data-lang') === l));
    try { localStorage.setItem('4prep-lang', l); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
  }

  window.I18N = {
    paint: function () { apply(lang); },
    init: function () {
      apply(lang);
      if (this._on) return;
      this._on = true;
      document.addEventListener('click', function (e) {
        var b = e.target.closest && e.target.closest('[data-lang]');
        if (!b || b.getAttribute('data-lang') === lang) return;
        var nl = b.getAttribute('data-lang');
        if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(function () { apply(nl); });
        else apply(nl);
      });
    },
    get lang() { return lang; },
    t: function (k) { return (RT[lang] && RT[lang][k]) || RT.en[k] || k; }
  };
})();
