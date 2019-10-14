import axios from '@/libs/api.request'
import md5 from 'js-md5'
import moment from 'moment'
let Base64 = require('js-base64').Base64

export const login = ({ userName }) => {
  let dateObj = new Date()
  const timeStamp = moment(dateObj).format('YYYYMMDDHHmmss')
  // Authorization
  let Authorization = 'N00000042981:' + timeStamp
  Authorization = Base64.encode(Authorization)
  // sig
  let sig = 'N00000042981' + '306a1900-8351-11e9-be8e-d7c4eadf77ef' + timeStamp
  sig = md5(sig)
  sig = sig.toUpperCase()
  // 座席号
  let exten = '8000'
  // 密码
  let password = '7moor' + 'N00000042981' + exten + '123abc##8000' + timeStamp
  let passwordT = md5(password)
  passwordT = passwordT.toLowerCase()
  console.log('password::::' + passwordT)

  let data = {
    account: 'N00000042981',
    password: passwordT,
    exten: exten,
    extentype: 'Local',
    timeStamp: timeStamp,
    module: null
  }
  axios.request({
    url: 'https://apis.7moor.com/v20160818/sso/getToken/N00000042981?sig=' + sig,
    data,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': Authorization
    },
    method: 'post'
  }).then(rtnObj => {
    console.log(rtnObj)
    return axios.request({
      url: 'http://ykf.7moor.com/index/workbench?token=' + rtnObj.data.token,
      data,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': Authorization
      },
      method: 'get'
    })
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
