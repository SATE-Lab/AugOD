import request from '../utils/request';

export function uploadInfo(param) {
    return request({
        url: '/dashboard/upload',
        method: 'post',
        data: param,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      timeout: 20000,
    })
}
