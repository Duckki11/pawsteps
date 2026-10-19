import { useApp } from '../context/AppContext.jsx'

const TABS = [
  { id: 'profile', icon: '🙂', label: '我的' },
  { id: 'home', icon: '🏠', label: '首頁' },
  { id: 'leaderboard', icon: '🏆', label: '排行' },
]
// 子頁面屬於哪個分頁（用來標示目前所在分頁）
const GROUP = {
  profile: ['profile'],
  home: ['home', 'wardrobe', 'destination', 'confirm', 'missions'],
  leaderboard: ['leaderboard'],
}

export default function Navbar() {
  const { screen, reset } = useApp()
  return (
    <nav className="sticky bottom-0 grid grid-cols-3 border-t-[3px] border-ink bg-white pb-[env(safe-area-inset-bottom)]">
      {TABS.map((t, i) => {
        const active = GROUP[t.id].includes(screen)
        return (
          <button
            key={t.id}
            onClick={() => reset(t.id)}
            aria-label={t.label}
            aria-current={active ? 'page' : undefined}
            className={`py-2 flex flex-col items-center text-sm ${i > 0 ? 'border-l-[3px] border-ink' : ''} ${active ? 'bg-sunny' : ''}`}
          >
            <span className="text-2xl">{t.icon}</span>
            {t.label}
          </button>
        )
      })}
    </nav>
  )
}
