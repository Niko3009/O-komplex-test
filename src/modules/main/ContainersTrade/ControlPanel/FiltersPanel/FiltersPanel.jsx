'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import useDebounce from '@/hooks/useDebounce'
import compareObjects from '@/global/funcs/compareObjects'
import Button from '@/ui/Button'
import { Section, Dropdown, LocationItem } from './components'
import { ContainerTypeBtn, ContainerQualBtn } from './components'
import { CostInput, CostSliderBar } from './components'
import { Context as ComponentContext } from './components'

import handleCostValue from './funcs/handleCostValue'
import handleLocsValue from './funcs/handleLocationsValue'
import { extractFiltersSettings } from './funcs/handleFiltersSetting'

import styles from './styles/FiltersPanel.module.scss'

export default function FiltersPanel({
  autoApprove,
  modalPanel,
  closeModal = () => {},
}) {
  const { filtersSetting, filtersControl } = useContext(FiltersPanelContext)
  const { initFilters } = useContext(FiltersPanelContext)
  const { tradeMode, isActiveMode } = useContext(FiltersPanelContext)
  const isRent = isActiveMode('rent')

  const settings = extractFiltersSettings(tradeMode, filtersSetting)
  const { maxCost, minCost, containerTypes, containerQuals } = settings
  const { availableLocs, availableLocsFrom, availableLocsTo } = settings

  const autoApprovalDelay = 1000
  const approveFilters = useDebounce(
    (filters) => filtersControl.updateFilters(filters),
    autoApprovalDelay,
    [filtersControl]
  )

  const [isInitialized, setInitialized] = useState(false)

  const initState = modalPanel ? filtersControl?.filters : initFilters
  const [filters, setFilters] = useState(structuredClone(initState))
  const areFiltersEqualToInitOnes = compareObjects(initFilters, filters)
  const resetFilters = () => setFilters(structuredClone(initFilters))
  const { locations, container, quality, cost } = filters

  const updateLocations = ({ location, checked, type = 'from' }) => {
    const props = { location, checked, locations, type }
    const newLocations = handleLocsValue(props)
    filters.locations = newLocations
    setFilters({ ...filters })
  }
  const updateСontainer = ({ container, num }) => {
    filters.container.type = container
    filters.container.num = num
    setFilters({ ...filters })
  }
  const updateQuality = ({ quality, num }) => {
    filters.quality.type = quality
    filters.quality.num = num
    setFilters({ ...filters })
  }
  const updateCost = ({ cost }) => {
    filters.cost = handleCostValue({ cost, maxCost, minCost })
    setFilters({ ...filters })
  }

  const control = {
    ...{ filters, setFilters },
    ...{ locations, updateLocations },
    ...{ container, updateСontainer },
    ...{ quality, updateQuality },
    ...{ cost, updateCost },
    ...{ minCost, maxCost },
  }

  useEffect(() => {
    if (!isInitialized) setInitialized(true)
    if (!modalPanel) setFilters(structuredClone(initFilters))
  }, [filtersSetting])

  useEffect(() => {
    if (isInitialized && autoApprove) approveFilters(filters)
  }, [isInitialized, filters, autoApprove])

  return (
    <ComponentContext.Provider value={control}>
      <div className={styles.filtersPanel}>
        <Section className={styles.modalTitle}>
          <h1>Фильтры</h1>
          <div className={styles.resetButtonBox}>
            {!areFiltersEqualToInitOnes && (
              <p className={styles.resetButton} onClick={() => resetFilters()}>
                Сбросить фильтры <span>×</span>
              </p>
            )}
          </div>
        </Section>

        <Section className={styles.locationSelects}>
          {isRent && (
            <>
              <Dropdown
                placeholder={'Локация выдачи'}
                name="from"
                checkedLocs={locations?.from || []}
              >
                {availableLocsFrom.map((location, i) => (
                  <LocationItem
                    type={'from'}
                    {...{ location }}
                    checkedLocs={locations?.from || []}
                    key={i}
                  />
                ))}
              </Dropdown>
              <Dropdown
                placeholder={'Локация сдачи'}
                name="to"
                checkedLocs={locations?.to || []}
              >
                {availableLocsTo.map((location, i) => (
                  <LocationItem
                    type={'to'}
                    {...{ location }}
                    checkedLocs={locations?.to || []}
                    key={i}
                  />
                ))}
              </Dropdown>
            </>
          )}
          {!isRent && (
            <>
              <Dropdown
                placeholder={'Локация'}
                name="from"
                checkedLocs={locations?.from || []}
              >
                {availableLocs.map((location, i) => (
                  <LocationItem
                    type={'from'}
                    {...{ location }}
                    checkedLocs={locations?.from || []}
                    key={i}
                  />
                ))}
              </Dropdown>
            </>
          )}
        </Section>

        <Section title="Тип контейнера" className={styles.contType}>
          <div className={styles.contTypeButtons}>
            <ContainerTypeBtn container={'all'} num={null}>
              {'Все'}
            </ContainerTypeBtn>
            <ContainerTypeBtn container={containerTypes[1]} num={1}>
              {containerTypes[1]}
            </ContainerTypeBtn>
            <ContainerTypeBtn container={containerTypes[2]} num={2}>
              {containerTypes[2]}
            </ContainerTypeBtn>
            <ContainerTypeBtn container={containerTypes[3]} num={3}>
              {containerTypes[3]}
            </ContainerTypeBtn>
          </div>
        </Section>

        {!isRent && (
          <Section title="Качество контейнера" className={styles.contQual}>
            <div className={styles.contQualButtons}>
              <ContainerQualBtn quality={'all'} num={null}>
                {'Все'}
              </ContainerQualBtn>
              <ContainerQualBtn quality={containerQuals[1]} num={1}>
                {containerQuals[1]}
              </ContainerQualBtn>
              <ContainerQualBtn quality={containerQuals[2]} num={2}>
                {containerQuals[2]}
              </ContainerQualBtn>
            </div>
          </Section>
        )}

        <Section title="Ставка" className={styles.cost}>
          <div className={styles.costInputsBox}>
            <CostInput type={'from'} placeholder={'от'} />
            <CostInput type={'to'} placeholder={'до'} />
            <CostSliderBar />
          </div>

          <p className={styles.explanationForPrice}>
            {'Стоимость рассчитывается по курсу ЦБ РФ'}
          </p>
        </Section>

        <Button
          styleClass={'blue'}
          className={styles.confirmButton}
          onClick={() => {
            approveFilters(filters)
            closeModal()
          }}
        >
          Применить
        </Button>
      </div>
    </ComponentContext.Provider>
  )
}

export const FiltersPanelContext = createContext()
