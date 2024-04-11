'use client'

import { useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { OuterContext as AnimationContext } from '@/containers/Animation'
import { useGetPageDataQuery } from '@/store/api/page'
import { setModulesData } from '@/store/slices/page'
import Cover from '@/containers/CoverBox'
import Loader from '@/ui/Loader'

export default function PageDataProvider({ path, children }) {
  const { data, isLoading, error } = useGetPageDataQuery({ path })

  const modules = data?.['data']?.['modules']
  const isDataLoaded = !isLoading && !error

  const dispatch = useDispatch()

  useEffect(() => {
    const action = setModulesData(modules)
    if (modules) dispatch(action)
    // if (isDataLoaded) console.log(modules)
  })

  return (
    <AnimationContext.Provider value={{ isDataLoaded }}>
      <Fragment>
        <Cover isHidden={!isDataLoaded} isSmoothlyTransition={true}>
          {children}
        </Cover>
        <Cover isCovered={isDataLoaded}>
          <Loader isActive={!isDataLoaded} position={'fixed'} />
        </Cover>
      </Fragment>
    </AnimationContext.Provider>
  )
}
export { PageDataProvider }

// import { getSeo } from '@/global/data/seo'
// import { storageUrl } from '@/global/data/api'
// import createRoute from '@/global/funcs/createRoute'
// async function get() {
//   const pageDataPath = createRoute(['services'])
//   const { og } = await getSeo(pageDataPath)
//   const imagePath = og?.image
//   const image = imagePath ? createRoute([storageUrl, imagePath]) : null
//   console.log(image)
// }
