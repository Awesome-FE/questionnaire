<template>
    <form class="login-container">
        <img class="logo" src="../assets/images/logo.png" alt="logo">
        <div class="tips-container">
          <span class="tips">{{ tips }}</span>
        </div>
        <input type="text" placeholder="请输入用户名" v-model="username" autofocus>
        <input type="password" placeholder="请输入密码" v-model="password">
        <XButton 
          :text="loginText" 
          :show-loading="loading"  
          :type="buttonType"
          @click.native="login" 
        >
        </XButton>
        <p class="other-handler clearfix">
          <router-link :to="{path: '/register'}" class="fl">注册</router-link>
          <router-link :to="{path: '/forget'}" class="fr">忘记密码</router-link>
        </p>
    </form>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { XButton, AlertModule  } from 'vux'

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      loginText: '登录',
      username: '',
      password: '',
      clicked: false,
      buttonType: 'primary',
      tips: ''
    };
  },
  components: {
    XButton,
    AlertModule
  },
  methods: {
      login() {
        const vm = this;
        const { username, password } = vm;
        if (!username || !password) {
          vm.tips = '用户名或密码不能为空';
          return;
        }
        vm.loginText = '登录中...'
        vm.loading = true;
        axios
        .post("/login", {
            username,
            password
        })
        .then(resp => {
          vm.loading = false;
          vm.loginText = '登录'
          if (resp.data.code == 0) {
            vm.$router.push({ path: "/home" });
          } else {
            vm.tips = '用户名或密码错误';
          }
        })
        .catch(error => {
            console.log(error);
        });
      },
  }
};
</script>

<style lang="">
.logo {
  margin-top: 10px;
  margin-bottom: 20px;
}
.login-container {
  text-align: center;
  padding: 40px;
  letter-spacing: 1px;
}
.login-container .other-handler {
  margin: 10px 0;
  color: #555;
  padding: 0 2px;
}
.tips-container {
  height: 20px;
  line-height: 20px;
  text-align: left;
  color: red;
  margin-bottom: 5px;
}
input[type="button"] {
  background-color: rgba(24, 144, 255);
  color: #000;
}

input {
  font-family: Monospaced Number, Chinese Quote, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 30px;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  padding: 4px 11px;
  width: 100%;
  height: 40px;
  font-size: 14px;
  line-height: 1.5;
  color: #000;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
input:focus {
  border-color: #40a9ff;
  outline: 0;
  -webkit-box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}
</style>