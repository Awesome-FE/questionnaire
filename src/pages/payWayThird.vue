<template>
    <div class="w pc_pay_third">
        <div class="order_status order_sure_head clearfix">
            <div class="fl">
                <div class="order_status_head">订单提交成功，请尽快付款！<span>订单号：{{orderSn}}</span></div>
                <div class="order_status_body">请您在72小时内完成支付，否则订单会被自动取消。</div>
            </div>
            <div class="fr progress" style="margin-top: 20px;">
                <div class="clearfix">
                    <div class="fl complete">
                        <div class="bg_bar" style="border-top-left-radius: 1.5px; border-bottom-left-radius: 1.5px;">
                            <div class="number_ball">1</div>
                        </div>
                        <div class="progress_text">选择配置</div>
                    </div>
                    <div class="fl complete">
                        <div class="bg_bar">
                            <div class="number_ball">2</div>
                        </div>
                        <div class="progress_text">提交订单</div>
                    </div>
                    <div class="fl current">
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
        <div class="order_info clearfix">
            <div class="order_price_head">应付金额：</div>
            <div class="order_price_body">
                {{orderPrice}}<span style="font-size: 14px;">元</span>
            </div>
        </div>
        <div class="pay_way_body clearfix">
            <div class="pay_way_head"><a href="javascript:;">请选择支付方式：</a></div>
            <div class="clearfix">
                <a href="javascript:;" class="fl wechat_pay pay_way" @click="showWechatScanCode">
                    <div class="clearfix">
                        <img src="../assets/images/wei.png" alt=""/>
                        <span>微信支付</span>
                    </div>
                </a>
                <a href="javascript:;" class="fl ali_pay pay_way" @click="showAliScanCode">
                    <div class="clearfix">
                        <img src="../assets/images/zhi.png" alt=""/>
                        <span>支付宝支付</span>
                    </div>
                </a>
                <a href="javascript:;" class="fl bank_pay pay_way" @click="showBank" style="margin-right: 0">
                    <div class="clearfix">
                        <img src="../assets/images/yin.png" alt=""/>
                        <span>银行转账</span>
                    </div>
                </a>
            </div>
            <div class="hint">推荐微信和支付宝支付，订单可即时确认。如您使用银行转账完成支付，我们将在三个工作日内为您审核，请您随时留意<a href="order_list_wait.html">审核状态</a></div>
        </div>
        <!--微信扫码弹层-->
        <div v-if="wechatScanCodeShow" v-cloak>
            <div class="wechat_pay_code_container">
                <div class="clearfix">
                    <div class="wechat_pay_head fl">微信支付</div>
                    <div class="wechat_pay_body fl">
                        <div class="wechat_pay_body_tip">二维码有效时长为<span>2</span>小时，请尽快支付</div>
                        <div class="code_container">
                            <div id="wechat-qrcode"></div>
                        </div>
                        <div class="code_scan_text_container">
                            <div class="tip_text">请使用微信扫一扫<br/>扫描二维码支付</div>
                        </div>
                    </div>
                    <div class="wechat_pay_body_right fl">
                        <img src="../assets/images/wechat_phone.png" />
                    </div>
                </div>
                <div class="wechat_pay_another">
                    <a href="javascript:void(0);" @click="hideWechatScanCode">&lt;&nbsp;选择其他支付方式</a>
                </div>
            </div>
        </div>

        <!--支付宝返回的html代码段存储的div-->
        <div class="aliBox"></div>

        <!--银行转账弹层-->
        <div v-if="bankShow" v-cloak>
            <div class="bank_transfer_container">
                <div class="fl bank_transfer_left">
                    <div class="bank_transfer_head">银行卡支付</div>
                    <div class="bank_transfer_title">银行名称：上海浦东发展银行&nbsp;&nbsp;广东自贸试验区横琴分行</div>
                    <div class="bank_transfer_title">企业户名：横琴中电友普云数据有限公司</div>
                    <div class="bank_transfer_account">1963&nbsp;0078&nbsp;8018&nbsp;0000&nbsp;0042</div>
                    <input type="text" placeholder="请输入银行转账交易码后六位：" v-model="bankSn"/>
                    <a href="javascript:;" class="submit" @click="submitVoucher(2, bankSn)">提交</a>
                    <div class="pay_close">
                        <a href="javascript:;" @click="hideBank">&lt;&nbsp;选择其他支付方式</a>
                    </div>
                </div>
                <div class="fr bank_transfer_right">
                    <div class="clearfix">
                        <img src="../assets/images/bank_card.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import util from "../js/util.js";
import bus from "../js/eventBus.js";
import $ from "jquery";
import QRcode from "qrcode";

var wechatPayCheckLoop;
var token = Cookies.get("raas_accessToken");
var orderId = util.getParameterByName("orderId");
var orderType = util.getParameterByName("orderType");

export default {
  name: "payWayThird",
  data() {
    return {
      orderPrice: null,
      orderSn: null,
      orderType: null,
      productDesc: null,
      screenWidth: null,
      picked: "one",
      exampleShow: false,
      voucherShow: false,
      tradeSn: null,
      wechatScanCodeShow: false,
      bankShow: false,
      wechatSn: null,
      aliSn: null,
      bankSn: null
    };
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

    bus.$on(
      "getOrderType",
      function(orderType) {
        this.orderType = orderType;
      }.bind(this)
    );

    vm.judgeOrderType();
  },
  // watch: {
  //   '$route'(to, from) {
  //     console.log(to);
  //     if (to.name == 'payWayThird') {
  //       orderType = to.query.orderType;
  //       this.judgeOrderType();
  //     }
  //   }
  // },
  methods: {
    judgeOrderType() {
      var vm = this;
      var orderType = util.getParameterByName("orderType");
      // 2、通过订单详情页的接口来获取想要的值
      alert(orderType);
      if (orderType == 3) {
        axios
          .get("/order/independents/" + orderId, {
            headers: { accessToken: token }
          })
          .then(function(response) {
            vm.orderPrice = response.data.orderPrice;
            vm.orderSn = response.data.data.orderSn;
            vm.productDesc = response.data.data.goodsItems[0].productName;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (orderType == 4) {
        axios
          .get("/order/innovations/" + orderId, {
            headers: { accessToken: token }
          })
          .then(function(response) {
            vm.orderPrice = response.data.orderPrice;
            vm.orderSn = response.data.data.orderSn;
            vm.productDesc = response.data.data.goodsItems[0].productName;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (orderType == 6 || orderType == 5) {
        axios
          .get("/order/mixedcloud/" + orderId, {
            headers: { accessToken: token }
          })
          .then(function(response) {
            vm.orderPrice = response.data.orderPrice;
            vm.orderSn = response.data.data.orderSn;
            vm.productDesc = response.data.orderName;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    showExample() {
      this.exampleShow = true;
    },
    hideExample() {
      this.exampleShow = false;
    },
    // 微信二维码弹层
    showWechatScanCode() {
      this.wechatScanCodeShow = true;
      // 3、调用的时候需要把描述当做参数传过来
      this.payWechat(this.productDesc);
    },
    hideWechatScanCode() {
      this.wechatScanCodeShow = false;
      clearTimeout(wechatPayCheckLoop);
    },

    // 点击支付宝支付，发送请求
    showAliScanCode() {
      var vueObj = this;
      var orderId = util.getParameterByName("orderId");
      axios({
        method: "post",
        url: "/alipay",
        headers: { accessToken: token },
        data: {
          productDesc: vueObj.productDesc,
          orderId: orderId
        }
      })
        .then(function(response) {
          $(".aliBox").html(response.data);
        })
        .catch(function(error) {
          var response = error.response;
          if (typeof response != "undefined") {
            if (response.status == 403) {
              bus.$emit("showLogin");
            } else if (response.status == 500) {
              alert("发生错误，请稍后重新提交。");
            }
          } else {
            alert("发生错误，请稍后重新提交。");
          }
        });
    },

    // 银行卡信息弹层
    showBank: function() {
      this.bankShow = true;
    },
    hideBank: function() {
      this.bankShow = false;
    },
    submitVoucher: function(payType, tradeSn) {
      var vueObj = this;
      axios({
        method: "post",
        url: "/order/voucher",
        headers: { accessToken: token },
        data: {
          tradeSn: tradeSn,
          payType: payType,
          orderId: orderId
        }
      })
        .then(function(response) {
          vueObj.$router.push({ path: "/orderList" });
        })
        .catch(function(error) {
          var response = error.response;
          if (typeof response != "undefined") {
            if (response.status == 403) {
              bus.$emit("showLogin");
            } else if (response.status == 400) {
              alert("请输入正确的交易码。");
            } else if (response.status == 500) {
              alert("发生错误，请稍后重新提交。");
            }
          } else {
            alert("发生错误，请稍后重新提交。");
          }
        });
    },
    hitSubmitVoucher: function(payType, tradeSn) {
      var vueObj = this;
      axios({
        method: "post",
        url: "/order/voucher",
        headers: { accessToken: token },
        data: {
          tradeSn: tradeSn,
          payType: payType,
          orderId: orderId
        }
      })
        .then(function(response) {
          // 改
          window.location.href = "hit/hit_order_list_wait.html";
        })
        .catch(function(error) {
          var response = error.response;
          if (typeof response != "undefined") {
            if (response.status == 403) {
              bus.$emit("showLogin");
            } else if (response.status == 400) {
              alert("请输入正确的交易码。");
            } else if (response.status == 500) {
              alert("发生错误，请稍后重新提交。");
            }
          } else {
            alert("发生错误，请稍后重新提交。");
          }
        });
    },
    payWechat(productDesc) {
      var vm = this;
      axios({
        method: "post",
        url: "/pay",
        headers: { accessToken: token },
        data: {
          productDesc: productDesc,
          orderId: orderId
        }
      })
        .then(function(response) {
          $(".loadEffect").hide();
          var cUrl = response.data.codeUrl;
          QRcode.toCanvas(cUrl, { errorCorrectionLevel: "H" }, function(
            err,
            canvas
          ) {
            if (err) {
              throw err;
            }
            var container = document.getElementById("wechat-qrcode");
            container.appendChild(canvas);
          });
          vm.wechatPayCheck();
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.status == 403) {
              bus.$emit("showLogin");
              return;
            }
            if (error.response.status == 400) {
              alert(error.response.data.desc);
              return;
            }
          }
          console.log("Error", error.message);
        });
    },
    wechatPayCheck() {
      var vm = this;
      axios({
        method: "get",
        url: "/pay/result/" + orderId,
        headers: { accessToken: token }
      })
        .then(function(response) {
          if (response.data.returnCode != "106") {
            wechatPayCheckLoop = setTimeout(vm.wechatPayCheck, 3000);
          } else {
            clearTimeout(wechatPayCheckLoop);
            vueObj.$router.push({
              path: "/paySuccess",
              query: { orderId: orderId }
            });
          }
        })
        .catch(function(error) {
          if (error.response && error.response.status == 403) {
            bus.$emit("showLogin");
            clearTimeout(wechatPayCheckLoop);
            return;
          }
          console.log("Error", error.message);
          vueObj.$router.push({ path: "/payFail" });
        });
    }
  },
};
</script>

<style>
@import "../assets/css/content.css";
</style>
