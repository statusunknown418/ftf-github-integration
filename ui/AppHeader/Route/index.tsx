import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  name: string
  link: string
}

export const Route: NextPage<Props> = ({ name, link }) => {
  const { route } = useRouter()
  const isActive = route === link

  return (
    <Link href={link} passHref>
      <li
        className={`font-semibold rounded-md px-3 py-2 flex-grow flex justify-center ${
          isActive ? 'bg-cyan-600' : 'bg-transparent hover:ring-1 ring-cyan-600'
        } transition-all duration-150 cursor-pointer`}
      >
        {name}
      </li>
    </Link>
  )
}
