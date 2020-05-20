import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store';
// 引入mintUI
import MintUI from 'mint-ui';
// 引入样式
import 'mint-ui/lib/style.css';
// 引入vant组件
import { Button, Uploader, Field, DatetimePicker, Picker, Popup, CellGroup  } from 'vant'
// 引入vant 样式
import 'vant/lib/index.css'

// 引入axios
import axios from 'axios';
// 安装axios
Vue.prototype.$http = axios;
// 安装mint-ui
Vue.use(MintUI);
// 安装组件
Vue.use(Button).use(Uploader).use(Field).use(DatetimePicker).use(Picker).use(Popup).use(CellGroup)

// Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
