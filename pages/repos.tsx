import isTypeOf from '@/lib/isTypeOf'
import ActionButton from '@/ui/ActionButton'
import { EmptyState } from '@/ui/EmptyState'
import { LoadingState } from '@/ui/LoadingState'
import RepoInfo from '@/ui/RepoInfo'
import { TReposResponse } from '@/__generated__/ReposResponse.types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { TReposQuery } from '.'

const ReposPage: NextPage = () => {
  const { query } = useRouter()

  const fromQuery: TReposQuery = query as TReposQuery

  const { data, error, isValidating, mutate } = useSWR<TReposResponse>(
    `/users/${fromQuery.user}/repos`
  )

  const isResponseValid = data && isTypeOf<TReposResponse>(data)

  const onRefreshClick = () => {
    mutate()
  }

  useEffect(() => {
    if (error) {
      toast.error('Unexpected Error')
    }
  }, [error])

  return (
    <div className="flex flex-col gap-8 justify-between px-5 py-2">
      <section className="flex gap-2 justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-xl">Click on any repo to see the commit history</h2>
          <p className="text-sm font-light">Scroll to see more!</p>
        </div>

        <ActionButton
          designation="primary"
          onClick={onRefreshClick}
          text={isValidating ? 'Refreshing...' : 'Refresh'}
        />
      </section>

      <section className="h-[35rem] overflow-y-scroll border border-neutral-600 p-1 rounded-md">
        {data && data.length === 0 && <EmptyState text="No repos found" />}

        {!data && !error && (
          <div className="flex items-center justify-center min-h-full">
            <LoadingState />
          </div>
        )}
        <ul className="flex flex-col gap-1">
          {isResponseValid &&
            data.map((repo) => (
              <li key={repo.id}>
                <RepoInfo repo={repo} />
              </li>
            ))}
        </ul>
      </section>
    </div>
  )
}

export default ReposPage
