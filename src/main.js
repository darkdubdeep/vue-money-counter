import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store }   from './store/index.js'
import CreateExpence from './components/expenses/CreateExpence.vue'
import EditeExpence from './components/expenses/EditExpence.vue'

Vue.config.productionTip = false

Vue.component("create-expence-dialog", CreateExpence);
Vue.component("edit-expence-dialog", EditeExpence);

new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
