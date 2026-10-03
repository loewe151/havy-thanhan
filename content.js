/* =====================================================================
   NỘI DUNG WEBSITE — Hà Vy & Thanh An · 10.10.2026
   ---------------------------------------------------------------------
   Đây là file DUY NHẤT cần sửa để thay đổi nội dung website.
   • Chữ có hai ngôn ngữ viết dạng { vi: "...", en: "..." }.
   • Sửa xong, lưu file và tải lại trang (F5) là thấy thay đổi.
   • Các dòng có "TODO" là thông tin cần xác nhận trước khi gửi link.
   ===================================================================== */

window.WEDDING = {

  couple: {
    bride: "Hà Vy",
    groom: "Thanh An",
    monogram: "HV & TA",
  },

  /* ---------- Cấu hình RSVP & lưu dữ liệu ---------- */
  rsvp: {
    // Dán URL Web App của Google Apps Script vào đây (xem HUONG_DAN.md, Bước 2).
    // Để trống "" = chế độ demo: dữ liệu chỉ lưu trên trình duyệt của khách.
    endpoint: "https://script.google.com/macros/s/AKfycbzIm1ExOI-R7UQkB2I08UXDXN9ghEbtnP0iz7KLjjVINlIY6guWQMTVtwQwsxfXBhJs/exec",
    // Hạn RSVP (giờ Việt Nam). TODO: tài liệu gốc ghi 20.09.2026 (đã qua) → tạm đặt 07.10.2026.
    deadline: "2026-10-07T23:59:00+07:00",
    // Số người tối đa cho mỗi lần xác nhận (tính cả người gửi).
    maxGuests: 2,
  },

  // Người hỗ trợ khách (hiện ở footer và khi hết hạn RSVP). Để trống "" thì ẩn.
  contact: {
    name: "",   // TODO: ví dụ "Minh Thư (em gái cô dâu)"
    phone: "",  // TODO: ví dụ "0901 234 567"
  },

  /* ---------- Hero ---------- */
  hero: {
    image: "assets/images/hero-main.jpg",
    tagline: { en: "Ceremony · Dinner · Celebration", vi: "Lễ cưới · Tiệc tối · Tiệc mừng" },
    dateText: "10.10.2026",
  },

  /* ---------- Lời mời ---------- */
  invitation: {
    body: {
      vi: "Chúng tôi rất vui được mời bạn đến dự lễ cưới của Hà Vy & Thanh An.",
      en: "We would be delighted to have you with us at the wedding of Hà Vy & Thanh An.",
    },
    day: { vi: "Thứ Bảy · 10.10.2026", en: "Saturday · 10.10.2026" },
    note: {
      vi: "Một buổi lễ thân mật, tiếp nối bằng tiệc tối và những cuộc vui đến muộn.",
      en: "An intimate ceremony, followed by dinner and a celebration that runs late into the night.",
    },
  },

  /* ---------- Câu chuyện ---------- */
  story: {
    paragraphs: [
      { vi: "Không phải một câu chuyện quá kịch tính.",
        en: "It isn't a particularly dramatic story." },
      { vi: "Chúng tôi gặp nhau, dành thời gian bên nhau và dần nhận ra cuộc sống trở nên tốt hơn khi có người kia ở cạnh.",
        en: "We met, spent time together, and slowly realised that life is simply better with the other one around." },
      { vi: "Sau những chuyến đi, những bữa tối muộn, những kế hoạch thay đổi vào phút cuối và rất nhiều ngày bình thường, chúng tôi quyết định bắt đầu một chương mới.",
        en: "After the trips, the late dinners, the plans that changed at the last minute and a great many ordinary days, we decided to begin a new chapter." },
    ],
    timeline: [
      { year: "2021", title: "The First Hello", sub: { vi: "Lần đầu gặp nhau", en: "Where it began" }, image: "assets/images/story-2021.jpg" },
      { year: "2022", title: "More Time Together", sub: { vi: "Thêm nhiều thời gian bên nhau", en: "Weekends, then every day" }, image: "assets/images/story-2022.jpg" },
      { year: "2024", title: "Our Kind of Everyday", sub: { vi: "Những ngày rất đỗi bình thường", en: "The quiet, ordinary days" }, image: "assets/images/story-2024.jpg" },
      { year: "2026", title: "The Next Chapter", sub: { vi: "Chương tiếp theo", en: "And now, this" }, image: "assets/images/story-2026.jpg" },
    ],
  },

  /* ---------- Thư viện ảnh ---------- */
  gallery: [
    { group: "Studio Portraits", items: [
      { src: "bride-studio-01.jpg", alt: { vi: "Chân dung Hà Vy", en: "Portrait of Hà Vy" } },
      { src: "couple-studio-full.jpg", alt: { vi: "Hà Vy và Thanh An trong studio", en: "Hà Vy and Thanh An in the studio" } },
      { src: "groom-studio-01.jpg", alt: { vi: "Chân dung Thanh An", en: "Portrait of Thanh An" } },
    ]},
    { group: "Together", items: [
      { src: "prewedding-walk.jpg", alt: { vi: "Hai người đi dạo", en: "A walk together" } },
      { src: "couple-studio-seated.jpg", alt: { vi: "Hai người ngồi cạnh nhau", en: "Seated together" } },
      { src: "prewedding-veil.jpg", alt: { vi: "Cô dâu với khăn voan", en: "The bride's veil" } },
    ]},
    { group: "Little Moments", items: [
      { src: "couple-studio-close.jpg", alt: { vi: "Khoảnh khắc cận cảnh", en: "A close moment" } },
      { src: "bridal-flatlay.jpg", alt: { vi: "Nhẫn cưới, giày và hoa cưới", en: "Rings, shoes and bouquet" } },
    ]},
  ],

  /* ---------- Sự kiện & lịch trình ----------
     start/end ghi theo giờ Việt Nam (+07:00).
     confirmed: false → hiện nhãn "dự kiến" cạnh giờ. */
  events: [
    {
      id: "family",
      title: "Family Ceremony",
      name: { vi: "Lễ Gia Tiên", en: "Family Ceremony" },
      part: { vi: "Buổi sáng", en: "Morning" },
      audience: { vi: "Dành cho gia đình & khách thân", en: "For family & close friends" },
      about: {
        vi: "Nghi lễ truyền thống tại tư gia, hai bên gia đình ra mắt và cô dâu chú rể thắp hương báo cáo tổ tiên.",
        en: "A traditional Vietnamese ceremony at the family home, where both families meet and the couple pay respect to their ancestors.",
      },
      venue: "villa",
      start: "2026-10-10T09:00:00+07:00", // TODO: xác nhận giờ Lễ Gia Tiên
      end:   "2026-10-10T11:00:00+07:00",
      confirmed: false,
      schedule: [
        { time: "09:00", title: "Family Ceremony", sub: { vi: "Lễ Gia Tiên", en: "Ancestral rites" } },
      ],
    },
    {
      id: "reception",
      title: "The Wedding",
      name: { vi: "Lễ cưới & Tiệc tối", en: "Ceremony & Dinner" },
      part: { vi: "Buổi chiều tối", en: "Evening" },
      audience: { vi: "Dành cho tất cả khách mời", en: "For all guests" },
      venue: "hyatt",
      start: "2026-10-10T16:30:00+07:00",
      end:   "2026-10-10T23:00:00+07:00",
      confirmed: true,
      schedule: [
        { time: "16:30", title: "Welcome Drinks", sub: { vi: "Đón khách", en: "Guests arrive" } },
        { time: "17:30", title: "Ceremony", sub: { vi: "Lễ cưới", en: "The vows" } },
        { time: "18:00", title: "Cocktails & Golden Hour", sub: { vi: "Cocktail & chụp ảnh", en: "Drinks & photographs" } },
        { time: "18:30", title: "Dinner", sub: { vi: "Tiệc tối", en: "Dinner is served" } },
        { time: "20:00", title: "First Dance", sub: { vi: "Điệu nhảy đầu tiên", en: "Our first dance" } },
        { time: "20:30", title: "The Party", sub: { vi: "Tiệc mừng", en: "Dancing begins" } },
        { time: "22:00", title: "Late Night", sub: { vi: "Cuộc vui tiếp tục", en: "The night goes on" } },
      ],
    },
  ],

  /* ---------- Địa điểm ---------- */
  venues: {
    villa: {
      name: "Khu Villa Park",
      area: { vi: "Phú Hữu · TP. Thủ Đức (Q9 cũ) · TP. Hồ Chí Minh", en: "Phú Hữu · Thủ Đức (former District 9) · Ho Chi Minh City" },
      address: "", // TODO: số nhà / số căn villa
      mapsQuery: "Khu Villa Park, Bưng Ông Thoàn, Phú Hữu, Thủ Đức, Hồ Chí Minh",
      notes: [],   // TODO: ví dụ { vi: "Ô tô đỗ tại bãi xe đầu khu", en: "Cars park at the entrance lot" }
      image: "assets/images/venue-garden.jpg",
    },
    hyatt: {
      name: "Park Hyatt Saigon",
      area: { vi: "2 Công trường Lam Sơn · Quận 1 · TP. Hồ Chí Minh", en: "2 Lam Son Square · District 1 · Ho Chi Minh City" },
      address: "", // TODO: tên sảnh tiệc
      mapsQuery: "Park Hyatt Saigon, 2 Lam Son Square, Ho Chi Minh City",
      notes: [
        { vi: "Đón khách từ 16:30", en: "Guests welcomed from 16:30" },
        { vi: "Khách nên có mặt trước 17:10", en: "Please arrive before 17:10" },
      ],
      image: "assets/images/reception-table.jpg",
    },
  },

  /* ---------- Điểm nhấn của tiệc ---------- */
  highlights: [
    { title: "Signature Drinks", body: { vi: "Hai cocktail riêng cho buổi tiệc.", en: "Two cocktails created just for the evening." }, image: "assets/images/signature-drinks.jpg" },
    { title: "Polaroid Corner", body: { vi: "Chụp một tấm, giữ một tấm và để lại một tấm.", en: "Take one, keep one, leave one behind for us." }, image: "assets/images/polaroid-corner.jpg" },
    { title: "Table Notes", body: { vi: "Những chi tiết nhỏ được chuẩn bị riêng tại bàn tiệc.", en: "Small details prepared for you at every table." }, image: "assets/images/reception-table.jpg" },
    { title: "After Dark", body: { vi: "Không gian thay đổi khi đêm xuống.", en: "The room changes as night falls." }, image: "assets/images/after-party.jpg" },
    { title: "Late-night Bites", body: { vi: "Đồ ăn nhẹ sau tiệc.", en: "Something to eat after the dancing." } },
  ],

  /* ---------- Dress code ---------- */
  dressCode: {
    style: "Modern Garden Formal",
    words: { vi: "Thanh lịch · Hiện đại · Tự nhiên", en: "Elegant · Modern · Natural" },
    colors: [
      { name: "Ivory", hex: "#F3ECDF" },
      { name: "Champagne", hex: "#C5A571" },
      { name: "Olive", hex: "#68704A" },
      { name: "Dusty Rose", hex: "#D5AAA4" },
      { name: "Burgundy", hex: "#681F2D" },
      { name: "Chocolate", hex: "#4A3227" },
      { name: "Black", hex: "#1C1917" },
    ],
  },

  /* ---------- Quà mừng ----------
     Chỉ hiện khi enabled: true VÀ đã điền đủ thông tin thật.
     Không dùng QR tạo bằng AI — chỉ dùng ảnh QR xuất từ app ngân hàng. */
  gifts: {
    enabled: false,
    bank: "",
    accountName: "",
    accountNumber: "",
    qrImage: "", // ví dụ "assets/images/qr.png"
  },

  /* ---------- Q&A ----------
     show: false → câu hỏi bị ẩn (đang chờ xác nhận). */
  faq: [
    { show: true,
      q: { vi: "Tôi nên đến lúc mấy giờ?", en: "What time should I arrive?" },
      a: { vi: "Tiệc tối đón khách từ 16:30. Bạn nên có mặt trước 17:10 để kịp buổi lễ lúc 17:30.",
           en: "We welcome guests from 16:30. Please arrive before 17:10 so you're seated for the ceremony at 17:30." } },
    { show: true,
      q: { vi: "Dress code là gì?", en: "What is the dress code?" },
      a: { vi: "Modern Garden Formal: thanh lịch, hiện đại, tự nhiên. Xem bảng màu gợi ý ở phần Dress Code.",
           en: "Modern Garden Formal: elegant, modern, natural. See the suggested palette in the Dress Code section." } },
    { show: true,
      q: { vi: "Lễ Gia Tiên buổi sáng dành cho ai?", en: "Who is the morning Family Ceremony for?" },
      a: { vi: "Lễ Gia Tiên tại tư gia dành cho gia đình và khách thân. Nếu bạn được mời, cô dâu chú rể sẽ báo riêng. Tất cả khách mời đều được chào đón ở tiệc tối tại Park Hyatt Saigon.",
           en: "The Family Ceremony at the family home is for family and close friends. If you're invited, we'll let you know personally. Everyone is welcome at the evening celebration at Park Hyatt Saigon." } },
    { show: true,
      q: { vi: "Tôi có thể đưa người đi cùng không?", en: "Can I bring a guest?" },
      a: { vi: "Mỗi lời xác nhận có thể đăng ký tối đa 2 người (tính cả bạn). Vui lòng ghi rõ số người trong form RSVP.",
           en: "Each RSVP can include up to 2 people (including you). Please tell us the number in the RSVP form." } },
    { show: false, // TODO: xác nhận với Park Hyatt / tư gia
      q: { vi: "Có chỗ đỗ xe không?", en: "Is there parking?" },
      a: { vi: "", en: "" } },
    { show: false, // TODO: cặp đôi xác nhận
      q: { vi: "Có thể mang trẻ em không?", en: "Can I bring children?" },
      a: { vi: "", en: "" } },
    { show: false, // TODO: xác nhận với đơn vị tiệc
      q: { vi: "Có món chay không?", en: "Is there a vegetarian option?" },
      a: { vi: "", en: "" } },
  ],

  /* ---------- Kết thúc ---------- */
  closing: {
    image: "assets/images/first-dance.jpg",
    line: { vi: "Hẹn gặp bạn.", en: "See you there." },
  },
};
