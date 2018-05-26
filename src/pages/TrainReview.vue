<template>
  <div class="home-container">
    <x-header>培训心得</x-header>
    <group class="user-info">
      <x-input title="姓名：" v-model="data.name"></x-input>
      <x-input title="单位：" v-model="data.personaldepartment"></x-input>
      <x-input title="岗位：" v-model="data.post"></x-input>
      <x-input title="培训名称：" v-model="data.grade"></x-input>
      <x-input title="培训时间：" v-model="data.time"></x-input>
    </group>

    <group title="心得">
      <x-textarea v-model="data.learnexperience"></x-textarea>
    </group>
    <toast v-model="showPositionValue" type="text" :time="1500" is-show-mask text="请填写完成后保存" width="15em" position="top"></toast>
    <div class="btn-group">
      <XButton class="btn" text="下一步" type="primary" @click.native="save"></XButton>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import util from "../js/util";

import { XButton, Toast, Datetime, XInput, Group, XTextarea, XHeader  } from "vux";
export default {
  data() {
    return {
      showPositionValue: false,
      data: {
        name: '',  //名称
        time: '',  //培训时间
        personalname: '',  //个人名字
        personaldepartment: '',  //单位名称
        post: '',  //岗位
        learnexperience: '',  //学习心得体会
        createTime: '',  //创建时间
      }
		}
  },
  components: {
		Group,
    XButton,
    Toast,
    Datetime,
    XInput,
    XTextarea,
    XHeader 
  },
  methods: {
    save () {
			util.redirectToNextPage(this);
      const { data } = this;
      const values = Object.values(data);
      const emptyValues = values.filter(v => !v);
      if (emptyValues.length) {
        this.showPositionValue = true;
        return;
      }
      this._sendData(data);
    },
    _sendData (data) {
      axios({
        url: '/question/experience/save',
        data: data,
        success: this._successHandler,
        error: this._errHandler
      })
    },
    _successHandler (resp) {

    },
    _errHandler (err) {

    }
  },
};
</script>
<style>
.key-value-table .key {
	width: 50%;
}
.key-value-table input {
  height: 30px;
  margin: 4px 0;
}
</style>
