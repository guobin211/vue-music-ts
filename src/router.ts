import Vue from 'vue';
import Router from 'vue-router';
import Recommend from "@/pages/Recommend.vue";
import SingerDetail from "@/pages/SingerDetail.vue";
import Singer from "@/pages/Singer.vue";

Vue.use(Router);

export default new Router({
  mode: 'hash',
  scrollBehavior: () => {
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      redirect: '/recommend',
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: ':id',
          name: 'detail',
          component: SingerDetail
        },
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import(/* webpackChunkName: "rank" */ './pages/Rank.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './pages/Search.vue'),
    },
    {
      path: '/vuex',
      name: 'vuex',
      meta: {
        resolve: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "vuex" */ './pages/VuexPage.vue'),
    },
    {
      path: '**',
      redirect: '/recommend',
    },
  ]
});
