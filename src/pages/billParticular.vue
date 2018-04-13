<template>
    <div class="billParticular w">
        <div class="title" id="title"></div>
        <div class="billParticular_content clearfix">
            <div class="menuBar">
                <router-link :to="{path: '/billTotal'}">账单总览</router-link>
                <a href="javascript:;" class="selected">账单明细</a>
            </div>
            <div class="content_right" v-cloak>
                <div class="billParticular_search clearfix">
                    <div>
                        <span>月份</span><input type="text" id="time" readonly class="search_select" @click="showDateDown"/>
                        <ul class="time" id="dateinfo" v-show="dateDown"></ul>
                    </div>
                    <div>
                        <span>园区名称</span><input type="text" placeholder="所有园区" readonly id="billParticularRes" class="search_select" v-model="selectedParkName" @click="showResource"/>
                        <billSearch id="resourceInfo" v-show="resourceDown" v-on:selected="selectPark"></billSearch>
                    </div>
                    <div>
                        <span>产品类型</span><input type="text" placeholder="所有类型" readonly id="billParticularType" class="search_select" @click="showTypeDown"/>
                        <input type="hidden" id="billParticularTypeId"/>
                        <ul id="typeInfo" v-show="typeDown">
                            <li><a href="javascript:;" data-value="0">独立办公空间</a></li>
                            <li><a href="javascript:;" data-value="1">双创云办公</a></li>
                        </ul>
                    </div>
                    <div><span>产品</span><input type="text" id="billParticularName"/></div>
                    <div style="margin-right: 0"><a href="javascript:;" id="billparticular_searchBtn" class="search_btn" @click="billlParticularSeach">搜索</a></div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>合同日期</th>
                            <th>订单号</th>
                            <th>园区名称</th>
                            <th>产品类型</th>
                            <th>单价</th>
                            <th>产品</th>
                            <th>数量</th>
                            <th>租赁时长</th>
                            <th>支付金额(元)</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in particularList">
                        <tr v-for="(it, index) in item.detailsDataList">
                            <td  v-if="index == 0" v-bind:rowspan="item.detailsDataList.length">{{item.contractDate}}</td>
                            <td  v-if="index == 0" v-bind:rowspan="item.detailsDataList.length">{{item.orderId}}</td>
                            <td  v-if="index == 0" v-bind:rowspan="item.detailsDataList.length">{{item.parkName}}</td>
                            <td  v-if="index == 0" v-bind:rowspan="item.detailsDataList.length">{{item.detailsType}}</td>
                            <td>{{it.unitPrice}}{{it.unitPriceUnit}}</td>
                            <td>{{it.name}}</td>
                            <td>{{it.quantity}}{{it.quantityUnit}}</td>
                            <td v-if="item.detailsTypeId == 3">--</td>
                            <td v-if="item.detailsTypeId == 4">{{it.leaseLength}}{{it.leaseLengthUnit}}</td>
                            <td  v-if="index == 0" v-bind:rowspan="item.detailsDataList.length">{{item.paymentAmount}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="totalPrice">总金额：{{totalPrice}}元</div>
                <div class="export"><a href="javascript:;">导出</a></div>
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
import billSearch from "../component/billSearch.vue";

var token = Cookies.get("raas_accessToken");

export default {
  name: "billParticular",
  data() {
    return {
      particularList: [],
      totalPrice: null,
      dateDown: false,
      typeDown: false,
      resourceDown: false,
      selectedParkName: null,
    };
  },
  components: {
    billSearch
  },
  mounted() {
    var vm = this;
    if (!util.isLogined()) {
      bus.$emit("showLogin");
      return false;
    }

    // 月份下拉
    for (var allinfo = vm.lastYearMonth(), i = 0; i < allinfo.length; i++) {
      $("#dateinfo").append(
        '<li><a href="javascript:;">' + allinfo[i] + "</a></li>"
      );
    }
    $("#dateinfo li").click(function() {
      $("#time").val($(this).text());
      vm.dateDown = false;
    });

    // 产品类型下拉
    $("#typeInfo li").click(function() {
      $("#billParticularType").val($(this).text());
      $("#billParticularTypeId").val(
        $($(this).children("a")[0]).attr("data-value")
      );
      vm.typeDown = false;
    });

    vm.DateInit();
  },
  methods: {
    selectPark: function(parkId, parkName) {
      this.selectedParkId = parkId;
      this.selectedParkName = parkName;
      this.resourceDown = false;
    },
    initData() {
      axios
        .get("/reports/details", {
          headers: { accessToken: token }
        })
        .then(function(response) {
          Vue.set(data, "totalPrice", response.data.totalPrice);
          Vue.set(data, "particularList", response.data.data);
        })
        .catch(function(error) {
          if (error.response && error.response.status == 403) {
            bus.$emit("showLogin");
          } else {
            console.log("Error", error.message);
          }
        });
    },
    billlParticularSeach() {
      var monthValue = $("#time").val();
      var dt = monthValue.replace(/-/, "");
      var resourceValue = $("#billParticularRes").val();
      var typeValue = $("#billParticularTypeId").val();
      var nameValue = $("#billParticularName").val();
      $("#title").html(monthValue + "账单明细");
      axios({
        method: "get",
        url: "/reports/details",
        headers: { accessToken: token },
        params: {
          month: dt,
          parkName: resourceValue,
          productType: typeValue,
          productName: nameValue
        },
        transformRequest: [
          function(params) {
            var ret = "";
            for (var it in params) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ]
      })
        .then(function(response) {
          Vue.set(data, "particularList", response.data.data);
          Vue.set(data, "totalPrice", response.data.totalPrice);
        })
        .catch(function(error) {
          if (error.response && error.response.status == 403) {
            bus.$emit("showLogin");
          } else if (error.response && error.response.status == 404) {
            Vue.set(data, "particularList", null);
            Vue.set(data, "totalPrice", null);
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
      $("#title").html(today + "账单明细");
    },
    showDateDown() {
      this.dateDown = !this.dateDown;
    },
    showTypeDown() {
      this.typeDown = !this.typeDown;
    },
    showResource() {
      this.resourceDown = !this.resourceDown;
    },
    hide() {
      this.dateDown = false;
      this.typeDown = false;
    }
  }
};
</script>

<style>
@import "../assets/css/content.css";
</style>