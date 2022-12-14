import axios from 'axios'
// import { Notification, MessageBox, Message } from 'element-ui'
import errorCode from '/utils/request'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: 'http://localhost:3000',
  // 超时
  timeout: 10000
})
// request拦截器，用于加token
service.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  if(token){
    config.headers.common['Authorization'] = token;
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    const status = res.status;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default'] || res.error || res.data.res;
    //获取错误提示
    const ress = res.data.res;
    if (code === 401) {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => { 
        location.href = '/Login';
        localStorage.clear()
      })
    } else if (code === 500 || status ===500) {
      if(ress){
        Message({
          message: ress,
          type: 'error'
        })
      }else{
        Message({
          message: msg,
          type: 'error'
        })
      }
       
      return Promise.reject(new Error(msg))
    } else if (code !== 200 ) {
      if(ress){
        Notification.error({
          title: Notification.error({
          title: ress
        })
        })
      }else{
        Notification.error({
          title: msg
        })
      }
      
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

