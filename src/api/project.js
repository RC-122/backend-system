import request from "@/utils/request";

 export function getProject(){
     return request.get("/api/project");
 }

 export function addProject(data){
    return request({
        url:"/api/project",
        method:"post",
        data
    })
 }

 export function editProject(id,data){
     return request({
         url:`/api/project/${id}`,
         method:"put",
         data
     })
 }

 export function delProject(id){
     return request({
         url:`/api/project/${id}`,
         method:"delete"
     })
 }