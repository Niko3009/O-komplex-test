'use client'

import classNames from 'classnames'
import Button from '@/ui/Button'
import ListCard from './ListCard'
import { CardModalContext } from './ListCard/CardModal'
import { ListLoader } from './components'

import styles from './styles/ContainersTrade.module.scss'

export default function List({
  data,
  showMoreResults,
  isLoading,
  isFirstLoading,
  filters,
  pageName,
}) {
  const dataByPrice = data.byPrice
  const listByPrice = dataByPrice.list
  const pageByPrice = dataByPrice.page
  const pagesByPrice = dataByPrice.pages
  const isListByPriceEmpty = listByPrice.length === 0
  const isListByPriceLastPage = pageByPrice === pagesByPrice

  const dataOnRequest = data.onRequest
  const listOnRequest = dataOnRequest.list
  const pageOnRequest = dataOnRequest.page
  const pagesOnRequest = dataOnRequest.pages
  const isListOnRequestEmpty = listOnRequest.length === 0
  const isListOnRequestLastPage = pageOnRequest === pagesOnRequest

  const isGlobalLoading = isLoading
  const isTouchBlocked = isLoading

  return (
    <div
      className={classNames(styles.listBox, {
        [styles['touch-blocked']]: isTouchBlocked,
      })}
    >
      {isGlobalLoading && <ListLoader isActive={isGlobalLoading} />}

      {!isFirstLoading && (
        <>
          <div className={styles.subListBox}>
            <p className={styles.listTitle}>{'Оборудование по цене'}</p>
            <div className={styles.cardsBox}>
              <CardModalContext.Provider
                value={{
                  list: listByPrice,
                  page: pageByPrice,
                  pages: pagesByPrice,
                  onRequest: false,
                  filters,
                  pageName,
                }}
              >
                {listByPrice.map((cardData, i) => (
                  <ListCard
                    cardData={cardData}
                    filters={filters}
                    onRequest={false}
                    key={i}
                  />
                ))}
              </CardModalContext.Provider>
            </div>

            {!isListByPriceLastPage && (
              <Button
                styleClass={'grey'}
                onClick={() =>
                  showMoreResults({
                    currentPage: pageByPrice,
                    onRequest: false,
                  })
                }
              >
                {'Показать ещё 20 маршрутов'}
              </Button>
            )}
            {isListByPriceEmpty && <p>{'Ничего не найдено'}</p>}
          </div>

          <div className={styles.subListBox}>
            <p className={styles.listTitle}>{'Оборудование по запросу'}</p>
            <div className={styles.cardsBox}>
              <CardModalContext.Provider
                value={{
                  list: listOnRequest,
                  page: pageOnRequest,
                  pages: pagesOnRequest,
                  onRequest: true,
                  filters,
                  pageName,
                }}
              >
                {listOnRequest.map((cardData, i) => (
                  <ListCard
                    cardData={cardData}
                    filters={filters}
                    onRequest={true}
                    key={i}
                  />
                ))}
              </CardModalContext.Provider>
            </div>
            {!isListOnRequestLastPage && (
              <Button
                styleClass={'grey'}
                onClick={() =>
                  showMoreResults({
                    currentPage: pageOnRequest,
                    onRequest: true,
                  })
                }
              >
                {'Показать ещё 20 маршрутов'}
              </Button>
            )}
            {isListOnRequestEmpty && <p>{'Ничего не найдено'}</p>}
          </div>
        </>
      )}
    </div>
  )
}
