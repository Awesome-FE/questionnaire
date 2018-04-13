<template>
    <div class="mask" id="forget_password_mask" v-show="forgetPasswordShow" style="display:block">
        <div class="register_email zc">
            <p class="top clearfix" style="margin-bottom: 30px;">忘记密码<img class="close" @click="close" src="../assets/images/register_close.png" alt="点击关闭"/></p>
            <div class="login_fail" v-show="error" style="display:block">{{message}}</div>
            <input type="tel" placeholder="手机号" v-model="phone" class="enter phone"/>
            <div class="PIN clearfix"><input type="text" v-model="verificationCode" placeholder="验证码" class="msg_code"/><input type="button" value="发送验证码" class="send_msg" @click="sendMsg()"/></div>
            <input type="password" placeholder="新密码" v-model="newPassword" class="password enter lock"/>
            <button class="btn_login" @click="login">保存并登录</button>
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
      forgetPasswordShow: false,
      error: false,
      phone: null,
      password: null,
      errorMessage: null,
      message: null,
      verificationCode: null,
      uname: null,
      vcode: null,
      newPwd: null,
      countdown: 60,
      smsType: null,
      userName: null,
      newPassword: null,
      timer: null
    };
  },
  mounted() {
    bus.$on(
      "showForget",
      function() {
        this.forgetPasswordShow = true;
      }.bind(this)
    );
    bus.$on(
      "hideForget",
      function() {
        var $val = $(".send_msg");
        $val.removeAttr("disabled");
        $val.css("backgroundColor", "#c00000");
        $val.css("cursor", "pointer");
        $val.val("发送验证码");
        clearTimeout(this.timer);

        this.forgetPasswordShow = false;
        this.error = false;
        this.phone = null;
        this.verificationCode = null;
        this.newPassword = null;
      }.bind(this)
    );
  },
  methods: {
    close() {
      bus.$emit("hideForget");
    },
    login() {
      var vueObj = this;
      axios
        .post("/user/modifyPwd", {
          uname: vueObj.phone,
          vcode: vueObj.verificationCode,
          newPwd: vueObj.newPassword
        })
        .then(function() {
          axios
            .post("/user/login", {
              userName: vueObj.phone,
              pwd: vueObj.newPassword,
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
          if (error.response) {
            vueObj.error = true;
            if (error.response.data.desc) {
              vueObj.message = error.response.data.desc;
            }
            console.log(error.response);
          } else {
            console.log("Error", error.message);
          }
        });
    },
    sendMsg() {
      var phoneReg = /^(13[0-9]|14[579]|15[012356789]|17[135678]|18[0-9])[0-9]{8}$/;
      if (this.phone == "" || this.phone == "手机号") {
        this.error = true;
        this.message = "请输入手机号。";
        return;
      }
      if (!phoneReg.test(this.phone)) {
        this.error = true;
        this.message = "您输入的手机号不存在。";
        return;
      }
      var vueObj = this;
      axios
        .post("/sendSMSCode", {
          userName: vueObj.phone,
          smsType: 1
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
    }
  }
};
</script>