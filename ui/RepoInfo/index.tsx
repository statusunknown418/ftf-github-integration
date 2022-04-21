import { ISingleRepo } from '@/__generated__/ReposResponse.types'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import { useState } from 'react'
import CommitHistoryModal from '../CommitHistoryModal'

interface Props {
  repo: ISingleRepo
}

const RepoInfo: NextPage<Props> = ({ repo }) => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onModalClose = () => {
    setIsModalOpen(false)
    setSelectedRepo(null)
  }

  return (
    <section className="flex items-center gap-5">
      <span>
        <ChevronDoubleRightIcon className="w-5 h-5 text-indigo-500" />
      </span>
      <div
        className="list-disc text-neutral-500 hover:text-indigo-400 hover:underline hover:underline-offset-1"
        onClick={() => {
          setSelectedRepo(repo.name)
          setIsModalOpen((prev) => !prev)
        }}
      >
        <button>{repo.full_name}</button>
      </div>

      {isModalOpen && selectedRepo && (
        <CommitHistoryModal
          user={repo.owner.login}
          isOpen={isModalOpen}
          repoName={selectedRepo}
          onClose={onModalClose}
        />
      )}
    </section>
  )
}

export default RepoInfo
