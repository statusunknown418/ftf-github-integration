import { TCommitsReponse } from '@/__generated__/CommitsReponse.types'
import { Dialog, Transition } from '@headlessui/react'
import { CodeIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import { Fragment, useEffect } from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import ActionButton from '../ActionButton'
import { LoadingState } from '../LoadingState'
import CommitInfo from './CommitInfo'

interface Props {
  isOpen: boolean
  onClose: () => void
  repoName: string
  user: string
}

const CommitHistoryModal: NextPage<Props> = ({ isOpen, onClose, repoName, user }) => {
  const { data, error, isValidating, mutate } = useSWR<TCommitsReponse>(
    `/repos/${user}/${repoName}/commits`
  )

  const onRefreshClick = () => {
    mutate()
  }

  useEffect(() => {
    if (error) {
      toast.error('Unexpected Error')
    }
  }, [error])

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900/10 backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="inline-block w-full max-w-2xl p-7 my-8 overflow-hidden text-left align-middle transition-all transform 
            bg-bg-primary border border-neutral-600 shadow-xl shadow-indigo-700/20 rounded-2xl"
            >
              <div className="flex flex-col gap-7">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Commit History | <span className="text-indigo-400 font-semibold">{repoName}</span>
                </Dialog.Title>

                <section className="mt-2 h-48 overflow-y-scroll flex flex-col gap-6 px-4">
                  {isValidating && (
                    <div className="flex items-center justify-center min-h-full animate-ping">
                      <LoadingState CustomIcon={<CodeIcon className="w-6 h-6" />} />
                    </div>
                  )}

                  {data &&
                    data.map((commit) => (
                      <div key={commit.sha}>
                        <CommitInfo commit={commit} />
                      </div>
                    ))}
                </section>

                <div className="mt-4 flex items-center justify-between">
                  <ActionButton designation="secondary" onClick={onRefreshClick} text="Refresh" />

                  <ActionButton designation="primary" onClick={onClose} text="Ok" />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CommitHistoryModal
