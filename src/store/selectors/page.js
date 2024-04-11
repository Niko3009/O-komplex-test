import pageSlice from '@/store/slices/page'

export const getModulesData = ({ [pageSlice.name]: data }) => {
  return data?.modules
}

export const getOptionsData = ({ [pageSlice.name]: data }) => {
  return data?.options
}
