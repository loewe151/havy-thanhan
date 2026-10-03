/* Hà Vy & Thanh An — wedding website logic.
   Nội dung nằm trong content.js; file này chỉ lo hiển thị và tương tác. */
(function () {
  'use strict';

  var W = window.WEDDING;
  var KEY = { lang: 'hvta.lang', rsvp: 'hvta.rsvp', songs: 'hvta.songs', queue: 'hvta.queue' };
  var TZ_LABEL = 'GMT+7';

  /* ------------------------------------------------------------------
     Interface strings
     ------------------------------------------------------------------ */
  var UI = {
    vi: {
      nav: { story: 'Câu chuyện', gallery: 'Hình ảnh', day: 'Lịch trình', dress: 'Dress Code', venue: 'Địa điểm', rsvp: 'RSVP', faq: 'Q&A' },
      menu: 'Menu', close: 'Đóng',
      dear: 'Thân gửi',
      ctaRsvp: 'RSVP · Xác nhận tham dự', ctaDay: 'Xem thông tin',
      invitedSub: 'Trân trọng mời bạn',
      saveSub: 'Hẹn bạn ngày 10.10',
      cd: ['Ngày', 'Giờ', 'Phút', 'Giây'],
      today: 'Hôm nay là ngày cưới.',
      married: 'Cảm ơn bạn đã đến chung vui.',
      addCal: 'Thêm vào lịch',
      ics: 'Apple / Outlook',
      storySub: 'Câu chuyện của chúng tôi',
      gallerySub: 'Hình ảnh trước ngày cưới',
      daySub: 'Lịch trình ngày cưới',
      dayDate: 'Thứ Bảy · 10 tháng 10, 2026',
      tentative: 'dự kiến',
      seeVenue: 'Xem địa điểm',
      hlSub: 'Những điều đang chờ bạn',
      dressSub: 'Trang phục',
      dressHint: 'Bảng màu gợi ý. Chọn một hoặc phối nhiều màu. Vui lòng tránh trang phục trắng tinh.',
      venueSub: 'Địa điểm',
      openMap: 'Mở Google Maps',
      travel: 'Hai địa điểm cách nhau khoảng 30–45 phút đi xe. Chiều thứ Bảy thường đông, bạn nên xuất phát sớm hơn dự kiến.',
      rsvpSub: 'Xác nhận tham dự',
      replyBy: 'Vui lòng phản hồi trước',
      f: {
        name: 'Họ và tên', phone: 'Số điện thoại', phoneHint: 'Dùng để nhận ra bạn nếu bạn sửa lại phản hồi.',
        side: 'Bạn là khách của', sides: { bride: 'Nhà gái · Hà Vy', groom: 'Nhà trai · Thanh An', both: 'Cả hai' },
        attend: 'Bạn sẽ đến chứ?', yes: 'Có, tôi sẽ đến', no: 'Rất tiếc, tôi không đến được',
        events: 'Bạn tham dự', ifInvited: 'nếu bạn được mời',
        guests: 'Số người tham dự', guestsHint: 'Tính cả bạn',
        meal: 'Lựa chọn món ăn', meals: { standard: 'Tiêu chuẩn', vegetarian: 'Chay', other: 'Khác' },
        allergy: 'Dị ứng thực phẩm', song: 'Bài hát bạn muốn nghe trong tiệc', message: 'Lời nhắn cho Hà Vy & Thanh An',
        optional: 'không bắt buộc',
        submit: 'Gửi xác nhận', update: 'Cập nhật phản hồi', sending: 'Đang gửi…', cancel: 'Huỷ',
      },
      err: { required: 'Vui lòng điền thông tin này.', phone: 'Số điện thoại chưa đúng.', choose: 'Vui lòng chọn một lựa chọn.', events: 'Chọn ít nhất một phần.', server: 'Chưa gửi được. Vui lòng thử lại.' },
      thanksYes: 'Cảm ơn bạn. Hẹn gặp bạn ngày 10.10.',
      thanksNo: 'Cảm ơn bạn đã báo. Chúng tôi sẽ nhớ bạn.',
      edit: 'Sửa phản hồi',
      sum: { guests: 'Số người', events: 'Tham dự', meal: 'Món ăn' },
      status: {
        sent: 'Đã gửi đến Hà Vy & Thanh An.',
        pending: 'Đã lưu trên máy này và sẽ tự gửi khi có mạng.',
        demo: 'Chế độ demo: phản hồi chỉ lưu trên trình duyệt này.',
      },
      closed: 'Đã hết hạn xác nhận online.',
      contactDirect: 'Vui lòng liên hệ trực tiếp với cô dâu chú rể.',
      contactVia: 'Vui lòng liên hệ',
      songsSub: 'Gửi bài hát cho tiệc',
      songsIntro: 'Bài hát nào sẽ kéo bạn ra sàn nhảy? Gửi cho chúng tôi, DJ sẽ lo phần còn lại.',
      s: { title: 'Tên bài hát', artist: 'Ca sĩ', by: 'Tên bạn', submit: 'Thêm vào playlist', added: 'Đã thêm vào playlist.', empty: 'Chưa có bài nào. Bạn là người đầu tiên nhé.', from: 'từ', list: 'Playlist của khách' },
      giftsSub: 'Quà mừng',
      giftsIntro: 'Sự hiện diện của bạn là món quà lớn nhất. Nếu bạn muốn gửi thêm lời chúc, thông tin dưới đây.',
      g: { bank: 'Ngân hàng', name: 'Chủ tài khoản', number: 'Số tài khoản', copy: 'Sao chép số tài khoản', copied: 'Đã sao chép số tài khoản.' },
      faqSub: 'Câu hỏi thường gặp',
      rsvpNow: 'Xác nhận ngay',
      questions: 'Cần hỗ trợ?',
      offline: 'Bạn đang offline. Phản hồi sẽ được lưu và gửi sau.',
      lb: { prev: 'Ảnh trước', next: 'Ảnh sau', close: 'Đóng' },
    },
    en: {
      nav: { story: 'Our Story', gallery: 'Gallery', day: 'The Day', dress: 'Dress Code', venue: 'Venue', rsvp: 'RSVP', faq: 'Q&A' },
      menu: 'Menu', close: 'Close',
      dear: 'Dear',
      ctaRsvp: 'RSVP', ctaDay: 'View the Day',
      invitedSub: '',
      saveSub: '',
      cd: ['Days', 'Hours', 'Minutes', 'Seconds'],
      today: 'Today is the day.',
      married: 'Thank you for celebrating with us.',
      addCal: 'Add to Calendar',
      ics: 'Apple / Outlook',
      storySub: '', gallerySub: '', daySub: '',
      dayDate: 'Saturday · 10 October 2026',
      tentative: 'tentative',
      seeVenue: 'See the venue',
      hlSub: '', dressSub: '',
      dressHint: 'A suggested palette: wear one, or mix a few. Kindly avoid all-white outfits.',
      venueSub: '',
      openMap: 'Open Google Maps',
      travel: 'The two venues are about 30–45 minutes apart by car. Saturday afternoon traffic can be heavy, so please leave a little early.',
      rsvpSub: '',
      replyBy: 'Kindly reply by',
      f: {
        name: 'Full name', phone: 'Phone number', phoneHint: 'So we can find your reply if you update it.',
        side: 'You are a guest of', sides: { bride: 'The bride · Hà Vy', groom: 'The groom · Thanh An', both: 'Both of us' },
        attend: 'Will you join us?', yes: "Yes, I'll be there", no: "Sorry, I can't make it",
        events: 'Attending', ifInvited: 'if invited',
        guests: 'Number of guests', guestsHint: 'Including you',
        meal: 'Meal preference', meals: { standard: 'Standard', vegetarian: 'Vegetarian', other: 'Other' },
        allergy: 'Food allergies', song: "A song you'd love to hear", message: 'Message for Hà Vy & Thanh An',
        optional: 'optional',
        submit: 'Send RSVP', update: 'Update RSVP', sending: 'Sending…', cancel: 'Cancel',
      },
      err: { required: 'Please fill this in.', phone: 'Please check the phone number.', choose: 'Please choose one.', events: 'Please choose at least one.', server: "We couldn't send that. Please try again." },
      thanksYes: "Thank you. We'll see you on 10.10.",
      thanksNo: "Thank you for letting us know. You'll be missed.",
      edit: 'Edit my reply',
      sum: { guests: 'Guests', events: 'Attending', meal: 'Meal' },
      status: {
        sent: 'Delivered to Hà Vy & Thanh An.',
        pending: "Saved on this device. It will send automatically once you're online.",
        demo: 'Demo mode: your reply is saved in this browser only.',
      },
      closed: 'Online RSVP has closed.',
      contactDirect: 'Please contact the couple directly.',
      contactVia: 'Please contact',
      songsSub: '',
      songsIntro: "Which song gets you on the dance floor? Tell us and we'll pass it to the DJ.",
      s: { title: 'Song title', artist: 'Artist', by: 'Your name', submit: 'Add to playlist', added: 'Added to the playlist.', empty: 'No songs yet. Be the first.', from: 'from', list: 'Guest playlist' },
      giftsSub: '',
      giftsIntro: 'Your presence is the greatest gift. If you would like to send a little something, the details are below.',
      g: { bank: 'Bank', name: 'Account name', number: 'Account number', copy: 'Copy account number', copied: 'Account number copied.' },
      faqSub: '',
      rsvpNow: 'RSVP Now',
      questions: 'Questions?',
      offline: "You're offline. Your reply will be saved and sent later.",
      lb: { prev: 'Previous photo', next: 'Next photo', close: 'Close' },
    },
  };

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } },
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Localised value: plain string, or { vi, en }.
  function L(v) {
    if (v && typeof v === 'object') return v[state.lang] || v.vi || v.en || '';
    return v || '';
  }
  function T() { return UI[state.lang]; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }
  function normPhone(p) {
    var d = String(p || '').replace(/\D/g, '');
    if (d.indexOf('84') === 0 && d.length >= 11) d = '0' + d.slice(2);
    return d;
  }
  function givenName(full) {
    var parts = String(full || '').trim().split(/\s+/);
    return parts[parts.length - 1] || '';
  }
  // Date in Vietnam time, formatted dd.mm.yyyy
  function vnDate(iso) {
    var d = new Date(new Date(iso).getTime() + 7 * 3600 * 1000);
    return pad(d.getUTCDate()) + '.' + pad(d.getUTCMonth() + 1) + '.' + d.getUTCFullYear();
  }
  function vnTime(iso) {
    var d = new Date(new Date(iso).getTime() + 7 * 3600 * 1000);
    return pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes());
  }
  function eventById(id) { return W.events.filter(function (e) { return e.id === id; })[0]; }
  function mapsUrl(q) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }

  var toastTimer;
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 3200);
  }

  /* ------------------------------------------------------------------
     State
     ------------------------------------------------------------------ */
  var params = new URLSearchParams(location.search);
  var urlLang = params.get('lang');
  var state = {
    lang: (urlLang === 'en' || urlLang === 'vi') ? urlLang : store.get(KEY.lang, 'vi'),
    guest: (params.get('guest') || params.get('khach') || '').trim().slice(0, 60),
    rsvp: store.get(KEY.rsvp, null),          // { data, status }
    editing: false,
    songs: store.get(KEY.songs, []),          // songs sent from this device
    remoteSongs: [],
    rendered: false,
  };
  if (state.lang !== 'vi' && state.lang !== 'en') state.lang = 'vi';

  var firstStart = new Date(W.events[0].start).getTime();
  var lastEnd = Math.max.apply(null, W.events.map(function (e) { return new Date(e.end).getTime(); }));
  var countdownTarget = new Date((eventById('reception') || W.events[0]).start).getTime();
  function phase() {
    var now = Date.now();
    if (now > lastEnd) return 'after';
    if (now >= firstStart) return 'today';
    return 'before';
  }
  function rsvpOpen() { return Date.now() <= new Date(W.rsvp.deadline).getTime(); }

  /* ------------------------------------------------------------------
     Calendar
     ------------------------------------------------------------------ */
  function icsStamp(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
  function icsEsc(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }
  function icsFold(line) {
    // RFC 5545: lines ≤ 75 octets; continuation lines start with a space.
    var enc = new TextEncoder(), out = [], cur = '', bytes = 0;
    Array.from(line).forEach(function (ch) {
      var b = enc.encode(ch).length;
      if (bytes + b > 73) { out.push(cur); cur = ' '; bytes = 1; }
      cur += ch; bytes += b;
    });
    out.push(cur);
    return out.join('\r\n');
  }
  function calText(ev) {
    var v = W.venues[ev.venue];
    var title = L(ev.name) + ' · ' + W.couple.bride + ' & ' + W.couple.groom;
    var where = v.name + (v.address ? ', ' + v.address : '') + ', ' + L(v.area).replace(/ · /g, ', ');
    var lines = ev.schedule.map(function (s) { return s.time + '  ' + s.title + ' · ' + L(s.sub); });
    if (/^https?:/.test(location.href)) lines.push('', location.origin + location.pathname);
    return { title: title, where: where, details: lines.join('\n') };
  }
  function icsHref(ev) {
    var c = calText(ev);
    var body = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HaVy ThanhAn//Wedding//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:' + ev.id + '-20261010@havy-thanhan.wedding',
      'DTSTAMP:' + icsStamp(new Date()),
      'DTSTART:' + icsStamp(new Date(ev.start)),
      'DTEND:' + icsStamp(new Date(ev.end)),
      'SUMMARY:' + icsEsc(c.title),
      'LOCATION:' + icsEsc(c.where),
      'DESCRIPTION:' + icsEsc(c.details),
      'BEGIN:VALARM', 'TRIGGER:-PT3H', 'ACTION:DISPLAY', 'DESCRIPTION:' + icsEsc(c.title), 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR',
    ].map(icsFold).join('\r\n');
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(body);
  }
  function gcalHref(ev) {
    var c = calText(ev);
    return 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=' + encodeURIComponent(c.title) +
      '&dates=' + icsStamp(new Date(ev.start)) + '/' + icsStamp(new Date(ev.end)) +
      '&ctz=Asia/Ho_Chi_Minh' +
      '&location=' + encodeURIComponent(c.where) +
      '&details=' + encodeURIComponent(c.details);
  }

  /* ------------------------------------------------------------------
     Section templates
     ------------------------------------------------------------------ */
  var secNo = 0;
  function head(en, sub, opts) {
    secNo += 1;
    opts = opts || {};
    return '<header class="sh rv' + (opts.center ? ' sh--center' : '') + '">' +
      '<p class="sh__num"><span>' + pad(secNo) + '</span></p>' +
      '<h2 class="sh__title">' + esc(en) + '</h2>' +
      (sub ? '<p class="sh__sub">' + esc(sub) + '</p>' : '') +
      '</header>';
  }

  function heroTpl() {
    var t = T(), ph = phase();
    return '<section class="hero" id="top">' +
      '<img class="hero__img" src="' + esc(W.hero.image) + '" alt="' + esc(W.couple.bride + ' & ' + W.couple.groom) + '" fetchpriority="high">' +
      '<div class="hero__shade" aria-hidden="true"></div>' +
      '<div class="hero__inner">' +
        (state.guest ? '<p class="hero__greet">' + esc(t.dear) + ' ' + esc(state.guest) + ',</p>' : '') +
        '<p class="eyebrow hero__eyebrow">The Wedding of</p>' +
        '<h1 class="hero__names"><span>' + esc(W.couple.bride) + '</span> <em>&amp;</em> <span>' + esc(W.couple.groom) + '</span></h1>' +
        '<p class="hero__date">' + esc(W.hero.dateText) + '</p>' +
        (ph === 'after'
          ? '<p class="hero__tag">' + esc(t.married) + '</p>'
          : '<p class="hero__tag">' + esc(W.hero.tagline.en) + '</p>' +
            (state.lang === 'vi' ? '<p class="hero__tag hero__tag--vi">' + esc(W.hero.tagline.vi) + '</p>' : '')) +
        '<div class="hero__cta">' +
          (ph !== 'after' ? '<a class="btn btn--light" href="#rsvp">' + esc(t.ctaRsvp) + '</a>' : '') +
          '<a class="btn btn--line-light" href="#day">' + esc(t.ctaDay) + '</a>' +
        '</div>' +
      '</div>' +
      '<a class="hero__scroll" href="#invite" aria-label="Scroll"><span></span></a>' +
    '</section>';
  }

  function inviteTpl() {
    var t = T(), i = W.invitation;
    return '<section class="invite" id="invite"><div class="wrap wrap--narrow">' +
      '<p class="eyebrow rv">You\'re Invited</p>' +
      (t.invitedSub ? '<p class="sub-vi rv">' + esc(t.invitedSub) + '</p>' : '') +
      '<p class="invite__body rv">' + esc(L(i.body)) + '</p>' +
      '<p class="invite__day rv">' + esc(L(i.day)) + '</p>' +
      '<p class="invite__note rv">' + esc(L(i.note)) + '</p>' +
    '</div></section>';
  }

  function saveTpl() {
    var t = T(), ph = phase();
    var cd = ph === 'before'
      ? '<div class="countdown rv" id="countdown" role="timer" aria-live="off">' +
          t.cd.map(function (lbl, i) {
            return '<div class="countdown__cell"><span class="countdown__n" data-cd="' + i + '">00</span><span class="countdown__l">' + esc(lbl) + '</span></div>';
          }).join('') + '</div>'
      : '<p class="save__state rv">' + esc(ph === 'today' ? t.today : t.married) + '</p>';
    var cal = ph === 'after' ? '' :
      '<div class="cal rv"><p class="cal__title">' + esc(t.addCal) + '</p><div class="cal__list">' +
      W.events.map(function (ev) {
        return '<div class="cal__item">' +
          '<p class="cal__name">' + esc(L(ev.name)) + ' <span>' + vnTime(ev.start) + (ev.confirmed ? '' : ' · ' + esc(t.tentative)) + '</span></p>' +
          '<div class="cal__btns">' +
            '<a class="chip" target="_blank" rel="noopener" href="' + esc(gcalHref(ev)) + '">Google Calendar</a>' +
            '<a class="chip" download="HaVy-ThanhAn-' + esc(ev.id) + '.ics" href="' + esc(icsHref(ev)) + '">' + esc(t.ics) + '</a>' +
          '</div></div>';
      }).join('') + '</div></div>';
    return '<section class="save" id="save"><div class="wrap">' +
      '<p class="eyebrow rv">Save the Date</p>' +
      (t.saveSub ? '<p class="sub-vi rv">' + esc(t.saveSub) + '</p>' : '') +
      '<p class="save__date rv" aria-label="10.10.2026">10<i>·</i>10<i>·</i>2026</p>' +
      cd + cal +
    '</div></section>';
  }

  function storyTpl() {
    var t = T(), s = W.story;
    return '<section class="story" id="story"><div class="wrap">' +
      head('Our Story', t.storySub) +
      '<div class="story__intro">' + s.paragraphs.map(function (p, i) {
        return '<p class="rv ' + (i === 0 ? 'story__lead' : 'story__p') + '">' + esc(L(p)) + '</p>';
      }).join('') + '</div>' +
      '<ol class="tl">' + s.timeline.map(function (m, i) {
        return '<li class="tl__item rv" style="--i:' + i + '">' +
          '<figure class="tl__fig"><img loading="lazy" src="' + esc(m.image) + '" alt="' + esc(m.title) + '"></figure>' +
          '<div class="tl__text"><span class="tl__year">' + esc(m.year) + '</span>' +
          '<h3 class="tl__title">' + esc(m.title) + '</h3><p class="tl__sub">' + esc(L(m.sub)) + '</p></div>' +
        '</li>';
      }).join('') + '</ol>' +
    '</div></section>';
  }

  var galleryFlat = [];
  function galleryTpl() {
    var t = T(), idx = 0;
    galleryFlat = [];
    return '<section class="gallery" id="gallery"><div class="wrap">' +
      head('Pre-wedding', t.gallerySub) +
      W.gallery.map(function (g, gi) {
        return '<div class="gal rv">' +
          '<h3 class="gal__label"><span>' + pad(gi + 1) + '</span>' + esc(g.group) + '</h3>' +
          '<div class="gal__grid gal__grid--' + g.items.length + '">' +
          g.items.map(function (it) {
            galleryFlat.push(it);
            var i = idx++;
            return '<button class="gal__item" type="button" data-photo="' + i + '" aria-label="' + esc(L(it.alt)) + '">' +
              '<img loading="lazy" src="assets/thumbs/' + esc(it.src) + '" alt="' + esc(L(it.alt)) + '"></button>';
          }).join('') + '</div></div>';
      }).join('') +
    '</div></section>' +
    '<div class="interlude" aria-hidden="true"><img loading="lazy" src="assets/images/venue-garden.jpg" alt=""></div>';
  }

  function dayTpl() {
    var t = T();
    return '<section class="day" id="day"><div class="wrap">' +
      head('The Day', t.daySub) +
      '<p class="day__date rv">' + esc(t.dayDate) + '</p>' +
      '<div class="day__events">' + W.events.map(function (ev) {
        var v = W.venues[ev.venue];
        return '<article class="ev ev--' + esc(ev.id) + ' rv">' +
          '<header class="ev__head">' +
            '<p class="ev__part">' + esc(L(ev.part)) + '</p>' +
            '<h3 class="ev__title">' + esc(ev.title) + '</h3>' +
            (state.lang === 'vi' ? '<p class="ev__vi">' + esc(ev.name.vi) + '</p>' : '') +
            '<p class="ev__meta">' + esc(v.name) + ' · ' + esc(L(ev.audience)) + '</p>' +
          '</header>' +
          (ev.about ? '<p class="ev__about">' + esc(L(ev.about)) + '</p>' : '') +
          '<ol class="sched">' + ev.schedule.map(function (s) {
            return '<li class="sched__row"><time class="sched__time">' + esc(s.time) + '</time>' +
              '<div><p class="sched__title">' + esc(s.title) + '</p><p class="sched__sub">' + esc(L(s.sub)) + '</p></div></li>';
          }).join('') + '</ol>' +
          (ev.confirmed ? '' : '<p class="ev__tbc">' + esc(t.tentative) + '</p>') +
          '<a class="link-arrow" href="#venue">' + esc(t.seeVenue) + ' · ' + esc(v.name) + '</a>' +
        '</article>';
      }).join('') + '</div>' +
    '</div></section>';
  }

  function highlightsTpl() {
    var t = T();
    return '<section class="hl" id="highlights"><div class="wrap">' +
      head('A Few Things to Look Forward To', t.hlSub) +
      '</div><div class="hl__track" tabindex="0" aria-label="Highlights">' +
      W.highlights.map(function (h, i) {
        return '<article class="hl__card' + (h.image ? '' : ' hl__card--text') + ' rv" style="--i:' + i + '">' +
          (h.image ? '<figure class="hl__fig"><img loading="lazy" src="' + esc(h.image) + '" alt="' + esc(h.title) + '"></figure>' : '<span class="hl__mark" aria-hidden="true">' + pad(i + 1) + '</span>') +
          '<h3 class="hl__title">' + esc(h.title) + '</h3><p class="hl__body">' + esc(L(h.body)) + '</p>' +
        '</article>';
      }).join('') +
    '</div></section>';
  }

  function dressTpl() {
    var t = T(), d = W.dressCode;
    return '<section class="dress" id="dress"><div class="wrap">' +
      head('Dress Code', t.dressSub) +
      '<div class="dress__body">' +
        '<div class="dress__text rv"><p class="dress__style">' + esc(d.style) + '</p>' +
        '<p class="dress__words">' + esc(L(d.words)) + '</p>' +
        '<p class="dress__hint">' + esc(t.dressHint) + '</p></div>' +
        '<ul class="swatches rv">' + d.colors.map(function (c) {
          return '<li class="sw"><span class="sw__chip" style="--c:' + esc(c.hex) + '"></span><span class="sw__name">' + esc(c.name) + '</span></li>';
        }).join('') + '</ul>' +
      '</div>' +
    '</div></section>';
  }

  function venueTpl() {
    var t = T();
    return '<section class="venue" id="venue"><div class="wrap">' +
      head('The Venue', t.venueSub) +
      '<div class="venue__grid">' + W.events.map(function (ev) {
        var v = W.venues[ev.venue];
        var mapSrc = 'https://maps.google.com/maps?q=' + encodeURIComponent(v.mapsQuery) + '&z=15&output=embed';
        return '<article class="vn rv">' +
          '<p class="vn__when">' + esc(L(ev.part)) + ' · ' + esc(L(ev.name)) + ' · ' + vnTime(ev.start) + '</p>' +
          '<h3 class="vn__name">' + esc(v.name) + '</h3>' +
          '<p class="vn__area">' + esc(L(v.area)) + '</p>' +
          (v.address ? '<p class="vn__addr">' + esc(v.address) + '</p>' : '') +
          (v.notes && v.notes.length ? '<ul class="vn__notes">' + v.notes.map(function (n) { return '<li>' + esc(L(n)) + '</li>'; }).join('') + '</ul>' : '') +
          '<div class="vn__map"><iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="' + esc(v.name) + '" src="' + esc(mapSrc) + '"></iframe></div>' +
          '<a class="btn btn--champagne" target="_blank" rel="noopener" href="' + esc(mapsUrl(v.mapsQuery)) + '">' + esc(t.openMap) + '</a>' +
        '</article>';
      }).join('') + '</div>' +
      '<p class="venue__travel rv">' + esc(t.travel) + '</p>' +
    '</div></section>';
  }

  /* ---------- RSVP ---------- */
  function contactLine() {
    var t = T(), c = W.contact;
    if (c.name || c.phone) {
      return esc(t.contactVia) + ' ' + esc(c.name) + (c.phone ? ' · <a href="tel:' + esc(c.phone.replace(/\s/g, '')) + '">' + esc(c.phone) + '</a>' : '') + '.';
    }
    return esc(t.contactDirect);
  }

  function rsvpTpl() {
    var t = T();
    return '<section class="rsvp" id="rsvp"><div class="wrap wrap--form">' +
      head('RSVP', t.rsvpSub, { center: true }) +
      '<p class="rsvp__by rv">' + esc(t.replyBy) + ' ' + vnDate(W.rsvp.deadline) + '</p>' +
      '<div id="rsvpBody" class="rv">' + rsvpBodyTpl() + '</div>' +
    '</div></section>';
  }

  function rsvpBodyTpl() {
    var t = T(), r = state.rsvp;
    if (r && !state.editing) return confirmTpl(r);
    if (!rsvpOpen()) return '<div class="card card--center"><p class="card__lead">' + esc(t.closed) + '</p><p>' + contactLine() + '</p></div>';
    return formTpl(r ? r.data : null);
  }

  function confirmTpl(r) {
    var t = T(), d = r.data, yes = d.attending === 'yes';
    var evNames = (d.events || '').split(',').filter(Boolean).map(function (id) { var e = eventById(id); return e ? L(e.name) : id; }).join(' · ');
    return '<div class="card card--center confirm">' +
      '<p class="confirm__mark" aria-hidden="true">' + (yes ? '10.10' : '—') + '</p>' +
      '<p class="card__lead">' + esc(yes ? t.thanksYes : t.thanksNo) + '</p>' +
      '<p class="confirm__name">' + esc(d.name) + '</p>' +
      (yes ? '<dl class="confirm__sum">' +
        '<div><dt>' + esc(t.sum.events) + '</dt><dd>' + esc(evNames) + '</dd></div>' +
        '<div><dt>' + esc(t.sum.guests) + '</dt><dd>' + esc(d.guests) + '</dd></div>' +
        '<div><dt>' + esc(t.sum.meal) + '</dt><dd>' + esc(t.f.meals[d.meal] || d.meal) + '</dd></div>' +
      '</dl>' : '') +
      '<p class="confirm__status confirm__status--' + esc(r.status) + '">' + esc(t.status[r.status] || '') + '</p>' +
      (rsvpOpen() ? '<button type="button" class="btn btn--line" data-action="edit-rsvp">' + esc(t.edit) + '</button>' : '<p class="confirm__closed">' + contactLine() + '</p>') +
    '</div>';
  }

  function field(name, label, inner, opts) {
    opts = opts || {};
    return '<div class="field' + (opts.cls ? ' ' + opts.cls : '') + '" data-field="' + name + '">' +
      (opts.legend
        ? '<fieldset><legend class="field__label">' + label + '</legend>' + inner + '</fieldset>'
        : '<label class="field__label" for="f-' + name + '">' + label + '</label>' + inner) +
      (opts.hint ? '<p class="field__hint" id="h-' + name + '">' + esc(opts.hint) + '</p>' : '') +
      '<p class="field__err" id="e-' + name + '" aria-live="polite"></p>' +
    '</div>';
  }
  function opt(label) { return ' <span class="field__opt">(' + esc(label) + ')</span>'; }

  function formTpl(d) {
    var t = T(), f = t.f;
    d = d || {};
    var name = d.name || state.guest || '';
    var attending = d.attending || '';
    var evs = (d.events || 'reception').split(',');
    var guestOpts = '';
    for (var g = 1; g <= W.rsvp.maxGuests; g++) guestOpts += '<option value="' + g + '"' + (String(d.guests || 1) === String(g) ? ' selected' : '') + '>' + g + '</option>';
    function radio(n, v, lbl, cur) {
      return '<label class="choice"><input type="radio" name="' + n + '" value="' + v + '"' + (cur === v ? ' checked' : '') + '><span>' + esc(lbl) + '</span></label>';
    }
    return '<form class="form" id="rsvpForm" novalidate>' +
      field('name', esc(f.name), '<input id="f-name" name="name" type="text" autocomplete="name" maxlength="80" value="' + esc(name) + '" aria-describedby="e-name">') +
      field('phone', esc(f.phone), '<input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="20" value="' + esc(d.phone || '') + '" aria-describedby="h-phone e-phone">', { hint: f.phoneHint }) +
      field('side', esc(f.side), '<div class="choices choices--3">' +
        radio('side', 'bride', f.sides.bride, d.side) + radio('side', 'groom', f.sides.groom, d.side) + radio('side', 'both', f.sides.both, d.side) + '</div>', { legend: true }) +
      field('attending', esc(f.attend), '<div class="choices choices--2">' +
        radio('attending', 'yes', f.yes, attending) + radio('attending', 'no', f.no, attending) + '</div>', { legend: true }) +
      '<div class="form__yes"' + (attending === 'yes' ? '' : ' hidden') + '>' +
        field('events', esc(f.events), '<div class="choices">' + W.events.map(function (ev) {
          return '<label class="choice choice--check"><input type="checkbox" name="events" value="' + esc(ev.id) + '"' + (evs.indexOf(ev.id) > -1 ? ' checked' : '') + '>' +
            '<span>' + esc(L(ev.name)) + ' · ' + vnTime(ev.start) + (ev.id === 'family' ? ' <em>(' + esc(f.ifInvited) + ')</em>' : '') + '</span></label>';
        }).join('') + '</div>', { legend: true }) +
        field('guests', esc(f.guests), '<select id="f-guests" name="guests" aria-describedby="h-guests">' + guestOpts + '</select>', { hint: f.guestsHint, cls: 'field--short' }) +
        field('meal', esc(f.meal), '<div class="choices choices--3">' +
          radio('meal', 'standard', f.meals.standard, d.meal || 'standard') + radio('meal', 'vegetarian', f.meals.vegetarian, d.meal) + radio('meal', 'other', f.meals.other, d.meal) + '</div>', { legend: true }) +
        field('allergy', esc(f.allergy) + opt(f.optional), '<input id="f-allergy" name="allergy" type="text" maxlength="200" value="' + esc(d.allergy || '') + '">') +
      '</div>' +
      field('song', esc(f.song) + opt(f.optional), '<input id="f-song" name="song" type="text" maxlength="120" value="' + esc(d.song || '') + '">') +
      field('message', esc(f.message) + opt(f.optional), '<textarea id="f-message" name="message" rows="4" maxlength="600">' + esc(d.message || '') + '</textarea>') +
      '<div class="hp" aria-hidden="true"><label>Website<input name="website" type="text" tabindex="-1" autocomplete="off"></label></div>' +
      '<p class="form__err" id="rsvpErr" role="alert"></p>' +
      '<div class="form__actions">' +
        '<button class="btn btn--solid" type="submit">' + esc(state.rsvp ? f.update : f.submit) + '</button>' +
        (state.rsvp ? '<button class="btn btn--text" type="button" data-action="cancel-edit">' + esc(f.cancel) + '</button>' : '') +
      '</div>' +
      (W.rsvp.endpoint ? '' : '<p class="form__demo">' + esc(t.status.demo) + '</p>') +
    '</form>';
  }

  /* ---------- Songs ---------- */
  function allSongs() {
    var seen = {}, list = [];
    state.remoteSongs.concat(state.songs).forEach(function (s) {
      if (!s || !s.title || seen[s.id]) return;
      seen[s.id] = 1; list.push(s);
    });
    list.sort(function (a, b) { return String(b.at || '').localeCompare(String(a.at || '')); });
    return list.slice(0, 20);
  }
  function songListTpl() {
    var t = T(), list = allSongs();
    if (!list.length) return '<p class="tracks__empty">' + esc(t.s.empty) + '</p>';
    return '<ol class="tracks">' + list.map(function (s, i) {
      return '<li class="track"><span class="track__n">' + pad(i + 1) + '</span>' +
        '<span class="track__main"><span class="track__title">' + esc(s.title) + '</span>' +
        (s.artist ? '<span class="track__artist">' + esc(s.artist) + '</span>' : '') + '</span>' +
        (s.by ? '<span class="track__by">' + esc(t.s.from) + ' ' + esc(s.by) + '</span>' : '') + '</li>';
    }).join('') + '</ol>';
  }
  function songsTpl() {
    var t = T(), s = t.s;
    return '<section class="songs" id="playlist"><div class="wrap">' +
      head('Playlist', t.songsSub) +
      '<div class="songs__grid">' +
        '<div class="rv"><p class="songs__intro">' + esc(t.songsIntro) + '</p>' +
        '<form class="form form--compact" id="songForm" novalidate>' +
          field('stitle', esc(s.title), '<input id="f-stitle" name="stitle" type="text" maxlength="120" aria-describedby="e-stitle">') +
          field('sartist', esc(s.artist) + opt(t.f.optional), '<input id="f-sartist" name="sartist" type="text" maxlength="80">') +
          field('sby', esc(s.by) + opt(t.f.optional), '<input id="f-sby" name="sby" type="text" maxlength="60" value="' + esc(state.rsvp ? state.rsvp.data.name : state.guest) + '">') +
          '<div class="hp" aria-hidden="true"><label>Website<input name="website" type="text" tabindex="-1" autocomplete="off"></label></div>' +
          '<button class="btn btn--solid" type="submit">' + esc(s.submit) + '</button>' +
        '</form></div>' +
        '<div class="rv"><p class="tracks__label">' + esc(s.list) + '</p><div id="songList">' + songListTpl() + '</div></div>' +
      '</div>' +
    '</div></section>';
  }

  function giftsTpl() {
    var g = W.gifts, t = T();
    if (!g.enabled || !g.accountNumber) return '';
    return '<section class="gifts" id="gifts"><div class="wrap wrap--narrow">' +
      head('Gifts', t.giftsSub, { center: true }) +
      '<p class="gifts__intro rv">' + esc(t.giftsIntro) + '</p>' +
      '<div class="card card--center rv">' +
        (g.qrImage ? '<img class="gifts__qr" loading="lazy" src="' + esc(g.qrImage) + '" alt="QR">' : '') +
        '<dl class="gifts__dl"><div><dt>' + esc(t.g.bank) + '</dt><dd>' + esc(g.bank) + '</dd></div>' +
        '<div><dt>' + esc(t.g.name) + '</dt><dd>' + esc(g.accountName) + '</dd></div>' +
        '<div><dt>' + esc(t.g.number) + '</dt><dd class="gifts__num">' + esc(g.accountNumber) + '</dd></div></dl>' +
        '<button type="button" class="btn btn--line" data-action="copy-account">' + esc(t.g.copy) + '</button>' +
      '</div></div></section>';
  }

  function faqTpl() {
    var t = T(), items = W.faq.filter(function (f) { return f.show && L(f.a); });
    return '<section class="faq" id="faq"><div class="wrap wrap--narrow">' +
      head('Q&A', t.faqSub) +
      '<div class="faq__list">' + items.map(function (f) {
        return '<details class="qa rv"><summary class="qa__q">' + esc(L(f.q)) + '<span class="qa__icon" aria-hidden="true"></span></summary>' +
          '<div class="qa__a"><p>' + esc(L(f.a)) + '</p></div></details>';
      }).join('') + '</div>' +
    '</div></section>';
  }

  function closingTpl() {
    var t = T(), c = W.closing;
    return '<section class="closing" id="closing">' +
      '<img class="closing__img" loading="lazy" src="' + esc(c.image) + '" alt="' + esc(W.couple.bride + ' & ' + W.couple.groom) + '">' +
      '<div class="closing__shade" aria-hidden="true"></div>' +
      '<div class="closing__inner rv">' +
        '<h2 class="closing__names">' + esc(W.couple.bride) + ' <em>&amp;</em> ' + esc(W.couple.groom) + '</h2>' +
        '<p class="closing__date">10 · 10 · 2026</p>' +
        '<p class="closing__line">' + esc(c.line.en) + '</p>' +
        (state.lang === 'vi' ? '<p class="closing__line closing__line--vi">' + esc(c.line.vi) + '</p>' : '') +
        (phase() !== 'after' ? '<a class="btn btn--light" href="#rsvp">' + esc(t.rsvpNow) + '</a>' : '') +
      '</div>' +
    '</section>';
  }

  function footerTpl() {
    var t = T(), c = W.contact;
    return '<footer class="foot"><div class="wrap foot__inner">' +
      '<p class="foot__mark">' + esc(W.couple.bride) + ' <em>&amp;</em> ' + esc(W.couple.groom) + '</p>' +
      '<p class="foot__meta">10.10.2026 · Ho Chi Minh City</p>' +
      ((c.name || c.phone) ? '<p class="foot__contact">' + esc(t.questions) + ' ' + esc(c.name) + (c.phone ? ' · <a href="tel:' + esc(c.phone.replace(/\s/g, '')) + '">' + esc(c.phone) + '</a>' : '') + '</p>' : '') +
    '</div></footer>';
  }

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */
  var NAV = [['story', '#story'], ['gallery', '#gallery'], ['day', '#day'], ['dress', '#dress'], ['venue', '#venue'], ['rsvp', '#rsvp'], ['faq', '#faq']];

  function renderNav() {
    var t = T();
    var links = NAV.map(function (n) { return '<a href="' + n[1] + '" data-nav="' + n[0] + '">' + esc(t.nav[n[0]]) + '</a>'; }).join('');
    $('#navLinks').innerHTML = links;
    $('#menuLinks').innerHTML = links;
    $$('.lang button').forEach(function (b) {
      var on = b.getAttribute('data-lang') === state.lang;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    $('#burgerLabel').textContent = t.menu;
    $('#lightbox [data-lb="prev"]').setAttribute('aria-label', t.lb.prev);
    $('#lightbox [data-lb="next"]').setAttribute('aria-label', t.lb.next);
    $('#lightbox [data-lb="close"]').setAttribute('aria-label', t.lb.close);
  }

  function snapshotForms() {
    var snap = {};
    ['rsvpForm', 'songForm'].forEach(function (id) {
      var f = document.getElementById(id);
      if (!f) return;
      snap[id] = $$('input, select, textarea', f).map(function (el) {
        return { name: el.name, value: el.value, checked: el.checked, type: el.type };
      });
    });
    return snap;
  }
  function restoreForms(snap) {
    Object.keys(snap).forEach(function (id) {
      var f = document.getElementById(id);
      if (!f) return;
      snap[id].forEach(function (s) {
        var sel = (s.type === 'radio' || s.type === 'checkbox')
          ? '[name="' + s.name + '"][value="' + s.value + '"]'
          : '[name="' + s.name + '"]';
        var el = $(sel, f);
        if (!el) return;
        if (s.type === 'radio' || s.type === 'checkbox') el.checked = s.checked; else el.value = s.value;
      });
      syncAttending();
    });
  }

  function render() {
    var snap = state.rendered ? snapshotForms() : {};
    var y = window.scrollY;
    secNo = 0;
    document.documentElement.lang = state.lang;
    renderNav();
    $('#app').innerHTML = [
      heroTpl(), inviteTpl(), saveTpl(), storyTpl(), galleryTpl(), dayTpl(), highlightsTpl(),
      dressTpl(), venueTpl(), rsvpTpl(), songsTpl(), giftsTpl(), faqTpl(), closingTpl(), footerTpl(),
    ].join('');
    restoreForms(snap);
    tickCountdown();
    if (state.rendered) {
      $$('.rv').forEach(function (el) { el.classList.add('is-in'); });
      window.scrollTo(0, y);
    } else {
      observeReveal();
    }
    state.rendered = true;
  }

  function rerenderRsvp() {
    $('#rsvpBody').innerHTML = rsvpBodyTpl();
  }
  function rerenderSongs() {
    var el = $('#songList');
    if (el) el.innerHTML = songListTpl();
  }

  /* ------------------------------------------------------------------
     Countdown
     ------------------------------------------------------------------ */
  function tickCountdown() {
    var cells = $$('[data-cd]');
    if (!cells.length) return;
    var diff = Math.max(0, countdownTarget - Date.now());
    var s = Math.floor(diff / 1000);
    var vals = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
    cells.forEach(function (c) {
      var v = pad(vals[+c.getAttribute('data-cd')]);
      if (c.textContent !== v) c.textContent = v;
    });
    if (diff === 0 && phase() !== 'before') render();
  }

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  function observeReveal() {
    var els = $$('.rv');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     Sending data (Google Apps Script) + offline queue
     ------------------------------------------------------------------ */
  function post(payload) {
    var url = W.rsvp.endpoint;
    if (!url) return Promise.resolve('demo');
    return fetch(url, { method: 'POST', body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (j) { return j && j.ok ? 'sent' : Promise.reject({ server: true, error: j && j.error }); })
      .catch(function (err) {
        if (err && err.server) return 'error';
        if (navigator.onLine === false) return 'offline';
        // Some in-app browsers block reading the response; send blind as a fallback.
        return fetch(url, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) })
          .then(function () { return 'sent'; }, function () { return 'offline'; });
      });
  }

  function queueAdd(payload) {
    var q = store.get(KEY.queue, []).filter(function (p) { return p.id !== payload.id; });
    q.push(payload);
    store.set(KEY.queue, q);
  }
  function markSent(payload) {
    if (payload.type === 'rsvp' && state.rsvp && state.rsvp.data.id === payload.id) {
      state.rsvp.status = 'sent';
      store.set(KEY.rsvp, state.rsvp);
      if (!state.editing) rerenderRsvp();
    }
    if (payload.type === 'song') {
      state.songs.forEach(function (s) { if (s.id === payload.id) s.status = 'sent'; });
      store.set(KEY.songs, state.songs);
    }
  }
  var flushing = false;
  function flushQueue() {
    if (flushing || !W.rsvp.endpoint || navigator.onLine === false) return;
    var q = store.get(KEY.queue, []);
    if (!q.length) return;
    flushing = true;
    var remaining = [];
    q.reduce(function (p, item) {
      return p.then(function () {
        return post(item).then(function (res) {
          if (res === 'sent') markSent(item); else remaining.push(item);
        });
      });
    }, Promise.resolve()).then(function () {
      store.set(KEY.queue, remaining);
      flushing = false;
      loadSongs();
    });
  }

  function loadSongs() {
    var url = W.rsvp.endpoint;
    if (!url) return;
    fetch(url + (url.indexOf('?') > -1 ? '&' : '?') + 'action=songs')
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.ok && Array.isArray(j.songs)) { state.remoteSongs = j.songs; rerenderSongs(); }
      })
      .catch(function () { /* list stays local */ });
  }

  /* ------------------------------------------------------------------
     RSVP form
     ------------------------------------------------------------------ */
  function syncAttending() {
    var form = $('#rsvpForm');
    if (!form) return;
    var v = (form.querySelector('[name="attending"]:checked') || {}).value;
    var block = $('.form__yes', form);
    if (block) block.hidden = v !== 'yes';
  }

  function setErr(form, name, msg) {
    var wrap = $('[data-field="' + name + '"]', form);
    if (!wrap) return;
    wrap.classList.toggle('is-invalid', !!msg);
    $('.field__err', wrap).textContent = msg || '';
    var input = $('input, select, textarea', wrap);
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function readRsvp(form) {
    var fd = new FormData(form);
    var attending = fd.get('attending') || '';
    return {
      type: 'rsvp',
      id: state.rsvp ? state.rsvp.data.id : uid(),
      submittedAt: new Date().toISOString(),
      lang: state.lang,
      name: String(fd.get('name') || '').trim().replace(/\s+/g, ' '),
      phone: normPhone(fd.get('phone')),
      side: fd.get('side') || '',
      attending: attending,
      events: attending === 'yes' ? fd.getAll('events').join(',') : '',
      guests: attending === 'yes' ? Number(fd.get('guests') || 1) : 0,
      meal: attending === 'yes' ? (fd.get('meal') || 'standard') : '',
      allergy: attending === 'yes' ? String(fd.get('allergy') || '').trim() : '',
      song: String(fd.get('song') || '').trim(),
      message: String(fd.get('message') || '').trim(),
      website: fd.get('website') || '',
    };
  }

  function validateRsvp(form, d) {
    var e = T().err, errs = {};
    if (!d.name) errs.name = e.required;
    if (!d.phone) errs.phone = e.required;
    else if (d.phone.length < 9 || d.phone.length > 15) errs.phone = e.phone;
    if (!d.side) errs.side = e.choose;
    if (!d.attending) errs.attending = e.choose;
    if (d.attending === 'yes' && !d.events) errs.events = e.events;
    ['name', 'phone', 'side', 'attending', 'events'].forEach(function (k) { setErr(form, k, errs[k]); });
    var first = Object.keys(errs)[0];
    if (first) {
      var el = $('[data-field="' + first + '"] input, [data-field="' + first + '"] select', form);
      if (el) el.focus();
      return false;
    }
    return true;
  }

  function onRsvpSubmit(form) {
    var t = T();
    var d = readRsvp(form);
    if (!validateRsvp(form, d)) return;
    $('#rsvpErr').textContent = '';
    var btn = $('button[type="submit"]', form);
    btn.disabled = true;
    btn.textContent = t.f.sending;

    if (d.website) { // honeypot: pretend success, send nothing
      finishRsvp(d, 'sent');
      return;
    }
    delete d.website;
    post(d).then(function (res) {
      if (res === 'error') {
        btn.disabled = false;
        btn.textContent = state.rsvp ? t.f.update : t.f.submit;
        $('#rsvpErr').textContent = t.err.server;
        return;
      }
      if (res === 'offline') { queueAdd(d); toast(t.offline); }
      finishRsvp(d, res === 'offline' ? 'pending' : res);
    });
  }

  function finishRsvp(d, status) {
    state.rsvp = { data: d, status: status };
    state.editing = false;
    store.set(KEY.rsvp, state.rsvp);
    // A song requested in the RSVP also appears in the playlist.
    var sid = d.id + '-song';
    state.songs = state.songs.filter(function (s) { return s.id !== sid; });
    if (d.song) state.songs.push({ id: sid, title: d.song, artist: '', by: givenName(d.name), at: d.submittedAt, status: status });
    store.set(KEY.songs, state.songs);
    rerenderRsvp();
    rerenderSongs();
    var by = $('#f-sby');
    if (by && !by.value) by.value = d.name;
    $('#rsvp').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ------------------------------------------------------------------
     Song form
     ------------------------------------------------------------------ */
  function onSongSubmit(form) {
    var t = T();
    var fd = new FormData(form);
    var title = String(fd.get('stitle') || '').trim();
    setErr(form, 'stitle', title ? '' : t.err.required);
    if (!title) { $('#f-stitle').focus(); return; }
    var song = {
      type: 'song',
      id: uid(),
      at: new Date().toISOString(),
      title: title,
      artist: String(fd.get('sartist') || '').trim(),
      name: String(fd.get('sby') || '').trim(),
      lang: state.lang,
    };
    var local = { id: song.id, title: song.title, artist: song.artist, by: givenName(song.name), at: song.at, status: 'pending' };
    if (fd.get('website')) { form.reset(); toast(t.s.added); return; }
    state.songs.push(local);
    store.set(KEY.songs, state.songs);
    rerenderSongs();
    $('#f-stitle').value = '';
    $('#f-sartist').value = '';
    toast(t.s.added);
    post(song).then(function (res) {
      if (res === 'sent') markSent(song);
      else if (res === 'offline') queueAdd(song);
    });
  }

  /* ------------------------------------------------------------------
     Lightbox
     ------------------------------------------------------------------ */
  var lb = { i: 0, lastFocus: null };
  function lbShow(i) {
    lb.i = (i + galleryFlat.length) % galleryFlat.length;
    var it = galleryFlat[lb.i];
    var img = $('#lbImg');
    img.src = 'assets/images/' + it.src;
    img.alt = L(it.alt);
    $('#lbCap').textContent = L(it.alt) + '  ·  ' + (lb.i + 1) + ' / ' + galleryFlat.length;
  }
  function lbOpen(i) {
    lb.lastFocus = document.activeElement;
    var box = $('#lightbox');
    box.hidden = false;
    document.body.classList.add('no-scroll');
    lbShow(i);
    requestAnimationFrame(function () { box.classList.add('is-on'); });
    $('[data-lb="close"]', box).focus();
  }
  function lbClose() {
    var box = $('#lightbox');
    box.classList.remove('is-on');
    document.body.classList.remove('no-scroll');
    setTimeout(function () { box.hidden = true; }, 250);
    if (lb.lastFocus) lb.lastFocus.focus();
  }

  /* ------------------------------------------------------------------
     Menu
     ------------------------------------------------------------------ */
  function setMenu(open) {
    var menu = $('#menu'), burger = $('#burger');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('menu-open', open);
    if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add('is-on'); }); }
    else { menu.classList.remove('is-on'); setTimeout(function () { menu.hidden = true; }, 300); }
  }

  /* ------------------------------------------------------------------
     Events
     ------------------------------------------------------------------ */
  function bind() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('[data-lang], [data-action], [data-photo], [data-lb], #burger, .menu a');
      if (!el) return;
      if (el.hasAttribute('data-lang')) {
        var l = el.getAttribute('data-lang');
        if (l !== state.lang) { state.lang = l; store.set(KEY.lang, l); render(); }
      } else if (el.id === 'burger') {
        setMenu(el.getAttribute('aria-expanded') !== 'true');
      } else if (el.matches('.menu a')) {
        setMenu(false);
      } else if (el.hasAttribute('data-photo')) {
        lbOpen(+el.getAttribute('data-photo'));
      } else if (el.hasAttribute('data-lb')) {
        var a = el.getAttribute('data-lb');
        if (a === 'close') lbClose(); else lbShow(lb.i + (a === 'next' ? 1 : -1));
      } else {
        var act = el.getAttribute('data-action');
        if (act === 'edit-rsvp') { state.editing = true; rerenderRsvp(); var n = $('#f-name'); if (n) n.focus(); }
        if (act === 'cancel-edit') { state.editing = false; rerenderRsvp(); }
        if (act === 'copy-account') {
          var num = W.gifts.accountNumber.replace(/\s/g, '');
          (navigator.clipboard ? navigator.clipboard.writeText(num) : Promise.reject())
            .then(function () { toast(T().g.copied); }, function () { toast(num); });
        }
      }
    });

    $('#lightbox').addEventListener('click', function (e) { if (e.target.id === 'lightbox') lbClose(); });

    document.addEventListener('change', function (e) {
      if (e.target.name === 'attending') { syncAttending(); setErr($('#rsvpForm'), 'attending', ''); }
      else if (e.target.closest && e.target.closest('#rsvpForm') && e.target.name) setErr($('#rsvpForm'), e.target.name, '');
    });
    document.addEventListener('input', function (e) {
      var f = e.target.form;
      if (f && (f.id === 'rsvpForm' || f.id === 'songForm')) setErr(f, e.target.name, '');
    });
    document.addEventListener('submit', function (e) {
      if (e.target.id === 'rsvpForm') { e.preventDefault(); onRsvpSubmit(e.target); }
      if (e.target.id === 'songForm') { e.preventDefault(); onSongSubmit(e.target); }
    });

    document.addEventListener('keydown', function (e) {
      var box = $('#lightbox');
      if (!box.hidden) {
        if (e.key === 'Escape') lbClose();
        if (e.key === 'ArrowRight') lbShow(lb.i + 1);
        if (e.key === 'ArrowLeft') lbShow(lb.i - 1);
        if (e.key === 'Tab') { // keep focus inside the lightbox
          var f = $$('button', box), i = f.indexOf(document.activeElement);
          e.preventDefault();
          f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
        }
      } else if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setMenu(false);
        $('#burger').focus();
      }
    });

    // Swipe in lightbox
    var x0 = null;
    $('#lightbox').addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    $('#lightbox').addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) lbShow(lb.i + (dx < 0 ? 1 : -1));
      x0 = null;
    });

    // Sticky nav state + active link
    var ticking = false;
    function onScroll() {
      ticking = false;
      var hero = $('.hero');
      var solid = !hero || window.scrollY > hero.offsetHeight - 80;
      $('#nav').classList.toggle('nav--solid', solid);
      var mid = window.innerHeight * 0.35, current = '';
      NAV.forEach(function (n) {
        var s = $(n[1]);
        if (s && s.getBoundingClientRect().top <= mid) current = n[0];
      });
      $$('[data-nav]').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('data-nav') === current); });
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    window.addEventListener('online', flushQueue);
    setInterval(tickCountdown, 1000);
  }

  render();
  bind();
  flushQueue();
  loadSongs();
})();
