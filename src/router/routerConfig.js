import home from "../pages/home.vue"
import areaList from "../pages/areaList.vue"
import resourceList from "../pages/resourceList.vue"
import resourceDetailHatch from "../pages/resourceDetailHatch.vue"
import resourceDetail from "../pages/resourceDetail.vue"
import innovationOrderSure from "../pages/innovationOrderSure.vue"
import independentOrderSure from "../pages/independentOrderSure.vue"
import innovationOrderDetail from "../pages/innovationOrderDetail.vue"
import independentOrderDetail from "../pages/independentOrderDetail.vue"
import mixedOrderSure from "../pages/mixedOrderSure.vue"
import mixedOrderDetail from "../pages/mixedOrderDetail.vue"
import payWayThird from "../pages/payWayThird.vue"
import orderList from "../pages/orderList.vue"
import orderListWait from "../pages/orderListWait.vue"
import orderListSigned from "../pages/orderListSigned.vue"
import paySuccess from "../pages/paySuccess.vue"
import payFail from "../pages/payFail.vue"
import packageOne from "../pages/packageOne.vue"
import packageTwo from "../pages/packageTwo.vue"
import userDefined from "../pages/userDefined.vue"
import billTotal from "../pages/billTotal.vue"
import billParticular from "../pages/billParticular.vue"

export default [{
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            title: '中电友普云'
        }
    },
    {
        path: '/areaList',
        name: 'areaList',
        component: areaList,
        meta: {
            title: '园区列表'
        }
    },
    {
        path: '/resourceList',
        name: 'resourceList',
        component: resourceList,
        meta: {
            title: '资源列表'
        }
    },
    {
        path: '/resourceDetailHatch',
        name: 'resourceDetailHatch',
        component: resourceDetailHatch,
        meta: {
            title: '资源详情-云服务'
        }
    },
    {
        path: '/resourceDetail',
        name: 'resourceDetail',
        component: resourceDetail,
        meta: {
            title: '资源详情-园区空间'
        }
    },
    {
        path: '/innovationOrderSure',
        name: 'innovationOrderSure',
        component: innovationOrderSure,
        meta: {
            title: '双创云订单确认'
        }
    },
    {
        path: '/innovationOrderDetail',
        name: 'innovationOrderDetail',
        component: innovationOrderDetail,
        meta: {
            title: '双创云订单详情'
        }
    },
    {
        path: '/independentOrderSure',
        name: 'independentOrderSure',
        component: independentOrderSure,
        meta: {
            title: '独立办公空间订单确认'
        }
    },
    {
        path: '/independentOrderDetail',
        name: 'independentOrderDetail',
        component: independentOrderDetail,
        meta: {
            title: '独立办公空间订单详情'
        }
    },
    {
        path: '/mixedOrderSure',
        name: 'mixedOrderSure',
        component: mixedOrderSure,
        meta: {
            title: '混合云订单确认'
        }
    },
    {
        path: '/mixedOrderDetail',
        name: 'mixedOrderDetail',
        component: mixedOrderDetail,
        meta: {
            title: '混合云订单详情'
        }
    },
    {
        path: '/payWayThird',
        name: 'payWayThird',
        component: payWayThird,
        meta: {
            title: '订单支付'
        }
    },
    {
        path: '/orderList',
        name: 'orderList',
        component: orderList,
        meta: {
            title: '订单列表'
        }
    },
    {
        path: '/orderListWait',
        name: 'orderListWait',
        component: orderListWait,
        meta: {
            title: '订单列表-待支付'
        }
    },
    {
        path: '/orderListSigned',
        name: 'orderListSigned',
        component: orderListSigned,
        meta: {
            title: '订单列表-已支付'
        }
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: paySuccess,
        meta: {
            title: '支付成功'
        }
    },
    {
        path: '/payFail',
        name: 'payFail',
        component: payFail,
        meta: {
            title: '支付失败'
        }
    },
    {
        path: '/packageOne',
        name: 'packageOne',
        component: packageOne,
        meta: {
            title: '混合云方案一'
        }
    },
    {
        path: '/packageTwo',
        name: 'packageTwo',
        component: packageTwo,
        meta: {
            title: '混合云方案二'
        }
    },
    {
        path: '/userDefined',
        name: 'userDefined',
        component: userDefined,
        meta: {
            title: '混合云自定义'
        }
    },
    {
        path: '/billTotal',
        name: 'billTotal',
        component: billTotal,
        meta: {
            title: '报表总揽'
        }
    },
    {
        path: '/billParticular',
        name: 'billParticular',
        component: billParticular,
        meta: {
            title: '报表明细'
        }
    },
    {
        path: '*',
        redirect: '/home'
    }
];