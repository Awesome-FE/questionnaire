import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './assets/css/base.css'
import router from './router/index.js'
import 'vue-awesome/icons'

import Icon from 'vue-awesome/components/Icon'

// 全局注册（在 `main .js` 文件中）
Vue.component('icon', Icon)

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

Vue.config.productionTip = false;


new Vue({
    el: '#app',
    router,
    store,
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
