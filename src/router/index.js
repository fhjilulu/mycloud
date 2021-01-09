import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main/main'
import mainContent from '@/components/layout/mainContent'
import login from '@/components/login/login'
import step1 from '@/base/Resources/cloudadd/step1'

Vue.use(Router)

const router =  new Router({
  // mode: "history",
  routes: [
    {
      path: '/login',
      component: login,
    },
    {
      path:'/',
      redirect: '/login',
      component: main,
      children: [
        {
          path: 'Resources',
          meta: { title: 'Resources', require: true },
          component: () => import('@/base/Resources/Resources'),
        },
        {
          path: 'Scheduling',
          meta: { title: 'Scheduling', require: true },
          component: () => import('@/base/Resources/Scheduling')
        },
        {
          path: 'Rightsizing',
          meta: { title: 'Rightsizing', require: true },
          component: () => import('@/base/Resources/Rightsizing')
        },
        {
          path: 'Cloud_Credentials',
          meta: { title: 'Cloud_Credentials', require: true },
          component: () => import('@/base/Resources/Cloud_Credentials'),
        },
        {
          path: 'Edit_Credentials',name:"step2",
          meta: { title: 'Edit_Credentials', require: true },
          component: () => import('@/base/Resources/cloudadd/Edit_Credentials'),
        },
        {
            path: '/Cloud_Credentials/add',name:"step1",
            meta: { title: 'Cloud_Credentials/add', require: true },
            component: () => import('@/base/Resources/cloudadd/step1')     
        },
        {
            path: '/Cloud_Credentials/add/ali',name:"ali",
            meta: { title: '/Cloud_Credentials/add/ali', require: true },
            component: () => import('@/base/Resources/cloudadd/ali')            
        },
        {
           path: '/Cloud_Credentials/add/tengxun',name:"tengxun",
           meta: { title: '/Cloud_Credentials/add/tengxun', require: true },
           component: () => import('@/base/Resources/cloudadd/tengxun')            
        },
        {
           path: '/Cloud_Credentials/add/aws',name:"aws",
           meta: { title: '/Cloud_Credentials/add/aws', require: true },
           component: () => import('@/base/Resources/cloudadd/aws')            
        },
        {
           path: '/Cloud_Credentials/add/huawei',name:"huawei",
           meta: { title: '/Cloud_Credentials/add/huawei', require: true },
           component: () => import('@/base/Resources/cloudadd/huawei')            
        },
        {
          path: 'Teams',
          meta: { title: 'Teams',require: true},
          component: () => import('@/base/Resources/Teams')
        },
        {
          path: 'Users',
          meta: { title: 'Users',require: true},
          component: () => import('@/base/Resources/Users')
        },
        {
          path: 'Policies',
          meta: { title: 'Policies', require: true },
          component: () => import('@/base/Resources/Policies')
        },
        {
          path: 'Reports',
          meta: { title: 'Reports', require: true },
          component: () => import('@/base/Resources/Reports')
        },
        {
          path: 'User_Guide',
          meta: { title: 'Resources', require: true },
          component: () => import('@/base/Resources/Resources')
        },
        {
          path: 'Notifications',
          meta: { title: 'Notifications', require: true },
          component: () => import('@/base/Resources/Notifications')
        },
        {
          path: 'payment',
          meta: { title: 'Subscription', require: true },
          component: () => import('@/base/Resources/payment')
        },

        {
          path: 'Support',
          meta: { title: 'Support', require: true },
          component: () => import('@/base/Resources/Support')
        },
        {
          path: 'Api',
          meta: { title: 'Api', require: true },
          component: () => import('@/base/Resources/Api')
        },
      ]
    }
  ]
})

router.beforeEach((to,from, next) => {
  if (to.meta.require) {
    if (sessionStorage.getItem('isLogin')!=='true') {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转首页时的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  next()
})
export default router