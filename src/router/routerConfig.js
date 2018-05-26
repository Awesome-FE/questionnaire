
import Home from "../pages/Home"
import End from "../pages/End"
import TrainReview from "../pages/TrainReview"
import TrainOpinion from "../pages/TrainOpinion"
import TrainDemand from "../pages/TrainDemand"

const routers = [
    {
        path: '/home',
        name: 'home',
        components: {
            default: Home,
        },
        meta: {
            title: '首页'
        }
    },
    {
        path: '/end',
        name: 'end',
        components: {
            default: End,
        },
        meta: {
            title: '感谢'
        }
    },
    {
        path: '/train-review',
        name: 'TrainReview',
        components: {
            default: TrainReview,
        },
        meta: {
            title: '培训心得'
        }
    },
    {
        path: '/train-opinion',
        name: 'TrainOpinion',
        components: {
            default: TrainOpinion,
        },
        meta: {
            title: '培训项目反映评估及改进书意见'
        }
    },
    {
        path: '/train-demand',
        name: 'TrainDemand',
        components: {
            default: TrainDemand,
        },
        meta: {
            title: '培训需求调研表'
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
];


export default [
    ...routers
]
