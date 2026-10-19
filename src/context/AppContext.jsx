import { createContext, useContext, useEffect, useState } from 'react'
import { ACHIEVEMENTS, REWARD, makeTasks, progressOf } from '../data'

const Ctx = createContext(null)
export const useApp = () => useContext(Ctx)

const KEY = 'pawsteps:v1'
const newProfile = () => ({
  coins: 0, trips: 0, wins: 0,
  owned: ['flower'], equipped: [], unlocked: {},
})

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? { accounts: {}, profiles: {}, session: null }
  } catch {
    return { accounts: {}, profiles: {}, session: null }
  }
}

// 每次 profile 更新後檢查有沒有新成就
function withAchievements(p) {
  const unlocked = { ...p.unlocked }
  ACHIEVEMENTS.forEach((a) => {
    if (!unlocked[a.id] && a.check(p)) unlocked[a.id] = Date.now()
  })
  return { ...p, unlocked }
}

export function AppProvider({ children }) {
  const [db, setDb] = useState(load)
  const [stack, setStack] = useState(() => [db.session ? 'home' : 'login'])
  const [route, setRoute] = useState({ from: null, to: null }) // 目的地選擇中
  const [trip, setTrip] = useState(null)                       // 進行中的任務
  const [result, setResult] = useState(null)                   // 結算結果

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(db)) }, [db])

  const user = db.session
  const profile = user ? db.profiles[user] : null

  /* ---------- 畫面切換（狀態機） ---------- */
  const screen = stack[stack.length - 1]
  const go = (s) => setStack((st) => [...st, s])                       // 進入下一頁
  const reset = (s) => setStack([s])                                   // 重設（底部導覽列用）
  const back = () => setStack((st) => (st.length > 1 ? st.slice(0, -1) : st))

  /* ---------- 帳號 ---------- */
  // 回傳錯誤訊息字串；成功回傳 null
  const login = (u, p) => {
    if (db.accounts[u] !== p) return '帳號或密碼不正確'
    setDb((d) => ({ ...d, session: u }))
    reset('home')
    return null
  }
  const register = (u, p, p2) => {
    u = u.trim()
    if (!u || !p) return '請填寫帳號與密碼'
    if (p !== p2) return '兩次密碼不一致'
    if (db.accounts[u]) return '這個帳號已經有人用了'
    setDb((d) => ({
      ...d,
      accounts: { ...d.accounts, [u]: p },
      profiles: { ...d.profiles, [u]: newProfile() },
      session: u,
    }))
    reset('home')
    return null
  }
  const logout = () => {
    setDb((d) => ({ ...d, session: null }))
    reset('login')
  }

  const patchProfile = (fn) =>
    setDb((d) => ({
      ...d,
      profiles: { ...d.profiles, [d.session]: withAchievements(fn(d.profiles[d.session])) },
    }))

  /* ---------- 衣櫥 ---------- */
  const toggleItem = (item) => {
    if (profile.owned.includes(item.id)) {
      patchProfile((p) => ({
        ...p,
        equipped: p.equipped.includes(item.id)
          ? p.equipped.filter((i) => i !== item.id)
          : [...p.equipped, item.id],
      }))
      return null
    }
    if (profile.coins < item.cost) return `還差 ${item.cost - profile.coins} 金幣`
    patchProfile((p) => ({
      ...p,
      coins: p.coins - item.cost,
      owned: [...p.owned, item.id],
      equipped: [...p.equipped, item.id],
    }))
    return null
  }

  /* ---------- 任務流程 ---------- */
  const startTrip = () => {
    setTrip({
      from: route.from, to: route.to,
      tasks: makeTasks(),
    })
  }
  const upload = (taskId, file) => {
    // 依檔案類型偵測：影片 or 照片
    const kind = file.type.startsWith('video/') ? 'video' : 'image'
    const item = { url: URL.createObjectURL(file), kind }
    setTrip((t) => ({
      ...t,
      tasks: t.tasks.map((k) => {
        if (k.id !== taskId || progressOf(k) >= k.target) return k
        if (kind === 'video' && !k.allowVideo) return k
        return { ...k, photos: [...k.photos, item] }
      }),
    }))
  }
  // 刪除某張照片，進度會跟著扣回
  const removePhoto = (taskId, index) => {
    setTrip((t) => ({
      ...t,
      tasks: t.tasks.map((k) => {
        if (k.id !== taskId) return k
        URL.revokeObjectURL(k.photos[index].url)
        return { ...k, photos: k.photos.filter((_, i) => i !== index) }
      }),
    }))
  }
  const finishTrip = () => {
    const success = trip.tasks.every((t) => progressOf(t) >= t.target)
    patchProfile((p) => ({
      ...p,
      trips: p.trips + 1,
      wins: p.wins + (success ? 1 : 0),
      coins: p.coins + (success ? REWARD : 0),
    }))
    setResult({ success, reward: success ? REWARD : 0 })
    go('result')
  }
  // 「再一次？」：沿用同一條路線重新開始
  const retryTrip = () => {
    startTrip()
    setStack(['home', 'missions'])
  }

  const value = {
    screen, go, reset, back,
    user, profile, login, register, logout,
    toggleItem,
    route, setRoute, trip, startTrip, upload, removePhoto, finishTrip, retryTrip, result,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
