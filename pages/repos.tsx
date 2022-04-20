import { TReposResponse } from '@/__generated__/ReposResponse.types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const ReposPage: NextPage = () => {
  const { query } = useRouter()

  const { data, isValidating, error } = useSWR<TReposResponse>(
    `https://api.github.com/users/${query.user}/repos`
  )

  console.log({ data })

  if (isValidating) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error :(</p>
  }

  return (
    <div className="flex flex-col">
      <h1>Repos</h1>
      <div>
        <ul>
          {data &&
            data.map((repo) => (
              <li key={repo.id}>
                <a
                  target="_blank"
                  href={`https://github.com/AlvaroAquijeDiaz/${repo.name}`}
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
