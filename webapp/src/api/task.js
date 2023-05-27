import request from '@/utils/request'

export function getNames() {
  return request({
    url: '/dashboard/filenames',
    method: 'post'
  })
}

export function getPicNames(param) {
  return request({
    url: '/dashboard/picNames',
    method: 'post',
    params: param
  })
}

export function getRawPic(param) {
  return request({
    url: '/dashboard/getRawPic',
    method: 'post',
    params: param,
    responseType: 'arraybuffer'
  })
}

export function createTask(param) {
    return request({
        url: '/dashboard/createTask',
        method: 'post',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 20000,
    })
}

export function handlePic(param) {
    return request({
        url: '/dashboard/handlePic',
        method: 'post',
        data: param,
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        timeout: 9*60*1000,
    })
}

