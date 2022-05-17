import request from "@/utils/request";
export default function getCaptcha(){
    return request({
        url: '/res/captcha',
        method: 'get',
      })
}