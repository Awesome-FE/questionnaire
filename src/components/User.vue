<template>
    <div>

    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

// import { XButton } from "vux";
export default {
  data() {
    return {
      loading: false,
      loginText: '登录',
      username: '',
      password: '',
    };
  },
  components: {
    // XButton
  },
  methods: {
      login() {
        const vm = this;
        const { username, password } = vm;
        axios
        .post("/login", {
            username,
            password
            // userName: username,
            // pwd: password
        })
        .then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error);
        });
      },
  }
};
</script>

<style lang="">
.fl {
    float: left;
}
.fr {
    float: right;
}
.login-container {
    text-align: center;
    padding: 20px;
}
.login-container p {

}
input[type="button"] {
    background-color: #006F6B;
    color: #fff;
}
input {
  font-family: Monospaced Number, Chinese Quote, -apple-system,
    BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 20px;
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
</style>