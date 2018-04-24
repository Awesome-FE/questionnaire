<template>
  <div class="home-container">
    <x-header>培训需求调研表</x-header>
    <group class="user-info">
      <x-input title="姓名：" v-model="data.name"></x-input>
      <x-input title="年龄：" v-model="data.age"></x-input>
      <x-input title="班组：" v-model="data.team"></x-input>
      <x-input title="岗位：" v-model="data.post"></x-input>
      <x-input title="学历：" v-model="data.education"></x-input>
      <x-input title="职称：" v-model="data.title"></x-input>
      <x-input title="所在部门：" v-model="data.department"></x-input>
      <x-input title="技能等级：" v-model="data.grade"></x-input>
      <x-input title="从事本岗位的年度：" v-model="data.year"></x-input>
    </group>

    <group :title="title1">
      <x-textarea v-model="data.trainPersonalDirection"></x-textarea>
    </group>
    <group :title="title2">
      <x-textarea v-model="data.trainDepartmentDirection"></x-textarea>
    </group>
    <group :title="title3">
      <x-textarea v-model="data.trainMode"></x-textarea>
    </group>
    <group :title="title4">
      <x-textarea v-model="data.trainTeacherRequirement"></x-textarea>
    </group>
    <group :title="title5">
      <x-textarea v-model="data.advise"></x-textarea>
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
			title1: "1.您迫切需要哪方面的培训？",
			title2: "2.您所在团队(单位,班组)最需要哪方面的培训？",
			title3: "3.您期望的培训方式？",
			title4: "4.您对培训师的要求：",
      title5: "5.您对公司培训工作有哪些建议和希望？",
      showPositionValue: false,
      data: {
        nam: '',  //姓名
        age: '',  //年龄
        team: '',  //班组
        post: '',  //岗位
        education: '',  //学历
        title: '',  //职称
        department: '',  //部门
        grade: '',  //等级
        year: '',  //从事本职位年度
        trainPersonalDirection: '',  //您迫切需要哪方面的培训
        trainDepartmentDirection: '',  //团队需要培训的方向
        trainMode: '',  //培训方式
        trainTeacherRequirement: '',  //对培训师要求
        advise: '',  //对培训公司的建议
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
