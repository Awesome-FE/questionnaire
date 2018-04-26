<template>
  <div class="home-container">
    <x-header>培训需求调研表</x-header>
    <group class="user-info">
      <x-input v-for="item in database.userInfo" 
        :title="item.title"  
        :key="item.title"
				:mask="item.mask || ''"
        v-model="item.model"
				required
      ></x-input>
    </group>

    <group  v-for="item in database.textArea" :key="item.title" :title="item.title">
      <x-textarea v-model="item.model" autosize></x-textarea>
    </group>

    <toast v-model="showPositionValue" type="text" :time="1500" is-show-mask text="请填写完成后保存" width="15em" position="top"></toast>
    <div class="btn-group">
      <XButton class="btn" text="保存" type="primary" @click.native="save"></XButton>
      <XButton class="btn" text="返回" type="primary"></XButton>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { XButton, Toast, XInput, Group, XTextarea, XHeader } from "vux";
export default {
  data() {
    return {
      showPositionValue: false,
      data: {},
      database: {
        userInfo: [
          { model: '', title: "姓名：",  name: "name" },
          { model: '', title: "年龄：",  name: "age", mask: "99" },
          { model: '', title: "班组：",  name: "team" },
          { model: '', title: "岗位：",  name: "post" },
          { model: '', title: "学历：",  name: "education" },
          { model: '', title: "职称：",  name: "title" },
          { model: '', title: "所在部门：",  name: "department" },
          { model: '', title: "技能等级：",  name: "grade" },
          { model: '', title: "从事本岗位的年度：",  name: "year" },
        ],
        textArea: [
          { model: '', title: "1.您迫切需要哪方面的培训？", name: "trainPersonalDirection" },
          { model: '', title: "2.您所在团队(单位,班组)最需要哪方面的培训？", name: "trainDepartmentDirection" },
          { model: '', title: "3.您期望的培训方式？", name: "trainMode" },
          { model: '', title: "4.您对培训师的要求：", name: "trainTeacherRequirement" },
          { model: '', title: "5.您对公司培训工作有哪些建议和希望？", name: "advise" },
        ]
      }
		}
  },
  components: {
		Group,
    XButton,
    Toast,
    XInput,
    XTextarea,
    XHeader
  },
  methods: {
    save () {
      this._getData()
      const { data } = this;
      const values = Object.values(data);
      const emptyValues = values.filter(v => !v);
      if (emptyValues.length) {
        this.showPositionValue = true;
        return;
      }
      // this._sendData(data);
    },
    _getData () {
      const { data, database } = this;
      database.userInfo.forEach(item => {
        data[item.name] = item.model;
      });
      database.textArea.forEach(item => {
        data[item.name] = item.model;
      });
      console.log(data)
    },
    _sendData (data) {
      axios({
        url: '/question/research/save',
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
