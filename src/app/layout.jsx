import Header from '@/modules/Header'
import Footer from '@/modules/Footer'
import StoreProvider from '@/store/Provider'
import GothamPro from '@/global/fonts/GothamPro'

import '@/global/styles.scss'
import styles from './layout.module.scss'

export default function ({ children }) {
  return (
    <html lang="en" className={GothamPro.variable}>
      <body>
        <StoreProvider>
          <div id={'global-layout'} className={styles.layout}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'ANCHENG International Logistics',
  description: 'App for Zhendong',
  metadataBase: new URL('https://zhendong.rgtest.ru'),
}
