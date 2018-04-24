<template>
  <div class="home-container">
    <div class="fast-entry">
      <h3>快速考试入口</h3>
      <p>通过已有的准考证快速参加考试，具体的准考信息请咨询相关人事。</p>
      <!-- <router-link :to="{path: '/resourceList'}">快速考试</router-link> -->
      <XButton type="primary" text="xxx"></XButton>
    </div>
    <div class="ad-message">
      <h3 @click="click" >活动信息</h3>
      <h1>{{ id }}</h1>
      <p>好消息好消息好消息好消息好消息好消息好消息好消息好消息好消息</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";

import { XButton } from "vux";
export default {
  data() {
    return {};
  },
  components: {
    XButton
  },
  methods: {
    click() {
      console.log(this.$route.query);
    },
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
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
<style>
h3 {
  text-align: center;
  margin-bottom: 10px;
}
.home-container {
  padding: 40px;
}
.ad-message,
.fast-entry {
  border: 1px solid #ccc;
  padding: 10px;
}
.fast-entry {
  margin-bottom: 20px;
}
</style>
