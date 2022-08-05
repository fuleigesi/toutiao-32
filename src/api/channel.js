import requset from '@/utils/request'
import storage from '@/utils/storage'
export const getMyChannel = () => {
  return requset({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有平道
 *  @return Promse
 */

export const getAllChannels = () =>
  requset({
    url: '/v1_0/channels'
  })

/**
 * 删除用户频道
 * @param {*} target 频道的id
 * @returns Promise
 */
export const delChannel = (target) => {
  return requset({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addChannel = (id, seq) => {
  return requset({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
const HEIMA_TOUTIAO_CHANNELSTOLOCAL = 'HEIMA_TOUTIAO_CHANNELSTOLOCAL'
export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_CHANNELSTOLOCAL, myChannels)
}
export const getMyChannelsToLocal = () => {
  return storage.get(HEIMA_TOUTIAO_CHANNELSTOLOCAL)
}
