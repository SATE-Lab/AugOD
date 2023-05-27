import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/dashboard/dataset',
    method: 'post',
    params: query
  })
}

export function getTask() {
  return request({
    url: '/dashboard/task',
    method: 'post'
  })
}

