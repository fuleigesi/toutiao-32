import requset from '@/utils/request'

export const getMyChannel = () => {
  return requset({
    url: '/v1_0/user/channels'
  })
}
