<template>
    <div class="page-search">
        <div class="header">
            <span class="title">搜索</span>
        </div>
        <!-- 搜索栏 -->
        <div class="search-part">
            <i class="iconfont icon-search"></i>
            <mt-field v-model="searchWord" placeholder="输入要搜索的问答" />
            <a href="javascript:;" @click.prevent='handleSearch'>搜索</a>
        </div>
        <!-- 热门搜索 -->
        <div class="hot-box">
        <div class="title">热门搜索</div>
        <ul class="list">
          <li @click="handleHotLabelClick(item)" v-for="(item, index) in hotList" :key="index">{{ item }}</li>
        </ul>
        </div>
        <!-- 显示搜索的页面 -->
        <mt-popup class="popup" v-model="showPopup" position="right">
        <Header></Header>
        <h1 class="search-result">搜索结果</h1>
        <br>
        <div class="title">关键字：{{ searchWord || label }}</div>
        <div class="border"></div>
        <div class="list-box" v-if="questionList.length">
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
        <div v-else style="text-align:center;margin-top:100px;">搜索不到数据</div>
      </mt-popup>
    <Footer :current=2></Footer>
    </div>
</template>
<style lang="scss" scoped>
@import '@/base.scss';
.page-search {
    color: #fff;
    .header {
        padding: 0.6rem;
        display: flex;
        justify-content: space-between;
        .title {
            color: #fff;
            font-size: 18px;
            font-weight: bold;
        }
    }
    // 搜索
    .search-part {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 90%;
        margin: 1rem auto 2rem;
        height: 40px;
        padding: 0 0.5rem;
        background: #333;
        border-radius: 6px;
        .mint-field {
            flex: 1;
            background: transparent;
            padding-left: 1rem;
            color: rgba(255, 255, 255, 0.6);
        }
        /deep/.mint-field-core {
            color: #fff;
            border: none;
            outline: none;
            background-color: #333;
        }
        i:first-child {
            
            font-size: 16px;
        }
    }
    // 热门搜索
    .hot-box {
        margin: 0 1rem 1rem;
    .title {
        line-height: 2.6rem;
    }
    .list {
        display: flex;
        flex-wrap: wrap;
        li {
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: #333;
            font-size: 14px;
            color: hsla(0, 0%, 100%, 0.3);
        }
    }
    }
    // 显示搜索的页面
    .popup {
        width: 100%;
        height: 100%;
        background-color: #20232a;
        .search-result {
            position: absolute;
            top: 0%;
            left: 35%;
            text-align: center;
            font-size:14px;
            padding: 10px 20px 15px;
            color: #fff;
        }
        .title {
            height: 40px;
            line-height: 40px;
            padding: 0 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .list-box {
            ul {
                li {
                    padding: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    .title {
                        display: flex;
                        align-items: center;
                        margin-bottom: 1rem;
                        height: 20px;
                        .icon {
                            margin-right: 0.8rem;
                            flex-shrink: 0;
                            span {
                                font-size: 0.8rem;
                                padding: 1px 2px;
                            }
                            span:first-child {
                                color: #ff8d64;
                                border: 1px solid #ff8d64;
                            }
                            span:last-child {
                                color: #4ac49d;
                                border: 1px solid #4ac49d;
                            }
                        }
                        a {
                            display: block;
                            white-space: nowrap;
                            width: 100%;
                            height: 20px;
                            line-height: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }
                    .data {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 12px;
                        color: rgba(255, 255, 255, 0.5);
                        .left {
                            display: flex;
                            align-items: center;
                            img {
                                width: 22px;
                                height: 22px;
                                border-radius: 100%;
                            }
                            span {
                                margin-left: 6px;
                            }
                        }
                        .right {
                            display: flex;
                            align-items: center;
                            span,
                            i {
                                margin-left: 6px;
                            }
                            .reply {
                                position: relative;
                                top: -1px;
                            }
                        }
                    }
                }
            }
        }
    }

}
</style>
<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
    // 注册组件
    components: { Header, Footer },
    data() {
        return {
            searchWord: '',
            questionList: [],
            hotList: ['前端', '后端', '人工智能怎么样', '前框框架', 'vue', 'AI', 'Java', 'PHP是世界上最好的语言'],
            showPopup: false,
            label: ''
        }
    },
    methods: {
        // 点击搜索
        handleSearch() {
            // console.log(args);
            // 获取输入的内容
            if(!this.searchWord) {
                return this.$toast('请输入要搜索的关键词')
            }
            // console.log(this.searchWord)
            // 搜索路由
            let searchWord = this.searchWord;
            this.$http.get('/data/search', {
                params: { searchWord: searchWord }
            })
                .then(({ data }) => {
                    this.questionList = data.data
                })
            // 显示popup
            this.showPopup = true;
        },
        handleHotLabelClick(item) {
            // 搜索页面
            // let searchWord = item;
            this.$http.get('/data/search', {
                params: { searchWord: item }
            })
                .then(({ data }) => {
                    this.questionList = data.data
                })
            this.label = item;
            // 显示popup
            this.showPopup = true;
        },
        handleQuesClick(id) {
            this.$router.push(`/answer_detail/${id}`)
        }
    },
}
</script>
