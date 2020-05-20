<template>
    <div class="page-notice-detail">
        <Header></Header>
        <div class="notice">公告详情</div>
        <!-- {{noticeDetailData}} -->
        <div class="detail">
            <h1>{{ noticeDetailData.title }}</h1>
            <div class="data">
                <span>作者：{{ noticeDetailData.author }}</span>
                <span>阅读量：{{ +noticeDetailData.watch_num + 1 }}</span>
                <span>{{ noticeDetailData.create_time }}</span>
            </div>
            <div class="border" style="margin-bottom: 10px;"></div>
            <div class="desc">{{ noticeDetailData.content }}</div>
        </div>
    </div>
</template>
<style lang="scss">
.page-notice-detail{
    color: #fff;
    .notice {
        position: absolute;
        top: 0%;
        left: 35%;
        text-align: center;
        font-size: 14px;
        padding: 10px 20px 15px;
    }
    .detail {
        position: fixed;
        top: 41px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px;
        h1{
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .data{
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin-bottom: 10px;
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
            noticeDetailData: {}
        }
    },
    // 组件创建完成
    created() {
        let { params } = this.$route;
        // console.log(this.$route.params.id) // anno1
        this.$http.get('/data/notice/detail', {
            params: { notice_id: params.id }
        })
            .then(({ data }) => {
                // 存储数据
                this.noticeDetailData = data.data
                // console.log(data)
            })
    }
}
</script>
