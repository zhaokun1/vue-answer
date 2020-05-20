<template>
    <div class="page-answer-detail">
        <!-- MessageBox -->
        
        <Header></Header>
        <h1 class="answer">问题详情</h1>
        <!-- {{answerData.title}} -->
        <br>
        <div class="ques-data">
            <h2>{{ answerData.title }}</h2>
            <div class="border"></div>
            <div class="data">
                <span>{{ answerData.from.nickname }} 提问于 {{ answerData.create_time }}</span>
                <span>{{ answerData.cate.cate_name }}</span>
            </div>
            <div class="border"></div>
            <p>问题补充：{{ answerData.description }}</p>
            <a v-if="answerData.nowUserId === answerData.answer_id" href="javascript:;" class="submit-btn" @click.prevent="modifyQues('question', answerData.title, answerData.description)">修改问题</a>
            <a v-else href="javascript:void(0)" class="submit-btn" @click.prevent="answerQues">我来回答</a>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/base.scss';
.page-answer-detail {
    color: #fff;
    .answer {
        position: absolute;
        top: 0%;
        left: 35%;
        text-align: center;
        font-size:14px;
        padding: 10px 20px 15px;
        color: #fff;
    }
    .ques-data {
        padding: 0 1rem;
        margin-bottom: 4rem;
        border-bottom: 1px solid $bdb;
        h2 {
            font-size: 1.1rem;
            margin-bottom: 0.8rem;
            line-height: 24px;
            color: #e7bb70;
            padding: 0.6rem;
            border-bottom: 1px solid $bdb;
        }
        .data {
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            margin-bottom: 0.8rem;
            padding: 0.3rem;
            border-bottom: 1px solid $bdb;
        }
        p {
            line-height: 20px;
        }
        .border {
            margin-bottom: 0.8rem;
        }
        a {
            text-decoration: none;
            display: block;
            color: #fff;
            background-color: $bdb;
            width: 70%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin: 30px auto;
        }
    }
}
</style>
<script>
import Header from '@/components/Header';
import { MessageBox } from 'mint-ui';
// import { checkToken } from '@/tools/validator';
export default {
    // 注册组件
    components: { Header },
    data() {
        return {
            showAnswerMessageBox: false,
            showPopup: false,
            content: "",
            bestAnswer: {},
            normalAnser: [],
            type: "",
            popTitle: "",
            popContent: "",
            answerData: {
                from: {},
                cate: {}
            },
            // 跳转页面
            // path: this.$router.push('/login')        
        }
    },
    methods: {
        // 检查文本
        checkToken() {
            let token = localStorage.getItem('token');
            if(!token) {
                // 提示内容
                MessageBox.confirm('', {
                    message: '登录后才能回答问题哦，老铁',
                    title: '温馨提示',
                    confirmButtonText: '去登陆'
                })
                // 确定按钮
                .then(() => {
                    // 跳转到登录页面
                    this.$router.push('/login');
                    // this.path
                })
                // 取消按钮
                .catch(() => {
                    console.log('已关闭')
                })
            }
        },
        // 修改问题描述
        modifyQues(type, title, desc) {
            // 数据驱动视图
            this.type = type;
            this.popTitle = title;
            this.popContent = desc;
            this.showPopup = true;
        },
        // 我来回答
        answerQues() {
            let val = this.checkToken();
            // let val = checkToken(this.path);
            // locationStorage没有token数据 没有登陆
            if(!val) {
                return;
            }
            // 有用户数据 显示回答页面*****
            this.showAnswerMessageBox = true;
            // 没有回复 *****

        }
    },
    // 组件创建完成
    created() {
        // 解构数据
        let { params } = this.$route
        // 请求数据
        this.$http.get('/data/answer/detail', { 
            params: { answer_id: params.id }
        })
            .then(({ data }) => {
                // 存储数据
                this.answerData = data.data
            })
    }
}
</script>