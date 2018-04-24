<template>
  <div class="ready-exam-container">
		<div class="logoBox"><img class="logo" src="../assets/images/logo.png" alt="logo"></div>
  	<div class="info-box">
			<h1>问卷调查</h1>
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
					<td class="key">时间：</td>
					<td class="value">{{ username }}</td>
				</tr>
			</table>
			<XButton class="enter-btn" :link="link" text="开 始" type="primary"></XButton>
			<div class="tips">
				<p>此次调查问卷共有三项，请依次填写完整并提交</p>
				<p>1. 培训项目反映评估及改进书意见</p>
				<p>2. 培训需求调研表</p>	
				<p>3. 培训心得</p>
			</div>
  	</div>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  components: {
    XButton 
  },
  data() {
    return {
			username: '张文才',
			link: '/train-opinion',
    };
  },
}

</script>
<style>

.key-value-table {
	width: 100%;
}
.key-value-table .key {
	color: #999;
	width: 40%;
	text-align: right;
	padding: 5px 10px;
}
.ready-exam-container .enter-btn {
	margin-top: 20px;
	width: 80%;
}
.ready-exam-container .tips {
	margin: 20px;
	padding: 20px 0;
	box-sizing: border-box;
	color: #666;	
}

.logoBox {
	text-align: center;
	margin: 20px 0;
}
h1 {
	text-align: center;
	margin: 10px 0;
}
</style>
