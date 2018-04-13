import Vue from "vue";

// 资源详情页，单价去掉“-/”
Vue.filter('product_unit_price_unit',
    function(value) {
        if (value != null || value != undefined) {
            var str1 = value.replace("-/", "");
            return value = str1;
        }
        return null;
    }
);

// 资源详情页，数量去掉“-”
Vue.filter('lease_quantity_unit',
    function(value) {
        if (value != null || value != undefined) {
            var str1 = value.replace("-", "");
            return value = str1;
        }
        return null;
    }
);

Vue.filter('product_category',
    function(value) {
        var t = '';
        switch (value) {
            case 0:
                t = '混合云服务';
                break;
            case 1:
                t = '孵化服务';
                break;
            case 2:
                t = '高速办公网络';
                break;
            case 3:
                t = '独立办公空间';
                break;
            case 4:
                t = '双创云办公空间';
                break;
            case 5:
                t = '云平台';
                break;
            default:
                t = '未知';
        }
        return t;
    }
);

Vue.filter('time',
    function(value) {
        var date = new Date(value);
        var Y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            H = date.getHours(),
            i = date.getMinutes(),
            s = date.getSeconds();
        m = ('0' + m).substr(-2);
        d = ('0' + d).substr(-2);
        H = ('0' + H).substr(-2);
        i = ('0' + i).substr(-2);
        s = ('0' + s).substr(-2);
        var t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
        return t;
    }
);

Vue.filter('order_status',
    function(value) {
        var t = '';
        switch (value) {
            case 99:
                t = '待支付'
                break;
            case 100:
                t = '审核中'
                break;
            case 102:
                t = '未通过审核'
                break;
            case 106:
                t = '已支付'
                break;
            default:
                t = "";
        }
        return t;
    }
);

Vue.filter('cloud_month_length_format',
    function(value) {
        if (value <= 0) {
            return '-';
        }
        let year = Math.floor(value / 12);
        let mod = value % 12;
        return (year > 0 ? year + '年' : '') + (mod > 0 ? (value - 12 * year) + '个月' : '');
    }
);

// 订单详情页-用户类型
Vue.filter('customer_type',
    function(value) {
        var t = '';
        switch (value) {
            case 0:
                t = '个人';
                break;
            case 1:
                t = '企业';
                break;
            default:
                t = '未知';
        }
        return t;
    }
);

// 订单详情页-发票类型
Vue.filter('invoice_type_desc',
    function(value) {
        var t = '';
        switch (value) {
            case 0:
                t = '不开发票';
                break;
            case 1:
                t = '普通发票';
                break;
            case 2:
                t = '增值税发票';
                break;
        }
        return t;
    }
);

// 订单详情页-是否需要合同
Vue.filter('contract_desc',
    function(value) {
        var t = '';
        switch (value) {
            case 0:
                t = '不需要';
                break;
            case 1:
                t = '需要';
                break;
        }
        return t;
    }
);

// 订单详情页-是否有推荐人
Vue.filter('recommend_desc',
    function(value) {
        var t = '';
        switch (value) {
            case "":
                t = '无';
                break;
            case null:
                t = '无';
                break;
            default:
                t = value;
        }
        return t;
    }
);

// 订单详情页-付款信息
Vue.filter('payment_way',
    function(value) {
        var t = '';
        switch (value) {
            case "0":
                t = '微信支付';
                break;
            case "1":
                t = '支付宝支付';
                break;
            case "2":
                t = '银行转账';
                break;
            case "3":
                t = '银行转账';
                break;
            default:
                t = '未知';
        }
        return t;
    }
);

// 混合云-解决方案页面，把月份转换成年
Vue.filter('cloud_year_length_format',
    function(value) {
        let year = Math.floor(value / 12);
        return (year > 1 ? year + '年' : '年');
    }
);