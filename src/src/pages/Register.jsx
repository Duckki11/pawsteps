import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import Page from '../components/Page.jsx'
import PasswordField from '../components/PasswordField.jsx'

export default function Register() {
  const { register } = useApp()
  const [f, setF] = useState({ u: '', p: '', p2: '' })
  const [err, setErr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setErr(register(f.u, f.p, f.p2) ?? '')
  }

  return (
    <Page back title="創建帳號">
      <form onSubmit={submit} className="space-y-4 mt-2">
        <input className="field" placeholder="帳號" value={f.u} onChange={set('u')} autoComplete="username" />
        <PasswordField placeholder="密碼" value={f.p} onChange={set('p')} autoComplete="new-password" />
        <PasswordField placeholder="再輸入一次密碼" value={f.p2} onChange={set('p2')} autoComplete="new-password" />
        {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
        <div className="pt-2 flex justify-center">
          <button className="btn btn-primary px-10">完成</button>
        </div>
      </form>
    </Page>
  )
}
