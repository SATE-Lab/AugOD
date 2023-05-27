import axios from 'axios'

export function getFile(param) {
  return axios({
    url: 'http://127.0.0.1:8000/dashboard/getFile',
    method: 'get',
    params: param,
    responseType: 'blob'
    // headers: { 'Content-Type': 'application/json; application/octet-stream'}
  })
}
