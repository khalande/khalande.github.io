/**
 * Bluenxt website → Google Sheet "database".
 * Every form submission from the website is added as a new row.
 * Each form gets its own tab: "Contact", "Newsletter", "Notify Me".
 * New columns are added automatically if a form starts sending new fields.
 *
 * Setup: see SETUP.md in this folder.
 */

// Optional: also email a copy of every submission (leave '' to turn off).
var NOTIFY_EMAIL = '';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = JSON.parse(e.postData.contents || '{}');
    var tabName = String(data.sheet || 'Submissions').slice(0, 50);
    delete data.sheet;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);

    // Header row: keep existing columns, append any new ones
    var headers = sheet.getLastColumn() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : [];
    if (headers.length === 0) {
      headers = ['Received'];
    }
    Object.keys(data).forEach(function (key) {
      if (headers.indexOf(key) === -1) headers.push(key);
    });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sheet.setFrozenRows(1);

    var row = headers.map(function (h) {
      if (h === 'Received') return new Date();
      var v = data[h];
      // Neutralise spreadsheet formulas typed into a form
      if (typeof v === 'string' && /^[=+\-@]/.test(v)) v = "'" + v;
      return v === undefined ? '' : v;
    });
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(NOTIFY_EMAIL, '[bluenxt.ai] New ' + tabName + ' submission',
        headers.map(function (h, i) { return h + ': ' + row[i]; }).join('\n'));
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Lets you check the web app URL in a browser: it should say "Bluenxt form endpoint is running".
function doGet() {
  return ContentService.createTextOutput('Bluenxt form endpoint is running');
}
