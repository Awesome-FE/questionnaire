import Cookies from "js-cookie";

let util = {};

util.getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

util.isLogined = function() {
    var userName = Cookies.get('raas_userName');
    var accessToken = Cookies.get('raas_accessToken');
    if (typeof(userName) === 'undefined' ||
        typeof(accessToken) === 'undefined') {
        return false;
    }
    return true;
};

util.checkUserThenDoAction = function(func, redirectUrl) {
    if (util.isLogined()) {
        if (typeof(func) == 'function') {
            func();
        }
    } else {
        bus.$emit('showLogin', redirectUrl);
    }
};

// 暂时没有用
util.getToken = function() {
    var accessToken = Cookies.get('raas_accessToken');
    return accessToken;
};

util.trimToNull = function(str) {
    if (str == "" || str == null) {
        return null;
    }
    return str.trim();
};

export default util;