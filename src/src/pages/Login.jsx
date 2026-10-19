import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import PasswordField from '../components/PasswordField.jsx'

export default function Login() {
  const { login, go } = useApp()
  const [open, setOpen] = useState(false)
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [err, setErr] = useState('')

  const submit = (e) => {
    e.preventDefault()
    setErr(login(u.trim(), p) ?? '')
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
      <div className="text-center">
        <div className="text-7xl animate-bob">🐾</div>
        <h1 className="text-4xl font-bold mt-3">大同找找</h1>
        <p className="text-sm mt-1 opacity-70">PawSteps · 帶著小狗走一段路</p>
      </div>

      {open ? (
        <form onSubmit={submit} className="w-full space-y-3">
          <input className="field" placeholder="帳號" value={u} onChange={(e) => setU(e.target.value)} autoComplete="username" />
          <PasswordField placeholder="密碼" value={p} onChange={(e) => setP(e.target.value)} autoComplete="current-password" />
          {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
          <div className="flex gap-3">
            <button type="button" className="btn flex-1" onClick={() => setOpen(false)}>取消</button>
            <button className="btn btn-primary flex-1">登入</button>
          </div>
        </form>
      ) : (
        <div className="w-full space-y-4">
          <button className="btn btn-primary w-full" onClick={() => setOpen(true)}>登入</button>
          <button className="btn w-full" onClick={() => go('register')}>註冊</button>
        </div>
      )}
    </div>
  )
}
