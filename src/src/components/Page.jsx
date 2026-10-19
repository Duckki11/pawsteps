import { useApp } from '../context/AppContext.jsx'

// 內頁共用外框：左上返回箭頭 + 標題
export default function Page({ title, back = false, children, className = '' }) {
  const { back: goBack } = useApp()
  return (
    <div className={`flex-1 flex flex-col px-5 pt-4 pb-6 ${className}`}>
      {back && (
        <button onClick={goBack} aria-label="返回" className="self-start text-3xl leading-none -ml-1 mb-2 w-11 h-11">
          ←
        </button>
      )}
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
      {children}
    </div>
  )
}
