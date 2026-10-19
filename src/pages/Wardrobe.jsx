import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { ITEMS } from '../data'
import Page from '../components/Page.jsx'
import Pet from '../components/Pet.jsx'

export default function Wardrobe() {
  const { profile, toggleItem } = useApp()
  const [msg, setMsg] = useState('')

  return (
    <Page back title="衣櫥">
      <div className="sketch bg-sky/30 grid place-items-center py-10">
        <Pet equipped={profile.equipped} size="text-8xl" />
      </div>
      <div className="flex justify-between items-center mt-4 mb-2">
        <span className="font-bold">道具</span>
        <span className="text-sm">🪙 {profile.coins}</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {ITEMS.map((i) => {
          const owned = profile.owned.includes(i.id)
          const on = profile.equipped.includes(i.id)
          return (
            <button
              key={i.id}
              onClick={() => setMsg(toggleItem(i) ?? '')}
              className={`sketch py-4 flex flex-col items-center gap-1 ${on ? 'bg-grass' : ''}`}
              aria-pressed={on}
            >
              <span className="text-4xl">{i.icon}</span>
              <span className="text-sm">{i.name}</span>
              <span className="text-xs opacity-70">{on ? '穿戴中' : owned ? '已擁有' : `🪙 ${i.cost}`}</span>
            </button>
          )
        })}
      </div>
      {msg && <p role="alert" className="text-sm text-red-600 mt-3">{msg}</p>}
      <p className="text-xs opacity-60 mt-4">完成探險可以獲得金幣，用來解鎖更多道具。</p>
    </Page>
  )
}
