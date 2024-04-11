import PageDataProvider from '@/containers/PageDataLoader'
import { AnimationObserver } from '@/containers/Animation'
import Pattern from '@/main/patterns/LargePattern'
import HeroSection from '@/main/HeroSection'
import Services from '@/main/services/ProposedServices'
import About from '@/main/AboutCompany'
import Reasons from '@/main/Reasons'
import Map from '@/main/ContainersMap'
import Achievements from '@/main/Achievements'
import Banner from '@/main/banners/OfferBanner'
import Request from '@/main/Request'

import { storageUrl } from '@/global/data/api'
import { getSeo } from '@/global/data/seo'
import createRoute from '@/global/funcs/createRoute'

import styles from '@/app/layout.module.scss'

const pageName = 'home'

export default function () {
  const pageDataPath = createRoute([pageName])
  return (
    <div className={styles.modules}>
      <PageDataProvider path={pageDataPath}>
        <AnimationObserver once={1}>
          <Pattern />
          <HeroSection />
          <Services />
          <About />
          <Reasons />
          <Achievements />
          <Map />
          <Banner />
          <Request isExtended={true} pageName={pageName} />
        </AnimationObserver>
      </PageDataProvider>
    </div>
  )
}

export async function generateMetadata(props, parent) {
  const pageDataPath = createRoute([pageName])
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
