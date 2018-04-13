<template>
    <div class="w clearfix">
        <div class="myOrder_tab_head">
            <a href="javascript:;" class="selected all" style="letter-spacing: 3px;">全部订单</a>
            <router-link class="waiting" :to="{path: '/orderListWait'}">待支付订单</router-link>
            <router-link class="signed" :to="{path: '/orderListSigned'}">已支付订单</router-link>
        </div>
        <div class="myOrder_tab_body">
            <div class="wait_sign" v-cloak>
                <table v-if="screenWidth > 767" v-for="order in orders">
                    <thead v-if="order.orderType == 3">
                    <tr>
                        <th colspan="3" class="text_left" style="padding-left: 30px;">{{order.orderName}}</th>
                        <th colspan="4" style="text-align: right; padding-right: 30px;"><span>{{order.createTime | time}}</span>&nbsp;&nbsp;&nbsp;<router-link :to="{path: '/independentOrderDetail', query: {orderId: order.orderId}} "><span>订单号：</span><span class="color_six">{{order.orderSn}}</span></router-link></th>
                    </tr>
                    </thead>
                    <thead v-if="order.orderType == 4">
                    <tr>
                        <th colspan="3" class="text_left" style="padding-left: 30px;">{{order.orderName}}</th>
                        <th colspan="4" style="text-align: right; padding-right: 30px;"><span>{{order.createTime | time}}</span>&nbsp;&nbsp;&nbsp;<router-link :to="{path: '/innovationOrderDetail', query: {orderId: order.orderId}} "><span>订单号：</span><span class="color_six">{{order.orderSn}}</span></router-link></th>
                    </tr>
                    </thead>
                    <thead v-if="order.orderType == 5 || order.orderType == 6">
                    <tr>
                        <th colspan="2" class="text_left" style="padding-left: 30px;">{{order.orderName}}</th>
                        <th colspan="3" style="text-align: right; padding-right: 30px;"><span>{{order.createTime | time}}</span>&nbsp;&nbsp;&nbsp;<router-link :to="{path: '/mixedOrderDetail', query: {orderId: order.orderId}} "><span>订单号：</span><span class="color_six">{{order.orderSn}}</span></router-link></th>
                    </tr>
                    </thead>
                    <tbody v-if="order.orderType == 3">
                    <tr>
                        <td>产品名称</td>
                        <td>可售面积</td>
                        <td>单价</td>
                        <td>订购面积</td>
                        <td>总价</td>
                        <td style="width: 84px;">订单状态</td>
                        <td style="border-right: 1px solid #e8e8e8; width: 138px;">操作</td>
                    </tr>
                    <tr v-for="item in order.goodsItems">
                        <td class="table_img independent_table_img">{{item.productName}}</td>
                        <td>{{item.productArea}}平米</td>
                        <td>{{item.productUnitPrice}}元/平米</td>
                        <td>{{item.productQuantity}}平米</td>
                        <td class="total_price red">{{order.orderTotalPrice}}元</td>
                        <td class="check_status theme_color">
                            {{order.orderStatus | order_status}}
                            <div><router-link class="order_detail" :to="{path: '/independentOrderDetail', query: {orderId: order.orderId}} ">订单详情</router-link></div>
                        </td>
                        <td class="compact" v-if="order.orderStatus == 99">
                            <div><a v-if="order.orderStatus == 106" href="javascript:;" class="theme_color export_compact" @click="exportWait">导出合同</a></div>
                            <div><router-link class="pay" v-if="order.orderStatus == 99" :to="{path: '/payWayThird', query: {orderId: order.orderId, productDesc: item.productName, orderSn: order.orderSn, totalPrice: order.orderTotalPrice, orderType: order.orderType}} ">支付</router-link></div>
                        </td>
                        <td class="compact" v-if="order.orderStatus == 106">
                            <!--<a href="javascript:;" class="theme_color export_compact" style="margin-bottom: 5px;">合同详情</a>-->
                            <a href="javascript:;" class="theme_color export_compact" @click="exportWait">导出合同</a>
                        </td>
                        <td v-if="order.orderStatus == 100 || order.orderStatus == 102"></td>
                    </tr>
                    </tbody>
                    <tbody v-if="order.orderType == 4">
                    <tr>
                        <td>产品名称</td>
                        <td>单价</td>
                        <td>租赁时长</td>
                        <td style="width: 60px;">数量</td>
                        <td>总价</td>
                        <td style="width: 84px;">订单状态</td>
                        <td style="border-right: 1px solid #e8e8e8; width: 138px;">操作</td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems">
                        <td class="table_img">{{item.productName}}</td>
                        <td>{{item.productUnitPrice}}元{{item.productUnitPriceUnit | product_unit_price_unit}}</td>
                        <td>{{item.leaseLength}}{{item.leaseLengthUnit}}</td>
                        <td>{{item.leaseQuantity}}{{item.leaseQuantityUnit | lease_quantity_unit}}</td>
                        <td v-if="index == 0" v-bind:rowspan="order.goodsItems.length" class="total_price red">
                            {{order.orderTotalPrice}}元
                        </td>
                        <td v-if="index == 0" v-bind:rowspan="order.goodsItems.length" class="check_status theme_color">
                            {{order.orderStatus | order_status}}
                            <div><router-link class="order_detail" :to="{path: '/innovationOrderDetail', query: {orderId: order.orderId}} ">订单详情</router-link></div>
                        </td>
                        <td v-if="index == 0 && order.orderStatus == 99" v-bind:rowspan="order.goodsItems.length" class="compact">
                            <div><a v-if="order.orderStatus == 106" href="javascript:;" class="theme_color export_compact"
                                    @click="exportWait">导出合同</a></div>
                            <div><router-link class="pay" v-if="order.orderStatus == 99" :to="{path: '/payWayThird', query: {orderId: order.orderId, productDesc: item.productName, orderSn: order.orderSn, totalPrice: order.orderTotalPrice, orderType: order.orderType}} ">支付</router-link></div>
                        </td>
                        <td v-if="index == 0 && order.orderStatus == 106" v-bind:rowspan="order.goodsItems.length" class="compact">
                            <!--<a href="javascript:;" class="theme_color export_compact" style="margin-bottom: 5px;">合同详情</a>-->
                            <a href="javascript:;" class="theme_color export_compact" @click="exportWait">导出合同</a>
                        </td>
                        <td v-if="order.orderStatus == 100 || order.orderStatus == 102"></td>
                    </tr>
                    </tbody>
                    <!--5是自定义混合服务  6是首页点击购买进入的-->
                    <tbody v-if="order.orderType == 5 || order.orderType == 6">
                    <tr>
                        <td colspan="2">产品名称</td>
                        <td>价格</td>
                        <td style="width: 84px;">订单状态</td>
                        <td style="border-right: 1px solid #e8e8e8; width: 138px;">操作</td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems">
                        <td>地域</td>
                        <td>{{item.terrain}}</td>
                        <td v-if="index == 0" rowspan="8" class="total_price red" style="min-width: 90px;">
                            {{order.orderTotalPrice}}元
                        </td>
                        <td v-if="index == 0" rowspan="8" class="check_status theme_color">
                            {{order.orderStatus | order_status}}
                            <div><router-link class="order_detail" :to="{path: '/mixedOrderDetail', query: {orderId: order.orderId}} ">订单详情</router-link></div>
                        </td>
                        <td v-if="index == 0 && order.orderStatus == 99" rowspan="8" class="compact">
                            <div><a v-if="order.orderStatus == 106" href="javascript:;" class="theme_color export_compact"
                                    @click="exportContract(order.orderId)">导出合同</a></div>
                            <div><router-link class="pay" v-if="order.orderStatus == 99" :to="{path: '/payWayThird', query: {orderId: order.orderId, productDesc: '自定义云主机', orderSn: order.orderSn, totalPrice: order.orderTotalPrice, orderType: order.orderType}} ">支付</router-link></div>
                        </td>
                        <td v-if="index == 0 && order.orderStatus == 106" rowspan="8" class="compact">
                            <!--<a href="javascript:;" class="theme_color export_compact" style="margin-bottom: 5px;">合同详情</a>-->
                            <a href="javascript:;" class="theme_color export_compact" @click="exportContract(order.orderId)">导出合同</a>
                        </td>
                        <td v-if="order.orderStatus == 100 || order.orderStatus == 102" rowspan="8"></td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems">
                        <td>网络</td>
                        <td>公网带宽 <span v-cloak>{{item.bandwidth}}</span> Mbps(专有网络)</td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems" v-if="item.cloudSolutionType == 0">
                        <td>镜像</td>
                        <td><span class="mirrorVal">{{item.mirror}}</span></td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems">
                        <td>实例配置</td>
                        <td><span class="mainframeVal">{{item.cloudHostConfig}}</span></td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems">
                        <td>系统盘</td>
                        <td>{{item.systemDiskSize}}GB</td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems">
                        <td>数据盘</td>
                        <td>
                            <div v-if="item.cloudSolutionType == 0 && item.dataDisks != null && item.dataDisks.length != 0" v-for="disk in item.dataDisks">{{disk.dataDiskName}}({{disk.dataDiskSize}}GB)</div>
                            <div v-if="item.cloudSolutionType == 0 && (item.dataDisks == null || item.dataDisks.length == 0)"> - </div>
                            <div v-if="item.cloudSolutionType == 1">{{item.dataDiskSize}}GB</div>
                        </td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems" v-if="item.cloudSolutionType == 1">
                        <td>数据库存储空间</td>
                        <td>{{item.databaseDiskSize}}GB</td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems" v-if="item.cloudSolutionType == 1">
                        <td>数据库内存</td>
                        <td>{{item.databaseMemorySize}}GB</td>
                    </tr>
                    <tr v-for="(item, index) in order.goodsItems">
                        <td>购买量</td>
                        <td v-if="item.cloudSolutionType == 0 || item.cloudSolutionType == null"><span class="quantityVal">{{item.buyLength | cloud_month_length_format}} {{item.productQuantity}}台</span></td>
                        <td v-if="item.cloudSolutionType == 1"><span class="quantityVal">{{item.buyLength | cloud_month_length_format}}</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="information_pagination" class="information_pagination"></div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import Cookies from "js-cookie";
import axios from "axios";
import util from "../js/util.js";
import bus from "../js/eventBus.js";
import "../js/filter.js";
import $ from "jquery";
import pagination from "../js/jq.pagination.js";

var token = Cookies.get("raas_accessToken");

export default {
  name: "orderList",
  data() {
    return {
      url: "/order/list",
      orders: null,
      pageIndex: null,
      pageSize: null,
      totalPage: null,
      screenWidth: null,
      page: {
        currentPage: 1,
        totalPage: null,
        pageSize: 10
      }
    };
  },
  methods: {
    totalPrice(items) {
      var total = 0;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        total += item.productUnitPrice * item.leaseLength * item.leaseQuantity;
      }
      return total;
    },
    exportContract(id) {
      axios({
        method: "get",
        url: "/reports/contract/" + id,
        responseType: "arraybuffer",
        headers: { accessToken: token }
      }).then(function(response) {
        const blob = new Blob([response.data], {
          type: "application/pdf;charset=utf-8"
        });
        saveAs(blob, "contract-" + id + ".pdf");
      });
    },
    exportWait: function() {
      alert("合同正在准备中...");
    },
    loadData(pageIndex) {
      var vm = this;
      axios
        .get("/order/list", {
          headers: { accessToken: token },
          params: {
            orderStatus: 0,
            pageIndex: pageIndex
          }
        })
        .then(function(response) {
          var totalPage = response.data.totalPage;
          var count = response.data.count;
          var pageIndex = response.data.pageIndex;
          var pageSize = response.data.pageSize;
          vm.orders = response.data.data;
          vm.pageIndex = pageIndex;
          vm.pageSize = pageSize;
          vm.totalPage = totalPage;

          $(".information_pagination").pagination({
            pageCount: totalPage,
            totalData: count,
            showData: pageSize,
            current: pageIndex,
            jump: true,
            coping: false,
            callback: function(pagination) {
              vm.loadData(pagination.getCurrent());
            },
            count: 1
          });
        })
        .catch(function(error) {
          if (error.response && error.response.status == 403) {
            bus.$emit("showLogin");
          } else {
            console.log("Error", error.message);
          }
        });
    },
    getData(data) {
      this.orders = data;
    }
  },
  components: {},
  mounted() {
    var vm = this;
    vm.screenWidth = document.body.clientWidth;
    $(window).resize(function() {
      vm.screenWidth = document.body.clientWidth;
    });
    if (!util.isLogined()) {
      bus.$emit("showLogin");
      return false;
    }
    this.loadData(1);

    bus.$on(
      "getOrderType",
      function(orderType) {
        this.orderType = orderType;
      }.bind(this)
    );
  }
};
</script>

<style>
@import "../assets/css/content.css";
</style>

