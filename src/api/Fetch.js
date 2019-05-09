import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.BASE_API : '/',
  // transformRequest: [function (data) {
  //   return Qs.stringify(data)
  // }],
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Unif-Subsystem-Code': '03'// 系统资源cod
  },
  timeout: 8000
})
// request拦截器
service.interceptors.request.use((config) => {
  // 需要在请求发出前做的全局处理逻辑可以添加在这里
  config.url = config.url
  config.headers['Unif-Auth-Code'] = sessionStorage.getItem('authCode') ? sessionStorage.getItem('authCode') : ''
}, (error) => {
  // 可以在这里统一处理请求错误
  Promise.reject(error);
})
var u = navigator.userAgent
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

// respone拦截器
service.interceptors.response.use((response) => {
  if (response.status === 200) {
    // 可以在这里统一处理响应错误
    if (response.data && response.data.code === '0002') {
      if (sessionStorage.setItem) {
        sessionStorage.setItem('authCode', '')
        sessionStorage.setItem('employeeCode', '')
        sessionStorage.setItem('sectionId', '');
      }

      if (isAndroid) {
        // AuthCode.exitLogin('登录信息过期');
      }
      if (isiOS) {
        // WebViewJavascriptBridge.callHandler('exitLogin');
      }
    } else if (response.data.code === '0003') {
      if (sessionStorage.setItem) {
        sessionStorage.setItem('authCode', '');
        sessionStorage.setItem('employeeCode', '');
        sessionStorage.setItem('sectionId', '');
      }
      if (isAndroid) {
        // AuthCode.exitLogin('异地登录被挤出');
      }
      if (isiOS) {
        // WebViewJavascriptBridge.callHandler('exitLogin');
      }
    } else {
      return response.data;
    }
  }
}, (error) => {
  // 可以在这里统一处理响应错误
  return Promise.reject(error);
});

export default service;
