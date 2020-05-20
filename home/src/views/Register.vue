<template>
    <div class="page-register">
        <!-- <h1>register page</h1> -->
        <Login_sign
            title="Sign up here" 
            desc='precious collection is waiting for you'
            :btnData='btnData'
            :showNickname='true'
            @submitClick='submitClick'
        >
        </Login_sign>
    </div>
</template>
<script>
import Login_sign from '@/components/Login_sign'
import { setLocalStorage } from '@/tools/validator'
export default {
    components: { Login_sign },
    data() {
        return {
            btnData: {
                redText: '注册',
                blueText: '登录',
                blueLink: '/login'
            },
        }
    },
    methods: {
        submitClick(data) {
            this.$http.post('/data/user/register', {
                params: {
                    nickname: data.nickname,
                    phone: data.phone,
                    password: data.password
                }
            })
                .then(({ data }) => {
                    setLocalStorage('token', data.token, 'string')
                    this.$router.push('/my')
                })
        }
    }
}
</script>