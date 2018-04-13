<template>
    <div class="mask" id="register_email_mask" v-show="show" style="display:block">
        <div class="register_email zc">
            <p class="top clearfix" style="margin-bottom: 30px;">注册<img class="close" @click="close" src="../assets/images/register_close.png" alt="点击关闭"/></p>
            <div class="login_fail" v-show="error" style="display:block">{{message}}</div>
            <input type="tel" placeholder="手机号" v-model="phone" class="enter phone"/>
            <div class="PIN clearfix"><input type="text" placeholder="验证码" v-model="verificationCode" class="msg_code"/><input type="button" value="发送验证码" class="send_msg" v-on:click="sendMsg()"/></div>
            <input type="password" placeholder="密码" v-model="password" class="password enter lock"/>
            <button class="btn_register" v-on:click="register">注册</button>
            <div class="login clearfix">
                <span class="has_account">已有账号？</span><a href="javascript:;" class="dl" id="login_email" @click="toLogin">立即登录</a>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import bus from "../js/eventBus.js";
import axios from "axios";
import Vue from "vue";
import $ from "jquery";

export default {
  name: "app",
  data() {
    return {
      show: false,
      error: false,
      message: null,
      phone: null,
      password: null,
      verificationCode: null,
      codeId: null,
      vCodeImg: null,
      countdown: 60,
      userName: null,
      pwd: null,
      loginType: null,
      regType: null,
      timer: null
    };
  },
  mounted() {
    bus.$on(
      "showRegister",
      function() {
        this.show = true;
      }.bind(this)
    );
    bus.$on(
      "hideRegister",
      function() {
        var $val = $(".send_msg");
        $val.removeAttr("disabled");
        $val.css("backgroundColor", "#c00000");
        $val.css("cursor", "pointer");
        $val.val("发送验证码");
        clearTimeout(this.timer);

        this.show = false;
        this.phone = null;
        this.password = null;
        this.message = null;
        this.error = false;
        this.verificationCode = null;
      }.bind(this)
    );
  },
  methods: {
    close() {
      bus.$emit("hideRegister");
    },
    toLogin() {
      bus.$emit("hideRegister");
      bus.$emit("showLogin");
    },
    sendMsg() {
      var phoneReg = /^(13[0-9]|14[579]|15[012356789]|17[135678]|18[0-9])[0-9]{8}$/;
      if (!phoneReg.test(this.phone)) {
        this.error = true;
        this.message = "请输入正确的手机号。";
        return;
      }
      var vueObj = this;
      axios
        .post("/sendSMSCode", {
          userName: vueObj.phone,
          smsType: 0
        })
        .then(function(response) {
          vueObj.message = "";
          vueObj.countdown = 60;
          var data = response.data;

          //判断元素是否正处于动画状态
          var isAnimated = $(".send_msg").is(":animated");
          //如果当前没有进行动画，则添加新动画
          if (!isAnimated) {
            vueObj.sendMessage();
          }
        })
        .catch(function(error) {
          if (error.response && error.response.status == 400) {
            vueObj.error = true;
            vueObj.message = error.response.data.desc;
            if (typeof error.response.data.time != "undefined") {
              vueObj.countdown = Number(error.response.data.time);
              //判断元素是否正处于动画状态
              var isAnimated = $(".send_msg").is(":animated");
              //如果当前没有进行动画，则添加新动画
              if (!isAnimated) {
                vueObj.sendMessage();
              }
            }
            console.log(error.response);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    sendMessage() {
      var $val = $(".send_msg");
      if (this.countdown == 0) {
        $val.removeAttr("disabled");
        $val.css("backgroundColor", "#c00000");
        $val.css("cursor", "pointer");
        $val.val("发送验证码");
        this.countdown = 60;
        return false;
      } else {
        $val.attr("disabled", true);
        $val.css("backgroundColor", "#999");
        $val.css("cursor", "default");
        $val.val("重新发送(" + this.countdown + "s)");
        this.countdown--;
        this.timer = setTimeout(this.sendMessage, 1000);
      }
    },
    register() {
      var phoneReg = /^(13[0-9]|14[579]|15[012356789]|17[135678]|18[0-9])[0-9]{8}$/;
      var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (!phoneReg.test(this.phone)) {
        this.error = true;
        this.message = "请输入正确的手机号。";
        return;
      }
      if (this.password == "" || this.password == "密码") {
        this.error = true;
        this.message = "请输入密码。";
        return;
      }
      if (!passwordReg.test(this.password)) {
        this.error = true;
        this.message = "密码必须是数字、字母的组合且长度为8-16位。";
        return;
      }
      if (this.verificationCode == "" || this.verificationCode == "验证码") {
        this.error = true;
        this.message = "请输入验证码";
        return;
      }
      var vueObj = this;
      axios
        .post("/user/register", {
          phone: vueObj.phone,
          password: vueObj.password,
          verificationCode: vueObj.verificationCode,
          regType: 0
        })
        .then(function(response) {
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
        })
        .catch(function(error) {
          if (error.response && error.response.status == 400) {
            vueObj.error = true;
            vueObj.message = error.response.data.desc;
            console.log(error.response);
          } else {
            console.log("Error", error.message);
          }
        });
    }
  }
};
</script>