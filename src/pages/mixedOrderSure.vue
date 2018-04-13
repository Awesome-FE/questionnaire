<template>
    <div class="w">
        <div class="clearfix order_sure_head">
            <div class="fl">
                <div class="title">填写并提交订单信息</div>
                <div class="explain">您的以下订单信息，将为您保存，方便您下次一键提交订单！</div>
            </div>
            <div class="fr progress" style="margin-top: 20px;">
                <div class="clearfix">
                    <div class="fl complete">
                        <div class="bg_bar" style="border-top-left-radius: 1.5px; border-bottom-left-radius: 1.5px;">
                            <div class="number_ball">1</div>
                        </div>
                        <div class="progress_text">选择配置</div>
                    </div>
                    <div class="fl current">
                        <div class="bg_bar">
                            <div class="number_ball">2</div>
                        </div>
                        <div class="progress_text">提交订单</div>
                    </div>
                    <div class="fl wait">
                        <div class="bg_bar">
                            <div class="number_ball">3</div>
                        </div>
                        <div class="progress_text">支付</div>
                    </div>
                    <div class="fl wait">
                        <div class="bg_bar" style="border-top-right-radius: 1.5px; border-bottom-right-radius: 1.5px;">
                            <div class="number_ball">4</div>
                        </div>
                        <div class="progress_text">订单完成</div>
                    </div>
                </div>
            </div>
        </div>
        <div style="font-size: 14px; color: red; margin-top:10px" v-if="errorMessage != null">{{errorMessage}}</div>
        <div class="user_information orderSure_userInfo">
            <div class="order_sure_title">用户信息</div>
            <div class="clearfix">
                <div class="user_head">
                    <label for="">客户类型：</label>
                    <input type="radio" id="one" value="1" v-model.number="customerType" v-bind:class="[customerType == 1 ? 'on' : '']"/>
                    <label for="one">企业</label>
                    <input type="radio" id="zero" value="0" v-model.number="customerType" v-bind:class="[customerType == 0 ? 'on' : '']"/>
                    <label for="zero">个人</label>
                </div>
                <template v-if="customerType == 1">
                    <div>
                        <label for="enterpriseName">公司名称：</label>
                        <input type="text" id="enterpriseName" v-model.trim="enterpriseName" placeholder="请输入公司名"/>
                    </div>
                    <div>
                        <label for="cusName">客户姓名：</label>
                        <input type="text" id="cusName" v-model="cusName" placeholder="请输入真实姓名"/>
                    </div>
                    <div>
                        <label for="phone">联系电话：</label>
                        <input type="text" id="phone" v-model="phone" placeholder="请填写手机号"/>
                    </div>
                </template>
                <template v-if="customerType == 0">
                    <div>
                        <label for="cusName">客户姓名：</label>
                        <input type="text" id="cusName" v-model="cusName" placeholder="请输入真实姓名"/>
                    </div>
                    <div>
                        <label for="phone">联系电话：</label>
                        <input type="text" id="phone" v-model="phone" placeholder="请填写手机号"/>
                    </div>
                </template>
            </div>
        </div>
        <div class="invoice_information">
            <div class="order_sure_title">发票信息</div>
            <div class="clearfix">
                <div class="invoice_head">
                    <label for="">发票类型：</label>
                    <input type="radio" id="no_invoice" value="0" v-model.number="invoiceType" v-bind:class="[invoiceType == 0 ? 'on' : '']"/>
                    <label for="no_invoice">不开发票</label>
                    <input type="radio" id="pt" value="1" v-model.number="invoiceType" v-bind:class="[invoiceType == 1 ? 'on' : '']"/>
                    <label for="pt">普通发票</label>
                    <input type="radio" id="zzs" value="2" v-model.number="invoiceType" v-bind:class="[invoiceType == 2 ? 'on' : '']"/>
                    <label for="zzs">增值税发票</label>
                </div>
                <template v-if="invoiceType == 1">
                    <div>
                        <label for="">发票抬头：</label>
                        <input type="text" v-model="invoiceData.headup" placeholder="请输入发票抬头"/>
                    </div>
                    <div>
                        <label for="">发票内容：</label>
                        <input type="text" v-model="invoiceData.content" placeholder="请输入发票内容"/>
                    </div>
                    <div>
                        <label for="">邮寄地址：</label>
                        <input type="text" v-model="invoiceData.address" placeholder="请输入邮寄地址"/>
                    </div>
                </template>
                <template v-if="invoiceType == 2">
                    <div>
                        <label for="">公司名称：</label>
                        <input type="text" v-model="invoiceData.company" placeholder="请输入公司名称"/>
                    </div>
                    <div>
                        <label for="">纳税人识别号：</label>
                        <input type="text" v-model="invoiceData.taxpayer" placeholder="请输入纳税人识别号"/>
                    </div>
                    <div>
                        <label for="">开户银行：</label>
                        <input type="text" v-model="invoiceData.bank" placeholder="请输入开户银行"/>
                    </div>
                    <div>
                        <label for="">银行账号：</label>
                        <input type="text" v-model="invoiceData.account" placeholder="请输入银行账号"/>
                    </div>
                    <div>
                        <label for="">联系电话：</label>
                        <input type="text" v-model="invoiceData.phoneNumber" placeholder="请输入联系电话"/>
                    </div>
                    <div>
                        <label for="">邮寄地址：</label>
                        <input type="text" v-model="invoiceData.address" placeholder="请输入邮寄地址"/>
                    </div>
                </template>
            </div>
        </div>
        <div class="contract_information">
            <div class="order_sure_title">合同信息</div>
            <div class="clearfix">
                <div class="contract_head">
                    <label for="">是否需要：</label>
                    <input type="radio" id="no_contract" value="0" v-model.number="contract" v-bind:class="[contract == 0 ? 'on' : '']"/>
                    <label for="no_contract">不需要合同</label>
                    <input type="radio" id="need_contract" value="1" v-model.number="contract" v-bind:class="[contract == 1 ? 'on' : '']"/>
                    <label for="need_contract">需要合同</label>
                </div>
                <template v-if="contract == 1">
                    <div>
                        <label for="address">邮寄地址：</label>
                        <input type="text" id="address" v-model="address" placeholder="请输入常住地址"/>
                    </div>
                </template>
            </div>
        </div>
        <div class="referrer_information">
            <div class="order_sure_title">推荐人&nbsp;<span style="color: #999;">(选填)</span></div>
            <div class="clearfix">
                <div>
                    <label for="recommendName">推荐人：</label>
                    <input type="text" id="recommendName" v-model.trim="recommendName" placeholder="请填写推荐人"/>
                </div>
                <div>
                    <label for="recommendPhone">联系电话：</label>
                    <input type="text" id="recommendPhone" v-model.trim="recommendPhone" placeholder="请填写手机号"/>
                </div>
            </div>
        </div>
        <div class="product_inventory independent_product_inventory" v-cloak>
            <div class="order_sure_title">产品清单</div>
            <table v-if="screenWidth > 767" class="mixed_order_table">
                <thead>
                <th colspan="2">产品类型：混合云服务</th>
                </thead>
                <tbody>
                    <tr>
                        <td>地域</td>
                        <td>{{cloudOrderData.terrain}}</td>
                    </tr>
                    <tr>
                        <td>网络</td>
                        <td>公网带宽 <span v-cloak>{{cloudOrderData.bandwidth}}</span> Mbps(专有网络)</td>
                    </tr>
                    <tr v-if="cloudOrderData.cloudSolutionType == 0">
                        <td>镜像</td>
                        <td><span class="mirrorVal">{{cloudOrderData.mirror}}</span></td>
                    </tr>
                    <tr>
                        <td>实例配置</td>
                        <td><span class="mainframeVal">{{cloudOrderData.cloudHostConfig}}</span></td>
                    </tr>
                    <tr>
                        <td>系统盘</td>
                        <td>{{cloudOrderData.systemDiskSize}}GB</td>
                    </tr>
                    <tr>
                        <td>数据盘</td>
                        <td>
                            <div v-if="cloudOrderData.cloudSolutionType == 0 && cloudOrderData.dataDisks.length != 0" v-for="disk in cloudOrderData.dataDisks">{{disk.dataDiskName}}({{disk.dataDiskSize}}GB)</div>
                            <div v-if="cloudOrderData.cloudSolutionType == 0 && cloudOrderData.dataDisks.length == 0"> - </div>
                            <div v-if="cloudOrderData.cloudSolutionType == 1">{{cloudOrderData.dataDiskSize}}GB</div>
                        </td>
                    </tr>
                    <tr v-if="cloudOrderData.cloudSolutionType == 1">
                        <td>数据库存储空间</td>
                        <td>{{cloudOrderData.databaseDiskSize}}GB</td>
                    </tr>
                    <tr v-if="cloudOrderData.cloudSolutionType == 1">
                        <td>数据库内存</td>
                        <td>{{cloudOrderData.databaseMemorySize}}GB</td>
                    </tr>
                    <tr>
                        <td>购买量</td>
                        <td v-if="cloudOrderData.cloudSolutionType == 0"><span class="quantityVal">{{cloudOrderData.buyLength | cloud_month_length_format}} {{cloudOrderData.productQuantity}}台</span></td>
                        <td v-if="cloudOrderData.cloudSolutionType == 1"><span class="quantityVal">{{cloudOrderData.buyLength | cloud_month_length_format}}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="orderSure_total_price" style="font-size: 14px; color: #999;" v-if="cloudOrderData.productType == 5">总价：<span class="red" style="font-size: 30px;">{{totalPrice}}</span><span class="red" style="font-size: 14px">元</span></div>
        <div class="orderSure_total_price" style="font-size: 14px; color: #999;" v-if="cloudOrderData.productType == 6">总价：<span class="red" style="font-size: 30px;">{{cloudOrderData.packageTotalPrice}}</span><span class="red" style="font-size: 14px">元</span></div>
        <div class="immediately_buy clearfix"><a href="javascript:;" @click="submitOrder">提交订单</a></div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import store from "store";
import bus from "../js/eventBus.js";
import util from "../js/util.js";
import $ from "jquery";
import "../js/filter.js";

var price = {
  cloudHostConfig: {
    "2核4GB": {
      m: 196.84,
      "1y": 167.31,
      "2y": 137.79,
      "3y": 98.42
    },
    "2核8GB": {
      m: 244.15,
      "1y": 207.53,
      "2y": 207.53,
      "3y": 207.53
    },
    "4核8GB": {
      m: 393.3,
      "1y": 334.31,
      "2y": 275.31,
      "3y": 196.65
    },
    "4核16GB": {
      m: 489.25,
      "1y": 415.86,
      "2y": 415.86,
      "3y": 415.86
    },
    "8核16GB": {
      m: 787.55,
      "1y": 669.42,
      "2y": 551.28,
      "3y": 393.77
    },
    "8核32GB": {
      m: 978.5,
      "1y": 831.73,
      "2y": 831.73,
      "3y": 831.72
    }
  },
  systemDisks: {
    m: 0.35,
    "1y": 0.35,
    "2y": 0.35,
    "3y": 0.35
  },
  dataDisks: {
    高效云盘: {
      m: 0.35,
      "1y": 0.35,
      "2y": 0.35,
      "3y": 0.35
    },
    SSD云盘: {
      m: 1.0,
      "1y": 1.0,
      "2y": 1.0,
      "3y": 1.0
    }
  },
  bandwidth: {
    m: 72.0,
    "1y": 72.0,
    "2y": 72.0,
    "3y": 72.0
  }
};

export default {
  name: "independentOrderSure",
  data() {
    return {
      customerType: 1,
      enterpriseName: null,
      cusName: null,
      phone: null,
      address: null,
      recommendName: null,
      recommendPhone: null,
      errorMessage: null,
      screenWidth: null,
      cloudOrderData: {},
      invoiceType: 0,
      contract: 0,
      invoiceData: {
        headup: null,
        content: null,
        company: null,
        taxpayer: null,
        address: null,
        phoneNumber: null,
        bank: null,
        account: null
      }
    };
  },
  methods: {
    submitOrder() {
      if (!util.isLogined()) {
        bus.$emit("showLogin");
        return false;
      }
      var token = Cookies.get("raas_accessToken");
      var vueObj = this;
      axios({
        method: "post",
        url: "/order/mixedcloud",
        headers: { accessToken: token },
        data: {
          customerType: vueObj.customerType,
          enterpriseName: util.trimToNull(vueObj.enterpriseName),
          cusName: vueObj.cusName,
          phone: vueObj.phone,
          address: vueObj.address,
          recommendName: util.trimToNull(vueObj.recommendName),
          recommendPhone: util.trimToNull(vueObj.recommendPhone),
          invoiceType: vueObj.invoiceType,
          contract: vueObj.contract,
          invoiceData: vueObj.invoiceData,
          data: [vueObj.cloudOrderData]
        }
      })
        .then(function(response) {
          var orderId = response.data.orderId;
          vueObj.$router.push({
            path: "/payWayThird",
            query: { orderId: orderId, orderType: "5" }
          });
        })
        .catch(function(error) {
          var response = error.response;
          if (typeof response != "undefined") {
            if (response.status == 403) {
              bus.$emit("showLogin");
            } else if (response.status == 400) {
              vueObj.errorMessage = response.data.desc;
              $(document.body).scrollTop(0);
            } else if (response.status == 500) {
              vueObj.errorMessage =
                "提交订单发生错误，请检查订单然后重新提交。（总价不能超过99999999999）";
              $(document.body).scrollTop(0);
            } else {
              vueObj.errorMessage =
                "提交订单发生错误，请检查订单然后重新提交。（总价不能超过99999999999）";
              $(document.body).scrollTop(0);
            }
          }
        });
    },
  },
  computed: {
    totalPrice: function() {
      if (
        this.cloudOrderData.buyLength == null ||
        typeof this.cloudOrderData.buyLength == "undefined"
      ) {
        return "";
      }
      let buyLength = this.cloudOrderData.buyLength;
      let type = "m";
      if (buyLength >= 12) {
        type = buyLength / 12 + "y";
      }
      let result = 0;
      result +=
        price["cloudHostConfig"][this.cloudOrderData.cloudHostConfig][type] *
        buyLength;
      for (let i = 0; i < this.cloudOrderData.dataDisks.length; i++) {
        let dataDisk = this.cloudOrderData.dataDisks[i];
        result +=
          price["dataDisks"][dataDisk.dataDiskName][type] *
          dataDisk.dataDiskSize *
          buyLength;
      }

      result +=
        price["systemDisks"][type] *
        buyLength *
        this.cloudOrderData.systemDiskSize;
      result *= this.cloudOrderData.productQuantity;
      result +=
        price["bandwidth"][type] * buyLength * this.cloudOrderData.bandwidth;
      return result.toFixed(2);
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
    var cloudOrderDataCart = store.get("cloudOrderDataCart");
    // if (
    //   cloudOrderDataCart == null ||
    //   typeof cloudOrderDataCartcloudOrderDataCart == "undefined"
    // ) {
    //   vm.errorMessage = "没有混合云产品提交，请重新选择。";
    //   $(document.body).scrollTop(0);
    //   setTimeout(10, function() {
    //     vm.$router.push({ path: "/home" })
    //   });
    // }
    var cloudOrderData = JSON.parse(cloudOrderDataCart);
    vm.cloudOrderData = cloudOrderData;
  }
};
</script>

<style>
@import "../assets/css/content.css";
</style>
