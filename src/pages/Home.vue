<template>
  <div :class="$style['ready-exam-container']">
	<div :class="$style.logoBox">
		<img :class="$style.logo" src="../assets/images/logo.jpg" alt="logo">
		<h1>问卷调查</h1>
	</div>
  	<div :class="$style['info-box']">
		<table :class="$style['key-value-table']">
			<tr>
				<td :class="$style.key">培训名称：</td>
				<td :class="$style.value">{{ trainName}}</td>
			</tr>
			<tr>
				<td :class="$style.key">承办部门：</td>
				<td :class="$style.value">{{ undertakeDepartment}}</td>
			</tr>
			<tr>
				<td :class="$style.key">培训时间：</td>
				<td :class="$style.value">{{ startTime}}</td>
			</tr>
		</table>                
		<XButton :class="$style['enter-btn']" :link="link" text="开 始" type="primary"></XButton>
  	</div>
	<div :class="$style.tips">
		<p>此次调查问卷共有三项：</p>
		<p>1. 培训项目反映评估及改进书意见</p>
		<p>2. 培训需求调研表</p>	
		<p>3. 培训心得</p>
		<p style="color: red;">* 请依次填写完整并提交。</p>
	</div>

	<div :class="$style.copyright">&copy; 2018 河北电网</div>
  </div>
</template>

<script>
import { XButton } from 'vux'

// import Vue from 'Vue'
import axios from 'axios'
export default {
  components: {
    XButton 
  },
  data() {
    return {
		link: '/train-opinion',
		trainName: '',
		undertakeDepartment: '',
		startTime: ''
    };
  },
	mounted () {
		const vm = this;
		const query = this.$route.query;
		vm.GLOBAL.query = query;
		axios.get('/question/activity/findByToken?token=' + query.token)
		.then(function (resp) {
			const data = resp.data.data;
			data.startTime = data.startTime.replace(/\s.*$/, '');
			
			vm.GLOBAL.data = data;
			console.log(vm.GlOBAL);
			Object.assign(vm, {
				trainName: data.trainName,
				undertakeDepartment: data.undertakeDepartment,
				startTime: data.startTime
			});
		})
		.catch(function (err) {
			console.log(err);
		})
	}
}

</script>
<style module>

.ready-exam-container .enter-btn {
	margin-top: 20px;
	width: 80%;
}
.ready-exam-container .tips {
	margin: 20px;
	padding: 20px;
	box-sizing: border-box;
	color: #666;	
}

.logoBox {
	text-align: center;
	margin: 20px 0;
}
.logoBox .logo {
	height: 80px;
}
h1 {
	display: inline-block;
	text-align: center;
	margin: 0;
	line-height: 80px;
	color: #000;
	vertical-align: top;
}
.tips {
    line-height: 2;
}

.copyright {
	position: absolute;
	width: 100%;
	bottom: 0;
	text-align: center;
	margin-bottom: 15px;
}


.key-value-table {
	width: 100%;
}
.key {
	color: #999;
	width: 40%;
	text-align: right;
	padding: 5px 10px;
}
.value {
	padding-right: 30px;
}
input {
    padding-left: 10px;
}
.btn-group {
    padding: 10px 20px;
    margin: 20px 0;
}


</style>
