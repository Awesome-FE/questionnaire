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

			<div class="questions-container" v-for="(item, index) in database" v-if="index > 0" :key="item.title + item.teacherName">
				<h4 v-if="item.teacherName">{{ item.title + '：' + item.teacherName }}</h4>
				<h4 v-else>{{ item.title }}</h4>
				<div class="questions-box">
					<group  v-for="i in item.data" :key="i.title" :title="i.title + '：<i>' +  i.model + '</i>'">
						<cell primary="content">
							<range v-model="i.model" :step="i.step"></range>
						</cell>
					</group>
				</div>
			</div>

			<div class="questions-container">
				<h4>改进意见：</h4>
				<group>
					<x-textarea v-model="data.advise" :placeholder="placeholder" autosize></x-textarea>
				</group>
			</div>
			<toast v-model="showPositionValue" type="text" :time="1500" is-show-mask text="请填写完整后保存" width="15em" position="top"></toast>
			<div class="btn-group">
				<XButton class="btn" text="下一步" type="primary" @click.native="save"></XButton>
			</div>
  	</div>
  </div>
</template>

<script>
import axios from "axios";
import util from "../js/util";

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
        advise: "" //改进意见
      },
      database: [
        {
          type: "",
          title: "",
          data: [
            { model: "", name: "trainName", title: "培训名称" },
            { model: "", name: "undertakeDepartment", title: "承办部门" },
            { model: "", name: "projectPerson", title: "项目负责人" },
            { model: "", name: "startTime", title: "办班时间" }
          ]
        },
        {
          type: "score",
          title: "项目管理",
          data: [
            { model: 0, step: 10, name: "personWork", title: "项目负责人工作" },
            { model: 0, step: 10, name: "projectLocal", title: "培训设施场地" },
            { model: 0, step: 10, name: "foodLevel", title: "餐饮服务水平" },
            { model: 0, step: 10, name: "innLevel", title: "住宿服务水平" }
          ]
        },
        {
          type: "score",
          title: "培训质量",
          data: [
            {
              model: 0,
              step: 10,
              name: "contentLevel",
              title: "内容，方法符合需求"
            },
            {
              model: 0,
              step: 10,
              name: "contentDifficultyLevel",
              title: "内容难易适宜程度"
            },
            {
              model: 0,
              step: 10,
              name: "contentMasterLevel",
              title: "培训内容掌握程度"
            },
            { model: 0, step: 10, name: "bookLevel", title: "教材资料质量" }
          ]
        },
        {
          type: "teacher",
          title: "教师评价",
          teacherName: "",
          data: [
            {
              model: 0,
              step: 10,
              name: "teacherTechnologyLeve",
              title: "专业技术水平"
            },
            {
              model: 0,
              step: 10,
              name: "teacherCommunicationLeve",
              title: "授课技巧交流能力"
            },
            {
              model: 0,
              step: 10,
              name: "teacherResponsibilityLeve",
              title: "敬业及责任心"
            }
          ]
        }
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
    save() {
      this._getData();
      const { data } = this;
      const values = Object.values(data);
      const emptyValues = values.filter(v => !v);
      if (emptyValues.length) {
        this.showPositionValue = true;
        return;
      }
      this._sendData(data);
    },
    _getData() {
      const { data, database } = this;
      data.sssessmentTeacher = [];
      database.forEach(item => {
        if (item.type === "teacher") {
          const obj = {};
          Object.assign(obj, {
            id: item.id,
            teacherName: item.teacherName
          });
          item.data.forEach(function(item2) {
            obj[item2.name] = item2.model;
          });
          data.sssessmentTeacher.push(obj);
        } else {
          item.data.forEach(item2 => {
            data[item2.name] = item2.model;
          });
        }
      });
    },
    _sendData(data) {
      data.assessmentTeacherDO = JSON.stringify(data.sssessmentTeacher);
      delete data.sssessmentTeacher;

      axios({
        method: "post",
        url: "/question/assessment/save",
        data: data
      })
        .then(this._successHandler)
        .catch(this._errHandler);
    },
    _successHandler(resp) {
      util.redirectToNextPage(this);
    },
    _errHandler(err) {}
  },
  mounted() {
    const vm = this;
    vm.data.activity = vm.GLOBAL.data.id; //活动id
    vm.data.activityName = vm.GLOBAL.data.trainName; //活动名称

    vm.database[0]["data"].forEach(function(item) {
      item.model = vm.GLOBAL.data[item.name] || "";
    });

    axios
      .get("/question/activity/find?id=" + vm.data.activity)
      .then(function(resp) {
        const database = vm.database;
        const teachers = resp.data.TeacherDO;

        const arr = database.pop();
        if (arr.type === "teacher") {
          teachers.forEach(function(item) {
            const newArr = JSON.parse(JSON.stringify(arr));
            Object.assign(newArr, {
              teacherName: item.name,
              id: item.id
            });
            database.push(newArr);
          });
        }
      })
      .catch(function() {});
  }
};
</script>
<style>
.key-value-table {
  margin-top: 20px;
}
.questions-container {
  padding: 10px;
}
.questions-box {
  border: 1px solid #d9d9d9;
}
.questions-box i {
  color: #04be02;
  font-size: 16px;
}
h4 {
  margin: 30px 0 10px;
}
.weui-cell {
  height: 30px;
}
.vux-x-textarea {
  height: 80px;
  border-left: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
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
</style>
