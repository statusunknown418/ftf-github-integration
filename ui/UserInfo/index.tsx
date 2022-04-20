import { TReposQuery } from '@/pages'
import { IUserResponse } from '@/__generated__/UserResponse.types'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Route } from '../AppHeader/Route'

interface Props {
  user: IUserResponse
}

export const UserInfo: NextPage<Props> = ({ user }) => {
  const linkQuery: TReposQuery = {
    user: user.login,
  }
  return (
    <section className="shadow-lg shadow-neutral-700/50 bg-zinc-800 p-5 rounded-lg flex flex-col gap-5">
      <section className="flex items-center justify-center gap-5">
        <h1 className="font-bold text-5xl flex-grow text-center">{user.name}</h1>
        {user.avatar_url && (
          <div className="overflow-hidden rounded-lg border border-neutral-500 shadow-lg shadow-indigo-600/50">
            <Image src={user.avatar_url} width={100} height={100} />
          </div>
        )}
      </section>

      <section>
        <p className="text-neutral-200">{user.bio}</p>
        <p>
          <Link href={user.blog}>
            <a className="text-blue-500 underline hover:text-blue-400">{user.blog}</a>
          </Link>
        </p>
      </section>

      <section>
        <Route
          className="cursor-pointer"
          link="/repos"
          query={linkQuery}
          text="See Repos"
          Icon={<InformationCircleIcon className="w-5 h-5 text-indigo-500" />}
        />
      </section>
    </section>
  )
}
