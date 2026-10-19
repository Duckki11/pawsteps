// 衣櫥道具：pos 為疊在狗狗上的位置（Tailwind class）
export const ITEMS = [
  { id: 'flower', name: '小花', icon: '🌸', cost: 0,  pos: 'top-2 -right-1 text-4xl' },
  { id: 'cap',    name: '帽子', icon: '🧢', cost: 20, pos: '-top-5 left-1/2 -translate-x-1/2 text-5xl' },
  { id: 'scarf',  name: '圍巾', icon: '🧣', cost: 30, pos: '-bottom-4 left-1/2 -translate-x-1/2 text-5xl' },
]

// 任務：進度 = 照片張數 × perUpload（刪除照片會自動扣回進度）
// 磁磚任務：上傳 1 段影片即完成；若上傳照片，則每張算 1 格，需要 10 張
export const TILE_TASK = { id: 'tiles', icon: '🟫', title: '踩 10 格磁磚', target: 10, perUpload: 1, allowVideo: true }

// 「發現」類任務的種類，每次出發隨機抽幾種，數量隨機 1–5
export const FIND_TYPES = [
  { id: 'flower', icon: '🌸', name: '花' },
  { id: 'grass',  icon: '🌿', name: '草' },
  { id: 'animal', icon: '🐱', name: '動物' },
  { id: 'bird',   icon: '🐦', name: '鳥' },
  { id: 'tree',   icon: '🌳', name: '樹' },
  { id: 'bug',    icon: '🦋', name: '昆蟲' },
]
export const FIND_COUNT = 3 // 每次抽幾種發現任務（再加上固定的磁磚任務）

// photos 內每一筆是 { url, kind: 'image' | 'video' }
export const progressOf = (t) =>
  t.allowVideo && t.photos.some((m) => m.kind === 'video')
    ? t.target
    : Math.min(t.target, t.photos.length * t.perUpload)

export function makeTasks() {
  const pool = [...FIND_TYPES].sort(() => Math.random() - 0.5).slice(0, FIND_COUNT)
  const finds = pool.map((f) => {
    const n = 1 + Math.floor(Math.random() * 5)
    return { id: f.id, icon: f.icon, title: `發現 ${n} 種不同的${f.name}`, target: n, perUpload: 1 }
  })
  return [TILE_TASK, ...finds].map((t) => ({ ...t, photos: [] }))
}

export const PLACES = ['大同大學', '大同國小', '圓山公園', '中山站', '台北車站', '寧夏夜市', '迪化街']
export const REWARD = 10

// 成就：check(profile) 為 true 時解鎖
export const ACHIEVEMENTS = [
  { id: 'first',  icon: '👣', name: '第一步',      desc: '完成第 1 次探險',   check: (p) => p.wins >= 1 },
  { id: 'master', icon: '🔍', name: '大同最會找',  desc: '完成 3 次探險',     check: (p) => p.wins >= 3 },
  { id: 'style',  icon: '🎀', name: '時尚小狗',    desc: '擁有 2 件衣櫥道具', check: (p) => p.owned.length >= 2 },
]

export const FAKE_BOARD = [
  { name: '小橘', score: 420 }, { name: 'Mochi', score: 310 },
  { name: '阿大同', score: 230 }, { name: 'luna', score: 150 },
]
