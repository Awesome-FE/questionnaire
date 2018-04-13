<template>
    <div class="billTotal w">
        <div class="title" id="title"></div>
        <div class="billTotal_content clearfix">
            <div class="menuBar">
                <a href="javascript:;" class="selected">账单总览</a>
                <router-link :to="{path: '/billParticular'}">账单明细</router-link>
            </div>
            <div class="content_right" v-cloak>
                <div class="billTotal_search clearfix">
                    <span>月份</span><input type="text" id="time" readonly @click="showDateDown"/><a href="javascript:;" id="billTotal_searchBtn" class="search_btn" @click="billTotalSearch">搜索</a>
                    <ul id="dateinfo" v-show="dateDown"></ul>
                </div>
                <table id="total_table">
                    <thead>
                        <tr>
                            <th>园区名称</th>
                            <th>产品类型</th>
                            <th>支付金额(元)</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in billTotalList">
                        <tr v-for="(it, index) in item.statisticTypeList">
                            <td v-if="index == 0" v-bind:rowspan="item.statisticTypeList.length">{{item.parkName}}</td>
                            <td>{{it.typeName}}</td>
                            <td>{{it.paymentAmount}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="totalPrice">总金额：{{totalPrice}}元</div>
                <div class="export"><a href="javascript:;" id="totalExport" @click="totalExport">导出</a></div>
                <canvas id="total_canvas"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Cookies from "../js/js.cookie.js";
import util from "../js/util.js";
import bus from "../js/eventBus.js";
import $ from "jquery";

var token = Cookies.get("raas_accessToken");

export default {
  name: "billTotal",
  data() {
    return {
      billTotalList: [],
      totalPrice: null,
      downloadUrl: null,
      dateDown: false
    };
  },
  mounted() {
    var vm = this;
    if (!util.isLogined()) {
      bus.$emit("showLogin");
      return false;
    }

    for (var allinfo = vm.lastYearMonth(), i = 0; i < allinfo.length; i++) {
      $("#dateinfo").append(
        '<li><a href="javascript:;">' + allinfo[i] + "</a></li>"
      );
    }
    $("#dateinfo li").click(function() {
      $("#time").val($(this).text());
      vm.dateDown = false;
    });

    vm.DateInit();
  },
  methods: {
    initData() {
      var vm = this;
      axios
        .get("/reports/overview", {
          headers: { accessToken: token }
        })
        .then(function(response) {
          vm.billTotalList = response.data.data;
          vm.totalPrice = response.data.totalPrice;
        })
        .catch(function(error) {
          if (error.response && error.response.status == 403) {
            bus.$emit("showLogin");
          } else {
            console.log("Error", error.message);
          }
        });
    },
    billTotalSearch() {
      var monthValue = $("#time").val();
      var dt = monthValue.replace(/-/, "");
      $("#title").html(monthValue + "账单总览");
      var vm = this;
      axios({
        method: "get",
        url: "/reports/overview",
        headers: { accessToken: token },
        params: {
          month: dt
        }
      })
        .then(function(response) {
          vm.billTotalList = response.data.data;
          vm.totalPrice = response.data.totalPrice;
        })
        .catch(function(error) {
          if (error.response && error.response.status == 403) {
            bus.$emit("showLogin");
          } else if (error.response && error.response.status == 404) {
            vm.billTotalList = null;
            vm.totalPrice = null;
          } else {
            console.log("Error", error.message);
          }
        });
    },
    totalExport() {
      var monthValue = $("#time").val();
      var dt = monthValue.replace(/-/, "");
      $("#title").html(monthValue + "账单总览");
      axios({
        method: "get",
        url: "/reports/overview/export",
        headers: { accessToken: token },
        params: {
          month: dt
        }
      })
        .then(function(response) {})
        .catch(function(error) {
          if (error.response && error.response.status == 403) {
            bus.$emit("showLogin");
          } else {
            console.log("Error", error.message);
          }
        });
    },
    lastYearMonth() {
      var d = new Date();
      var result = [];
      d.setMonth(d.getMonth() + 1);
      for (var i = 0; i < 12; i++) {
        d.setMonth(d.getMonth() - 1);
        var m = d.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        //在这里可以自定义输出的日期格式
        result.push(d.getFullYear() + "-" + m);
        //result.push(d.getFullYear() + "年" + m + '月');
      }
      return result;
    },
    DateInit() {
      // 标题和input下拉框默认显示当前月份
      var data = new Date();
      var year = data.getFullYear();
      var month = data.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var today = year + "-" + month;
      $("#time").val(today);
      $("#title").html(today + "账单总览");
    },
    showDateDown() {
      this.dateDown = !this.dateDown;
    }
  }
};
</script>

<style>
@import "../assets/css/content.css";
</style>

