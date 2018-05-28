<template>
  <div class="home-container">
    <x-header>培训心得</x-header>

    <group v-for="(item, index) in database" :key="item.title" class="user-info">
      <x-input :title="item.title" v-model="item.model"></x-input>
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
      database: [
        { model: '', name: 'name',  title: '名称' },
        { model: '', name: 'time',  title: '培训时间' },
        { model: '', name: 'personalname',  title: '个人名字' },
        { model: '', name: 'personaldepartment',  title: '单位名称' },
        { model: '', name: 'post',  title: '岗位' },
        { model: '', name: 'learnexperience',  title: '学习心得体会' },
        { model: '', name: 'createTime',  title: '创建时间' }
      ],
      data: {
        learnexperience: '', // 和学习心得体会重复，需确认！！！！！！！！
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
      this._getData();
      debugger
      const { data } = this;
      const values = Object.values(data);
      const emptyValues = values.filter(v => !v);
      if (emptyValues.length) {
        this.showPositionValue = true;
        return;
      }
      this._sendData(data);
    },
    _getData () {
      const { data, database } = this;
      console.log('database: ', database)
      database.forEach((item) => {
        var obj = {};
        data[item.name] = item.model;
      });
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
			util.redirectToNextPage(this);
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
