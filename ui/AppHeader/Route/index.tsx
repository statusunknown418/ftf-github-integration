import { NextPage } from 'next'
import Link, { LinkProps } from 'next/link'
import { ParsedUrlQueryInput } from 'querystring'
import { ReactNode } from 'react'
interface Props {
  Icon: ReactNode
  link?: string
  callback?: () => void
  className?: string
  text?: string
  query?: ParsedUrlQueryInput
}

export const Route: NextPage<Props> = ({ Icon, link, callback, className, text, query }) => {
  return (
    <div className={className} onClick={callback}>
      {callback && <div>{Icon}</div>}
      {link && (
        <Link
          href={{
            pathname: link,
            query,
          }}
          passHref
        >
          <div className={`flex items-center justify-center gap-2`}>
            <span>{Icon}</span>
            {text && <span>{text}</span>}
          </div>
        </Link>
      )}
    </div>
  )
}
