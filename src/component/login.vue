<template>
    <div class="mask" id="login_email_mask" v-show="show">
        <div class="login_email dl_login" v-on:keydown="keyLogin">
            <p class="top_dl top clearfix">登录<img class="close" src="../assets/images/register_close.png" v-on:click="close" alt="点击关闭"/></p>
            <div class="login_fail" v-show="error">{{errorMessage}}</div>
            <input type="tel" placeholder="手机号" v-model="phone" class="enter phone"/>
            <input type="password" placeholder="密码" v-model="password" class="enter lock"/>
            <div class="verification_code clearfix" v-show="hasVcode"><input type="text" v-model="vcode" placeholder="验证码" @keyup.enter="login"/><img v-bind:src="vCodeImg" @click="reloadVCode" style="float: right" alt=""/></div>
            <div style="position: relative;height: 0.26rem;display: none"><input type="checkbox" class="checkbox">&nbsp;<span class="auto_login">自动登录</span></div>
            <button class="btn_login" v-on:click="login">登录</button>
            <div class="clearfix"><div class="line_left"></div><a href="javascript:;" class="forget_password" v-on:click="forgetShow">忘记密码？</a><div class="line_right"></div></div>
            <div class="login clearfix">
                <a href="javascript:;" class="change_wechat" v-on:click="toWechatLogin">微信登录</a><a href="javascript:;" id="register_email" v-on:click="toRegister">立即注册</a>
            </div>
            <input type="hidden" v-model="redirectUrl"/>
        </div>
    </div>
</template>

<script type="text/javascript">
import bus from "../js/eventBus.js";
import axios from "axios";
import Vue from "vue";
import $ from "jquery";
import Cookies from "../js/js.cookie.js";

export default {
  name: "app",
  data() {
    return {
      show: false,
      error: false,
      hasVcode: false,
      phone: null,
      password: null,
      vcode: null,
      codeId: null,
      vCodeImg: null,
      errorMessage: null,
      redirectUrl: null,
      userName: null,
      pwd: null,
      loginType: null,
      verificationCode: null,
      newCodeId: null,
      isNeedVcode: null,
      openId: null
    };
  },
  mounted() {
    bus.$on(
      "showLogin",
      function(redirectUrl) {
        this.show = true;
        if (
          redirectUrl != null &&
          redirectUrl != "undefined" &&
          typeof redirectUrl != "undefined"
        ) {
          this.redirectUrl = redirectUrl;
        }
      }.bind(this)
    );
    bus.$on(
      "hideLogin",
      function() {
        this.show = false;
        this.error = false;
        this.phone = null;
        this.password = null;
        this.vcode = null;
      }.bind(this)
    );
  },
  methods: {
    close() {
      bus.$emit("hideLogin");
    },
    toRegister() {
      bus.$emit("hideLogin");
      bus.$emit("showRegister");
    },
    forgetShow() {
      bus.$emit("hideLogin");
      bus.$emit("showForget");
    },
    toWechatLogin() {
      var redirect_uri_val = encodeURI(
        "https://www.cecpark.net/wechat_blank.html"
      );
      window.location.href =
        "https://open.weixin.qq.com/connect/qrconnect?appid=wxa90e91785d994cfd&redirect_uri=" +
        redirect_uri_val +
        "&response_type=code&scope=snsapi_login";
    },
    login() {
      var vueObj = this;
      if (vueObj.isNeedVcode == 1) {
        vueObj.hasVcode = true;
        axios
          .post("/user/login", {
            userName: vueObj.phone,
            pwd: vueObj.password,
            verificationCode: vueObj.vcode,
            loginType: "0",
            newCodeId: vueObj.codeId
          })
          .then(function(response) {
            var in60Minutes = 1 / 24;
            Cookies.set("raas_userName", response.data.userName, {
              expires: in60Minutes
            });
            Cookies.set("raas_accessToken", response.data.accessToken, {
              expires: in60Minutes
            });
            vueObj.show = false;
            bus.$emit("refreshOrJump", vueObj.redirectUrl);
          })
          .catch(function(error) {
            if (error.response && error.response.status == 404) {
              vueObj.error = true;
              if (error.response.data.desc) {
                vueObj.errorMessage = error.response.data.desc;
              } else {
                vueObj.errorMessage = "用户名或密码错误";
              }
              console.log(error.response);
            } else {
              console.log("Error", error.message);
            }
          });
      } else {
        axios
          .post("/user/login", {
            userName: vueObj.phone,
            pwd: vueObj.password,
            loginType: 0
          })
          .then(function(response) {
            var in60Minutes = 1 / 24;
            Cookies.set("raas_userName", response.data.userName, {
              expires: in60Minutes
            });
            Cookies.set("raas_accessToken", response.data.accessToken, {
              expires: in60Minutes
            });
            vueObj.show = false;
            bus.$emit("refreshOrJump", vueObj.redirectUrl);
          })
          .catch(function(error) {
            if (error.response && error.response.status == 404) {
              vueObj.error = true;
              if (error.response.data.needVcode == 1) {
                vueObj.isNeedVcode = 1;
                vueObj.hasVcode = true;
              }
              if (error.response.data.desc) {
                vueObj.errorMessage = error.response.data.desc;
              } else {
                vueObj.errorMessage = "用户名或密码错误";
              }
              console.log(error.response);
            } else {
              console.log("Error", error.message);
            }
          });
      }
    },
    keyLogin(event) {
			var vueObj = this;
			if (event.keyCode==13) {  //回车键的键值为13
				vueObj.login();
			}
		},
    reloadVCode() {}
  }
};
</script>

<style></style>