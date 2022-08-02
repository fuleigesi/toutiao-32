import requset from '@/utils/request'

/**
 *
 * @param {*} channelId 频道的id
 * @param {*} timestamp 请求第一页数据时传入当前的时间戳 请求上一页数据时传入上一页的时间戳
 * @returns Promise
 */

export const getArticleAPI = (channelId, timestamp) => {
//   console.log(channelId, timestamp)
  return requset({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
