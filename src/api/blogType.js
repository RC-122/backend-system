import request from "@/utils/request";


/**
 *  获取文章分类
 * @returns 
 */
export function getBlogType(){
    return request.get("/api/blogtype");
};

/**
 * 修改文章
 * @param {*} editInfo 
 * @returns 
 */
export function updateBlogType(editInfo){
    return request({
        url:`/api/blogtype/${editInfo.id}`,
        method:"put",
        data:editInfo.data,
    })
}

/**
 * 添加文章分类
 * @param {*} data 
 * @returns 
 */
export function addBlogType(data){
    return request({
        url:"/api/blogtype",
        method:"post",
        data
    })
};


/**
 * 获取一个分类
 * @param {*} id 
 * @returns 
 */
export function getOneBlogType(id){
    return request({
        url:`/api/blogtype/${id}`,
        method:"get",
    });
};

/**
 * 删除分类
 * @param {*} id 
 * @returns 
 */
export function delBlogType(id){
    return request.delete(`/api/blogtype/${id}`)
}