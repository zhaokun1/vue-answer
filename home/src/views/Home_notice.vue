<template>
    <div class="page-notice">
        <Header></Header>
        <header class="notice">网站公告</header>
        <div class="notice-list">
            <ul>
            <li v-for="item in noticeData" :key="item.notice_id">
                <div class="time"><span>{{ item.create_time }}</span></div>
                <div class="info">
                <p>【公告】{{ item.title }}</p>
                <div>
                    <router-link :to='`/home_notice_detail/${item.notice_id}`'>查看详情</router-link>
                </div>
                </div>
            </li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
.page-notice {
    color: #fff;
    .notice {
        position: absolute;
        top: 0%;
        left: 35%;
        text-align: center;
        font-size:14px;
        padding: 10px 20px 15px;
        color: #fff;
    }
    .notice-list {
    position: fixed;
    top: 41px;
    left: 0;
    right: 0;
    bottom: 0;
    ul {
        padding: 10px 20px;
        li {
        border-bottom: 1px solid rgba(76, 170, 255, 0.3);
        padding: 10px 0;
        .time {
            text-align: center;
            span {
            display: inline-block;
            width: 100%;
            height: 30px;
            line-height: 30px;
            }
        }
        .info {
            padding: 6px 10px;
            p:first-child {
            line-height: 24px;
            margin-bottom: 4px;
            }
            > div {
            text-align: right;
            a {
                font-size: 12px;
                text-decoration: none;
                color: #fff;
            }
            }
        }
        }
    }
    }
    }
    </style>
<script>
import Header from '@/components/Header'
export default {
    components: { Header },
    data() {
        return {
            noticeData: []
        }
    },
    created() {
        // 请求数据
        this.$http.get('/data/notice/list')
            .then(({ data }) => {
                // 存储数据
                this.noticeData = data.data.noticeList
            })
    }
}
</script>