import { useRef } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Page from '../components/Page.jsx'
import { progressOf } from '../data'

function TaskCard({ task, onFile, onRemove }) {
  const input = useRef(null)
  const progress = progressOf(task)
  const done = progress >= task.target
  return (
    <div className={`sketch p-4 ${done ? 'bg-grass/50' : ''}`}>
      <div className="flex justify-between items-start gap-3">
        <h3 className="font-bold text-lg">{done ? '✅ ' : task.icon ? `${task.icon} ` : ''}{task.title}</h3>
        <span className="font-bold shrink-0">{progress}/{task.target}</span>
      </div>
      <div className="h-3 mt-2 border-2 border-ink rounded-full overflow-hidden bg-white">
        <div className="h-full bg-sunny transition-all" style={{ width: `${(progress / task.target) * 100}%` }} />
      </div>
      {task.photos.length > 0 && (
        <div className="flex gap-3 mt-2 pt-2 pr-2 overflow-x-auto">
          {task.photos.map((m, i) => (
            <div key={m.url} className="relative shrink-0">
              {m.kind === 'video' ? (
                <div className="relative">
                  <video src={`${m.url}#t=0.1`} preload="metadata" muted playsInline className="w-14 h-14 object-cover border-2 border-ink rounded-lg" />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-lg drop-shadow" aria-hidden="true">▶</span>
                </div>
              ) : (
                <img src={m.url} alt={`第 ${i + 1} 張照片`} className="w-14 h-14 object-cover border-2 border-ink rounded-lg" />
              )}
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={m.kind === 'video' ? '刪除影片' : `刪除第 ${i + 1} 張照片`}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-ink text-xs font-bold leading-none flex items-center justify-center active:scale-90"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        ref={input} type="file" hidden
        accept={task.allowVideo ? 'video/*,image/*' : 'image/*'}
        {...(task.allowVideo ? {} : { capture: 'environment' })}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = '' }}
      />
      <button className="btn px-3 py-1 text-sm mt-3" disabled={done} onClick={() => input.current.click()}>
        {task.allowVideo ? '🎬 Upload 影片' : '⬆ Upload'}
      </button>
      {task.allowVideo && !done && (
        <p className="text-xs opacity-70 mt-2">上傳 1 段影片即完成；若上傳照片，每張算 1 格，共需 10 張</p>
      )}
    </div>
  )
}

export default function Missions() {
  const { trip, upload, removePhoto, finishTrip, reset } = useApp()
  if (!trip) {
    return (
      <Page back title="今天任務：">
        <p className="mb-4">還沒有出發喔！</p>
        <button className="btn btn-primary" onClick={() => reset('home')}>回首頁</button>
      </Page>
    )
  }
  return (
    <Page back title="今天任務：">
      <p className="text-sm opacity-70 -mt-2 mb-4">{trip.from} → {trip.to}　每次上傳會推進一點進度</p>
      <div className="space-y-5">
        {trip.tasks.map((t) => (
          <TaskCard key={t.id} task={t} onFile={(f) => upload(t.id, f)} onRemove={(i) => removePhoto(t.id, i)} />
        ))}
      </div>
      <div className="mt-auto pt-8 flex justify-end">
        <button className="btn btn-sun" onClick={finishTrip}>都完成了？</button>
      </div>
    </Page>
  )
}
