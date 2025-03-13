import request from '@/utils/request'

// 获取文章分类列表
export function questionCategoryListService() {
    return request({
        url: '/question/category/list',
        method: 'get'
    });
}

// 添加文章分类
export function questionCategoryAddService(data) {
    const params = new URLSearchParams();
    for (let key in data) {
        params.append(key, data[key]);
    }
    return request.post('/question/category/add', params);
}

// 更新文章分类
export function questionCategoryUpdateService(data) {
    const params = new URLSearchParams();
    for (let key in data) {
        params.append(key, data[key]);
    }
    return request.put(`/question/category/update/${data.id}`, params);
}

// 删除文章分类
export function questionCategoryDeleteService(id) {
    return request({
        url: `/question/category/delete/${id}`,
        method: 'delete'
    });
}