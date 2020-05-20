<template>
    <div class="page-home">
        <div class="scroll">
            <!-- 轮播图 -->
            <mt-swipe 
                style="height: 200px" 
                :show-indicators="true" 
                :auto="3000"
            >
                <mt-swipe-item v-for="item in slideList" :key="item._id">
                    <img :src="item.img" alt="轮播图">
                </mt-swipe-item>
            </mt-swipe>
            <!-- {{noticeData}} -->
            <!-- 公告栏 -->
            <div class="notice">
                <i class="iconfont icon-laba"></i>
                <!-- 点击可以查看详情 或者点击更多 进入公告页面 再进入详情也是可以的 -->
                <div class="title" v-if="NoticeData">
                    <router-link v-for="item in NoticeData" :key="item.notice_id" :to="'/home_notice_detail/' + item.notice_id">{{ item.title }}</router-link>
                </div>
                <router-link class="more" to="/home_notice">更多</router-link>
            </div>
            <!-- 注册人数， 问答条数， 累计解决问题 -->
            <div class="intro">
                <div class="typeNum">
                    <p class="intro-num">注册总人数</p>
                    <p class="num">
                        <span class="total">{{ userNum }}</span>
                        <span class="intro-total">人</span>
                    </p>
                </div>
                <div class="typeNum">
                    <p class="intro-num">问答条数</p>
                    <p class="num">
                        <span class="total">{{ quesNum }}</span>
                        <span class="intro-total">条</span>
                    </p>
                </div>
                <div class="typeNum">
                    <p class="intro-num">累计解决问题</p>
                    <p class="num">
                        <span class="total">{{ solveNum }}</span>
                        <span class="intro-total">个</span>
                    </p>
                </div>
            </div>
            <div class="bdb"></div>
            <!-- 最新问题 -->
            <div class="new-ques">
                <div class="new-ques-title">最新问题</div>
                <!-- 问题 -->
                <ul class="ques-list">
                    <router-link tag="li" :to="`/answer_detail/${item.question_id}`" v-for="item in quesList" :key="item.question_id">
                        <img :src="item.src" alt="头像" width="40" height="40">
                        <div class="ques-intro">
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.description | descFilter }}</p>
                        </div>
                    </router-link>
                </ul>
            </div>
        </div>
        <!-- 尾部 -->
        <Footer></Footer>
    </div>
</template>
<style lang="scss">
@import '@/base.scss';
.page-home {
    // height: 100%;
    .scroll {
        // 公告
        .notice {
            padding: 0.625rem;
            height: 1.875rem;
            line-height: 2.5rem;
            color: #fff;
            display: flex;
            border-bottom: 1px solid $bdb;
            i {
                color: $sel;
                margin-right: 0.625rem;
                font-size: 1.25rem;
            }
            .title {
                color: #fff;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            a {
                text-decoration: none;
                color: #fff;
            }
        }
        // 注册人数， 问答条数， 累计解决问题
        .intro {
            padding: 0.625rem 1.25rem 1.25rem;
            display: flex;
            color: #fff;
            .typeNum {
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: (100%/3);
                .intro-num {
                    margin-bottom: 0.625rem;
                }
                .num {
                    background-color: rgba(1, 187, 132, .2);
                    text-align: center;
                    width: (100%/2);
                    .total {
                    font-size: 25px;
                    }
                    .intro-total {
                        font-size: 16px;
                    }
                }
                &:first-child {
                    .num {
                        margin: 0 0.625rem;
                        .total,
                        .intro-total {
                            color: #01BB84;
                        }
                    }
                }
                &:nth-child(2) {
                    .num {
                        margin: 0 0.43rem;
                        .total,
                        .intro-total {
                            color: #01BB84;
                        }
                    }
                    
                }
                &:last-child {
                    .num {
                        margin: 0 1.25rem;
                        .total,
                        .intro-total {
                            color: #F78A62;
                        }
                    }
                }
                
                
            }
        }
        .bdb {
            border-bottom: 1px solid $bdb;
        }
        // 最新问题
        .new-ques {
            .new-ques-title {
                border-bottom: 1px solid $bdb;
                color: $sel;
                padding: 0.625rem 1.25rem 1rem;
                height: 3.125rem;
                line-height: 5;
            }
            .ques-list {
                height: 280px;
                overflow-y: scroll;
                margin-bottom: 1.25rem;
                li {
                    padding: 0.625rem;
                    display: flex;
                    img {
                        // 不缩小比例
                        flex-shrink: 0;
                        margin-right: 0.6rem;
                    }
                    .ques-intro {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        h3 {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        p {
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 12px;
                            opacity: .8;
                        }
                    }
                }
            }
        }
    }

}

</style>
<style lang="scss">
// 轮播图
@import '@/base.scss';
.mint-swipe {
    .mint-swipe-item {
        img {
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .mint-swipe-indicators {
        .mint-swipe-indicator {
            background-color: #f30;
            &.is-active {
                background-color: $bg;
            }
        }
    }
}
</style>
<script>
// 引入Footer组件
import Footer from '@/components/Footer';
export default {
    // 注册组件
    components: { Footer },
    data() {
        return {
            // 轮播图数据
            slideList: [],
            // 公告数据
            NoticeData: [],
            quesList: [],
            userNum: 0,
            quesNum: 0,
            solveNum: 0
        }
    },
    // 插值过滤器
    filters: {
        // 描述
        descFilter(val) {
            if(val) {
                return val;
            }
            return '这个人没有留下任何描述'
        },
        // id
        // idFilter(id) {
        //     console.log(id)
        // }
    },
    methods: {
    },
    // 组件创建完成
    created() {
        // 请求数据--home
        this.$http.get('/data/home')
            .then(({ data }) => {
                // 存储数据
                this.slideList = data.data.slideList;
                this.quesList = data.data.quesList;
                this.userNum = data.data.userNum;
                this.quesNum = data.data.quesNum;
                this.solveNum = data.data.solveNum;
            })
        this.$http.get('/data/notice/list')
            .then(({ data }) => {
                // 存储数据
                this.NoticeData = data.data.noticeList;
                // console.log(data)
            })
    }
}
</script>
