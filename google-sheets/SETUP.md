# Google Sheets ulash (5 daqiqa)

Saytdagi forma to‘ldirilganda ism, telefon/Telegram, yo‘nalish va orzu universiteti Google Sheets'ga yangi qator bo‘lib tushadi.

1. https://sheets.new ni oching → jadval nomini "4Prep Leads" qiling.
2. **Extensions → Apps Script** ni bosing. Ichidagi kodni o‘chirib, `Code.gs` faylidagi kodni to‘liq joylang. Saqlang (Ctrl+S).
3. **Deploy → New deployment** → turi: **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - **Deploy** ni bosing va Google so‘ragan ruxsatni bering (Advanced → Go to project → Allow).
4. Chiqqan **Web app URL** ni nusxalang (`https://script.google.com/macros/s/.../exec`).
5. Sayt papkasidagi `config.js` faylini oching va URL'ni qo‘ying:
   `window.FOURPREP_SHEET_URL = 'https://script.google.com/macros/s/.../exec';`
6. Saytni qayta deploy qiling (Vercel).
7. Tekshirish: saytda formani to‘ldiring → jadvalda **Leads** varag‘i avtomatik yaratilib, qator paydo bo‘ladi.

Jadvalda "Status" ustuni bor: Yangi → Bog‘lanildi → Konsultatsiya bo‘ldi → Kursga yozildi. Yangi so‘rovlar yashil bilan ajralib turadi.

Eslatma: Apps Script kodini o‘zgartirsangiz, **Deploy → Manage deployments → Edit → New version** qiling, URL o‘zgarmaydi.
