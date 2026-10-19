import { useApp } from '../context/AppContext.jsx'
import Page from '../components/Page.jsx'

export default function Confirm() {
  const { route, back, startTrip, go } = useApp()

  const letsGo = () => { startTrip(); go('missions') }

  return (
    <Page back>
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="flex items-center gap-2 w-full">
          <span className="sketch px-4 py-3 text-lg font-bold">{route.from}</span>
          <span className="flex-1 border-t-[3px] border-dashed border-ink" />
          <span className="sketch px-4 py-3 text-lg font-bold">{route.to}</span>
        </div>
        <h2 className="text-3xl font-bold">出發嗎？</h2>
        <div className="flex gap-4 w-full">
          <button className="btn btn-primary flex-1" onClick={letsGo}>Let's go!</button>
          <button className="btn flex-1" onClick={back}>我再想想</button>
        </div>
      </div>
    </Page>
  )
}
