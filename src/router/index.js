//导入vue-router
import { createRouter, createWebHistory } from 'vue-router'
//导入组件
import LoginVue from '@/views/Login.vue'
import admin from '@/views/adminpage.vue'

import Articlecategoryvue from '@/views/admin/article/questionManage.vue'
// import ArticleManagevue from '@/views/admin/article/ArticleManage.vue'

// import userAvatarvue from '@/views/admin/UserAvatar.vue'
// import userInfovue from '@/views/admin/UserInfo.vue'
// import userResetpasswordvue from '@/views/admin/UserResetPassword.vue'
//admin页面的子页面
// import Articlecategoryvue from '@/views/admin/article/show.vue'//题目管理
import ArticleManagevue from '@/views/admin/article/show.vue'//文章管理
import userManage from '@/views/admin/article/show.vue'//用户管理

import userAvatarvue from '@/views/admin/article/show.vue'
import userInfovue from '@/views/admin/article/show.vue'
import userResetpasswordvue from '@/views/admin/article/show.vue'
//uesr页面和子页面
import userpage from '@/views/userpage.vue'
import homepage from '@/views/admin/article/show.vue'
import questionBank from '@/views/admin/article/show.vue'
import profile from '@/views/admin/article/show.vue'
import qa from '@/views/admin/article/show.vue'
import visualAlgo from '@/views/admin/article/show.vue'

//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },    
    { path: '/admin', component: admin,
        redirect:'/admin/question/category',//重定向
        children://配置子路由
        [   { path: '/admin/question/category', component: Articlecategoryvue },
            { path: '/admin/article/manage', component: ArticleManagevue },
            { path: '/admin/user/manage', component: userManage },
            { path: '/admin/user/avatar', component: userAvatarvue },
            { path: '/admin/user/info', component: userInfovue },
            {path: '/admin/user/repassword', component: userResetpasswordvue }
        ]

    },
    { path: '/', component: userpage,
        children://配置子路由
        [       {path: '/home', component: homepage},
                {path: '/question-bank', component: questionBank},
                {path: '/profile', component: profile},
                {path: '/qa', component: qa},
                {path: '/visual-algo', component: visualAlgo}      
        ]},
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});
export default router