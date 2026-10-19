import { useState } from 'react'

// 密碼輸入框：右側眼睛按鈕可切換顯示／隱藏
export default function PasswordField({ className = '', ...props }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input {...props} type={show ? 'text' : 'password'} className={`field pr-12 ${className}`} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? '隱藏密碼' : '顯示密碼'}
        aria-pressed={show}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-ink opacity-70 hover:opacity-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
          {!show && <path d="M3 3l18 18" />}
        </svg>
      </button>
    </div>
  )
}
