/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import config from '@/config'
import iView from 'iview'
import moment from 'moment'
import './index.less'

import '../public/UE/ueditor.config.js'
import '../public/UE/ueditor.all.min.js'
import '../public/UE/lang/zh-cn/zh-cn.js'
import '../public/UE/ueditor.parse.min.js'

import VueClipboard from 'vue-clipboard2'
// 引入自定义插件
import Tip from '@/plugins/tip'

// 引入根组件mixins
import mixins from './mixins/root'

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')
Vue.use(iView);
Vue.use(Tip);
Vue.use(VueClipboard);

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;

Vue.prototype.$moment = moment;

let vm = new Vue({
    mixins: [mixins], 
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default vm;
