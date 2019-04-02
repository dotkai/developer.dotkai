import Vue from 'vue'
import VueScrollTo from 'vue-scrollto';
import App from './App.vue'

import 'font-awesome/css/font-awesome.css'

Vue.use(VueScrollTo);

new Vue({
	//router,
  el: '#app',
  render: h => h(App)
})
