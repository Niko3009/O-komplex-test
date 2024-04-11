'use client'

import { useSelector } from 'react-redux'
import { getModulesData, getOptionsData } from '@/store/selectors/page'
import { Text, RequisitesButton, LicenseButton } from './components'

import styles from './Requisites.module.scss'

import localDataFile from './data'
const localData = localDataFile?.data

export default function Requisites() {
  const modulesData = useSelector(getModulesData)
  const moduleData = modulesData?.['requisites']
  const img = moduleData?.img || localData?.img

  const optionsData = useSelector(getOptionsData)
  const documents = optionsData?.documents
  const requisites = documents?.requisites
  const license = documents?.license

  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={styles.innerBox}>
          <Text src={img?.src}>Реквизиты</Text>
          <div className={styles.buttonBox}>
            <div className={styles.buttonLayout}>
              <RequisitesButton
                onClick={() => window.open(requisites?.url, '_blank')}
              >
                Реквизиты
              </RequisitesButton>

              <LicenseButton
                onClick={() => window.open(license?.url, '_blank')}
              >
                Лицензия
              </LicenseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export { Requisites }
