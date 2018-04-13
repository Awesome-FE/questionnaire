import Vue from 'vue'
import App from './App.vue'
import jquery from 'jquery'
import axios from 'axios'
import './assets/css/base.css'
import './js/js.cookie.js'
import router from './router/index.js'
import util from "./js/util.js";

axios.defaults.baseURL = '/raas/v1';

Vue.prototype.$getParameterByName = util.getParameterByName;
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});



// 引入外部js
Vue.component('remote-script', {
    render: function(createElement) {
        var self = this;
        return createElement('script', {
            attrs: {
                type: 'text/javascript',
                src: this.src
            },
            on: {
                load: function(event) {
                    self.$emit('load', event);
                },
                error: function(event) {
                    self.$emit('error', event);
                },
                readystatechange: function(event) {
                    if (this.readyState == 'complete') {
                        self.$emit('load', event);
                    }
                }
            }
        });
    },

    props: {
        src: {
            type: String,
            required: true
        }
    }
});