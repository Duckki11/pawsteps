// 衣櫥道具：pos 為疊在狗狗上的位置（Tailwind class）
export const ITEMS = [
  { id: 'flower', name: '小花', icon: '🌸', cost: 0,  pos: 'top-2 -right-1 text-4xl' },
  { id: 'cap',    name: '帽子', icon: '🧢', cost: 20, pos: '-top-5 left-1/2 -translate-x-1/2 text-5xl' },
  { id: 'scarf',  name: '圍巾', icon: '🧣', cost: 30, pos: '-bottom-4 left-1/2 -translate-x-1/2 text-5xl' },
]

// Demo 任務：兩個固定任務
// 進度 = 照片張數 × perUpload；allowVideo 的任務上傳 1 段影片即直接完成
// hideCount：不顯示「n/目標」的數字
export const TASKS = [
  { id: 'tiles', icon: '🟫', title: '踩磁磚', target: 1, perUpload: 1, allowVideo: true, hideCount: true },
  { id: 'plants', icon: '🌿', title: '觀察 3 種不同的植物', target: 3, perUpload: 1 },
]

// photos 內每一筆是 { url, kind: 'image' | 'video' }
export const progressOf = (t) =>
  t.allowVideo && t.photos.some((m) => m.kind === 'video')
    ? t.target
    : Math.min(t.target, t.photos.length * t.perUpload)

export const makeTasks = () => TASKS.map((t) => ({ ...t, photos: [] }))

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
