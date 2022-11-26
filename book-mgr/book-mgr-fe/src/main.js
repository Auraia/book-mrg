// import Vue from 'vue'
import { createApp } from 'vue';

import App from './App.vue'
import router from './router'
// import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App)
    .use(store)
    .use(router)
    .use(Antd)
    .mount('#app');



// Vue.config.productionTip = false
// Vue.use(Antd)
// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app')