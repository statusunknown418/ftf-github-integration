import clsx from 'clsx'
import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
  onClick?: () => void
  text?: string
  Icon?: ReactNode
  designation: 'primary' | 'secondary'
}

const ActionButton: NextPage<Props> = ({ Icon, onClick, designation, text }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'px-4 py-2 text-sm font-medium transition-colors duration-150',
        'rounded-md focus:outline-none max-w-sm',
        'flex items-center justify-between',
        designation === 'primary'
          ? [
              'text-indigo-900 bg-indigo-200 hover:bg-transparent border-2',
              'border-indigo-200 hover:text-indigo-200',
            ]
          : ['text-indigo-400 border-2 border-indigo-500 hover:bg-indigo-200 hover:text-indigo-900']
      )}
    >
      {Icon && <span>{Icon}</span>}
      {text}
    </button>
  )
}

export default ActionButton
