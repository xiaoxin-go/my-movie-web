// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './base/index.css';
import {formatDate} from "./base/date.js";

Vue.config.productionTip = false;
Vue.use(iView);

Vue.prototype.$format = function (time) {
  if(!time)return null;
  let date = new Date(time);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
