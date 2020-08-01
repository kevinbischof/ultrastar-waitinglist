import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate'
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.use(Vuelidate)
Vue.use(vuetify)
Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
