import axios from "axios";
const state = {
    name: '张文才'
}

const getters = {
    
}

const mutations = {
    setUserInfo: (state, payload) => {
        Object.assign(state, payload);
    }
}

const actions = {
    login (context, payload) {
        return axios.post("/login", payload)
        // return axios.post("/session", payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}