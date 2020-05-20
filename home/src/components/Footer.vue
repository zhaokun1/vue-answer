<template>
    <div class="ickt-footer">
        <div :class="{ active: current === index }" v-for="(item, index) in footData" :key="item.path" @click="toggle(item.path)">
            <i :class="['mintui', 'mintui-' + item.iconClass]"></i>
            <span>{{ item.name }}</span>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/base.scss';
.ickt-footer {
    // position: absolute;
    position: fixed;
    z-index: 500;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: $bg;
    display: flex;
    font-size: 12px;
    color: rgba(255,255,255,.8);
    > div {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &.active {
            color: $sel;
        }
        i {
            font-size: 18px;
            margin-bottom: 4px;
        }
    }
}
</style>
<script>
export default {
    props: {
        footData: {
            type: Array,
            default: () => {
                return [
                    {path: '/home', iconClass: 'success', name: '首页'},
                    {path: '/answer', iconClass: 'xuqiuwenda', name: '问答'},
                    {path: '/search', iconClass: 'search', name: '搜索'},
                    {path: '/my', iconClass: 'wode', name: '我的'}
                ]
            }
        },
        current: {
            type: Number,
            default: 0
        }
    },
    // data() {
    //     return {
    //         // footer数据
    //         footData: [
    //             {path: '/home', iconClass: 'success', name: '首页'},
    //             {path: '/answer', iconClass: 'xuqiuwenda', name: '问答'},
    //             {path: '/search', iconClass: 'search', name: '搜索'},
    //             {path: '/my', iconClass: 'wode', name: '我的'},
    //         ],
    //         current: 0
    //     }
    // },
    // 计算属性数据
    computed: {
        // isActive() {
        //     return 'active'
        // }
        // dealCurrent() {
        //     return this.current = this.current % this.footData.length
        // }
    },
    methods: {
        toggle(path) {
            // console.log(path) 捕获导航错误
            this.$router.push({ path })
                .catch(() => {  })
        }
    },
    // 监听
    watch: {
        current() {
            this.current = this.current % this.footData.length
        }
        // current: function() {
        //     this.current = this.current % this.footData.length
        // }
    }
}
</script>