<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(true)//true默认显示注册

// 表单引用
const formref = ref(null)
//用于注册的数据模型
const registerData = ref({
    username: '',
    password: '',
    rePassword: ''})
const checkPassword =(rule,value,callback) =>{
    if(value=='')callback("请输入确认密码")
    else if(value !=registerData.value.password)callback("请确保两次密码相同")
    else callback()
}
//注册表单校验模型
const rules = {
    username:[
        {
            required: true,message: "用户名不能为空",trigger:'blur'         
        },
        {
            max:16,min:5,message: "请输入5-16位字符",trigger:'blur'
        }
    ],
    password:[{
            required: true,message: "密码不能为空",trigger:'blur'         
        },
        {
            max:16,min:5,message: "请输入5-16位字符",trigger:'blur'
        }],
    rePassword:[
        {validator:checkPassword ,trigger:'blur'}
    ]
}
//调用后台接口,完成注册
import { userRegisterService, userLoginService} from '@/api/user.js'
import { el } from 'element-plus/es/locales.mjs'
//验证注册是否成功
const register = async () =>{
    // 触发校验
    const valid = await formref.value.validate()
    if (!valid) {
        return
    }
    let result = await userRegisterService(registerData.value);
    ElMessage.success(result.msg?result.msg:"注册成功")
    isRegister.value = false
}
import { useRouter } from 'vue-router'
const router = useRouter()
// import { useTokenStore } from '@/stores/token.js'//token存储
// const tokenStore = useTokenStore()
import { useAuthStore } from '@/stores/store.js'
const AuthStore = useAuthStore()
//Login函数
const login = async () =>{
    // 触发校验
    const valid = await formref.value.validate()
    if (!valid) {
        return
    }
    //存储 Basic Auth 信息**
    AuthStore.setCredentials({
        username: registerData.value.username,
        password: registerData.value.password
    });
    let result = await userLoginService(registerData.value);
    ElMessage.success(result.msg?result.msg:"登录成功")


    //跳转到首页
    // if(result.status == 200){//管理员登录
    //     router.push('/admin')
    // }
    router.push('/')//普通用户登录
}
//清空表单
const clearForm = () => {
    registerData.value = {
        username: '',
        password: '',
        rePassword: ''
    }
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="formref" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.rePassword" show-password></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" @click="register()" auto-insert-space>
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearForm()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="formref" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login()">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click.prevent="isRegister = true;clearForm()">
                        点击注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
            background: url('@/assets/algo_logo.webp') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>