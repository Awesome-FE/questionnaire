<template>
  <div class="home-container">
   	<div class="info-box">
			<x-header>培训项目反映评估及改进书意见</x-header>
			<table class="key-value-table">
				<tr>
					<td class="key">培训项目名称：</td>
					<td class="value">{{ data.trainName }}</td>
				</tr>
				<tr>
					<td class="key">承办部门：</td>
					<td class="value">{{ data.undertakeDepartment }}</td>
				</tr>
				<tr>
					<td class="key">项目负责人：</td>
					<td class="value">{{ data.projectPerson }}</td>
				</tr>
				<tr>
					<td class="key">办班时间：</td>
					<td class="value">{{ data.startTime }}</td>
				</tr>
			</table>
			<h4>项目管理：</h4>
			<div class="questions-box">
				<group title="项目负责人工作：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data.personWork" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="培训设施场地：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data.projectLocal" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="餐饮服务水平：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data.foodLevel" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="住宿服务水平：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data.innLevel" @on-change="onChange" :step=10></range>
					</cell>
				</group>
			</div>
			<h4>培训质量：</h4>
			<div class="questions-box">
				<group title="内容，方法符合需求：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data.contentLevel" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="内容难易适宜程度：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data.contentDifficultyLevel" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="培训内容掌握程度：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data.contentMasterLevel" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="教材资料质量：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data.bookLevel" @on-change="onChange" :step=10></range>
					</cell>
				</group>
			</div>
			<h4>教师评价：</h4>
			<div class="questions-box">
				<group title="专业技术水平：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="授课技巧交流能力：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="敬业及责任心：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
			</div>
			<h4>改进意见：</h4>
			<group>
				<x-textarea :max="20" v-model="data.advise" :placeholder="placeholder" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
			</group>
			<toast v-model="showPositionValue" type="text" :time="1500" is-show-mask text="请填写完成后保存" width="15em" position="top"></toast>
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
  XHeader
} from "vux";
export default {
  data() {
    return {
      placeholder: "随便说点什么吧...",
      data: {
				trainName: '',  //培训项目名称
				undertakeDepartment: '',  //承办部门
				projectPerson: '',  //项目负责人
				startTime: '',  //开始时间
				personWork: '',  //项目负责人工作分数
				projectLocal: '',  //培训设施场地分数
				foodLevel: '',  //餐饮分数
				innLevel: '',  //住宿分数
				contentLevel: '',  //内容，方法符合要求分数
				contentDifficultyLevel: '',  //内容难易适合分数
				contentMasterLevel: '',  //内容掌握程度分数
				bookLevel: '',  //教材质量
				advise: '',  //建议
				// 这两个没用上，另外教师评价类下三个没有对应的字段
				activity: '',  //活动id
				activityName: '',  //活动名称
			}
    };
  },
  components: {
    Range,
    Group,
    GroupTitle,
    Cell,
    XButton,
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
.questions-box {
  border: 1px solid #d9d9d9;
}
h4 {
  margin: 30px 0 10px;
}
</style>
