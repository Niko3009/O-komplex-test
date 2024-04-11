'use client'

import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'

export default function Provider({ Context, moduleName, children }) {
  const modulesData = useSelector(getModulesData)
  const moduleData = modulesData?.[moduleName]?.data || {}
  // if (!!moduleData) console.log(moduleData)
  return <Context.Provider value={moduleData}>{children}</Context.Provider>
}
export { Provider }
