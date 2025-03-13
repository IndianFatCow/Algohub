import request from '@/utils/request'
export const useArticleStore = ()=>{
    const tokenStore = useTokenStore()
    return request.get('/article')
}
