import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Page from '../components/Page.jsx'
import Pet from '../components/Pet.jsx'

const LINES = ['汪！', '今天天氣好適合散步～', '我聞到花香了！', '走吧走吧！']

export default function Home() {
  const { user, profile, go, trip, setRoute } = useApp()
  const [say, setSay] = useState(0)

  const start = () => {
    setRoute({ from: null, to: null })
    go('destination')
  }

  return (
    <Page className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">歡迎回來！！</h1>
        <span className="sketch px-3 py-1 text-sm bg-sunny">🪙 {profile.coins}</span>
      </div>
      <p className="text-sm opacity-70">{user}，今天想去哪裡探險？</p>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
        <button onClick={() => setSay((s) => (s + 1) % LINES.length)} aria-label="摸摸小狗">
          <Pet equipped={profile.equipped} />
        </button>
        <p key={say} className="sketch px-4 py-2 text-sm animate-pop">{LINES[say]}</p>

        {/* 右側衣櫥快捷鍵 */}
        <button
          onClick={() => go('wardrobe')}
          aria-label="衣櫥"
          className="sketch absolute right-0 bottom-2 w-16 h-16 rounded-full text-3xl bg-blossom/60 grid place-items-center"
          style={{ borderRadius: '50%' }}
        >
          👕
        </button>
      </div>

      <div className="space-y-3">
        {trip && (
          <button className="btn btn-sun w-full" onClick={() => go('missions')}>繼續今天的任務</button>
        )}
        <button className="btn btn-primary w-full" onClick={start}>開始新的探險</button>
      </div>
    </Page>
  )
}
