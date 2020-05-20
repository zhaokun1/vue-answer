<template>
    <div class="answer-menu">
        <i @click="handleMenuClick" style="color:#E2B96F;font-size: 22px;" class="iconfont icon-xuqiuwenda"></i>
        <mt-popup class="popup-box bg" v-model="showPopup" popup-transition="popup-fade">
            <div class="title">
                <span>选择问答分类</span>
                <i @click="showPopup = false" style="color:#fff;font-size: 20px;" class="iconfont icon-guanbi"></i>
            </div>
            <ul>
                <li v-for="item in categoryList" :key="item.cate_id">
                <a href="javascript:;" @click="handleMenuTabClick(item.cate_id)">{{ item.cate_name }}</a>
                </li>
            </ul>
        </mt-popup>
    </div>
</template>
<style lang="scss">
@import '@/base.scss';
.answer-menu {
    .popup-box {
        padding: 1rem;
        width: 70%;
        background-color: $bg;
    }
    .popup-box .title {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
    }
    .popup-box ul {
        display: flex;
        flex-wrap: wrap;
        
    }
    .popup-box ul li {
        width: 40%;
        padding-right: 1rem;
        margin-bottom: 1rem;
    }
    .popup-box ul li a {
        display: block;
        color: #4caaff;
        text-align: center;
        border: 1px solid #4caaff;
        padding: 0.8rem;
        text-decoration: none;
    }
}
</style>
<script>
export default {
    data() {
        return {
            showPopup: false,
            categoryList: []
        }
    },
    methods: {
        // 点击菜单的时候显示
        handleMenuClick() {
            this.showPopup = true;
        },
        // 点击分类
        handleMenuTabClick(id) {
            this.showPopup = false;
            this.$router.push(`/Answer_category/${id}`)
        }
    },
    created() {
        this.$http.get('/data/answer/category')
            .then(({ data }) => {
                // 存储数据
                this.categoryList = data.data
            })
    }
}
</script>