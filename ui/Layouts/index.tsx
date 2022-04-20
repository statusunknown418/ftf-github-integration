import { NextPage } from 'next'
import { ReactNode } from 'react'
import { AppFooter } from '../AppFooter'
import { AppHeader } from '../AppHeader'

interface Props {
  children: ReactNode
}

const BaseLayout: NextPage<Props> = ({ children }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6">
        <main className="grid grid-cols-1 md:col-start-2 md:col-span-4 border min-h-screen">
          <div>
            <AppHeader />
          </div>

          <div>{children}</div>

          <div className="mt-auto">
            <AppFooter />
          </div>
        </main>
      </div>
    </div>
  )
}

export default BaseLayout
