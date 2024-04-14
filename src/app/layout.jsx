import Header from '@/modules/Header'
import localFont from '@/global/fonts/localFont'

import '@/global/styles.scss'
import styles from './layout.module.scss'

export default function ({ children }) {
  return (
    <html lang="en" className={localFont.variable}>
      <body>
          <div id={'layout'} className={styles.layout}>
            <Header />
            <main className={styles.main}>{children}</main>
          </div>
      </body>
    </html>
  )
}
