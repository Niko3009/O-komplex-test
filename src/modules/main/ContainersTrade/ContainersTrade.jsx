'use client'

import { useState, useEffect } from 'react'
import useDebounce from '@/hooks/useDebounce'
import ControlPanel from './ControlPanel'
import List from './List'

import getDataOnline from './funcs/getDataOnline'
import getDataExcel from './funcs/getDataExcel'

import styles from './styles/ContainersTrade.module.scss'

export default function ContainersTrade({ pageName }) {
  const initData = { byPrice: null, onRequest: null }
  initData.byPrice = { list: [], page: 0, pages: 0 }
  initData.onRequest = { list: [], page: 0, pages: 0 }
  const [data, setData] = useState(initData)
  const newData = structuredClone(data)

  const [filters, setFilters] = useState({})
  const updateFilters = (newFilters) => setFilters(newFilters)
  const filtersControl = { filters, updateFilters }

  const [isLoading, setLoading] = useState(false)
  const [isFirstLoading, setFirstLoading] = useState(true)

  const loadDelay = 1000
  const loadDataOnline = useDebounce(
    async (filters) => {
      try {
        newData.byPrice = await getDataOnline(filters, false)
        newData.onRequest = await getDataOnline(filters, true)
        setLoading(false)
        setData(newData)
        if (isFirstLoading) setFirstLoading(false)
      } catch (error) {
        console.warn(error)
      }
    },
    loadDelay,
    []
  )
  const showMoreResults = useDebounce(
    async ({ currentPage, onRequest }) => {
      const newPage = currentPage + 1
      const response = await getDataOnline(filters, onRequest, newPage)
      const { page, pages } = response

      const subDataKey = !onRequest ? 'byPrice' : 'onRequest'
      const subData = newData[subDataKey]
      const list = [...subData.list, ...response.list]
      newData[subDataKey] = { page, pages, list }
      setData(newData)
    },
    loadDelay,
    [filters, data, newData]
  )
  const loadDataExcel = useDebounce(
    async () => {
      try {
        const { status, file } = await getDataExcel(filters)
        if (status) window.open(file, '_blank')
      } catch (error) {
        console.warn(error)
      }
    },
    loadDelay,
    [filters]
  )

  useEffect(() => {
    const isFiltersReady = filters?.mode
    if (isFiltersReady) {
      setLoading(true)
      loadDataOnline(filters)
    }
  }, [filters])

  return (
    <div className={styles.module}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <ControlPanel {...{ filtersControl, loadDataExcel }} />
          <List
            {...{
              data,
              showMoreResults,
              isLoading,
              isFirstLoading,
              filters,
              pageName,
            }}
          />
        </div>
      </div>
    </div>
  )
}
export { ContainersTrade }
