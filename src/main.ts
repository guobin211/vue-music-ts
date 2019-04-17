import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import { routerGuard } from '@/config/RouterGuard';
// element all
import ElementUI, { Loading, Message, MessageBox, Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Locale } from '@/config/locale';
Vue.use(ElementUI, { Locale });

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

// 路由守卫
router.beforeEach((to, from, next) => {
  if (routerGuard.match(to, from)) {
    next();
  } else {
    router.back();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
