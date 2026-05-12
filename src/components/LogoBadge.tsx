import { useState } from 'react'
import type { ReactNode } from 'react'

interface Props { src?: string; alt: string; fallback: ReactNode }

export default function LogoBadge({ src, alt, fallback }: Props) {
  const [err, setErr] = useState(false)
  if (!src || err) return <>{fallback}</>
  return <img src={src} alt={alt} className="w-8 h-8 object-contain bg-white rounded p-0.5" onError={() => setErr(true)} />
}
