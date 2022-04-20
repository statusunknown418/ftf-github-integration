import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { useForm } from 'react-hook-form'
import { IUserResponse } from '@/__generated__/UserResponse.types'
import Link from 'next/link'

const Home: NextPage = () => {
  const [searchUserName, setSearchUserName] = useState('AlvaroAquijeDiaz')

  const { register, handleSubmit } = useForm<{ name: string }>()

  const { data, error, isValidating } = useSWR<IUserResponse>(
    `https://api.github.com/users/${searchUserName}`
  )

  useEffect(() => {
    if (error) {
      toast.error('Unexpected')
    }
  }, [error])

  const onSubmit = handleSubmit((data) => {
    setSearchUserName(data.name)
  })

  return (
    <div>
      <Head>
        <title>Commit Logger</title>
        <meta name="description" content="Sort of fullstack app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="font-extrabold text-2xl">Search for a user</h1>
        <form onSubmit={onSubmit}>
          <input
            type="input"
            placeholder="Name like `AlvaroAquijeDiaz`"
            className="bg-bg-primary border border-neutral-500 rounded-md p-2 placeholder-neutral-400 
          focus:bg-neutral-700 transition-colors duration-150 text-sm"
            {...register('name', { required: true })}
          />
          <button type="submit"></button>
        </form>

        {isValidating && <div>Loading...</div>}

        {data && (
          <div>
            <h1 className="font-semibold text-xl">{data.name}</h1>
            <p>{data.bio}</p>
            <Link
              href={{
                pathname: '/repos',
                query: {
                  user: data.login,
                },
              }}
            >
              <a>{data.repos_url}</a>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
