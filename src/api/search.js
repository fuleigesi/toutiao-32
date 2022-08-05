import requset from '@/utils/request'

export const getSearch = (q) => {
  return requset({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
