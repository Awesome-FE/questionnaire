<template>
 <div class="nav">
   <div class="w clearfix">
      <div class="fl"><router-link to="/home"><a href="javascript:;"></a></router-link></div>
      <div class="fr">
          <ul class="clearfix">
              <li><router-link target="_blank" class="br" to="/orderList">我的订单</router-link></li>
              <li><router-link target="_blank" class="br" to="/billTotal">我的报表</router-link></li>

              <template v-if="logined()">
                  <li><a href="javascript:;">{{userName}}</a></li>
                  <li><a href="javascript:;" v-on:click="logout">退出登录</a></li>
              </template>
              <template v-else>
                  <li><a href="javascript:;" class="br login_phone header_login" v-on:click="loadLogin">登录</a></li>
                  <li><a href="javascript:;" class="register_phone header_register" v-on:click="loadRegister">注册</a></li>
              </template>
          </ul>
      </div>
  </div>
 </div>
</template>

<script type="text/javascript">
import bus from "../js/eventBus.js";
import Cookies from "../js/js.cookie.js";

export default {
  name: "Header",
  data() {
    return {
      userName: null,
      accessToken: null
    };
  },
  components: {},
  methods: {
    loadLogin() {
      bus.$emit("showLogin");
    },
    loadRegister() {
      bus.$emit("showRegister");
    },
    logout() {
      Cookies.remove('raas_userName');
			Cookies.remove('raas_accessToken');
			window.location.href = "index.html";
    },
    logined() {
      var userName = Cookies.get('raas_userName');
			var accessToken = Cookies.get('raas_accessToken');
			if (typeof(userName) === 'undefined' ||
				typeof(accessToken) === 'undefined') {
				return false;
			}
			this.userName = userName;
			this.accessToken = accessToken;
			return true;
    }
  },
  mounted() {
    bus.$on(
      "refreshOrJump",
      function(redirectUrl) {
        if (redirectUrl != null && typeof redirectUrl != "undefined") {
          window.location.href = redirectUrl;
        } else {
          window.location.reload();
        }
      }.bind(this)
    );
  }
};
</script>

<style>

</style>