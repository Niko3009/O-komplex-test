import PageDataProvider from '@/containers/PageDataLoader'
import Pattern from '@/main/patterns/SmallPattern'
import Text from '@/main/Text'

import { storageUrl } from '@/global/data/api'
import { getSeo } from '@/global/data/seo'
import createRoute from '@/global/funcs/createRoute'

import styles from '@/app/layout.module.scss'

const pageName = 'news'

export default function ({ params }) {
  const { article } = params
  const slugName = article
  const pageDataPath = createRoute([pageName, slugName])
  return (
    <div className={styles.modules}>
      <PageDataProvider path={pageDataPath}>
        <Pattern />
        <Text />
      </PageDataProvider>
    </div>
  )
}

export async function generateMetadata({ params }, parent) {
  const { article } = params
  const slugName = article

  const pageDataPath = createRoute([pageName, slugName])
  const { seo, og } = await getSeo(pageDataPath)
  const imagePath = og?.image
  const image = imagePath ? createRoute([storageUrl, imagePath]) : null
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: og?.title,
    description: seo?.description,
    h1: seo?.h1,
    openGraph: {
      title: og?.title,
      description: og?.description,
      h1: og?.h1,
      images: [image, ...previousImages],
    },
  }
}
