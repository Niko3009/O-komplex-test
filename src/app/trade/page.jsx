import PageDataProvider from '@/containers/PageDataLoader'
import { AnimationObserver } from '@/containers/Animation'
import Pattern from '@/main/patterns/SmallPattern'
import Heading from '@/main/Heading'
import Request from '@/main/Request'
import ContainersTrade from '@/modules/main/ContainersTrade'

import { storageUrl } from '@/global/data/api'
import { getSeo } from '@/global/data/seo'
import createRoute from '@/global/funcs/createRoute'

import styles from '@/app/layout.module.scss'

import localDataFile from './data'
const localData = localDataFile?.data

const pageName = 'trade'

export default function () {
  const { modules } = localData
  const { ['request-form']: request } = modules
  const pageDataPath = createRoute([pageName])
  return (
    <div className={styles.modules}>
      <PageDataProvider path={pageDataPath}>
        <AnimationObserver isDisable={true}>
          <Pattern />
          <Heading />
          <ContainersTrade pageName={pageName} />
          <Request pageData={request.data} pageName={pageName} />
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
