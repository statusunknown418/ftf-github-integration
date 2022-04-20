import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import fetcher from '@/lib/fetcher'
import BaseLayout from '@/ui/Layouts'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: '#222124',
            color: '#ffffff',
            borderRadius: '12px',
            border: '1px solid gray',
          },
        }}
      />

      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </SWRConfig>
  )
}

export default MyApp
