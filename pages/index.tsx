import ActionButton from '@/ui/ActionButton'
import { EmptyState } from '@/ui/EmptyState'
import { LoadingState } from '@/ui/LoadingState'
import { UserInfo } from '@/ui/UserInfo'
import { IUserResponse } from '@/__generated__/UserResponse.types'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useSWR from 'swr'

export interface TReposQuery extends ParsedUrlQuery {
  user: string
}

const Home: NextPage = () => {
  const [searchUserName, setSearchUserName] = useState('')

  const { register, handleSubmit, reset } = useForm<{ name: string }>()

  const { data, error } = useSWR<IUserResponse>(`/users/${searchUserName}`)

  const [user, setUser] = useState<IUserResponse>({} as IUserResponse)

  useEffect(() => {
    if (error) {
      toast.error('Unexpected error :(')
    }

    data && setUser(data)
  }, [error, data])

  const onSubmit = handleSubmit((data) => {
    setSearchUserName(data.name)
  })

  const onClearClick = () => {
    setUser({} as IUserResponse)
    reset()
  }

  return (
    <div>
      <Head>
        <title>Commit Logger</title>
        <meta name="description" content="Sort of fullstack app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col gap-14 justify-between">
        <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-2">
          <h1 className="font-semibold text-xl text-neutral-200 text-center flex-grow">
            Search for a user
          </h1>

          <form onSubmit={onSubmit}>
            <input
              type="input"
              placeholder="Name like `AlvaroAquijeDiaz`"
              className="text-neutral-200 bg-bg-primary border border-neutral-500 rounded-md p-2 placeholder-neutral-500 
            focus:bg-neutral-700 transition-colors duration-150 text-sm focus:outline-none focus:ring focus:ring-indigo-600"
              {...register('name', { required: true })}
            />
            <button type="submit" />
          </form>

          <ActionButton designation="secondary" text="Clear" onClick={onClearClick} />
        </div>

        {!data && <LoadingState />}

        {user &&
          Object.keys(user).length > 2 &&
          Object.keys(user).some((key) => key.toLowerCase() === 'message') && (
            <EmptyState text="No user found" />
          )}

        {/* This is intentional, since the Github Api retrieves a 2-key object for empty requests */}
        {user && Object.keys(user).length > 2 && <UserInfo user={user} />}
      </main>
    </div>
  )
}

export default Home
