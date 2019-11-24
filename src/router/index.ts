import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import RecommendDetail from '@/pages/RecommendDetail.vue'
import SearchDetail from '@/pages/SearchDetail.vue'
import RankDetail from '@/pages/RankDetail.vue'
import SingerDetail from '@/pages/SingerDetail.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import(/* webpackChunkName: "recommend" */ '@/pages/RecommendPage.vue')
  },
  { path: '/recommend/:id', component: RecommendDetail },
  {
    path: '/singer',
    name: 'singer',
    component: () => import(/* webpackChunkName: "singer" */ '@/pages/SingerPage.vue'),
    children: [
      {path: ':id', component: SingerDetail}
    ]
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import(/* webpackChunkName: "rank" */ '@/pages/RankPage.vue')
  },
  { path: '/rank/:id', component: RankDetail },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '@/pages/SearchPage.vue')
  },
  { path: '/search/:id', component: SearchDetail },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '@/pages/UserCenterPage.vue')
  },
  {
    path: '*',
    redirect: 'recommend'
  }
]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior: () => {
    return { x: 0, y: 0 }
  },
  routes
})

export default router
