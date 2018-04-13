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
        <div class="product_inventory" v-cloak>
            <div class="order_sure_title">产品清单</div>
            <table v-if="screenWidth > 767">
                <thead>
                <th>产品类型</th>
                <th>产品</th>
                <th>单价</th>
                <th>数量</th>
                <th>租赁时长</th>
                </thead>
                <tbody>
                <tr v-for="item in innovationList">
                    <td>{{item.productCategory | product_category}}</td>
                    <td>{{item.productName}}</td>
                    <td>{{item.productUnitPrice}}元{{item.productUnitPriceUnit | product_unit_price_unit}}</td>
                    <td>{{item.leaseQuantity}} {{item.leaseQuantityUnit | lease_quantity_unit}}</td>
                    <td>{{item.leaseLength}} {{item.leaseLengthUnit}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="orderSure_total_price" style="font-size: 14px; color: #999;">总价：<span class="red" style="font-size: 30px;">{{totalPrice}}</span><span class="red" style="font-size: 14px">元</span></div>
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

export default {
  name: "innovationOrderSure",
  data() {
    return {
      customerType: 1,
      enterpriseName: null,
      cusName: null,
      phone: null,
      address: null,
      cusName: null,
      recommendName: null,
      recommendPhone: null,
      innovationList: [],
      errorMessage: null,
      screenWidth: null,
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
    calRentEndDateByMonth: function(startDateTimeStr, month) {
      var dateStr = startDateTimeStr.split(" ")[0];
      var date = new Date();
      var dArray = dateStr.split("-");
      date.setFullYear(parseInt(dArray[0]));
      date.setMonth(parseInt(dArray[1]) - 1 + month);
      date.setDate(parseInt(dArray[2]));
      return date;
    },
    submitOrder: function() {
      if (!util.isLogined()) {
        bus.$emit("showLogin");
        return false;
      }
      var token = Cookies.get("raas_accessToken");
      var vueObj = this;
      axios({
        method: "post",
        url: "/order/innovations",
        headers: { accessToken: token },
        data: {
          customerType: vueObj.customerType,
          enterpriseName: util.trimToNull(vueObj.enterpriseName),
          cusName: vueObj.cusName,
          phone: vueObj.phone,
          address: vueObj.address,
          recommendName: util.trimToNull(vueObj.recommendName),
          recommendPhone: util.trimToNull(vueObj.recommendPhone),
          data: vueObj.innovationList,
          invoiceType: vueObj.invoiceType,
          contract: vueObj.contract,
          invoiceData: vueObj.invoiceData
        }
      })
        .then(function(response) {
          var orderId = response.data.orderId;
          vueObj.$router.push({
            path: "/payWayThird",
            query: { orderId: orderId, orderType: "4" }
          });
        })
        .catch(function(error) {
          var response = error.response;
          console.log(response);
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
            }
          } else {
            vueObj.errorMessage =
              "提交订单发生错误，请检查订单然后重新提交。（总价不能超过99999999999）";
            $(document.body).scrollTop(0);
          }
        });
    }
  },
  computed: {
    totalPrice: function() {
      var total = 0;
      var innovationList = this.innovationList;
      for (var i = 0; i < innovationList.length; i++) {
        var item = innovationList[i];
        total += item.productUnitPrice * item.leaseLength * item.leaseQuantity;
      }
      return total.toFixed(2);
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

    var innovationCart = store.get("innovationCart");
    if (innovationCart == null || typeof innovationCart == "undefined") {
      errorMessage = "没有双创云产品提交，请重新选择。";
      $(document.body).scrollTop(0);
      setTimeout(10, function() {
        vueObj.$router.push({path: "/home"});
      });
    }
    var innovationList = JSON.parse(innovationCart);
    vm.innovationList = innovationList;
  }
};
</script>

<style>
@import "../assets/css/content.css";
</style>

