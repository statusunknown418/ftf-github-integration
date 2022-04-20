import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Route } from './Route'

export const AppHeader: NextPage = () => {
  const { route } = useRouter()
  console.log(route)
  return (
    <header>
      <ul className="flex items-center justify-evenly gap-2 px-2 py-1 rounded-md bg-neutral-800">
        <Route link="/" name="Home" />
      </ul>
    </header>
  )
}
