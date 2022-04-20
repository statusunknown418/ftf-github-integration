import { NextPage } from 'next'
import Image from 'next/image'

interface Props {}

export const AppFooter: NextPage<Props> = () => {
  return (
    <footer className="flex flex-col items-center justify-center bg-neutral-800 px-3 py-2 rounded-md">
      <a
        className="font-light p-1"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Next.js
      </a>
    </footer>
  )
}
