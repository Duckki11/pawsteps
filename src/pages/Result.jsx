import { useApp } from '../context/AppContext.jsx'
import Page from '../components/Page.jsx'

export default function Result() {
  const { result, reset, retryTrip } = useApp()
  const ok = result?.success

  return (
    <Page>
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold">{ok ? '完成！！' : '失敗...'}</h1>

        {ok ? (
          <div className="relative animate-pop">
            <div className="sketch w-40 h-40 rounded-full grid place-items-center text-7xl bg-sunny" style={{ borderRadius: '50%' }}>🤩</div>
            <span className="absolute -left-8 bottom-2 text-4xl animate-bob">🌸</span>
            <span className="absolute -right-6 -top-2 text-4xl animate-bob">🌼</span>
          </div>
        ) : (
          <div className="sketch w-40 h-40 grid place-items-center text-4xl font-bold bg-sky/50 animate-pop" style={{ borderRadius: '50%' }}>
            (π_π)
          </div>
        )}

        <p className="text-sm">
          {ok ? `獲得 🪙 ${result.reward} 金幣！` : '任務還沒做完，再走一次吧。'}
        </p>

        <div className="w-full space-y-3 mt-4">
          <button className="btn btn-primary w-full" onClick={() => reset('home')}>回首頁</button>
          <button className="btn w-full" onClick={retryTrip}>再一次？</button>
        </div>
      </div>
    </Page>
  )
}
