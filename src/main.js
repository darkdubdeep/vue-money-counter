import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store }   from './store/index.js'
import CreateExpence from './components/expenses/CreateExpence.vue'
import EditeExpence from './components/expenses/EditExpence.vue'
import PreloaderComponent from './components/shared/PreloaderComponent.vue'
import ErrorAlert from './components/shared/ErrorAlert.vue'

Vue.config.productionTip = false

Vue.component("create-expence-dialog", CreateExpence);
Vue.component("edit-expence-dialog", EditeExpence);
Vue.component("preloader-component", PreloaderComponent);
Vue.component("error-alert", ErrorAlert);


new Vue({
  router,
  store,
  components: { App },
  render: h => h(App),
  created() {
    setTimeout(()=> {
      // in this place will be autologin logic in the future
      this.$store
          // .dispatch("autoSignIn", true)
          // .then(this.$store.dispatch("loadExpences"));
    }) 
  }
}).$mount('#app')
