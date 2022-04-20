import { EmojiSadIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import { ILoadingStateProps } from '../LoadingState'

interface Props extends ILoadingStateProps {
  text: string
}

export const EmptyState: NextPage<Props> = ({ CustomIcon, text }) => {
  return (
    <li className="text-center flex items-center justify-center gap-2">
      {CustomIcon ? CustomIcon : <EmojiSadIcon className="text-red-600/50 w-5 h-5" />}

      <p className="text-gray-500">{text}</p>
    </li>
  )
}
