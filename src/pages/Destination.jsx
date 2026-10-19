import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { PLACES } from '../data'
import Page from '../components/Page.jsx'

export default function Destination() {
  const { route, setRoute, go } = useApp()
  const [q, setQ] = useState('')
  const matches = q ? PLACES.filter((p) => p.includes(q)) : []

  const pickTo = (to) => { setRoute((r) => ({ ...r, to })); setQ('') }
  const pickFrom = (from) => setRoute((r) => ({ ...r, from }))
  const chip = (active) => `btn ${active ? 'btn-sun' : ''} px-4 py-2`

  return (
    <Page back title="目的地">
      <h2 className="font-bold mb-2">今天去哪裡？</h2>
      <div className="relative">
        <input
          className="field pr-11"
          placeholder="搜尋地點"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && q.trim() && pickTo(q.trim())}
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2" aria-hidden>🔍</span>
      </div>
      {q && (
        <ul className="sketch mt-2 overflow-hidden">
          {matches.map((m) => (
            <li key={m}><button className="w-full text-left px-4 py-2 hover:bg-sky/40" onClick={() => pickTo(m)}>{m}</button></li>
          ))}
          <li><button className="w-full text-left px-4 py-2 hover:bg-sky/40" onClick={() => pickTo(q.trim())}>使用「{q}」</button></li>
        </ul>
      )}
      {route.to && <p className="mt-3 text-sm">目的地：<b>{route.to}</b></p>}

      <h2 className="font-bold mt-8 mb-2">現在在？</h2>
      <div className="flex flex-wrap gap-3">
        <button className={chip(route.from === '家')} onClick={() => pickFrom('家')}>家</button>
        <button className={chip(route.from === '學校')} onClick={() => pickFrom('學校')}>學校</button>
        <button className={`${chip(route.from === '現在位置')} w-full`} onClick={() => pickFrom('現在位置')}>📍 現在位置</button>
      </div>

      <div className="mt-auto pt-8">
        <button className="btn btn-primary w-full" disabled={!route.from || !route.to} onClick={() => go('confirm')}>
          下一步
        </button>
      </div>
    </Page>
  )
}
