import Vue from 'vue'
import App from './App.vue'
import jquery from 'jquery'
import axios from 'axios'
import './assets/css/base.css'
import './js/js.cookie.js'
import router from './router/index.js'
import util from "./js/util.js";

axios.defaults.baseURL = '/api';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults['transformRequest'] = [function(data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

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