import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    // home
    // 公告
    { path: '/home_notice', component: () => import('@/views/Home_notice.vue') },
    { path: '/home_notice_detail/:id', component: () => import('@/views/Home_notice_detail.vue') },
    // answer
    { path: '/answer', component: () => import('@/views/Answer.vue') },
    // answer--发表问题
    { path: '/answer_publish', component: () => import('@/views/Answer_publish.vue') },
    // answer--种类
    { path: '/answer_category:id', component: () => import('@/views/Answer_category.vue') },
    // answer-问题详情
    { path: '/answer_detail/:id', component: () => import('@/views/Answer_detail.vue') },
    // search
    { path: '/search', component: () => import('@/views/Search.vue') },
    // me
    { path: '/my', component: () => import('@/views/My.vue') },
    { path: '/my/card', component: () => import('@/views/My_card.vue') },
    { path: '/my/ques', component: () => import('@/views/My_ques.vue') },
    { path: '/my/answer', component: () => import('@/views/My_answer.vue') },
    { path: '/my/reply', component: () => import('@/views/My_reply.vue') },
    { path: '/forget', component: () => import('@/views/Forget.vue') },

    // 注册 登录
    { path: '/register', component: () => import('@/views/Register.vue') },
    { path: '/login', component: () => import('@/views/Login.vue') },
    { path: '*', component: Home },
]

const router = new VueRouter({
    routes
})

export default router
