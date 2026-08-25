import { BackToMenu } from '../components/BackToMenu.tsx'

export function NotFoundPage() {
  return (
    <section className="panel">
      <h2>Invalid.</h2>
      <p className="placeholder-note">
        That address is not one of the available options.
      </p>
      <BackToMenu />
    </section>
  )
}
