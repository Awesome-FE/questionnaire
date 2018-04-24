import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import exam from './exam'
import user from './user'

export default new vuex.Store({
    modules: {
        exam,
        user
    }
})
