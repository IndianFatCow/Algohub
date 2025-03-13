//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
// import { useTokenStore } from '@/stores/token';
import { useAuthStore } from '@/stores/store.js'
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})

//导入router
import router from '@/router';

//添加响应拦截器
instance.interceptors.response.use(//返回数据后触发
    result=>{
        if(result.status === 200){
            return result.data;
        }
        // alert(result.msg?result.msg:'服务异常'+result.msg);
        ElMessage.error(result.msg?result.msg:'后台服务异常');
        
        return Promise.reject(result.data);//异步的状态转化成失败的状态
    },
    err=>{
        //判断错误的状态码
        if(err.response.status === 401){
            //
            const authStore = useAuthStore()
            authStore.clearCredentials() // 清除 Basic Auth
            ElMessage.error('认证失败，请重新登录')
            //跳转到登录页面
            router.push('/login');
        }else if(err.response.status === 403){
            ElMessage.error('没有权限');
        }else{
            ElMessage.error('请求失败');   
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

//添加请求拦截器
instance.interceptors.request.use(//请求前触发
    config=>{//请求前的拦截
        //获取token
        const authStore = useAuthStore()
        const authHeader = authStore.getAuthHeader(); // 调用 getAuthHeader 方法
        if (authHeader) {
            config.headers.Authorization = authHeader; // 设置请求头
        }
        //  输出日志，检查 Authorization 是否正确**
        console.log('请求头:', config.headers);
        return config;
    },
    err=>{
        return Promise.reject(err);
    }
)
export default instance;