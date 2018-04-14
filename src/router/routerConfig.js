import Home from "../components/Home"
import Login from '../components/Login'

export default [
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/user-login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
];