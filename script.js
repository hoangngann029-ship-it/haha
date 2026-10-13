
const canvas = document.getElementById("dollCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const $ = id => document.getElementById(id);

const state = {
  category: "outfit",
  name: "Momo",
  skin: "#f6cba9",
  hairColor: "#4b2d37",
  outfitColor: "#f28db8",
  gender: "girl",
  outfit: "princess",
  hair: "long",
  accessory: "bow",
  makeup: "blush",
  background: "pink",
  shoes: "maryjane"
};

const palettes = {
  skin: ["#ffe0c2", "#f6cba9", "#d99c75", "#ad7255", "#80513e"],
  hairColor: ["#30202b", "#4b2d37", "#925332", "#e4b765", "#e58cae", "#9d91df", "#f3f0e9"],
  outfitColor: ["#f28db8", "#f3b7cb", "#b9a0f1", "#8ec9ee", "#9ed6b2", "#f5d77d", "#55465f", "#ffffff", "#e98d83"],
  accessoryColor: ["#f28db8", "#f4d16c", "#a993ec", "#8ec9ee", "#ffffff", "#5d4c67"]
};

const categories = {
  outfit: {
    title: "Trang phục",
    items: [
      { id: "princess", name: "Váy công chúa", icon: "👗", tag: "DREAMY" },
      { id: "casual", name: "Dạo phố", icon: "👚", tag: "CASUAL" },
      { id: "school", name: "Nữ sinh", icon: "🎒", tag: "SCHOOL" },
      { id: "party", name: "Dạ tiệc", icon: "💃", tag: "PARTY" },
      { id: "lolita", name: "Lolita", icon: "🎀", tag: "CUTE" },
      { id: "sweater", name: "Áo len", icon: "🧶", tag: "COZY" },
      { id: "uniform", name: "Thủy thủ", icon: "⚓", tag: "SAILOR" },
      { id: "gothic", name: "Gothic", icon: "🖤", tag: "DARK" },
      { id: "sport", name: "Thể thao", icon: "🎾", tag: "SPORT" },
      { id: "overalls", name: "Yếm dễ thương", icon: "🧸", tag: "SOFT" },
      { id: "angel", name: "Thiên thần", icon: "🪽", tag: "ANGEL" },
      { id: "pajamas", name: "Đồ ngủ", icon: "🌙", tag: "SLEEPY" }
    ]
  },
  hair: {
    title: "Kiểu tóc",
    items: [
      { id: "long", name: "Tóc dài", icon: "💇🏻‍♀️", tag: "LONG" },
      { id: "bob", name: "Tóc bob", icon: "👩🏻", tag: "BOB" },
      { id: "twin", name: "Tóc hai bên", icon: "🎀", tag: "TWIN" },
      { id: "ponytail", name: "Tóc đuôi ngựa", icon: "🐎", tag: "PONY" },
      { id: "bun", name: "Tóc búi", icon: "🍡", tag: "BUN" },
      { id: "wavy", name: "Tóc gợn sóng", icon: "〰️", tag: "WAVY" },
      { id: "hime", name: "Tóc Hime", icon: "🌸", tag: "HIME" },
      { id: "short", name: "Tóc ngắn", icon: "✂️", tag: "SHORT" }
    ]
  },
  accessory: {
    title: "Phụ kiện",
    items: [
      { id: "none", name: "Không phụ kiện", icon: "♡", tag: "SIMPLE" },
      { id: "bow", name: "Nơ tóc", icon: "🎀", tag: "SWEET" },
      { id: "crown", name: "Vương miện", icon: "👑", tag: "ROYAL" },
      { id: "cat", name: "Tai mèo", icon: "🐱", tag: "MEOW" },
      { id: "hat", name: "Mũ beret", icon: "🧢", tag: "ARTSY" },
      { id: "glasses", name: "Kính mắt", icon: "👓", tag: "SMART" },
      { id: "halo", name: "Hào quang", icon: "😇", tag: "ANGEL" },
      { id: "flower", name: "Hoa cài tóc", icon: "🌼", tag: "FLOWER" },
      { id: "headphones", name: "Tai nghe", icon: "🎧", tag: "MUSIC" },
      { id: "heart", name: "Kẹp trái tim", icon: "💗", tag: "LOVE" }
    ]
  },
  makeup: {
    title: "Trang điểm",
    items: [
      { id: "natural", name: "Tự nhiên", icon: "🌷", tag: "NATURAL" },
      { id: "blush", name: "Má hồng", icon: "🌸", tag: "BLUSH" },
      { id: "doll", name: "Mắt búp bê", icon: "👁️", tag: "DOLL EYES" },
      { id: "glam", name: "Lấp lánh", icon: "✨", tag: "GLAM" },
      { id: "berry", name: "Môi berry", icon: "🍓", tag: "BERRY" }
    ]
  },
  background: {
    title: "Phông nền",
    items: [
      { id: "pink", name: "Hồng pastel", icon: "🌸", tag: "PINK" },
      { id: "blue", name: "Xanh mây", icon: "☁️", tag: "SKY" },
      { id: "lilac", name: "Tím mộng mơ", icon: "💜", tag: "LILAC" },
      { id: "mint", name: "Xanh bạc hà", icon: "🍀", tag: "MINT" },
      { id: "night", name: "Đêm đầy sao", icon: "🌙", tag: "NIGHT" }
    ]
  }
};

const backgroundColors = {
  pink: ["#fff0f6", "#f8d2e5"],
  blue: ["#e8f6ff", "#c9e6fa"],
  lilac: ["#f4efff", "#dfd1fb"],
  mint: ["#ebfff4", "#c9f1df"],
  night: ["#343052", "#766da4"]
};

let activeColor = "outfitColor";
let toastTimer;

function rect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function pixelRect(x, y, w, h, color, border = null) {
  rect(x, y, w, h, color);
  if (border) {
    ctx.strokeStyle = border;
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
  }
}

function line(x1, y1, x2, y2, color, width = 2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawBackground() {
  const colors = backgroundColors[state.background];
  const gradient = ctx.createLinearGradient(0, 0, 0, 360);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  rect(0, 0, 240, 360, gradient);

  const night = state.background === "night";
  const starColor = night ? "#fff0bb" : "#ffffff";

  // Chấm sáng trang trí theo phong cách pixel.
  [
    [25, 35], [196, 49], [33, 121], [207, 151],
    [22, 229], [213, 250], [48, 297], [183, 314]
  ].forEach(([x, y], i) => {
    rect(x, y, i % 2 ? 4 : 6, i % 2 ? 4 : 6, starColor);
  });

  // Sàn và bóng.
  rect(0, 308, 240, 52, "#ffffff32");
  rect(72, 311, 96, 5, "#ffffff8a");
  rect(81, 317, 78, 4, "#ffffff55");
}

function drawHairBack() {
  const c = state.hairColor;
  const hair = state.hair;

  if (hair === "long" || hair === "hime" || hair === "wavy") {
    rect(72, 61, 96, 122, c);
    rect(66, 82, 14, 82, c);
    rect(160, 80, 14, 88, c);
    if (hair === "wavy") {
      rect(63, 130, 9, 22, c);
      rect(168, 139, 9, 22, c);
      rect(70, 158, 12, 18, c);
      rect(158, 160, 12, 18, c);
    }
  } else if (hair === "twin") {
    rect(66, 78, 22, 95, c);
    rect(152, 78, 22, 95, c);
    rect(63, 96, 14, 26, c);
    rect(163, 96, 14, 26, c);
  } else if (hair === "ponytail") {
    rect(147, 53, 29, 78, c);
    rect(154, 39, 20, 23, c);
  } else if (hair === "bun") {
    rect(83, 48, 75, 45, c);
    rect(104, 29, 33, 29, c);
  } else if (hair === "bob" || hair === "short") {
    rect(70, 64, 100, 82, c);
    rect(67, 84, 13, 43, c);
    rect(160, 84, 13, 43, c);
  }
}

function drawFace() {
  const s = state.skin;
  const makeup = state.makeup;
  const outline = "#76505a";

  // Cổ, tai và mặt.
  rect(102, 144, 36, 34, s);
  rect(66, 105, 13, 24, s);
  rect(161, 105, 13, 24, s);
  rect(70, 75, 100, 77, s);
  rect(78, 64, 84, 91, s);
  rect(87, 58, 66, 103, s);
  rect(81, 92, 7, 23, s);
  rect(152, 92, 7, 23, s);

  // Viền pixel ở hai bên mặt.
  rect(69, 90, 5, 33, outline);
  rect(162, 90, 5, 33, outline);
  rect(76, 149, 12, 5, outline);
  rect(148, 149, 12, 5, outline);

  // Má hồng.
  if (["blush", "glam", "berry"].includes(makeup)) {
    rect(78, 120, 17, 8, "#ef91a8");
    rect(145, 120, 17, 8, "#ef91a8");
    rect(82, 117, 9, 3, "#f6b5c1");
    rect(149, 117, 9, 3, "#f6b5c1");
  }

  // Lông mày.
  rect(87, 94, 20, 4, "#694450");
  rect(132, 94, 20, 4, "#694450");

  // Mắt.
  const eyeColor = makeup === "glam" ? "#7156b5" : "#49313e";
  rect(89, 100, 16, makeup === "doll" ? 18 : 13, eyeColor);
  rect(134, 100, 16, makeup === "doll" ? 18 : 13, eyeColor);
  rect(93, 101, 6, 8, "#fff9fb");
  rect(138, 101, 6, 8, "#fff9fb");
  rect(97, 108, 5, 5, "#a8d8e8");
  rect(142, 108, 5, 5, "#a8d8e8");

  if (makeup === "doll" || makeup === "glam") {
    rect(87, 97, 20, 3, "#513447");
    rect(132, 97, 20, 3, "#513447");
    rect(86, 94, 3, 6, "#513447");
    rect(150, 94, 3, 6, "#513447");
  }

  // Mũi và miệng.
  rect(116, 119, 6, 5, "#d99989");
  const lip = makeup === "berry" ? "#bc426a" :
              makeup === "glam" ? "#d46a92" : "#b66b7b";
  rect(108, 132, 22, 4, lip);
  rect(112, 136, 14, 3, lip);
  rect(113, 132, 11, 2, "#ffd9df");

  // Tàn nhang nhẹ.
  if (makeup === "natural") {
    rect(103, 123, 2, 2, "#ce9b83");
    rect(131, 123, 2, 2, "#ce9b83");
  }
}

function drawHairFront() {
  const c = state.hairColor;
  const hair = state.hair;

  rect(70, 61, 100, 24, c);
  rect(76, 49, 87, 22, c);
  rect(86, 43, 63, 12, c);

  if (hair === "long" || hair === "wavy") {
    rect(72, 67, 22, 43, c);
    rect(151, 66, 19, 41, c);
    rect(95, 69, 18, 12, c);
    rect(111, 65, 23, 8, c);
    rect(137, 67, 18, 12, c);
  } else if (hair === "bob") {
    rect(70, 66, 20, 55, c);
    rect(151, 66, 20, 55, c);
    rect(90, 71, 64, 8, c);
    rect(104, 79, 23, 5, c);
  } else if (hair === "twin") {
    rect(67, 72, 23, 37, c);
    rect(150, 72, 23, 37, c);
    rect(88, 69, 65, 9, c);
    rect(113, 76, 22, 8, c);
    rect(72, 95, 13, 11, c);
    rect(155, 95, 13, 11, c);
  } else if (hair === "ponytail") {
    rect(71, 68, 23, 40, c);
    rect(151, 68, 19, 34, c);
    rect(94, 68, 59, 8, c);
    rect(111, 74, 21, 8, c);
  } else if (hair === "bun") {
    rect(77, 64, 22, 35, c);
    rect(150, 64, 20, 35, c);
    rect(92, 68, 61, 8, c);
    rect(110, 75, 22, 8, c);
  } else if (hair === "hime") {
    rect(70, 68, 21, 64, c);
    rect(151, 68, 20, 64, c);
    rect(89, 68, 65, 11, c);
    rect(105, 76, 32, 7, c);
    rect(91, 113, 13, 18, c);
    rect(137, 113, 13, 18, c);
  } else {
    rect(70, 68, 22, 43, c);
    rect(151, 68, 19, 42, c);
    rect(91, 68, 62, 10, c);
    rect(110, 75, 22, 8, c);
  }
}

function drawShoes() {
  const shoe = state.shoes;
  const color = shoe === "boots" ? "#6c536d" :
                shoe === "sneakers" ? "#fff9fc" : "#a65e7c";

  rect(87, 318, 25, 13, color);
  rect(130, 318, 25, 13, color);
  rect(84, 328, 29, 4, "#6d4b5d");
  rect(128, 328, 29, 4, "#6d4b5d");

  if (shoe === "maryjane") {
    rect(90, 321, 19, 3, "#fff1f6");
    rect(133, 321, 19, 3, "#fff1f6");
  } else if (shoe === "boots") {
    rect(88, 300, 22, 20, color);
    rect(132, 300, 22, 20, color);
  } else {
    rect(89, 319, 21, 5, "#e6dfea");
    rect(132, 319, 21, 5, "#e6dfea");
  }
}

function drawOutfit() {
  const c = state.outfitColor;
  const dark = "#785365";
  const light = "#fff2f7";

  // Tay và bàn tay.
  rect(75, 173, 15, 61, state.skin);
  rect(151, 173, 15, 61, state.skin);
  rect(75, 225, 15, 11, state.skin);
  rect(151, 225, 15, 11, state.skin);

  if (state.outfit === "princess") {
    rect(91, 164, 60, 44, c);
    rect(82, 199, 79, 82, c);
    rect(74, 224, 95, 74, c);
    rect(69, 290, 105, 15, c);
    rect(88, 201, 66, 5, light);
    rect(111, 169, 21, 23, light);
    rect(119, 170, 5, 20, "#e6a6c7");
    rect(112, 215, 8, 8, "#f7d776");
    rect(132, 245, 7, 7, "#fff0f6");
  }

  if (state.outfit === "casual") {
    rect(91, 164, 60, 49, c);
    rect(85, 202, 70, 29, c);
    rect(88, 229, 28, 69, "#91a4dc");
    rect(121, 229, 31, 69, "#91a4dc");
    rect(115, 165, 12, 31, light);
    rect(88, 224, 64, 5, "#ffffff");
    rect(118, 237, 4, 50, "#667ebc");
  }

  if (state.outfit === "school") {
    rect(91, 164, 60, 51, light);
    rect(84, 205, 73, 38, c);
    rect(87, 241, 30, 57, "#62547f");
    rect(121, 241, 31, 57, "#62547f");
    rect(112, 165, 20, 22, "#e87e9d");
    rect(118, 185, 7, 22, "#e87e9d");
    rect(89, 220, 62, 4, light);
  }

  if (state.outfit === "party") {
    rect(91, 164, 60, 47, c);
    rect(84, 205, 73, 47, c);
    rect(80, 247, 81, 52, c);
    rect(109, 169, 24, 8, "#fff2f7");
    rect(111, 181, 20, 12, "#f7d776");
    rect(88, 211, 66, 4, light);
    rect(119, 229, 5, 31, "#f7d776");
  }

  if (state.outfit === "lolita") {
    rect(91, 164, 60, 47, c);
    rect(86, 203, 70, 46, c);
    rect(78, 243, 86, 55, c);
    rect(71, 291, 100, 14, c);
    rect(89, 206, 65, 5, light);
    rect(107, 166, 28, 18, light);
    rect(112, 230, 16, 13, "#f7d776");
    rect(90, 257, 62, 4, light);
    rect(90, 278, 62, 4, light);
  }

  if (state.outfit === "sweater") {
    rect(88, 164, 67, 67, c);
    rect(80, 175, 15, 53, c);
    rect(150, 175, 15, 53, c);
    rect(88, 227, 31, 70, "#9e8bc9");
    rect(122, 227, 31, 70, "#9e8bc9");
    rect(91, 192, 60, 4, "#ffffff7a");
    rect(91, 204, 60, 4, "#ffffff7a");
    rect(113, 167, 19, 10, light);
  }

  if (state.outfit === "uniform") {
    rect(91, 164, 60, 49, light);
    rect(84, 205, 74, 38, c);
    rect(86, 241, 31, 57, "#4c4a69");
    rect(122, 241, 31, 57, "#4c4a69");
    rect(105, 165, 32, 19, "#5d6ea8");
    rect(115, 181, 13, 20, "#e77e9d");
    rect(89, 218, 65, 4, light);
  }

  if (state.outfit === "gothic") {
    rect(91, 164, 60, 45, "#55465f");
    rect(83, 205, 77, 58, "#55465f");
    rect(75, 252, 93, 47, "#3d344d");
    rect(87, 207, 69, 5, "#e5d6eb");
    rect(109, 167, 25, 16, "#e5d6eb");
    rect(116, 188, 10, 12, "#e28cae");
    rect(87, 278, 70, 4, "#e28cae");
  }

  if (state.outfit === "sport") {
    rect(91, 164, 60, 49, c);
    rect(83, 173, 14, 50, c);
    rect(151, 173, 14, 50, c);
    rect(89, 210, 64, 26, "#fff7fc");
    rect(91, 234, 28, 64, "#8aabd9");
    rect(122, 234, 30, 64, "#8aabd9");
    rect(109, 170, 27, 5, "#ffffff");
  }

  if (state.outfit === "overalls") {
    rect(91, 164, 60, 43, "#fff0f6");
    rect(86, 203, 70, 44, c);
    rect(89, 242, 29, 57, c);
    rect(123, 242, 30, 57, c);
    rect(93, 203, 12, 22, c);
    rect(137, 203, 12, 22, c);
    rect(103, 211, 36, 24, c);
    rect(113, 218, 15, 4, "#f7d776");
    rect(89, 243, 64, 5, "#ffffff");
  }

  if (state.outfit === "angel") {
    // Cánh nhỏ.
    rect(57, 195, 20, 17, "#ffffff");
    rect(51, 209, 24, 18, "#ffffff");
    rect(164, 195, 20, 17, "#ffffff");
    rect(166, 209, 24, 18, "#ffffff");
    rect(91, 164, 60, 47, "#fff8fc");
    rect(82, 207, 80, 92, c);
    rect(74, 285, 95, 15, "#fff8fc");
    rect(110, 168, 23, 20, "#ffffff");
    rect(117, 172, 9, 8, "#f7d776");
  }

  if (state.outfit === "pajamas") {
    rect(91, 164, 60, 54, c);
    rect(87, 210, 69, 38, c);
    rect(90, 244, 28, 54, "#a8a2e2");
    rect(123, 244, 29, 54, "#a8a2e2");
    rect(112, 167, 22, 10, "#fff5bb");
    rect(106, 184, 31, 4, "#fff5bb");
    rect(91, 220, 60, 4, "#ffffff7a");
  }

  // Cổ áo, tay áo và viền.
  rect(104, 162, 31, 5, state.skin);
  rect(94, 169, 12, 7, light);
  rect(135, 169, 12, 7, light);

  // Chân.
  rect(99, 297, 21, 22, state.skin);
  rect(123, 297, 21, 22, state.skin);

  drawShoes();
}

function drawAccessory() {
  const a = state.accessory;
  const c = state.outfitColor;

  if (a === "bow") {
    rect(68, 47, 18, 18, c);
    rect(53, 40, 17, 17, c);
    rect(84, 39, 17, 17, c);
    rect(68, 47, 17, 10, "#ffe7f1");
  }

  if (a === "crown") {
    rect(88, 38, 12, 13, "#f5d46f");
    rect(101, 25, 13, 26, "#f5d46f");
    rect(115, 36, 13, 15, "#f5d46f");
    rect(129, 25, 13, 26, "#f5d46f");
    rect(143, 38, 12, 13, "#f5d46f");
    rect(88, 48, 67, 7, "#d9a64d");
    rect(111, 40, 5, 5, "#f08bb6");
  }

  if (a === "cat") {
    rect(74, 45, 24, 28, c);
    rect(140, 45, 24, 28, c);
    rect(81, 52, 9, 13, "#fff0f6");
    rect(147, 52, 9, 13, "#fff0f6");
    rect(84, 55, 4, 6, c);
    rect(150, 55, 4, 6, c);
  }

  if (a === "hat") {
    rect(75, 44, 91, 8, "#9878a8");
    rect(89, 28, 61, 20, "#9878a8");
    rect(93, 43, 52, 5, "#f1b7cf");
  }

  if (a === "glasses") {
    ctx.strokeStyle = "#745264";
    ctx.lineWidth = 3;
    ctx.strokeRect(83, 98, 26, 18);
    ctx.strokeRect(131, 98, 26, 18);
    line(109, 104, 131, 104, "#745264", 3);
  }

  if (a === "halo") {
    ctx.strokeStyle = "#f1ce67";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(120, 24, 31, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
    rect(88, 22, 6, 4, "#fff2b0");
  }

  if (a === "flower") {
    rect(70, 49, 10, 10, "#f8a8c9");
    rect(61, 49, 9, 10, "#f8a8c9");
    rect(70, 40, 10, 9, "#f8a8c9");
    rect(70, 59, 10, 9, "#f8a8c9");
    rect(70, 49, 10, 10, "#f7d56c");
  }

  if (a === "headphones") {
    ctx.strokeStyle = "#8e77bf";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(120, 85, 49, Math.PI, 0);
    ctx.stroke();
    rect(68, 81, 10, 26, "#8e77bf");
    rect(162, 81, 10, 26, "#8e77bf");
    rect(70, 87, 6, 13, "#f7c2dc");
    rect(164, 87, 6, 13, "#f7c2dc");
  }

  if (a === "heart") {
    rect(70, 47, 10, 9, "#ee6f9d");
    rect(63, 41, 9, 9, "#ee6f9d");
    rect(79, 41, 9, 9, "#ee6f9d");
    rect(68, 50, 16, 7, "#ee6f9d");
    rect(72, 57, 8, 5, "#ee6f9d");
  }
}

function drawDoll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;

  drawBackground();

  // Bóng chân.
  rect(76, 334, 90, 5, "#9a789522");
  rect(87, 339, 68, 3, "#9a78951a");

  drawHairBack();
  drawOutfit();
  drawFace();
  drawHairFront();
  drawAccessory();

  // Viền pixel và chi tiết trang trí.
  const night = state.background === "night";
  ctx.fillStyle = night ? "#fff0c8" : "#bd7e9c";
  ctx.font = "bold 8px monospace";
  ctx.textAlign = "center";
  ctx.fillText("♡ PIXEL DOLL ♡", 120, 353);
}

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}

function renderCategory(category) {
  state.category = category;

  document.querySelectorAll(".tab").forEach(button => {
    button.classList.toggle("active", button.dataset.category === category);
  });

  const data = categories[category];
  $("categoryTitle").textContent = data.title;
  $("itemCount").textContent = `${data.items.length} món`;
  const grid = $("itemGrid");
  grid.innerHTML = "";

  data.items.forEach(item => {
    const button = document.createElement("button");
    button.className = "item-card";
    button.classList.toggle("selected", state[category] === item.id);
    button.type = "button";
    button.setAttribute("aria-pressed", String(state[category] === item.id));

    const preview = document.createElement("span");
    preview.className = "item-preview";
    preview.textContent = item.icon;

    const title = document.createElement("strong");
    title.textContent = item.name;

    const tag = document.createElement("small");
    tag.textContent = item.tag;

    button.append(preview, title, tag);
    button.addEventListener("click", () => {
      state[category] = item.id;
      renderCategory(category);
      drawDoll();
    });

    grid.appendChild(button);
  });

  renderColors(category);
}

function renderColors(category) {
  const holder = $("colorSwatches");
  holder.innerHTML = "";

  if (category === "hair") {
    activeColor = "hairColor";
  } else if (category === "outfit") {
    activeColor = "outfitColor";
  } else if (category === "accessory") {
    activeColor = "outfitColor";
  } else {
    activeColor = "skin";
  }

  const colors = category === "hair" ? palettes.hairColor :
    category === "outfit" || category === "accessory" ?
      palettes.outfitColor : palettes.skin;

  colors.forEach(color => {
    const button = document.createElement("button");
    button.className = "swatch";
    button.style.backgroundColor = color;
    button.title = color;
    button.setAttribute("aria-label", "Chọn màu " + color);

    const current = state[activeColor];
    button.classList.toggle("selected", current === color);

    button.addEventListener("click", () => {
      state[activeColor] = color;
      renderColors(category);
      drawDoll();
    });

    holder.appendChild(button);
  });
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function makeExportImage() {
  // Xuất hình nền và nhân vật, không gồm khung giao diện.
  return canvas.toDataURL("image/png");
}

function downloadCurrentDesign() {
  const safeName = (state.name || "pixel-doll")
    .trim()
    .replace(/[^\p{L}\p{N}-]+/gu, "-")
    .slice(0, 24) || "pixel-doll";

  downloadDataUrl(makeExportImage(), `${safeName}.png`);
  showToast("Ảnh PNG đã sẵn sàng tải xuống! ♡");
}

function readGallery() {
  try {
    const data = JSON.parse(localStorage.getItem("pixelDollGallery") || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeGallery(items) {
  try {
    localStorage.setItem("pixelDollGallery", JSON.stringify(items));
    return true;
  } catch {
    showToast("Bộ nhớ trình duyệt đã đầy. Hãy xóa bớt ảnh cũ nhé!");
    return false;
  }
}

function saveDesign() {
  state.name = $("nameInput").value.trim() || "Momo";
  $("dollName").textContent = state.name;

  const gallery = readGallery();
  const entry = {
    id: Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    name: state.name,
    image: makeExportImage(),
    date: new Date().toLocaleDateString("vi-VN")
  };

  // Giới hạn số ảnh để tránh chiếm quá nhiều bộ nhớ.
  gallery.unshift(entry);
  if (gallery.length > 20) gallery.length = 20;

  if (!writeGallery(gallery)) return;

  const total = Number(localStorage.getItem("pixelDollCoins") || "0") + 10;
  localStorage.setItem("pixelDollCoins", String(total));

  updateStats();
  renderGallery();
  showToast("Đã lưu thiết kế! Bạn nhận được 10 điểm 💗");
}

function renderGallery() {
  const gallery = readGallery();
  const grid = $("galleryGrid");
  grid.innerHTML = "";

  $("albumCount").textContent = `${gallery.length} thiết kế`;
  $("emptyGallery").hidden = gallery.length > 0;

  gallery.forEach(entry => {
    const card = document.createElement("article");
    card.className = "gallery-card";

    const image = document.createElement("img");
    image.src = entry.image;
    image.alt = "Thiết kế của " + entry.name;
    image.loading = "lazy";

    const title = document.createElement("h3");
    title.textContent = entry.name;

    const date = document.createElement("p");
    date.textContent = entry.date || "Thiết kế đã lưu";

    const actions = document.createElement("div");
    actions.className = "gallery-card-actions";

    const download = document.createElement("button");
    download.type = "button";
    download.textContent = "⬇ Tải";
    download.addEventListener("click", () => {
      const safeName = entry.name.replace(/[^\p{L}\p{N}-]+/gu, "-");
      downloadDataUrl(entry.image, `${safeName || "pixel-doll"}.png`);
    });

    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "✕ Xóa";
    remove.addEventListener("click", () => {
      const next = readGallery().filter(item => item.id !== entry.id);
      if (writeGallery(next)) {
        renderGallery();
        showToast("Đã xóa thiết kế khỏi album.");
      }
    });

    actions.append(download, remove);
    card.append(image, title, date, actions);
    grid.appendChild(card);
  });
}

function updateStats() {
  const points = Number(localStorage.getItem("pixelDollCoins") || "0");
  $("coins").textContent = points;
  $("level").textContent = Math.floor(points / 50) + 1;
}

function randomize() {
  const choose = list => list[Math.floor(Math.random() * list.length)];

  state.outfit = choose(categories.outfit.items).id;
  state.hair = choose(categories.hair.items).id;
  state.accessory = choose(categories.accessory.items).id;
  state.makeup = choose(categories.makeup.items).id;
  state.background = choose(categories.background.items).id;
  state.skin = choose(palettes.skin);
  state.hairColor = choose(palettes.hairColor);
  state.outfitColor = choose(palettes.outfitColor);

  renderCategory(state.category);
  drawDoll();
  showToast("Một phong cách mới đã được tạo! ✨");
}

function resetDoll() {
  Object.assign(state, {
    name: "Momo",
    skin: "#f6cba9",
    hairColor: "#4b2d37",
    outfitColor: "#f28db8",
    outfit: "princess",
    hair: "long",
    accessory: "bow",
    makeup: "blush",
    background: "pink",
    shoes: "maryjane"
  });

  $("nameInput").value = state.name;
  $("dollName").textContent = state.name;

  renderCategory(state.category);
  drawDoll();
  showToast("Nhân vật đã trở về phong cách ban đầu.");
}

$("tabs").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (button) renderCategory(button.dataset.category);
});

$("randomBtn").addEventListener("click", randomize);
$("saveBtn").addEventListener("click", saveDesign);
$("downloadBtn").addEventListener("click", downloadCurrentDesign);
$("resetBtn").addEventListener("click", resetDoll);

$("nameInput").addEventListener("input", event => {
  state.name = event.target.value.trim() || "Momo";
  $("dollName").textContent = state.name;
});

renderCategory("outfit");
drawDoll();
renderGallery();
updateStats();
