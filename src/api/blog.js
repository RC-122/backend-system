import request from "@/utils/request";

/**
 * 请求文章
 * @param {*} pagg 页码
 * @param {*} limit 单页显示数
 */
export function findBlog(page = 1, limit = 10) {
    return request({
         url:"/api/blog",
         method:"get",
         params:{
             page,
             limit,
         }
    })
}

/**
 * 删除
 * @param {*} id 
 * @returns 
 */
export function delBlog(id){
    return request({
        url:`/api/blog/${id}`,
        method:"delete",
    })
}

/**
 * 添加
 * @param {*} data 
 * @returns 
 */
export function addBlog(data){
    return request({
        url:"/api/blog",
        method:"post",
        data,
    })
}

/**
 * 修改
 * @param {*} id 
 * @returns 
 */
export function editBlog(blogInfo){
    return request({
        url:`/api/blog/${blogInfo.id}`,
        method:"put",
        data:blogInfo.data,
    })
}

/**
 * 根据id查找到文章回填到修改文章的页面上
 * @param {*} id 
 * @returns 
 */
export function getOneBlog(id){
    return request({
        url:`/api/blog/${id}`,
        method:"get",
    })
}