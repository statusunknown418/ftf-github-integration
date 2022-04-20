import { ChipIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import { ReactNode } from 'react'

export interface ILoadingStateProps {
  CustomIcon?: ReactNode
}

export const LoadingState: NextPage<ILoadingStateProps> = ({ CustomIcon }) => {
  return (
    <div className="flex items-center justify-center">
      {CustomIcon ? CustomIcon : <ChipIcon className="text-app-primary w-10 h-10 animate-spin" />}
    </div>
  )
}
