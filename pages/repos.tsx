import isTypeOf from '@/lib/isTypeOf'
import ActionButton from '@/ui/ActionButton'
import { EmptyState } from '@/ui/EmptyState'
import { LoadingState } from '@/ui/LoadingState'
import RepoInfo from '@/ui/RepoInfo'
import { TReposResponse } from '@/__generated__/ReposResponse.types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { TReposQuery } from '.'

const ReposPage: NextPage = () => {
  const { query } = useRouter()

  const fromQuery: TReposQuery = query as TReposQuery

  const { data, error, isValidating, mutate } = useSWR<TReposResponse>(
    `/users/${fromQuery.user}/repos`
  )

  const [filteredRepos, setFilteredRepos] = useState<TReposResponse>([] as TReposResponse)

  const [searchValue, setSearchValue] = useState('')

  const isResponseValid = filteredRepos && isTypeOf<TReposResponse>(filteredRepos)

  useEffect(() => {
    if (error) {
      toast.error('Unexpected Error')
    }
  }, [error, data])

  useEffect(() => {
    if (searchValue.length) {
      const filtered = filteredRepos?.filter(
        (repo) =>
          repo.name.includes(searchValue) || repo.name.substring(0, -1).includes(searchValue)
      )
      setFilteredRepos(filtered)
    }

    if (searchValue.length === 0 && data) {
      setFilteredRepos(data)
    }
  }, [searchValue, data, filteredRepos])

  const onRefreshClick = () => {
    mutate()
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-8 justify-between px-5 py-2">
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

      <input
        className="text-neutral-200 bg-bg-primary border border-neutral-500 rounded-md p-2 placeholder-neutral-500 
            focus:bg-neutral-700 transition-colors duration-150 text-sm focus:outline-none focus:ring focus:ring-indigo-600"
        placeholder="Search for a repo ..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <section className="h-[35rem] overflow-y-scroll border border-neutral-600 p-3 rounded-md">
        {data && filteredRepos.length === 0 && <EmptyState text="No repos found" />}

        {!data && !error && (
          <div className="flex items-center justify-center min-h-full">
            <LoadingState />
          </div>
        )}
        <ul className="flex flex-col gap-1 md:gap-3">
          {isResponseValid &&
            filteredRepos.map((repo) => (
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
