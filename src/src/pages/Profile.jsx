import { useApp } from '../context/AppContext.jsx'
import { ACHIEVEMENTS } from '../data'
import Page from '../components/Page.jsx'
import Pet from '../components/Pet.jsx'

const fmt = (ts) => new Date(ts).toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' })

export default function Profile() {
  const { user, profile, logout } = useApp()
  return (
    <Page title="成就">
      <div className="sketch p-4 flex items-center gap-4 mb-5">
        <div className="shrink-0 w-20 grid place-items-center"><Pet equipped={profile.equipped} size="text-6xl" bob={false} /></div>
        <div>
          <p className="font-bold text-lg">{user}</p>
          <p className="text-sm">探險 {profile.trips} 次・成功 {profile.wins} 次</p>
          <p className="text-sm">🪙 {profile.coins}</p>
        </div>
      </div>

      <ul className="space-y-3">
        {ACHIEVEMENTS.map((a) => {
          const at = profile.unlocked[a.id]
          return (
            <li key={a.id} className={`sketch p-3 flex items-center gap-3 ${at ? '' : 'opacity-50'}`}>
              <span className="w-12 h-12 rounded-full border-2 border-ink grid place-items-center text-2xl bg-sunny/60">
                {at ? a.icon : '🔒'}
              </span>
              <div className="flex-1">
                <p className="font-bold">{a.name}</p>
                <p className="text-xs">{a.desc}</p>
              </div>
              {at && <span className="text-sm">{fmt(at)}</span>}
            </li>
          )
        })}
      </ul>

      <button className="btn mt-auto self-center text-sm" onClick={logout}>登出</button>
    </Page>
  )
}
