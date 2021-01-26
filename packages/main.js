import Vue from 'vue'
import App from './App.vue'
import xdy from './index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import formCreate from '@form-create/element-ui'
Vue.config.productionTip = false
console.log('xdy',xdy);

Vue.use(xdy)
Vue.use(ElementUI)
Vue.use(formCreate)
new Vue({
  render: h => h(App),
}).$mount('#app')
