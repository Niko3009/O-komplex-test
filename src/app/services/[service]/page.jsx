import PageDataProvider from '@/containers/PageDataLoader'
import { AnimationObserver } from '@/containers/Animation'
import Pattern from '@/main/patterns/SmallPattern'
import Heading from '@/main/Heading'
import PhotoLine from '@/main/PhotoLine'
import Request from '@/main/Request'
import AboutService from '@/main/AboutService'
// import FAQ from '@/main/FAQ'

import { storageUrl } from '@/global/data/api'
import { getSeo } from '@/global/data/seo'
import createRoute from '@/global/funcs/createRoute'

import styles from '@/app/layout.module.scss'

const pageName = 'services'

export default function ({ params }) {
  const { service } = params
  const slugName = service
  const pageDataPath = createRoute([pageName, slugName])
  return (
    <div className={styles.modules}>
      <PageDataProvider path={pageDataPath}>
        <AnimationObserver isDisable={true}>
          <Pattern />
          <Heading />
          <PhotoLine />
          <AboutService />
          <Request pageName={pageName} />
          {/* <FAQ /> */}
        </AnimationObserver>
      </PageDataProvider>
    </div>
  )
}

export async function generateMetadata({ params }, parent) {
  const { service } = params
  const slugName = service

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
