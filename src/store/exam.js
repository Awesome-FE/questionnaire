
const state = {
    index: 0,
    loading: false,
    isPaused: false,
    done: false,
    showQuestion: false,
    showAll: false,
    showModal: false,
    anwsers: [],
    questions: [
        {
            type: 1,
            title: '你最爱的国家是：',
            options: [
                { key: 'America', value: 'A:', inlineDesc: '超级大国美国' },
                { key: 'Japan', value: 'B:', inlineDesc: '小日本儿' },
                { key: 'China', value: 'C:', inlineDesc: '大中国' }
            ],
        },
        {
            type: 2,
            title: '你最爱的游戏是：',
            options: [
                { key: 'LoL', value: 'A:', inlineDesc: '英雄联盟' },
                { key: 'WOW', value: 'B:', inlineDesc: '魔兽世界' },
                { key: 'tank', value: 'C:', inlineDesc: '坦克大战' },
                { key: 'xyz', value: 'D:', inlineDesc: '其他' }
            ],
        },
        {
            type: 3,
            title: '我猜你是个超人：',
            options: [
                { key: 'true', value: 'A:', inlineDesc: '正确' },
                { key: 'false', value: 'B:', inlineDesc: '错误' },
            ],
        }
    ],

}

const getters = {
    length: state => state.questions.length,
    anwsersLength: state => state.questions.length -state.anwsers.filter(item => item).length,
    question: state => state.questions[state.index],
    value: state => state.anwsers[state.index] || [],
}

const mutations = {
    toggleShowQuestion: (state, bool) => {
        state.showQuestion = bool;
    },
    setAnwser: (state, payload) => {
        state.anwsers[payload.index] = payload.value
    },
    showAll: (state, bool) => {
        state.showAll = bool
    },
    showModal: (state, bool) => {
        state.showModal = bool
    },
    togglePause: (state, bool) => {
        state.isPaused = bool
    },
    changeIndex: (state, index) => {
        state.index = index
    },
    toPrev: state => --state.index,
    toNext: state => ++state.index
}


export default {
    state,
    getters,
    mutations
}