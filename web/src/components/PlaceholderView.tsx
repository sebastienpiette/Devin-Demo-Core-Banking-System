import type { ReactNode } from 'react'
import { BackToMenu } from './BackToMenu.tsx'

type PlaceholderViewProps = {
  title: string
  children: ReactNode
}

export function PlaceholderView({ title, children }: PlaceholderViewProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <p className="placeholder-note">{children}</p>
      <BackToMenu />
    </section>
  )
}
