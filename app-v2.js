const STORAGE_KEY = "chillTypingSaveV2";
const LEGACY_STORAGE_KEY = "chillTypingSaveV1";

const phrases = window.CHILL_TYPING_PHRASES || [];

const categories = [
  { id: "room", label: "部屋", icon: "⌂", description: "部屋の主役になる大型家具やレイアウトです。" },
  { id: "wallpaper", label: "壁紙", icon: "▤", description: "購入した壁紙は、いつでも自由に張り替えられます。" },
  { id: "floor", label: "床", icon: "▦", description: "床材を変えると、部屋全体の雰囲気が変わります。" },
  { id: "furniture", label: "家具", icon: "▰", description: "暮らしを心地よくする家具をそろえましょう。" },
  { id: "appliance", label: "家電", icon: "⌁", description: "音楽や飲み物を楽しめる便利な家電です。" },
  { id: "decor", label: "装飾", icon: "✦", description: "小物や仲間を飾って、あなたらしさを加えます。" },
];

const shopItems = [
  { id: "room-classic", category: "room", name: "クラシックルーム", description: "木のデスクがある最初の部屋", price: 0, icon: "🪵", color: "#e9dfcf", exclusive: "room", starter: true },
  { id: "room-sofa", category: "room", name: "くつろぎソファ", description: "深く腰掛けられるグリーンソファ", price: 240, icon: "🛋️", color: "#dce7dc", exclusive: "room" },
  { id: "room-bed", category: "room", name: "おやすみベッド", description: "タイプのあとにすぐ眠れるベッド", price: 320, icon: "🛏️", color: "#dfe5ed", exclusive: "room" },
  { id: "room-library", category: "room", name: "読書コーナー", description: "壁いっぱいの小さな図書室", price: 420, icon: "📚", color: "#e8dccd", exclusive: "room" },
  { id: "room-cafe", category: "room", name: "おうちカフェ", description: "丸テーブルで楽しむカフェ時間", price: 520, icon: "☕", color: "#efe0d3", exclusive: "room" },
  { id: "wall-cream", category: "wallpaper", name: "ナチュラルクリーム", description: "光をやさしく包む定番カラー", price: 0, icon: "▧", color: "#e9e1d2", exclusive: "wallpaper", starter: true },
  { id: "wall-sage", category: "wallpaper", name: "セージグリーン", description: "穏やかな草木を思わせる色", price: 90, icon: "▧", color: "#cedbcf", exclusive: "wallpaper" },
  { id: "wall-sunset", category: "wallpaper", name: "サンセット", description: "夕暮れのような淡いグラデーション", price: 140, icon: "◫", color: "#edc6b2", exclusive: "wallpaper" },
  { id: "wall-night", category: "wallpaper", name: "星降る夜", description: "小さな星がきらめく夜色", price: 220, icon: "✦", color: "#697582", exclusive: "wallpaper", tag: "POPULAR" },
  { id: "wall-linen", category: "wallpaper", name: "リネンクロス", description: "布の質感を感じる生成り色", price: 180, icon: "▥", color: "#e7ddce", exclusive: "wallpaper" },
  { id: "wall-cloud", category: "wallpaper", name: "ミストブルー", description: "静かな朝の空のグラデーション", price: 260, icon: "☁️", color: "#bfd4d7", exclusive: "wallpaper" },
  { id: "wall-rose", category: "wallpaper", name: "ダスティローズ", description: "甘すぎない落ち着いたピンク", price: 280, icon: "❀", color: "#e7cec9", exclusive: "wallpaper" },
  { id: "floor-oak", category: "floor", name: "オークフロア", description: "明るく自然な木目の床", price: 0, icon: "▥", color: "#b7956f", exclusive: "floor", starter: true },
  { id: "floor-walnut", category: "floor", name: "ウォールナット", description: "深い色合いの上品な木目", price: 110, icon: "▥", color: "#79583f", exclusive: "floor" },
  { id: "floor-white", category: "floor", name: "ホワイトウッド", description: "部屋を明るく見せる白木", price: 150, icon: "▥", color: "#dedbd0", exclusive: "floor" },
  { id: "floor-checker", category: "floor", name: "チェッカータイル", description: "レトロなカフェ風タイル", price: 210, icon: "▦", color: "#cbbba4", exclusive: "floor", tag: "NEW" },
  { id: "floor-tatami", category: "floor", name: "モダン畳", description: "素足で過ごしたい和の床", price: 260, icon: "▤", color: "#aeb187", exclusive: "floor" },
  { id: "floor-blue", category: "floor", name: "スモーキーブルー", description: "海辺の家を思わせるペイント床", price: 300, icon: "▥", color: "#81979c", exclusive: "floor" },
  { id: "plant", category: "furniture", name: "モンステラ", description: "緑を添える元気な観葉植物", price: 40, icon: "🌿", color: "#e4eee1" },
  { id: "lamp", category: "furniture", name: "フロアランプ", description: "やさしい光で夜もリラックス", price: 80, icon: "💡", color: "#f5e8cb" },
  { id: "bookshelf", category: "furniture", name: "ローシェルフ", description: "お気に入りの本を並べる棚", price: 130, icon: "📚", color: "#eadfce", placement: 4 },
  { id: "side-table", category: "furniture", name: "サイドテーブル", description: "マグカップを置ける小さな机", price: 160, icon: "🪑", color: "#e6d8c6", placement: 6 },
  { id: "floor-cushion", category: "furniture", name: "フロアクッション", description: "床でのんびりするためのクッション", price: 190, icon: "🟢", color: "#dce6d7", placement: 2 },
  { id: "rocking-chair", category: "furniture", name: "ロッキングチェア", description: "ゆっくり揺れる読書用チェア", price: 310, icon: "🪑", color: "#dccdbb", placement: 0, large: true },
  { id: "speaker", category: "appliance", name: "レトロスピーカー", description: "部屋にローファイな音を添える", price: 120, icon: "🔊", color: "#e6ddd2", placement: 7 },
  { id: "humidifier", category: "appliance", name: "アロマ加湿器", description: "ほのかな香りとミストで潤う", price: 170, icon: "♨️", color: "#dde8e7", placement: 9 },
  { id: "coffee-maker", category: "appliance", name: "コーヒーメーカー", description: "休憩時間に温かい一杯を", price: 230, icon: "☕", color: "#ead8ca", placement: 8 },
  { id: "projector", category: "appliance", name: "ミニプロジェクター", description: "壁に映画を映せる小さな相棒", price: 330, icon: "📽️", color: "#e3e1d9", placement: 5 },
  { id: "game-console", category: "appliance", name: "レトロゲーム機", description: "タイピングの合間にひと休み", price: 390, icon: "🎮", color: "#dce0e4", placement: 1, tag: "NEW" },
  { id: "rug", category: "decor", name: "ストライプラグ", description: "足元をあたたかく彩るラグ", price: 130, icon: "▰", color: "#e1e9e5" },
  { id: "cat", category: "decor", name: "ねこのチャイ", description: "タイピングを見守る相棒", price: 200, icon: "🐈", color: "#f2dfd4", tag: "POPULAR" },
  { id: "clock", category: "decor", name: "木枠の時計", description: "静かに時を刻む丸い時計", price: 70, icon: "🕰️", color: "#eee3d5", placement: 5, wall: true },
  { id: "poster", category: "decor", name: "ボタニカルポスター", description: "壁に飾る小さな植物標本", price: 100, icon: "🌱", color: "#e1eadc", placement: 4, wall: true },
  { id: "fairy-lights", category: "decor", name: "フェアリーライト", description: "星のように灯る小さな明かり", price: 150, icon: "✨", color: "#f5e9c9", placement: 7 },
  { id: "cactus", category: "decor", name: "ミニサボテン", description: "デスクに置ける手のひらサイズ", price: 55, icon: "🌵", color: "#dfebdd", placement: 8 },
  { id: "tea-set", category: "decor", name: "ティーセット", description: "ゆったりした午後のおとも", price: 180, icon: "🫖", color: "#e5e9e6", placement: 9 },
  { id: "record", category: "decor", name: "お気に入りのレコード", description: "ジャケットも素敵な一枚", price: 240, icon: "💿", color: "#e1dce7", placement: 6, wall: true },
];

const achievements = [
  { id: "first-key", title: "はじめの一打", description: "最初の正しいキーをタイプする", image: "assets/achievements/first-key.png", condition: (progress) => progress.totalCorrect >= 1 },
  { id: "warm-up", title: "指先のウォームアップ", description: "正しいキーを累計100回タイプする", image: "assets/achievements/warm-up.png", condition: (progress) => progress.totalCorrect >= 100 },
  { id: "moon-typist", title: "月夜のタイピスト", description: "正しいキーを累計500回タイプする", image: "assets/achievements/moon-typist.png", condition: (progress) => progress.totalCorrect >= 500 },
  { id: "combo-spark", title: "ひらめきのコンボ", description: "20コンボを達成する", image: "assets/achievements/combo-spark.png", condition: (progress) => progress.bestCombo >= 20 },
  { id: "storyteller", title: "小さな物語作家", description: "文章を10個完成させる", image: "assets/achievements/storyteller.png", condition: (progress) => progress.completedPhrases >= 10 },
  { id: "room-curator", title: "理想の部屋のキュレーター", description: "ショップの商品を10点購入する", image: "assets/achievements/room-curator.png", condition: (progress) => progress.purchasedItems >= 10 },
];

function createDefaultState() {
  return { coins: 25, totalEarned: 0, owned: shopItems.filter((item) => item.starter).map((item) => item.id), equipped: { room: "room-classic", wallpaper: "wall-cream", floor: "floor-oak" }, placements: {}, stats: { totalCorrect: 0, bestCombo: 0, completedPhrases: 0 }, unlockedAchievements: [], soundOn: true };
}

let state = loadState();
let activeCategory = "room";
let activeInventoryCategory = "all";
let currentPhraseIndex = Math.floor(Math.random() * phrases.length);
let previousInputValue = "";
let typedCorrectly = 0;
let totalKeystrokes = 0;
let correctKeystrokes = 0;
let combo = 0;
let sessionEarned = 0;
let startedAt = null;
let toastTimer;
let audioContext;
let achievementPopupTimer;
let achievementPopupVisible = false;
const achievementPopupQueue = [];
let draggedPlacementKey = null;

const elements = {
  brand: document.querySelector(".brand"), views: document.querySelectorAll(".view"), viewButtons: document.querySelectorAll("[data-view]"), navButtons: document.querySelectorAll(".nav-button"),
  coinCount: document.querySelector("#coin-count"), wallet: document.querySelector(".wallet"), soundToggle: document.querySelector("#sound-toggle"), resetButton: document.querySelector("#reset-button"),
  room: document.querySelector("#room"), roomLevel: document.querySelector("#room-level"), ownedCount: document.querySelector("#owned-count"), collectionProgress: document.querySelector("#collection-progress"), roomHint: document.querySelector("#empty-room-message"), collectibleLayer: document.querySelector("#collectible-layer"), monitorText: document.querySelector("#monitor-text"),
  phrase: document.querySelector("#phrase"), phraseMeaning: document.querySelector("#phrase-meaning"), phraseCategory: document.querySelector("#phrase-category"), input: document.querySelector("#typing-input"), progress: document.querySelector("#typing-progress"), message: document.querySelector("#typing-message"),
  wpm: document.querySelector("#wpm"), accuracy: document.querySelector("#accuracy"), combo: document.querySelector("#combo"), earned: document.querySelector("#earned"), nextButton: document.querySelector("#new-phrase-button"),
  tabs: document.querySelector("#shop-tabs"), shopList: document.querySelector("#shop-list"), categoryDescription: document.querySelector("#category-description"), categoryCount: document.querySelector("#category-count"), toast: document.querySelector("#toast"),
  achievementWall: document.querySelector("#achievement-wall"), achievementPopup: document.querySelector("#achievement-popup"), achievementPopupImage: document.querySelector("#achievement-popup-image"), achievementPopupTitle: document.querySelector("#achievement-popup-title"), achievementPopupDescription: document.querySelector("#achievement-popup-description"), achievementPopupClose: document.querySelector("#achievement-popup-close"),
  inventoryToggle: document.querySelector("#inventory-toggle"), inventoryCount: document.querySelector("#inventory-count"), inventoryDrawer: document.querySelector("#inventory-drawer"), inventoryClose: document.querySelector("#inventory-close"), inventoryTabs: document.querySelector("#inventory-tabs"), inventoryList: document.querySelector("#inventory-list"), inventoryEmpty: document.querySelector("#inventory-empty"), roomEditHint: document.querySelector("#room-edit-hint"),
};

function loadState() {
  const defaults = createDefaultState();
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) return normalizeState(saved, defaults);
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    if (legacy) {
      const migrated = normalizeState(legacy, defaults);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch { return defaults; }
  return defaults;
}

function normalizeState(saved, defaults) {
  const validIds = new Set(shopItems.map((item) => item.id));
  const owned = Array.isArray(saved.owned) ? saved.owned.filter((id) => validIds.has(id)) : [];
  defaults.owned.forEach((id) => { if (!owned.includes(id)) owned.push(id); });
  const savedStats = saved.stats || {};
  const placements = {};
  if (saved.placements && typeof saved.placements === "object") {
    Object.entries(saved.placements).forEach(([key, position]) => {
      if (position && Number.isFinite(position.x) && Number.isFinite(position.y)) placements[key] = { x: Math.min(95, Math.max(5, position.x)), y: Math.min(88, Math.max(10, position.y)) };
    });
  }
  return { ...defaults, ...saved, coins: Number.isFinite(saved.coins) ? Math.max(0, saved.coins) : defaults.coins, owned, equipped: { ...defaults.equipped, ...(saved.equipped || {}) }, placements, stats: { ...defaults.stats, ...savedStats, totalCorrect: Number.isFinite(savedStats.totalCorrect) ? savedStats.totalCorrect : Math.max(0, saved.totalEarned || 0) }, unlockedAchievements: Array.isArray(saved.unlockedAchievements) ? saved.unlockedAchievements.filter((id) => achievements.some((achievement) => achievement.id === id)) : [] };
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function switchView(viewName) {
  elements.views.forEach((view) => { const active = view.id === `${viewName}-view`; view.hidden = !active; view.classList.toggle("active-view", active); });
  elements.navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  document.body.dataset.view = viewName;
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (viewName === "shop") renderShop();
}

function renderPhrase() {
  const phrase = phrases[currentPhraseIndex];
  const input = elements.input.value;
  elements.phraseCategory.textContent = phrase.category;
  elements.phraseMeaning.textContent = `意味：${phrase.meaning}`;
  elements.phrase.innerHTML = phrase.text.split("").map((character, index) => {
    let className = "";
    if (index < input.length) className = input[index] === character ? "correct" : "incorrect";
    else if (index === input.length) className = "current";
    return `<span class="${className}">${character === " " ? "&nbsp;" : escapeHtml(character)}</span>`;
  }).join("");
  elements.progress.style.width = `${Math.min(100, (input.length / phrase.text.length) * 100)}%`;
  elements.monitorText.textContent = input ? `${input.slice(-12)}_` : "ready_";
}

function escapeHtml(value) { return value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]); }

function renderStats() {
  const elapsedMinutes = startedAt ? Math.max((Date.now() - startedAt) / 60000, 1 / 60) : 0;
  const wpm = elapsedMinutes ? Math.round(typedCorrectly / 5 / elapsedMinutes) : 0;
  elements.wpm.textContent = Math.min(wpm, 999);
  elements.accuracy.textContent = `${totalKeystrokes ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100}%`;
  elements.combo.textContent = combo;
  elements.earned.textContent = sessionEarned;
}

function renderRoom() {
  document.querySelectorAll(".room-item").forEach((roomItem) => roomItem.classList.remove("visible"));
  elements.room.dataset.wallpaper = state.equipped.wallpaper;
  elements.room.dataset.floor = state.equipped.floor;
  elements.room.dataset.roomStyle = state.equipped.room;
  const roomFeature = shopItems.find((item) => item.id === state.equipped.room && !item.starter);
  const themeMarkup = roomFeature ? `<span class="placed-item large theme-feature" style="--item-x: 47%; --item-y: 67%" title="${roomFeature.name}">${roomFeature.icon}</span>` : "";
  elements.collectibleLayer.innerHTML = themeMarkup + Object.entries(state.placements).map(([key, position]) => createPlacedItemMarkup(key, position)).join("");
  const purchasedCount = state.owned.filter((id) => !shopItems.find((item) => item.id === id)?.starter).length;
  state.stats.purchasedItems = purchasedCount;
  elements.roomLevel.textContent = `ROOM LV. ${Math.floor(purchasedCount / 4) + 1}`;
  elements.roomHint.style.opacity = Object.keys(state.placements).length ? "0" : "1";
  elements.achievementWall.innerHTML = "";
  elements.room.classList.toggle("has-achievements", Object.keys(state.placements).some((key) => key.startsWith("achievement:")));
}

function createPlacedItemMarkup(key, position) {
  if (key.startsWith("achievement:")) {
    const achievementId = key.slice("achievement:".length);
    const achievement = achievements.find((candidate) => candidate.id === achievementId);
    if (!achievement || !state.unlockedAchievements.includes(achievementId)) return "";
    return `<span class="placed-item placed-achievement" data-placement-key="${key}" style="--item-x: ${position.x}%; --item-y: ${position.y}%" title="実績：${achievement.title}"><img src="${achievement.image}" alt="" /></span>`;
  }
  const item = shopItems.find((candidate) => candidate.id === key);
  if (!item || item.exclusive || !state.owned.includes(item.id)) return "";
  return `<span class="placed-item${item.large ? " large" : ""}${item.wall ? " wall-item" : ""}" data-placement-key="${key}" style="--item-x: ${position.x}%; --item-y: ${position.y}%" title="${item.name}">${item.icon}</span>`;
}

function getInventoryEntries() {
  const items = shopItems.filter((item) => state.owned.includes(item.id)).map((item) => ({ ...item, key: item.id }));
  const rewards = achievements.filter((achievement) => state.unlockedAchievements.includes(achievement.id)).map((achievement) => ({ ...achievement, key: `achievement:${achievement.id}`, category: "achievement", color: "#efe3bd", reward: true }));
  return [...items, ...rewards];
}

function renderInventory() {
  const inventoryCategories = [{ id: "all", label: "すべて" }, ...categories, { id: "achievement", label: "実績" }];
  const entries = getInventoryEntries();
  const visibleEntries = activeInventoryCategory === "all" ? entries : entries.filter((entry) => entry.category === activeInventoryCategory);
  elements.inventoryCount.textContent = entries.length;
  elements.inventoryTabs.innerHTML = inventoryCategories.map((category) => `<button class="inventory-tab ${category.id === activeInventoryCategory ? "active" : ""}" type="button" role="tab" aria-selected="${category.id === activeInventoryCategory}" data-inventory-category="${category.id}">${category.label}</button>`).join("");
  elements.inventoryList.innerHTML = visibleEntries.map(createInventoryItemMarkup).join("");
  elements.inventoryEmpty.hidden = visibleEntries.length > 0;
}

function createInventoryItemMarkup(entry) {
  const placed = Boolean(state.placements[entry.key]);
  const applied = entry.exclusive && state.equipped[entry.exclusive] === entry.id;
  const preview = entry.reward ? `<img src="${entry.image}" alt="" />` : entry.icon;
  let buttonText = placed ? "片付ける" : "配置する";
  let action = placed ? `data-remove-item="${entry.key}"` : `data-place-item="${entry.key}"`;
  let buttonClass = placed ? "placed" : "";
  let disabled = "";
  if (entry.exclusive) {
    buttonText = applied ? "適用中" : "部屋に適用";
    action = applied ? "" : `data-apply-item="${entry.id}"`;
    buttonClass = applied ? "applied" : "";
    disabled = applied ? "disabled" : "";
  }
  return `<article class="inventory-item"><div class="inventory-item-preview" style="--preview-bg: ${entry.color}">${preview}</div><h3 title="${entry.name || entry.title}">${entry.name || entry.title}</h3><button class="inventory-action ${buttonClass}" type="button" ${action} ${disabled}>${buttonText}</button></article>`;
}

function renderTabs() {
  elements.tabs.innerHTML = categories.map((category) => `<button class="shop-tab ${category.id === activeCategory ? "active" : ""}" type="button" role="tab" aria-selected="${category.id === activeCategory}" data-category="${category.id}"><span aria-hidden="true">${category.icon}</span>${category.label}</button>`).join("");
}

function renderShop() {
  const category = categories.find((candidate) => candidate.id === activeCategory);
  const items = shopItems.filter((item) => item.category === activeCategory);
  elements.categoryDescription.textContent = category.description;
  elements.categoryCount.textContent = `${items.length} ITEMS`;
  elements.ownedCount.textContent = `${state.owned.length} / ${shopItems.length}`;
  elements.collectionProgress.style.width = `${(state.owned.length / shopItems.length) * 100}%`;
  renderTabs();
  elements.shopList.innerHTML = items.map(createShopItemMarkup).join("");
}

function createShopItemMarkup(item) {
  const owned = state.owned.includes(item.id);
  const affordable = state.coins >= item.price;
  let buttonClass = "", buttonText = affordable ? "購入する" : "コイン不足", buttonEnd = `<span class="coin small">●</span> ${item.price}`, disabled = !affordable, action = `data-buy="${item.id}"`;
  if (owned) {
    buttonClass = "owned"; buttonText = "インベントリに保管中"; buttonEnd = "✓"; disabled = true; action = "";
  }
  return `<article class="shop-item"><div class="item-preview" style="--preview-bg: ${item.color}" aria-hidden="true">${item.tag ? `<span class="item-tag">${item.tag}</span>` : ""}${item.icon}</div><div class="item-copy"><h3>${item.name}</h3><p>${item.description}</p><button class="buy-button ${buttonClass}" type="button" ${action} ${disabled ? "disabled" : ""}><span>${buttonText}</span><span>${buttonEnd}</span></button></div></article>`;
}

function renderWallet() {
  elements.coinCount.textContent = state.coins;
  elements.soundToggle.classList.toggle("muted", !state.soundOn);
  elements.soundToggle.setAttribute("aria-pressed", String(!state.soundOn));
}
function renderAll() { renderWallet(); renderRoom(); renderShop(); renderInventory(); renderPhrase(); renderStats(); }

function handleInput(event) {
  const value = event.target.value, phrase = phrases[currentPhraseIndex].text;
  if (!startedAt && value.length) startedAt = Date.now();
  if (value.length > previousInputValue.length) {
    const inserted = value.slice(previousInputValue.length);
    for (let offset = 0; offset < inserted.length; offset += 1) {
      const isCorrect = inserted[offset] === phrase[previousInputValue.length + offset];
      totalKeystrokes += 1;
      if (isCorrect) {
        correctKeystrokes += 1; typedCorrectly += 1; combo += 1; state.stats.totalCorrect += 1; state.stats.bestCombo = Math.max(state.stats.bestCombo, combo);
        const reward = combo % 20 === 0 ? 3 : 1;
        addCoins(reward); playTone(420 + Math.min(combo, 25) * 7, 0.025);
        elements.message.textContent = reward > 1 ? `ナイスコンボ！ +${reward} コイン` : "正しいキーでコインをゲット";
      } else {
        combo = 0; elements.input.classList.remove("error"); void elements.input.offsetWidth; elements.input.classList.add("error");
        elements.message.textContent = "焦らず、もう一度。"; playTone(150, 0.05);
      }
    }
  }
  previousInputValue = value; renderPhrase(); renderStats(); checkAchievements();
  if (value === phrase) completePhrase();
}

function addCoins(amount) {
  state.coins += amount; state.totalEarned += amount; sessionEarned += amount; saveState(); renderWallet();
  if (!document.querySelector("#shop-view").hidden) renderShop();
  elements.wallet.classList.remove("pop"); void elements.wallet.offsetWidth; elements.wallet.classList.add("pop");
}
function completePhrase() {
  const bonus = 8 + Math.min(7, Math.floor(combo / 10)); state.stats.completedPhrases += 1; addCoins(bonus); elements.message.textContent = `文章クリア！ ボーナス +${bonus} コイン`;
  checkAchievements(); playSuccessSound(); showToast(`文章クリア！ ${bonus} ボーナスコイン`); window.setTimeout(nextPhrase, 650);
}
function nextPhrase() {
  let nextIndex; do nextIndex = Math.floor(Math.random() * phrases.length); while (nextIndex === currentPhraseIndex && phrases.length > 1);
  currentPhraseIndex = nextIndex; elements.input.value = ""; previousInputValue = ""; elements.message.textContent = "正しいキーでコインをゲット"; renderPhrase(); elements.input.focus();
}
function buyItem(itemId) {
  const item = shopItems.find((candidate) => candidate.id === itemId);
  if (!item || state.owned.includes(itemId) || state.coins < item.price) return;
  state.coins -= item.price; state.owned.push(itemId);
  saveState(); renderWallet(); renderRoom(); renderShop(); renderInventory(); checkAchievements(); playSuccessSound(); showToast(`${item.name}をインベントリに追加しました`);
}
function equipItem(itemId) {
  const item = shopItems.find((candidate) => candidate.id === itemId);
  if (!item?.exclusive || !state.owned.includes(itemId)) return;
  state.equipped[item.exclusive] = item.id; saveState(); renderRoom(); renderInventory(); playTone(520, 0.1); showToast(`${item.name}を部屋に適用しました`);
}
function placeInventoryItem(key) {
  if (state.placements[key]) return;
  const entry = getInventoryEntries().find((candidate) => candidate.key === key);
  if (!entry || entry.exclusive) return;
  const placedCount = Object.keys(state.placements).length;
  const wallItem = entry.reward || entry.wall;
  const xSlots = [18, 34, 50, 66, 82, 26, 58, 74];
  const ySlots = wallItem ? [22, 31, 19, 34] : [71, 62, 79, 55, 73];
  state.placements[key] = { x: xSlots[placedCount % xSlots.length], y: ySlots[placedCount % ySlots.length] };
  saveState(); renderRoom(); renderInventory(); showToast(`${entry.name || entry.title}を配置しました`);
}
function removeInventoryItem(key) {
  const entry = getInventoryEntries().find((candidate) => candidate.key === key);
  if (!entry || !state.placements[key]) return;
  delete state.placements[key]; saveState(); renderRoom(); renderInventory(); showToast(`${entry.name || entry.title}を片付けました`);
}
function toggleInventory(open) {
  const shouldOpen = typeof open === "boolean" ? open : elements.inventoryDrawer.hidden;
  elements.inventoryDrawer.hidden = !shouldOpen;
  elements.inventoryToggle.setAttribute("aria-expanded", String(shouldOpen));
  elements.room.classList.toggle("inventory-active", shouldOpen);
  if (shouldOpen) renderInventory();
}
function updateDraggedPosition(event) {
  if (!draggedPlacementKey) return;
  const bounds = elements.room.getBoundingClientRect();
  const x = Math.min(95, Math.max(5, ((event.clientX - bounds.left) / bounds.width) * 100));
  const y = Math.min(88, Math.max(10, ((event.clientY - bounds.top) / bounds.height) * 100));
  state.placements[draggedPlacementKey] = { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
  const target = elements.collectibleLayer.querySelector(`[data-placement-key="${CSS.escape(draggedPlacementKey)}"]`);
  if (target) { target.style.setProperty("--item-x", `${x}%`); target.style.setProperty("--item-y", `${y}%`); }
}
function finishDragging(event) {
  if (!draggedPlacementKey) return;
  const target = event.target.closest("[data-placement-key]");
  if (target?.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
  target?.classList.remove("dragging"); draggedPlacementKey = null; saveState();
}
function playTone(frequency, duration) {
  if (!state.soundOn) return;
  try {
    audioContext ??= new AudioContext(); const oscillator = audioContext.createOscillator(); const gain = audioContext.createGain(); oscillator.type = "sine"; oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.028, audioContext.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime + duration);
  } catch { state.soundOn = false; renderWallet(); }
}
function playSuccessSound() { [0, 90, 180].forEach((delay, index) => window.setTimeout(() => playTone([440, 554, 659][index], 0.12), delay)); }
function showToast(message) { window.clearTimeout(toastTimer); elements.toast.textContent = message; elements.toast.classList.add("show"); toastTimer = window.setTimeout(() => elements.toast.classList.remove("show"), 2400); }
function checkAchievements() {
  const progress = { ...state.stats, purchasedItems: state.owned.filter((id) => !shopItems.find((item) => item.id === id)?.starter).length };
  achievements.filter((achievement) => !state.unlockedAchievements.includes(achievement.id) && achievement.condition(progress)).forEach(unlockAchievement);
}
function unlockAchievement(achievement) {
  state.unlockedAchievements.push(achievement.id); saveState(); renderInventory(); achievementPopupQueue.push(achievement); showNextAchievement();
}
function showNextAchievement() {
  if (achievementPopupVisible || achievementPopupQueue.length === 0) return;
  const achievement = achievementPopupQueue.shift(); achievementPopupVisible = true;
  elements.achievementPopupImage.src = achievement.image; elements.achievementPopupImage.alt = `${achievement.title}の記念アイコン`; elements.achievementPopupTitle.textContent = achievement.title; elements.achievementPopupDescription.textContent = achievement.description;
  elements.achievementPopup.setAttribute("aria-hidden", "false"); elements.achievementPopup.classList.add("show"); playAchievementSound();
  achievementPopupTimer = window.setTimeout(hideAchievementPopup, 5200);
}
function hideAchievementPopup() {
  if (!achievementPopupVisible) return;
  window.clearTimeout(achievementPopupTimer); elements.achievementPopup.classList.remove("show"); elements.achievementPopup.setAttribute("aria-hidden", "true"); achievementPopupVisible = false;
  window.setTimeout(showNextAchievement, 400);
}
function playAchievementSound() { [0, 110, 220, 360].forEach((delay, index) => window.setTimeout(() => playTone([523, 659, 784, 1047][index], .18), delay)); }
function resetSave() {
  if (!window.confirm("コインと購入したアイテムをすべて初期状態に戻しますか？")) return;
  state = createDefaultState(); sessionEarned = 0; totalKeystrokes = 0; correctKeystrokes = 0; typedCorrectly = 0; combo = 0; startedAt = null; previousInputValue = ""; elements.input.value = "";
  saveState(); renderAll(); switchView("home"); showToast("新しい部屋から再スタートしました");
}

elements.brand.addEventListener("click", (event) => { event.preventDefault(); switchView("home"); });
elements.viewButtons.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
elements.input.addEventListener("input", handleInput);
elements.input.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); nextPhrase(); } });
elements.nextButton.addEventListener("click", nextPhrase);
elements.tabs.addEventListener("click", (event) => { const tab = event.target.closest("[data-category]"); if (tab) { activeCategory = tab.dataset.category; renderShop(); } });
elements.shopList.addEventListener("click", (event) => { const buyButton = event.target.closest("[data-buy]"); if (buyButton) buyItem(buyButton.dataset.buy); });
elements.inventoryToggle.addEventListener("click", () => toggleInventory());
elements.inventoryClose.addEventListener("click", () => toggleInventory(false));
elements.inventoryTabs.addEventListener("click", (event) => { const tab = event.target.closest("[data-inventory-category]"); if (tab) { activeInventoryCategory = tab.dataset.inventoryCategory; renderInventory(); } });
elements.inventoryList.addEventListener("click", (event) => {
  const placeButton = event.target.closest("[data-place-item]"), removeButton = event.target.closest("[data-remove-item]"), applyButton = event.target.closest("[data-apply-item]");
  if (placeButton) placeInventoryItem(placeButton.dataset.placeItem);
  if (removeButton) removeInventoryItem(removeButton.dataset.removeItem);
  if (applyButton) equipItem(applyButton.dataset.applyItem);
});
elements.collectibleLayer.addEventListener("pointerdown", (event) => {
  const target = event.target.closest("[data-placement-key]");
  if (!target) return;
  event.preventDefault(); draggedPlacementKey = target.dataset.placementKey; target.classList.add("dragging"); target.setPointerCapture(event.pointerId); updateDraggedPosition(event);
});
elements.collectibleLayer.addEventListener("pointermove", updateDraggedPosition);
elements.collectibleLayer.addEventListener("pointerup", finishDragging);
elements.collectibleLayer.addEventListener("pointercancel", finishDragging);
elements.soundToggle.addEventListener("click", () => { state.soundOn = !state.soundOn; saveState(); renderWallet(); showToast(state.soundOn ? "効果音をオンにしました" : "効果音をオフにしました"); });
elements.resetButton.addEventListener("click", resetSave);
elements.achievementPopupClose.addEventListener("click", hideAchievementPopup);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.inventoryDrawer.hidden) { toggleInventory(false); return; }
  if (!document.querySelector("#home-view").hidden && elements.inventoryDrawer.hidden && !event.ctrlKey && !event.metaKey && event.key.length === 1 && document.activeElement !== elements.input) elements.input.focus();
});

renderAll();
switchView("home");
window.setTimeout(checkAchievements, 350);
