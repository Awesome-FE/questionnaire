<template>
    <div>
        <div class="bread_crumb w"><router-link target="_blank" :to="{path: '/orderList'}">我的订单</router-link>&nbsp;&gt;&nbsp;<a href="javascript:;" class="current">订单详情</a></div>
        <div class="w order_detail_status clearfix">
            <div class="order_status fl">
                <div v-cloak v-if="orderStatus == 99 || orderStatus == 107">等待付款</div>
                <div v-cloak v-if="orderStatus == 100">审核中</div>
                <div v-cloak v-if="orderStatus == 102">审核失败</div>
                <div v-cloak v-if="orderStatus == 106 || orderStatus == 101">订单完成</div>
            </div>
            <div class="order_date fr">
                <span v-cloak>{{createTime | time}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-cloak>订单号：{{orderSn}}</span>
            </div>
        </div>
        <div class="w clearfix">
            <div class="myOrder_tab_body detail_content" v-cloak>
                <div class="user_information">
                    <div class="order_sure_title">用户信息</div>
                    <div class="clearfix">
                        <template v-if="customerType == 1">
                            <div>
                                <label>客户类型：</label>
                                <span class="detail">{{customerType | customer_type}}</span>
                            </div>
                            <div>
                                <label>公司名称：</label>
                                <span class="detail">{{enterpriseName}}</span>
                            </div>
                            <div>
                                <label>客户姓名：</label>
                                <span class="detail">{{cusName}}</span>
                            </div>
                            <div>
                                <label>联系电话：</label>
                                <span class="detail">{{phone}}</span>
                            </div>
                        </template>
                        <template v-if="customerType == 0">
                            <div>
                                <label>客户类型：</label>
                                <span class="detail">{{customerType | customer_type}}</span>
                            </div>
                            <div>
                                <label>客户姓名：</label>
                                <span class="detail">{{cusName}}</span>
                            </div>
                            <div>
                                <label>联系电话：</label>
                                <span class="detail">{{phone}}</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="invoice_information">
                    <div class="order_sure_title">发票信息</div>
                    <div class="clearfix">
                        <div class="invoice_head">
                            <label>发票类型：</label>
                            <span class="detail">{{invoiceType | invoice_type_desc}}</span>
                        </div>
                        <template v-if="invoiceType == 1">
                            <div>
                                <label>发票抬头：</label>
                                <span class="detail">{{invoiceData.headup}}</span>
                            </div>
                            <div>
                                <label>发票内容：</label>
                                <span class="detail">{{invoiceData.content}}</span>
                            </div>
                            <div>
                                <label>邮寄地址：</label>
                                <span class="detail">{{invoiceData.address}}</span>
                            </div>
                        </template>
                        <template v-if="invoiceType == 2">
                            <div>
                                <label>公司名称：</label>
                                <span class="detail">{{invoiceData.company}}</span>
                            </div>
                            <div>
                                <label>纳税人识别号：</label>
                                <span class="detail">{{invoiceData.taxpayer}}</span>
                            </div>
                            <div>
                                <label>开户行：</label>
                                <span class="detail" v-bind:title="invoiceData.bank">{{invoiceData.bank}}</span>
                            </div>
                            <div>
                                <label>银行账号：</label>
                                <span class="detail" v-bind:title="invoiceData.account">{{invoiceData.account}}</span>
                            </div>
                            <div>
                                <label>联系电话：</label>
                                <span class="detail">{{invoiceData.phoneNumber}}</span>
                            </div>
                            <div>
                                <label>发票邮寄地址：</label>
                                <span class="detail" v-bind:title="invoiceData.address">{{invoiceData.address}}</span>
                            </div>
                        </template>
                    </div>
                    <div class="repair_invoice">
                        <a href="javascript:;" @click="showRepairInfo">补开发票</a>
                        <div v-bind:class="{none: !isRepairInvoice}">
                            <p>请与客服联系</p>
                            <p>客服电话：400-186-9900</p>
                        </div>
                    </div>
                </div>
                <div class="contract_information">
                    <div class="order_sure_title">合同信息</div>
                    <div class="clearfix">
                        <div class="contract_head">
                            <label>是否需要：</label>
                            <span class="detail">{{contract | contract_desc}}</span>
                        </div>
                        <template v-if="contract == 1">
                            <div>
                                <label>邮寄地址：</label>
                                <span class="detail">{{address}}</span>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="referrer_information">
                    <div class="order_sure_title">推荐人</div>
                    <div class="clearfix">
                        <div>
                            <label>推荐人：</label>
                            <span class="detail">{{recommendName | recommend_desc}}</span>
                        </div>
                        <div>
                            <label>联系电话：</label>
                            <span class="detail">{{recommendPhone | recommend_desc}}</span>
                        </div>
                    </div>
                </div>
                <div v-if="orderStatus == 106 || orderStatus == 104" class="user_information">
                    <div class="order_sure_title">付款信息</div>
                    <div class="clearfix">
                        <div>
                            <label>付款方式：</label>
                            <span class="detail">{{payment | payment_way}}</span>
                        </div>
                        <div>
                            <label>付款时间：</label>
                            <span class="detail">{{paymentTime}}</span>
                        </div>
                        <div>
                            <label>商品总额：</label>
                            <span class="detail">{{orderPrice}}元</span>
                        </div>
                        <div>
                            <label>应付金额：</label>
                            <span class="detail">{{paymentPrice}}元</span>
                        </div>
                    </div>
                </div>
                <div class="product_inventory independent_product_inventory">
                    <div class="order_sure_title">产品清单</div>
                    <table class="detail_table mixed_order_table" v-if="screenWidth > 767">
                        <thead>
                        <th colspan="2">产品类型：混合云服务</th>
                        </thead>
                        <tbody>
                        <tr v-for="item in mixedCloudList">
                            <td>地域</td>
                            <td>{{item.terrain}}</td>
                        </tr>
                        <tr v-for="item in mixedCloudList">
                            <td>网络</td>
                            <td>公网带宽 <span v-cloak>{{item.bandwidth}}</span> Mbps(专有网络)</td>
                        </tr>
                        <tr v-for="item in mixedCloudList" v-if="item.cloudSolutionType == 0">
                            <td>镜像</td>
                            <td><span class="mirrorVal">{{item.mirror}}</span></td>
                        </tr>
                        <tr v-for="item in mixedCloudList">
                            <td>实例配置</td>
                            <td><span class="mainframeVal">{{item.cloudHostConfig}}</span></td>
                        </tr>
                        <tr v-for="item in mixedCloudList">
                            <td>系统盘</td>
                            <td>{{item.systemDiskSize}}GB</td>
                        </tr>
                        <tr v-for="item in mixedCloudList">
                            <td>数据盘</td>
                            <td>
                                <div v-if="item.cloudSolutionType == 0 && item.dataDisks != null && item.dataDisks.length != 0" v-for="disk in item.dataDisks">{{disk.dataDiskName}}({{disk.dataDiskSize}}GB)</div>
                                <div v-if="item.cloudSolutionType == 0 && (item.dataDisks == null || item.dataDisks.length == 0)"> - </div>
                                <div v-if="item.cloudSolutionType == 1">{{item.dataDiskSize}}GB</div>
                            </td>
                        </tr>
                        <tr v-for="(item, index) in mixedCloudList" v-if="item.cloudSolutionType == 1">
                            <td>数据库存储空间</td>
                            <td>{{item.databaseDiskSize}}GB</td>
                        </tr>
                        <tr v-for="(item, index) in mixedCloudList" v-if="item.cloudSolutionType == 1">
                            <td>数据库内存</td>
                            <td>{{item.databaseMemorySize}}GB</td>
                        </tr>
                        <tr v-for="item in mixedCloudList">
                            <td>购买量</td>
                            <td v-if="item.cloudSolutionType == 0 || item.cloudSolutionType == null"><span class="quantityVal">{{item.buyLength | cloud_month_length_format}} {{item.productQuantity}}台</span></td>
                            <td v-if="item.cloudSolutionType == 1"><span class="quantityVal">{{item.buyLength | cloud_month_length_format}}</span></td>
                        </tr>
                        </tbody>
                    </table>
                    <div v-if="orderStatus == 99" class="orderSure_total_price" style="color: #666; font-size: 14px;">总价：<span class="red" style="font-size: 30px;">{{orderPrice}}</span><span class="red" style="font-size: 14px">元</span></div>
                <div v-else class="orderSure_total_price" style="color: #666; font-size: 14px; margin-bottom: 0.4rem;">总价：<span class="red" style="font-size: 30px;">{{orderPrice}}</span><span class="red" style="font-size: 14px">元</span></div>
                <div class="immediately_buy clearfix"><router-link class="pay" target="_blank" v-if="orderStatus == 99" :to="{path: '/payWayThird', query: {orderId: orderId, productDesc: productName, orderSn: orderSn, totalPrice: orderPrice, orderType: '5'}} ">支付</router-link></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import bus from "../js/eventBus.js";
import util from "../js/util.js";
import $ from "jquery";
import "../js/filter.js";

var orderId = util.getParameterByName("orderId");
var token = Cookies.get("raas_accessToken");

export default {
  name: "independentOrderDetail",
  data() {
    return {
      customerType: null,
      enterpriseName: null,
      cusName: null,
      phone: null,
      address: null,
      recommendName: null,
      recommendPhone: null,
      mixedCloudList: [],
      screenWidth: null,
      orderStatus: null,
      payment: null,
      createTime: null,
      orderPrice: null,
      paymentPrice: null,
      invoiceType: null,
      contract: null,
      invoiceData: null,
      orderName: null,
      orderId: null,
      orderSn: null,
      isRepairInvoice: false, //是否补开发票
      paymentTime: null
    };
  },
  methods: {
    showRepairInfo() {
      this.isRepairInvoice = !this.isRepairInvoice;
    },
    initData() {
      var vm = this;
      axios
        .get("/order/mixedcloud/" + orderId, {
          headers: { accessToken: token }
        })
        .then(function(response) {
          var resData = response.data;
          Object.assign(vm, {
            customerType: resData.customerType,
            enterpriseName: resData.enterpriseName,
            cusName: resData.cusName,
            phone: resData.phone,
            address: resData.address,
            recommendName: resData.recommendName,
            recommendPhone: resData.recommendPhone,
            orderStatus: resData.data.orderStatus,
            mixedCloudList: resData.data.goodsItems,
            payment: resData.payment,
            paymentTime: resData.paymentTime,
            createTime: resData.createTime,
            orderPrice: resData.orderPrice,
            paymentPrice: resData.paymentPrice,
            invoiceType: resData.invoiceType,
            contract: resData.contract,
            invoiceData: resData.invoiceData,
            orderName: resData.orderName,
            orderSn: resData.data.orderSn,
            orderId: orderId
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
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

    vm.initData();
  }
};
</script>

<style>
@import "../assets/css/content.css";
</style>
