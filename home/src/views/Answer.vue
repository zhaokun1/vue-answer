<template>
    <div class="page-answers">
        <div class="header">
            <span class="ask">问答</span>
            <AnswerMenu></AnswerMenu>
        </div>
        <!-- 发表新问题 -->
        <div @click="handlePublishClick" class="publish-btn">发表新问题</div>
        <!-- 问题类型 -->
        <ul class="ques-type">
            <li :class="{ active: index === currIndex }" @click="toggleQuesType(index)" v-for="(item, index) in quesType" :key="item.quesId">{{ item.quesName }}</li>
        </ul>
        <!-- 上拉加载更多 -->
        <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
            <!-- <mt-spinner v-show="list<1 && InitialLoading" color="#26a2ff" class="center"></mt-spinner> -->
            <!-- <mt-loadmore 
                :top-method="loadTop" 
                @top-status-change="handleTopChange"
                :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                :bottom-all-loaded="allLoaded" 
                :auto-fill="false" 
                ref="ickt"
            > -->
            <mt-loadmore 
                :top-method="loadTop" 
                @top-status-change="handleTopChange"
                :auto-fill="false" 
                ref="ickt"
            >
            <!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
            <!-- 渲染数据区域 -->
            <div class="list-box">
                <ul>
                    <li v-for="item in questionList" :key="item.question_id">
                    <!-- 标题部分 -->
                    <div class="title">
                        <div class="icon">
                            <span v-show="item.extra_state === 2">顶</span>
                            <span v-show="item.extra_state === 1">精</span>
                        </div>
                        <a @click.prevent="handleQuesClick(item.question_id)" href="javascript:;">{{ item.title }}</a>
                    </div>
                    <!-- 数据部分 -->
                    <div class="data">
                        <div class="left">
                            <img :src="item.from.avatar" alt="头像">
                            <span>{{ item.from.nickname }}</span>
                            <span>|</span>
                            <span>{{ item.create_time }}</span>
                        </div>
                        <div class="right">
                            <i class="iconfont icon-chakan"></i>
                            <span>{{ item.watch_num }}</span>
                            <i class="reply iconfont icon-chakantiezihuifu"></i>
                            <span>{{ item.answer_num }}</span>
                        </div>
                    </div>
                </li>
              </ul>
            </div>
            <!-- 自定义顶部加载提示区域-->
            <div slot="top" class="mint-loadmore-top" style="text-align:center">
            <!-- 按下的距离大于topDistance，此时释放会触发 top-method 类名变为is-rotate-->
                <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }"></span>
                <mt-spinner v-show="topStatus == 'loading'" color="#3D3F46" class="center"></mt-spinner>
                <span class="mint-loadmore-text">{{ topText }}</span>
            </div>
            <!-- <div v-if="allLoaded" style="text-align:center;" class="data-none">没有更多数据了</div> -->
            <!-- 自定义底部加载提示区域 -->
            <!-- <div slot="bottom" class="mint-loadmore-bottom">
                <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
                <span v-show="bottomStatus === 'loading'"></span>
                <mt-spinner v-show="bottomStatus == 'loading'" color="#3D3F46"></mt-spinner>
                <span class="mint-loadmore-text">{{ bottomText }}</span>
            </div> -->
            </mt-loadmore>
        </div>
    <Footer :current=1></Footer>
    </div>
</template>
<style lang="scss" scoped>
@import '@/base.scss';
.page-answers {
    color: #fff;
    .header {
        padding: 0.6rem;
        display: flex;
        justify-content: space-between;
        .ask {
            color: #fff;
            font-size: 18px;
            font-weight: bold;
        }
    }
    // 发表新问题
    .publish-btn {
        margin: 0.6rem auto;
        display: block;
        width: 90%;
        background-color: $bdb;
        text-align: center;
        height: 40px;
        line-height: 40px;
        text-decoration: none;
        color: #fff;
        font-size: 14px;
    }
    // 问题类型
    .ques-type {
        display: flex;
        padding: 1rem;
        justify-content: space-between;
        font-size: 14px;
        border-bottom: 1px solid $bdb;
        .active {
            color: $sel;
            border-bottom: 1px solid $sel;
        }
    }
    .page-loadmore-wrapper {
        overflow: scroll;
        z-index: 100;
        // 问题数据
        .list-box {
            li {
                padding: 2rem 1rem 2rem;
                border-bottom: 1px solid $bdb;
                .title {
                    display: block;
                }
                .data {
                    display: flex;
                    font-size: 14px;
                    justify-content: space-between;
                    color: #909195;
                    .left {
                        flex: 1;
                        height: 20px;
                        line-height: 20px;
                        img {
                            // 不缩小比例
                            flex-shrink: 0;
                            margin-right: 0.6rem;
                            width: 20px;
                            height: 20px;
                            margin-top: 1rem;
                            border-radius: 50%;
                        }
                    }
                    .right {
                        position: relative;
                        top: 18px;
                        span {
                            margin: 0 6px;
                        }
                    }
                }
                
            }
        }
        .center {
            text-align: center;
        }
    }
}
</style>
<script>
import AnswerMenu from '@/components/AnswerMenu';
import { checkToken, getLocalStorage } from '@/tools/validator';
// 引入Footer组件
import Footer from '@/components/Footer';
import config from '@/tools/config'
export default {
    // 注册组件
    components: { AnswerMenu, Footer },
    data() {
        return {
            showPopup: false,
            categoryList: [],
            currIndex: 0,
            page: 1,
            // 数据
            // list: 0,
            // 问题类型
            quesType: [
               { quesId: 1, quesName: '全部' },
               { quesId: 2, quesName: '精华问题' },
               { quesId: 3, quesName: '置顶问题' },
               { quesId: 4, quesName: '已解决问题' },
               { quesId: 5, quesName: '待解决问题' },
            ],
            questionList: [],
            // 初始加载
            // InitialLoading: true,
            // 容器高度
            wrapperHeight: 0,
            // 数据是否加载完毕
            allLoaded: false,
            // 底部上拉状态
            bottomStatus: '',
            // 顶部上拉状态
            topStatus: '',
            // 文字描述
            topText: '',
            topPullText: '下拉即可刷新',
            topDropText: '释放即可更新',
            topLoadingText:  '加载中...',
            // bottomText: '',
            // bottomPullText:  '上拉刷新',
            // bottomDropText:  '释放更新',
            // bottomLoadingText:  '加载中...'
        }   
    },
    methods: {
        // 点击问题标题
        handleQuesClick(id) {
            this.$router.push(`/answer_detail/${id}`)
        },
        // 点击发表问题
        handlePublishClick() {
            if(this.token) {
                this.$router.push("/answer_publish");
            } else {
                let val = checkToken();
                if(!val) {
                    return;
                }
            }
        },
        // 切换问题类型
        toggleQuesType(idx) {
            // 更新索引
            this.currIndex = idx;
            // 更改页码
            this.page = 1;
            // 根据不同的问题类型切换数据
            this.toggleQues()
        },
        // 切换数据的页码显示数据
        toggleQues() {
            this.$http.get(`/data/answer/question?page=${this.page}&state=${this.currIndex}`)
                .then(({ data }) => {
                    if (!data.data.length) {
                        this.questionList = []
                        return;
                    }
                    // 判断是否还有数据
                    if (data.data.length < config.limit) {
                        this.finished = true
                    }
                    this.questionList = data.data
                })
        },
        // handleBottomChange(status) {
        //     this.bottomStatus = status;
        // },
        // loadBottom() {
        //     //上拉时 改变状态码
        //     this.handleBottomChange("loading");
        //     this.page += 1;
        //     setTimeout(() => {//上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
        //         if (this.page <= 3) {//最多下拉三次
        //             config.limit += 12;//上拉加载 每次数值加12
        //         } else {
        //             this.allLoaded = true;//模拟数据加载完毕 禁用上拉加载
        //         }
        //         this.handleBottomChange("loadingEnd");//数据加载完毕 修改状态码
        //         this.$refs.ickt.onBottomLoaded();
        //     }, 150000);
        // },
        // 上拉状态改变
        handleTopChange(status) {
            this.topStatus = status;
        },
        //下拉刷新 自定义加载区域
        loadTop() {
            //下拉时 改变状态码
            this.handleTopChange("loading");
            this.page = 1;
            // //下拉刷新时解除上拉加载的禁用
            // this.allLoaded = false;
            // 请求数据
            this.$http.get(`/data/answer/question?page=${this.page}&state=${this.currIndex}`)
                .then(({ data }) => {
                    if (!data.data.length) {
                        this.questionList = []
                        return
                    }
                    if (data.data.length >= config.limit) {
                        //下拉刷新时解除上拉加载的禁用
                        this.allLoaded = false;
                    } else {
                        // 数据加载完毕 修改状态码
                        this.handleTopChange("loadingEnd");
                    }
                    // 提示信息
                    this.$toast('加载成功')
                    this.$refs.ickt.onTopLoaded();
                })
            // setTimeout(() => {
            //     //下拉刷新 数据初始化
            //     config.limit = 12;
            //     //数据加载完毕 修改状态码
            //     this.handleTopChange("loadingEnd");
            //     // 提示问题
            //     this.$toast('加载成功')
            //     this.$refs.ickt.onTopLoaded();
            // }, 1500);
        },
    },
    created() {
        this.token = getLocalStorage("token", "string");
        this.$http.get('/data/home')
            .then(({ data }) => {
                // 存储
                this.questionList = data.data.quesList
            })
    },
    // 组件创建完毕
    mounted() {
        //获取屏幕宽度
        let windowWidth = document.documentElement.clientWidth;
        //设置容器的高度
        if (windowWidth >= 768) {
            this.wrapperHeight = document.documentElement.clientHeight - 105;
        } else {
            this.wrapperHeight = document.documentElement.clientHeight - 80;
        }
    },
    // 监听
    watch: {
        topStatus(val) {
            switch (val) {
                case 'pull':
                    this.topText = this.topPullText;
                    break;
                case 'drop':
                    this.topText = this.topDropText;
                    break;
                case 'loading':
                    this.topText = this.topLoadingText;
                    break;
            }
        }
        // bottomStatus(val) {
        //     switch (val) {
        //         case 'pull':
        //             this.bottomText = this.bottomPullText;
        //             break;
        //         case 'drop':
        //             this.bottomText = this.bottomDropText;
        //             break;
        //         case 'loading':
        //             this.bottomText = this.bottomLoadingText;
        //             break;
        //     }
        // }
    },

}
</script>
