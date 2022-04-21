import { ArrowLeftIcon, CodeIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Route } from './Route'

export const AppHeader: NextPage = () => {
  const { route, back } = useRouter()

  return (
    <header>
      <ul
        className={`flex items-center ${
          route !== '/' ? 'justify-between' : 'justify-center'
        } gap-2 px-3 py-2 rounded-md bg-neutral-800`}
      >
        {route !== '/' && (
          <Route
            Icon={<ArrowLeftIcon className="w-5 h-5" />}
            callback={back}
            className="p-1 rounded-md hover:bg-neutral-600 transition-colors duration-150 flex-grow-0"
          />
        )}

        <Route
          className="p-1 hover:bg-neutral-600 rounded-md transition-colors duration-150"
          link="https://github.com/AlvaroAquijeDiaz/ftf-github-integration"
          text="Github"
          Icon={<CodeIcon className="w-5 h-5" />}
        />
      </ul>
    </header>
  )
}
