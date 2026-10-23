/**
 * 4Prep Academy — consultation requests → Google Sheets
 * Paste this whole file into Extensions → Apps Script of your Google Sheet,
 * then Deploy → New deployment → Web app (see SETUP.md).
 */
var SHEET_NAME = 'Leads';
var HEADERS = ['Vaqt (Tashkent)', 'Status', 'Ism', 'Telefon / Telegram', 'Yo‘nalish', 'Orzu universiteti', 'Til', 'Sahifa'];
var STATUSES = ['Yangi', 'Bog‘lanildi', 'Konsultatsiya bo‘ldi', 'Kursga yozildi', 'Rad etdi'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    var d = JSON.parse((e.postData && e.postData.contents) || '{}');
    if (d.website) return out({ ok: true });                 // honeypot: bots only
    var name = clean(d.name), contact = clean(d.contact);
    if (name.length < 2 || contact.length < 5) return out({ ok: false, error: 'invalid' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) setup(sh);

    var when = Utilities.formatDate(new Date(), 'Asia/Tashkent', 'yyyy-MM-dd HH:mm:ss');
    sh.appendRow([when, STATUSES[0], name, contact, clean(d.program), clean(d.dreamUniversity), clean(d.lang), clean(d.page)]);
    var r = sh.getLastRow();
    sh.getRange(r, 2).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build());
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function doGet() { return out({ ok: true, service: '4prep-leads' }); }

function setup(sh) {
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#0A9B63').setFontColor('#ffffff');
  sh.setFrozenRows(1);
  sh.getRange('A:H').setNumberFormat('@');                  // keep +998… as text, never as a formula
  sh.setColumnWidths(1, 1, 150); sh.setColumnWidths(2, 1, 150); sh.setColumnWidths(3, 2, 190); sh.setColumnWidths(5, 1, 260); sh.setColumnWidths(6, 1, 170);
  var rule = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(STATUSES[0]).setBackground('#DDF7EA').setRanges([sh.getRange('B2:B')]).build();
  sh.setConditionalFormatRules([rule]);
}

function clean(v) { return String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, 300); }
function out(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
