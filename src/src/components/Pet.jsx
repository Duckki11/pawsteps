import { ITEMS } from '../data'

export default function Pet({ equipped = [], size = 'text-9xl', bob = true }) {
  return (
    <div className={`relative inline-block ${bob ? 'animate-bob' : ''}`}>
      <span className={`${size} leading-none select-none`} role="img" aria-label="陪伴小狗">🐶</span>
      {ITEMS.filter((i) => equipped.includes(i.id)).map((i) => (
        <span key={i.id} className={`absolute ${i.pos} animate-pop select-none`}>{i.icon}</span>
      ))}
    </div>
  )
}
