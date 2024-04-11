'use client'

import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { getModulesData } from '@/store/selectors/page'
import Form from './Form'
import { Title, Pattern } from './components'

import styles from './styles/Request.module.scss'

import localDataFile from './data'
const localData = localDataFile?.data

export default function Request({
  pageData = {},
  isExtended = false,
  pageName = '',
}) {
  const moduleData = localData
  const title = pageData.title || moduleData.title
  const description = pageData.description || moduleData.description
  const successLogo = moduleData['success-logo']

  const modulesData = useSelector(getModulesData)
  const allServicesInit = modulesData?.['all-services']?.data || []
  const allServices = allServicesInit.map((data) => {
    return { id: data.id, title: data.title }
  })

  return (
    <div
      className={classNames(styles.module, 'request-form')}
      id="request-form"
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Title>
            <h2>{title}</h2>
            <p>{description}</p>
          </Title>
          <Form {...{ isExtended, allServices, successLogo, pageName }} />
          <Pattern />
        </div>
      </div>
    </div>
  )
}
export { Request }
