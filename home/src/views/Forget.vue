<template>
    <div class="page-forget">
        <Header></Header>
        <h1 class="modify-password">修改密码</h1>
        <div class="inp-box">
            <mt-field
                label="手机号"
                v-model="phone"
                :border='false'
                placeholder="请输入您的手机号"
            >
            </mt-field>
            <div class="border"></div>
            <mt-field
                label="新密码"
                type="password"
                v-model="password"
                :border='false'
                placeholder="请输入要更改的手机号"
            >
            </mt-field>
            <div class="border"></div>
        </div>
        <a href="javascript;;" class="submit-btn" @click.prevent='handleSubmitClick'>确认修改</a>
    </div>
</template>
<style lang="scss" scoped>
@import '@/base.scss';
.page-forget {
    color: #fff;
    .modify-password {
        position: absolute;
        top: 0%;
        left: 35%;
        text-align: center;
        font-size:14px;
        padding: 10px 20px 15px;
        color: #fff;
    }
    .inp-box,
    /deep/.mint-field,
    /deep/.mint-field-core {
        color: #fff;
        font-size: 14px;
        background-color: transparent;
    }
    /deep/.mint-cell-text {
        font-size: 14px;
    }
    .border {
        border-bottom: 1px solid $bdb;
    }
    .submit-btn {
        display: block;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        width: 80%;
        background-color: $bdb;
        margin: 1.5rem auto;
    }
}
</style>
<script>
import Header from '@/components/Header';
import { MessageBox } from 'mint-ui';
export default {
    components: { Header },
    data() {
        return {
            phone: "",
            password: ""
        }
    },
    methods: {
        handleSubmitClick() {
            let phone = this.phone;
            let password = this.password
            if (!this.phone) {
                return this.$toast("请输入手机号码");
            }
            if (!/^1[0-9]{10}$/.test(this.phone)) {
                return this.$toast("请输入正确的手机号码");
            }

            if (!this.password) {
                return this.$toast("请输入密码");
            }
            if (this.password.length < 6 || this.password.length > 12) {
                return this.$toast("请输入6-12位密码");
            }
            this.$http.post('/data/user/modifyPassword', {
                params: {
                    phone,
                    password
                }
            })
                .then(() => {
                    MessageBox.alert('', {
                        title: '温馨提示',
                        message: '您的密码已修改，需要重新登录！'
                    })
                })
                .then(() => {
                    localStorage.setItem('token', '')
                    this.$router.push('/login')
                })
        }
    }
}
</script>