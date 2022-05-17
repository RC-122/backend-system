import request from "@/utils/request";

export function getSetting(){
    return request.get("/api/setting")
}


export function setSetting(data){
    return request({
        url:"/api/setting",
        method:"put",
        data
    })
}