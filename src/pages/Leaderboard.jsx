import { useApp } from '../context/AppContext.jsx'
import { FAKE_BOARD } from '../data'
import Page from '../components/Page.jsx'

export default function Leaderboard() {
  const { user, profile } = useApp()
  const me = { name: user, score: profile.wins * 100 + profile.coins, me: true }
  const board = [...FAKE_BOARD, me].sort((a, b) => b.score - a.score)
  const medals = ['🥇', '🥈', '🥉']

  return (
    <Page title="排行榜">
      <ol className="space-y-3">
        {board.map((r, i) => (
          <li key={r.name} className={`sketch px-4 py-3 flex items-center gap-3 ${r.me ? 'bg-sunny' : ''}`}>
            <span className="w-8 text-xl text-center">{medals[i] ?? i + 1}</span>
            <span className="flex-1 font-bold">{r.name}{r.me && '（你）'}</span>
            <span>{r.score}</span>
          </li>
        ))}
      </ol>
      <p className="text-xs opacity-60 mt-4">分數 = 成功次數 × 100 + 金幣。目前為示範資料，之後可接 Supabase / Firebase。</p>
    </Page>
  )
}
