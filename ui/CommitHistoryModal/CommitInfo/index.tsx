import { ISingleCommit } from '@/__generated__/CommitsReponse.types'
import { ArrowCircleRightIcon, UserIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {
  commit: ISingleCommit
}

const CommitInfo: NextPage<Props> = ({ commit }) => {
  return (
    <div key={commit.sha} className="flex flex-col relative items-start gap-1">
      <Link href={commit.commit.url} passHref>
        <div className="flex items-center gap-1 text-neutral-500 hover:text-blue-500 hover:underline cursor-pointer">
          <ArrowCircleRightIcon className="w-3 h-3 -ml-4" />
          <div className="text-xs">
            Commit on: {new Date(commit.commit.author.date).toDateString()}
          </div>
        </div>
      </Link>

      <div className="flex w-full justify-between items-center gap-2">
        <h2 className="font-semibold">{commit.commit.message}</h2>
      </div>

      <p className="flex items-center gap-1">
        <UserIcon className="w-3 h-3 text-indigo-300" />
        <p className="text-sm font-light">{commit.commit.author.name}</p>
      </p>
    </div>
  )
}

export default CommitInfo
