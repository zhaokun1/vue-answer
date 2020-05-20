<template>
    <div class="page-me">
        <div class="header">
            <span class="mine">我的</span>
        </div>
        <div class="my">
        <!-- 身份卡 -->
            <div class="card-box">
                <span>持卡人：{{ myIndexData.nickname }}</span>
                <span>出生日期：{{ myIndexData.create_time }}</span>
            </div>
        <!-- cell -->
            <div class="cell">
                <Cell v-for="item in cellList" :key="item.title" :title="item.title" :content='item.content' :icon='item.icon' :to='item.to'></Cell>
            </div>
        <!-- 退出登录 -->
            <a class="exit" href="javascript:;" @click.prevent='handleExitLogin'>退出登录</a>
        <!-- {{cellList}} -->
        </div>
    <Footer :current=3></Footer>
    </div>
</template>
<style lang="scss" scoped>
.page-me {
    color: #fff;
    .header {
        padding: 0.6rem;
        display: flex;
        justify-content: space-between;
        .mine {
            color: #fff;
            font-size: 18px;
            font-weight: bold;
        }
    }
    .my {
        position: fixed;
        top: 41px;
        left: 0;
        right: 0;
        bottom: 50px;
        .card-box {
            display: flex;
            flex-direction: column;
            height: 6rem;
            margin: 1rem 1rem 2rem;
            padding: 1rem;
            background: url("./bg-my.png") no-repeat;
            background-size: 100% 100%;
            box-shadow: 0px 0px 4px #fff;
            span {
                margin-bottom: 1rem;
            }
            span:last-child {
                font-size: 12px;
            }
        }
        .exit {
            display: block;
            width: 70%;
            height: 36px;
            line-height: 36px;
            text-align: center;
            margin: 20px auto 0;
            background-color: #2a2e38;
        }
    }
}
</style>
<script>
import Cell from '@/components/Cell';
import Footer from '@/components/Footer';
import { MessageBox } from 'mint-ui';
export default {
    // 注册组件
    components: { Cell, Footer },
    data() {
        return {
            myIndexData: {},
            cellList: [
                {
                    title: "个人名片",
                    content: "修改",
                    to: '/my/card',
                    icon: {
                        class: "icon-qiapian",
                        color: "#4AC49D"
                    }
                },
                {
                    title: "登录密码",
                    content: "修改",
                    to: '/forget',
                    icon: {
                        class: "icon-suo",
                        color: "#E2B96F"
                    }
                },
                {
                    title: "我的问题",
                    to: '/my/ques',
                    icon: {
                        class: "icon-wenda",
                        color: "#4AC49D"
                    }
                },
                {
                    title: "我的回答",
                    to: '/my/answer',
                    icon: {
                        class: "icon-wendazhuanqu",
                        color: "#E2B96F"
                    }
                },
                {
                    title: "我的评论",
                    to: '/my/reply',
                    icon: {
                        class: "icon-pinglun",
                        color: "#186EFE"
                    }
                }
            ]
        }
    },
    methods: {
        // 退出登录
        handleExitLogin() {
            MessageBox.confirm('', {
                message: '真的要离开嘛?',
                title: '温馨提示',
                confirmButtonText: '是的'
            })
            // 确定
            .then(() => {
                // 跳转到登录页面
                this.$router.push('/login')
            })
            // 取消
            .catch(() => console.log('已关闭'))
        }
    },
    // 组件创建完成
    created() {
        this.$http.get('/data/user/login') 
            .then(({ data }) => {
                // 存储数据
                this.myIndexData = data.data
            })
    }
}
</script>
