<template>
    <div class="page-login">
        <!-- 头部x -->
        <router-link to="/home" tag="h1" class="iconfont icon-guanbi"></router-link>
        <!-- body -->
        <div class="login-part">
            <div class="title">
                <h1>{{ title }}</h1>
                <p v-show="desc">{{ desc }}</p>
            </div>
            <div class="inp-box">
                <input v-if="showNickname" type="text" v-model="nickname" placeholder="nickname">
                <input type="text" v-model="phone" placeholder="phone">
                <input type="password" v-model="password" placeholder="password">
                <router-link v-show="showForget" to="/forget">Forget your Password</router-link>
            </div>
            <div class="btns">
                <a href="javascript:;" @click="handleSubmit" class="login">{{ btnData.redText }}</a>
                <div class="line">
                    <span></span>
                    <span>or</span>
                    <span></span>
                </div>
                <router-link :to="btnData.blueLink" class="sign">{{ btnData.blueText }}</router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/base.scss';
.page-login {
    padding: 1rem;
    color: #fff;
    h1 {
        font-weight: normal;
        font-size: 22px;
        height: 40px;
    }
    .login-part {
        padding: 1.5rem 1rem 1rem 1.5rem;
        .title {
            margin-bottom: 20px;
            h1 {
                font-size: 20px;
                font-weight: 600;
            }
            p {
                padding-top: 10px;
            }
        }
        .inp-box {
            margin-bottom: 20px;
            input {
                border: 1px solid rgba(255, 255, 255, 0.2);
                outline: none;
                background: transparent;
                width: 100%;
                height: 34px;
                border-radius: 20px;
                padding-left: 20px;
                margin-bottom: 14px;
                color: #fff;
            }
            a{
                color: #fff;
                text-decoration: underline;
                padding-left: 16px;
                font-size: 12px;
            }
        }
    }
    .btns {
        a{
            display: block;
            width: 100%;
            height: 32px;
            text-align: center;
            line-height: 32px;
            border-radius: 20px;
            color: #fff;
        }
        .login{
            background: #E2B96F;
        }
        .sign{
            background: #63b9ff;
        }
        .line{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 6px 0;
            span:first-child,span:last-child{
                width: 80px;
                height: 1px;
                background: rgba(255, 255, 255, 0.4);
            }
            span:nth-child(2){
                margin: 0 14px;
            }
        }
    }
}
</style>
<script>
import { calRealLength } from '@/tools/validator'
export default {
    data() {
        return {
            nickname: '',
            phone: '',
            password: ''
        }
    },
    props: {
        showNickname: {
            type: Boolean,
            default: false
        },
        desc:{
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        showForget: {
            type: String,
            default: ''
        },
        btnData: {
            type: Object,
            default: () =>{ return {} }
        }
    },
    methods: {
        handleSubmit() {
            if (this.showNickname) {
                if (!this.nickname) {
                    return this.$toast('请输入昵称')
                }

                let pattern = new RegExp("[`~^*()|{}\\[\\].<>/~#￥……*（）——|{}【】‘；：”“']")
                if (pattern.test(this.nickname)) {
                    return this.$toast('存在特殊字符')
                }

                let reallength = calRealLength(this.nickname)
                if (reallength < 4 || reallength > 7) {
                    return this.$toast('昵称长度必须在4-7个字符之间')
                }
            }
            if (!this.phone) {
                return this.$toast('请输入手机号码')
            }
            if (!/^1[0-9]{10}$/.test(this.phone)) {
                return this.$toast('请输入正确的手机号码')
            }

            if (!this.password) {
                return this.$toast('请输入密码')
            }
            if (this.password.length < 6 || this.password.length > 12) {
                return this.$toast('请输入6-12位密码')
            }
            this.$emit('submitClick', this.$data)
        }
    }
}
</script>
