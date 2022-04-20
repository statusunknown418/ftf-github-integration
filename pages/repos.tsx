import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TReposResponse } from '@/__generated__/ReposResponse.types'
import { TReposQuery } from '.'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { LoadingState } from '@/ui/LoadingState'
import { EmptyState } from '@/ui/EmptyState'
import isTypeOf from '@/lib/isTypeOf'

const ReposPage: NextPage = () => {
  const { query } = useRouter()

  const fromQuery: TReposQuery = query as TReposQuery

  const { data, error, isValidating, mutate } = useSWR<TReposResponse>(
    `https://api.github.com/users/${fromQuery.user}/repos`
  )

  const isResponseValid = data && isTypeOf<TReposResponse>(data)

  const isRefreshing = isValidating

  useEffect(() => {
    if (error) {
      toast.error('Unexpected Error')
    }
  }, [error])

  if (isRefreshing) {
    return <LoadingState />
  }

  return (
    <div className="flex flex-col gap-4 justify-between">
      <section className="flex gap-2 justify-between items-center">
        <h2 className="font-semibold text-xl">Click on any repo to see the commit history</h2>
        <button
          onClick={() => mutate()}
          disabled={isRefreshing}
          className="font-light text-sm rounded-md px-3 py-1 bg-indigo-600 shadow-lg shadow-teal-800/70"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </section>
      <div>
        <ul>
          {isResponseValid && data.length === 0 && <EmptyState text="No repos found" />}
          {isResponseValid &&
            data.map((repo) => (
              <li
                key={repo.id}
                className="list-disc text-neutral-500 hover:text-indigo-500 hover:underline hover:underline-offset-1"
              >
                <a
                  target="_blank"
                  href={`https://github.com/${fromQuery.user}/${repo.name}`}
                  rel="noreferrer"
                >
                  {repo.full_name}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default ReposPage
