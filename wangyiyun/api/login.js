import request from '/utils/request'

// 歌曲
export function banner(data) {
  return request({
    url: '/banner',
    method: 'post',
    params: data
  })
}
// 发送验证码
export function sent(data) {
  return request({
    url: '/captcha/sent',
    method: 'post',
    params: data
  })
}
