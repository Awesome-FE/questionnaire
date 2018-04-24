<template>
  <div class="home-container">
   	<div class="info-box">
			<h1>培训项目反映评估及改进书意见</h1>
			<table class="key-value-table">
				<tr>
					<td class="key">培训项目名称：</td>
					<td class="value">{{ username }}</td>
				</tr>
				<tr>
					<td class="key">承办部门：</td>
					<td class="value">{{ username }}</td>
				</tr>
				<tr>
					<td class="key">项目负责人：</td>
					<td class="value">{{ username }}</td>
				</tr>
				<tr>
					<td class="key">办班时间：</td>
					<td class="value">{{ username }}</td>
				</tr>
			</table>
			<h4>项目管理：</h4>
			<div class="questions-box">
				<group title="项目负责人工作：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="培训设施场地：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="餐饮服务水平：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="住宿服务水平：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
			</div>
			<h4>培训质量：</h4>
			<div class="questions-box">
				<group title="内容，方法符合需求：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="内容难易适宜程度：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="培训内容掌握程度：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
					</cell>
				</group>
				<group title="教材资料质量：">
					<cell title="" :inline-desc="data" primary="content">
						<range v-model="data" @on-change="onChange" :step=10></range>
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
				<x-textarea :max="20" :placeholder="placeholder" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
			</group>

			<XButton class="btn" text="保存" type="primary"></XButton>
			<XButton class="btn" text="返回" type="primary"></XButton>
  	</div>
  </div>
</template>

<script>
import axios from "axios";

import { XButton, Range, Group, GroupTitle, Cell, XTextarea } from 'vux';
export default {
  data() {
    return {
			placeholder: '随便说点什么吧...',
			username: 'zwc',
			data: 0
		};
  },
  components: {
    Range,
    Group,
    GroupTitle,
    Cell,
    XButton,
		XTextarea
  },
  methods: {
    onEvent (event) {
      console.log('on', event)
    },
    onChange (val) {
      console.log('change', val)
    },
    update () {
      this.min = Math.floor(Math.random() * 30)
      this.max = Math.floor(50 + Math.random() * 100)
      this.step = 1 + Math.floor(Math.random() * 10)
    }
  },
  computed: {
  }
};
</script>
<style>
.questions-box {
	border: 1px solid #d9d9d9;
	
}
.btn {
	width: 30%!important;
	display: inline-block!important;
}
h4 {
	margin: 30px 0 10px;
}
</style>
