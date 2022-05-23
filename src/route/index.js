import * as VueRouter from 'vue-router'

const routes = [
    { path: '/', redirect: '/user' },
    {
        path: '/practice',
        component: () => import('../view/Practice'),
    },
    { path: '/user', component: () => import('../view/User') },
    {
        path: '/answersheet',
        component: () => import('../view/AnswerSheet')
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
})

export default router;