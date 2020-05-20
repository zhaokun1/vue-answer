<template>
    <div class="page-login">
        <Login_sign
            title="Welcome Back" 
            :btnData='btnData'
            showForget='true'
            @submitClick='submitClick'
        ></Login_sign>
    </div>
</template>
<script>
import Login_sign from '@/components/Login_sign';
import { setLocalStorage } from '@/tools/validator'
export default {
    // 注册组件
    components: { Login_sign },
    data() {
        return {
            btnData: {
                redText: '登录',
                blueText: '注册',
                blueLink: '/register'
            }
        }
    },
    methods:{
        submitClick(data) {
            this.$http.post('/data/user/login', {
                params: {
                    phone: data.phone,
                    password: data.password
                }
            })
                .then(({ data }) => {
                    // 存储
                    setLocalStorage('token', data.token, 'string')
                    // 跳转到我的页面
                    this.$router.push('/my')
                })
        }
    }
}
</script>