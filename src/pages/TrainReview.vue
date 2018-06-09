<template>
  <div class="home-container">
    <x-header>培训心得</x-header>

    <group v-for="(item, index) in database" :key="item.title" class="user-info">
      <x-input :title="item.title" v-model="item.model" :readonly="item.readonly"></x-input>
    </group>

    <group title="心得">
      <x-textarea v-model="data.learnexperience"  :placeholder="placeholder" ></x-textarea>
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

import {
  XButton,
  Toast,
  XInput,
  Group,
  XTextarea,
  XHeader
} from "vux";
export default {
  data() {
    return {
      placeholder: "随便说点什么吧...",
      showPositionValue: false,
      database: [
        { model: "", name: "name", title: "名称", readonly: true },
        { model: "", name: "time", title: "培训时间", readonly: true },
        { model: "", name: "personalname", title: "个人名字" },
        { model: "", name: "personaldepartment", title: "单位名称" },
        { model: "", name: "post", title: "岗位" }
      ],
      data: {
        learnexperience: ""
      }
    };
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
      database.forEach(item => {
        var obj = {};
        data[item.name] = item.model;
      });
    },
    _sendData(data) {
      axios({
        method: "post",
        url: "/experience/save",
        data: data
      })
        .then(this._successHandler)
        .catch(this._errHandler);
    },
    _successHandler(resp) {
      if (resp.data.code == 0) {
        util.redirectToNextPage(this);
      }
    },
    _errHandler(err) {}
  },
  mounted() {
    const vm = this;
    console.info(vm.GLOBAL);
    vm.database.forEach(function(item) {
      if (item.name == "name") {
        item.model = vm.GLOBAL.data["trainName"];
      }
      if (item.name == "time") {
        item.model = vm.GLOBAL.data["startTime"];
      }
    });
  }
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
