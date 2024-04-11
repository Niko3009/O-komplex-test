'use client'

import { useState, useEffect, useContext } from 'react'
import classNames from 'classnames'
import useDebounce from '@/hooks/useDebounce'
import routes from '@/global/routes'
import useMediaQuery from '@/hooks/useMediaQuery'
import useRedirect from '@/hooks/useRedirect'
import Modal from '@/modules/Modal'
import Button from '@/ui/Button'
import FiltersPanel, { FiltersPanelContext } from './FiltersPanel'
import { Icon, TradeModeButton, FiltersPanelButton } from './components'
import { FiltersLoader } from './components'

import { getFiltersSettings } from './funcs'
import { getInitFilters } from './FiltersPanel/funcs/handleFiltersSetting'

import styles from './styles/ControlPanel.module.scss'

export default function ControlPanel({ filtersControl, loadDataExcel }) {
  const [tradeMode, setTradeMode] = useState('rent')
  const isActiveMode = (mode) => mode === tradeMode
  const updateTradeMode = (mode) => setTradeMode(mode)
  const activeTradeModeControl = { isActiveMode, updateTradeMode }

  const [filtersSetting, setFiltersSetting] = useState({})
  const initFilters = getInitFilters(tradeMode, filtersSetting)
  const updateFilters = filtersControl?.updateFilters
  const resetFilters = () =>
    updateFilters(getInitFilters(tradeMode, filtersSetting))

  const [isLoading, setLoading] = useState(false)

  const loadDelay = 500
  const loadFiltersSetting = useDebounce(
    async (tradeMode) => {
      try {
        const response = await getFiltersSettings(tradeMode)
        const newFiltersSetting = response || {}
        setFiltersSetting(newFiltersSetting)
        setLoading(false)
      } catch (error) {
        console.warn(error)
      }
    },
    loadDelay,
    []
  )

  const isDesktopMode = useMediaQuery('desktop')
  const redirect = useRedirect()

  useEffect(() => {
    setLoading(true)
    loadFiltersSetting(tradeMode)
  }, [tradeMode])

  useEffect(() => {
    resetFilters()
  }, [filtersSetting])

  // console.log(filtersControl)

  return (
    <FiltersPanelContext.Provider
      value={{
        tradeMode,
        isActiveMode,
        filtersSetting,
        filtersControl,
        initFilters,
        isDesktopMode,
        resetFilters,
      }}
    >
      <div className={styles.controlPanelBox}>
        <div className={styles.tradeModeButtons}>
          <TradeModeButton name="rent" control={activeTradeModeControl}>
            Аренда
          </TradeModeButton>
          <TradeModeButton name="sale" control={activeTradeModeControl}>
            Продажа
          </TradeModeButton>
        </div>

        <FiltersControlPanel {...{ isLoading }} />

        <Button
          styleClass={'grey'}
          onClick={() => redirect(routes.homepage + '#containers-map')}
        >
          <Icon src={'/svg/special/map.svg'} />
          На карте
        </Button>
        <Button styleClass={'grey'} onClick={() => loadDataExcel()}>
          Выгрузить в Excel
        </Button>
      </div>
    </FiltersPanelContext.Provider>
  )
}

export function FiltersControlPanel({ isLoading }) {
  const [isModalOpen, setModalOpen] = useState(false)

  const [modalControl, setModalControl] = useState({})
  const closeModal = modalControl?.closeModal

  const { isDesktopMode } = useContext(FiltersPanelContext)

  const isGlobalLoading = isLoading
  const isTouchBlocked = isLoading

  useEffect(() => {
    if (isDesktopMode) setModalOpen(false)
  }, [isDesktopMode, setModalOpen, closeModal])

  return (
    <div className={styles.filtersControl}>
      <div
        className={classNames(styles.desktopFiltersPanel, {
          [styles['touch-blocked']]: isTouchBlocked,
        })}
      >
        <FiltersPanel autoApprove={isDesktopMode} />
      </div>
      {isGlobalLoading && <FiltersLoader isActive={isGlobalLoading} />}

      <div className={styles.filtersPanelButton}>
        <FiltersPanelButton {...{ setModalOpen }}>
          <Icon src={'/svg/special/filter.svg'} />
          Фильтр
        </FiltersPanelButton>

        <Modal
          {...{ isModalOpen, setModalOpen }}
          callbackControl={(control) => setModalControl(control)}
        >
          <FiltersPanel
            autoApprove={false}
            modalPanel={true}
            {...{ closeModal }}
          />
        </Modal>
      </div>
    </div>
  )
}
