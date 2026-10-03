/**
 * Hà Vy & Thanh An — nhận RSVP và bài hát vào Google Sheet.
 * Cách cài đặt: xem HUONG_DAN.md, Bước 2.
 *
 * Sheet "RSVP"  : mỗi khách một dòng. Gửi lại cùng số điện thoại → cập nhật dòng cũ.
 * Sheet "Songs" : playlist khách gửi (từ form RSVP và form Playlist).
 */

var SHEET_RSVP = 'RSVP';
var SHEET_SONGS = 'Songs';
var RSVP_HEADERS = ['ID', 'Gửi lúc', 'Cập nhật lúc', 'Họ tên', 'Số điện thoại', 'Khách của', 'Tham dự',
  'Sự kiện', 'Số người', 'Món ăn', 'Dị ứng', 'Bài hát', 'Lời nhắn', 'Ngôn ngữ'];
var SONG_HEADERS = ['ID', 'Thời điểm', 'Tên bài hát', 'Ca sĩ', 'Người gửi', 'Nguồn'];

var LABELS = {
  side: { bride: 'Nhà gái', groom: 'Nhà trai', both: 'Cả hai' },
  attending: { yes: 'Có', no: 'Không' },
  events: { family: 'Lễ Gia Tiên', reception: 'Tiệc cưới' },
  meal: { standard: 'Tiêu chuẩn', vegetarian: 'Chay', other: 'Khác' },
};

/** Chạy hàm này một lần để tạo 2 tab có sẵn tiêu đề. */
function setup() {
  sheet_(SHEET_RSVP, RSVP_HEADERS);
  sheet_(SHEET_SONGS, SONG_HEADERS);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.website) return json_({ ok: true }); // spam bot
    if (d.type === 'rsvp') saveRsvp_(d);
    else if (d.type === 'song') saveSong_(d);
    else return json_({ ok: false, error: 'unknown type' });
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'songs') {
    return json_({ ok: true, songs: listSongs_() });
  }
  return json_({ ok: true, service: 'HaVy & ThanhAn wedding' });
}

/* ---------------- RSVP ---------------- */
function saveRsvp_(d) {
  var name = clean_(d.name, 80);
  var phone = String(d.phone || '').replace(/\D/g, '').slice(0, 15);
  if (!name || phone.length < 9) throw new Error('missing name or phone');
  var id = clean_(d.id, 60);
  var now = new Date();

  var sh = sheet_(SHEET_RSVP, RSVP_HEADERS);
  var row = findRow_(sh, function (r) {
    return r[0] === id || String(r[4]).replace(/\D/g, '') === phone;
  });

  var events = String(d.events || '').split(',').filter(String)
    .map(function (k) { return LABELS.events[k] || k; }).join(', ');
  var values = [
    id,
    row ? sh.getRange(row, 2).getValue() : now,
    now,
    name,
    "'" + phone,
    LABELS.side[d.side] || '',
    LABELS.attending[d.attending] || '',
    events,
    d.attending === 'yes' ? Math.max(1, Math.min(10, Number(d.guests) || 1)) : 0,
    LABELS.meal[d.meal] || '',
    clean_(d.allergy, 200),
    clean_(d.song, 120),
    clean_(d.message, 600),
    d.lang === 'en' ? 'EN' : 'VI',
  ];
  if (row) {
    values[0] = sh.getRange(row, 1).getValue(); // keep the original ID
    sh.getRange(row, 1, 1, values.length).setValues([values]);
  } else {
    sh.appendRow(values);
  }

  // Bài hát gửi kèm RSVP cũng vào playlist.
  var songId = id + '-song';
  var songs = sheet_(SHEET_SONGS, SONG_HEADERS);
  var songRow = findRow_(songs, function (r) { return r[0] === songId; });
  if (d.song) {
    var sv = [songId, now, clean_(d.song, 120), '', name, 'RSVP'];
    if (songRow) songs.getRange(songRow, 1, 1, sv.length).setValues([sv]);
    else songs.appendRow(sv);
  } else if (songRow) {
    songs.deleteRow(songRow);
  }
}

/* ---------------- Songs ---------------- */
function saveSong_(d) {
  var title = clean_(d.title, 120);
  if (!title) throw new Error('missing title');
  var sh = sheet_(SHEET_SONGS, SONG_HEADERS);
  var id = clean_(d.id, 60);
  if (findRow_(sh, function (r) { return r[0] === id; })) return; // already saved
  sh.appendRow([id, new Date(), title, clean_(d.artist, 80), clean_(d.name, 60), 'Playlist']);
}

function listSongs_() {
  var sh = sheet_(SHEET_SONGS, SONG_HEADERS);
  var n = sh.getLastRow() - 1;
  if (n < 1) return [];
  return sh.getRange(2, 1, n, 5).getValues()
    .filter(function (r) { return r[0] && r[2]; })
    .map(function (r) {
      var parts = String(r[4] || '').trim().split(/\s+/);
      return {
        id: String(r[0]),
        at: r[1] instanceof Date ? r[1].toISOString() : String(r[1]),
        title: String(r[2]),
        artist: String(r[3] || ''),
        by: parts[parts.length - 1] || '', // chỉ hiện tên gọi, không hiện họ tên đầy đủ
      };
    })
    .reverse()
    .slice(0, 50);
}

/* ---------------- Helpers ---------------- */
function sheet_(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#F6F1E8');
    sh.setFrozenRows(1);
  }
  return sh;
}

function findRow_(sh, match) {
  var n = sh.getLastRow() - 1;
  if (n < 1) return 0;
  var rows = sh.getRange(2, 1, n, sh.getLastColumn()).getValues();
  for (var i = 0; i < rows.length; i++) if (match(rows[i])) return i + 2;
  return 0;
}

// Cắt độ dài và chặn chèn công thức (=, +, -, @) vào Sheet.
function clean_(v, max) {
  var s = String(v == null ? '' : v).replace(/[\u0000-\u001F]/g, ' ').trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
