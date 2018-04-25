<template>
  <div class="home-container">
   	<div class="info-box">
			<x-header>培训项目反映评估及改进书意见</x-header>
			<table class="key-value-table">
				<tr v-for="item in database[0].data" :key="item.title">
					<td class="key">{{ item.title }}：</td>
					<td class="value">{{ item.model }}</td>
				</tr>
			</table>

			<div v-for="(item, index) in database" v-if="index > 0" :key="item.title">
				<h4>{{ item.title }}</h4>
				<div class="questions-box">
					<group  v-for="i in item.data" :key="i.title" :title="i.title + '：' +  i.model">
						<cell primary="content">
							<range v-model="i.model" :step="i.step"></range>
						</cell>
					</group>
				</div>
			</div>

			<h4>改进意见：</h4>
			<group>
				<x-textarea :max="20" v-model="data.advise" :placeholder="placeholder"></x-textarea>
			</group>
			<toast v-model="showPositionValue" type="text" :time="1500" is-show-mask text="请填写完整后保存" width="15em" position="top"></toast>
			<div class="btn-group">
				<XButton class="btn" text="保存" type="primary" @click.native="save"></XButton>
				<XButton class="btn" text="返回" type="primary"></XButton>
			</div>
  	</div>
  </div>
</template>

<script>
import axios from "axios";

import {
  XButton,
  Range,
  Group,
  GroupTitle,
  Cell,
  XTextarea,
  XHeader,
	Toast
} from "vux";
export default {
  data() {
    return {
      placeholder: "随便说点什么吧...",
			showPositionValue: false,
      data: {
				advise: '',  //改进意见
				// activity: 0,  //活动id
				// activityName: 0,  //活动名称
			},
			database: [
				{ 
					type: '', 
					title: '', 
					data: [  
						{ model: '', name: 'trainName', title: '培训项目名称' },
						{ model: '', name: 'undertakeDepartment', title: '承办部门' },
						{ model: '', name: 'projectPerson', title: '项目负责人' },
						{ model: '', name: 'startTime', title: '办班时间' },
					]
				}, { 
					type: 'score',
					title: '项目管理',
					data: [
						{ model: 0, step: 10, name: 'personWork', title: '项目负责人工作' },
						{ model: 0, step: 10, name: 'projectLocal', title: '培训设施场地' },
						{ model: 0, step: 10, name: 'foodLevel', title: '餐饮服务水平' },
						{ model: 0, step: 10, name: 'innLevel', title: '住宿服务水平' },
					]
				}, { 
					type: 'score', 
					title: '培训质量', 
					data: [
						{ model: 0, step: 10, name: 'contentLevel', title: '内容，方法符合需求' },
						{ model: 0, step: 10, name: 'contentDifficultyLevel', title: '内容难易适宜程度' },
						{ model: 0, step: 10, name: 'contentMasterLevel', title: '培训内容掌握程度' },
						{ model: 0, step: 10, name: 'bookLevel', title: '教材资料质量' },
					]
				}, { 
					type: 'score', 
					title: '教师评价', 
					data: [
						{ model: 0, step: 10, name: 'testa', title: '专业技术水平' },
						{ model: 0, step: 10, name: 'testb', title: '授课技巧交流能力' },
						{ model: 0, step: 10, name: 'testc', title: '敬业及责任心' },
					]
				},
			]
    };
  },
  components: {
    Range,
    Group,
    GroupTitle,
    Cell,
    XButton,
    XTextarea,
    XHeader,
		Toast 
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
      this._sendData(data);
    },
		_getData () {
			const { data, database } = this;
			database.forEach(item => {
				item.data.forEach(item2 => {
					data[item2.name] = item2.model;
				})
			});
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

    },
  },
};
</script>
<style>
.questions-box {
  border: 1px solid #d9d9d9;
}
h4 {
  margin: 30px 0 10px;
}
.weui-cell {
	height: 30px;
}
</style>
