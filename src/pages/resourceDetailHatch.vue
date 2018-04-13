<template>
    <div>
        <div v-if="independentShow || innovationShow">
            <!--轮播图-->
            <div id="swiper" class="w clearfix detail_carousel">
                <div class="fl">
                    <img v-bind:src="images[0]" alt=""/>
                </div>
                <div class="fr">
                    <div class="name" v-cloak>{{resName}}</div>
                    <p v-if="c == '1'" class="position" title="resAddress">企业宽带接入，覆盖面广，智能楼宇，免费技术咨询覆盖面广，技术先进，服务好，欢迎咨询。</p>
                    <!--孵化服务的描述-->
                    <p v-if="c == '3'" class="position" title="resAddress">主要为孵化企业提供的属于营业税“服务业’税目中“代理业”、“租赁业”和“其他服务业”中的咨询和技术服务范围内的服务。</p>
                    <div class="phone"><a href="javascript:;" class="clearfix"><img src="../assets/images/order_visit_phone.png" alt=""/><span>400-186-9900</span></a></div>
                </div>
            </div>
            <!--数据-->
            <div class="w" v-cloak>
                <!--tab切换&#45;&#45;头-->
                <div class="detail_tab_head clearfix" id="table_head" v-show="independentShow || innovationShow">
                    <template v-if="c == '2'">
                        <a href="javascript:;" v-bind:class="[innovationShow ? 'selected' : '']" v-if="innovation != null && innovation.length > 0" @click="showInnovation">双创云办公空间</a>
                        <a href="javascript:;" v-bind:class="[independentShow ? 'selected' : '']" v-if="independent != null" @click="showIndependent">独立办公空间</a>
                    </template>
                    <template v-if="c == '0'">
                        <a href="javascript:;">双创园区云平台</a>
                    </template>
                    <template v-if="c == '1'">
                        <a href="javascript:;">高速办公网络</a>
                    </template>
                    <template v-if="c == '3'">
                        <a href="javascript:;">孵化服务</a>
                    </template>
                    <div class="decorate_ball"></div>
                    <div class="decorate_line"></div>
                </div>
                <!--tab切换&#45;&#45;身体-->
                <div class="detail_tab_body" v-show="independentShow || innovationShow">
                    <div class="innovation" v-if="innovation != null" v-show="innovationShow">
                        <div class="product_list">
                            <table v-if="screenWidth > 767">
                                <thead>
                                <th>产品</th>
                                <th>单价</th>
                                <th>租赁时长</th>
                                <th>数量</th>
                                <th>价格</th>
                                <th>操作</th>
                                </thead>
                                <tbody>
                                <tr v-for="item in innovation">
                                    <td><div style="width: 198px">{{item.productName}}</div></td>
                                    <td><div style="width: 120px; color: #333;">{{item.productUnitPrice}}元{{item.productUnitPriceUnit | product_unit_price_unit}}</div></td>
                                    <!--租赁时长对应的  start-->
                                    <td v-if="item.productName == '固定工位'" class="fixed_station"><div style="width: 135px"><lengthInput class="rent_time" v-model="item.leaseLength" v-bind:default="12" v-bind:max="12"></lengthInput>&nbsp;{{item.leaseLengthUnit}}</div></td>
                                    <td v-if="item.productName != '固定工位'">
                                        <div style="width: 135px">
                                            <!--租赁时长为“月份”的-->
                                            <lengthInput v-if="item.leaseLengthUnit == '月'" class="rent_time" v-model="item.leaseLength" v-bind:max="12"></lengthInput>
                                            <!--租赁时长为“小时”的-->
                                            <lengthInput v-if="item.leaseLengthUnit == '小时'" class="rent_time" v-model="item.leaseLength" v-bind:max="24"></lengthInput>
                                            <!--租赁时长为“日”的-->
                                            <lengthInput v-if="item.leaseLengthUnit == '日'" class="rent_time" v-model="item.leaseLength" v-bind:max="31"></lengthInput>
                                            <!--租赁时长为“年”的-->
                                            <lengthInput v-if="item.leaseLengthUnit == '年'" class="rent_time" v-model="item.leaseLength" v-bind:max="1"></lengthInput>
                                            {{item.leaseLengthUnit}}
                                        </div>
                                    </td>
                                    <!--租赁时长对应的  end-->
                                    <td class="amount"><div style="width: 145px"><amountInput v-model.number="item.leaseQuantity" v-bind:max="99999"></amountInput>&nbsp;{{item.leaseQuantityUnit | lease_quantity_unit}}</div></td>
                                    <td class="unit_total_price resource_detail_price"><div style="width: 90px" v-bind:class="{ red: (item.leaseLength * 100 * item.leaseQuantity * item.productUnitPrice /100) != 0 }"><span class="innovationPrice">{{item.leaseLength * 100 * item.leaseQuantity * item.productUnitPrice /100}}</span>元</div></td>
                                    <td><div style="width: 34px"><a href="javascript:;" class="particulars" @click="showDetail(item.productCategory, item.productName, item.productUnitPrice + '元' + item.productUnitPriceUnit, item.productDesc)">详情</a></div></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!--双创云新增总价-->
                        <div class="total_price" style="font-size: 14px; color: #999; text-align: right;">总价:&nbsp;&nbsp; <span style="font-size: 30px; color: #f02345;">{{totalPrice}}</span><span style="font-size: 14px; color: #f02345;">元</span></div>
                        <div class="buy"><a href="javascript:;" @click="toOrderInnovation">立即订购</a></div>
                    </div>
                    <div class="independent" v-if="independent != null" v-show="independentShow">
                        <div class="product_list">
                            <table v-if="screenWidth > 767" style="margin-bottom: 45px;">
                                <thead>
                                <th>产品信息</th>
                                <th>可售面积</th>
                                <th>单价</th>
                                <th>订购面积</th>
                                <th>价格</th>
                                <th>操作</th>
                                <th>订购</th>
                                </thead>
                                <tbody>
                                <tr v-for="item in independent.data">
                                    <td><div style="width: 120px">{{item.productName}}</div></td>
                                    <td><div style="width: 85px; color: #333;"><span>{{item.productArea}}</span><span class="unit_mobile">平米</span></div></td>
                                    <td><div style="width: 95px; color: #333;">{{item.productUnitPrice}}元/平米</div></td>
                                    <td><div style="width: 135px"><lengthInput class="rent_time" v-model.number="item.productQuantity" v-bind:max="item.productArea > 99999 ? 99999 : item.productArea"></lengthInput>&nbsp;平米</div></td>
                                    <td class="resource_detail_price"><div style="width: 125px" v-bind:class="{ red: (item.productUnitPrice * 100 * item.productQuantity /100) != 0 }">{{item.productUnitPrice * 100 * item.productQuantity /100}}元</div></td>
                                    <td><div style="width: 34px"><a href="javascript:;" class="particulars" @click="showDetail(item.productCategory, item.productName, item.productUnitPrice + '元/平米', item.productDesc)">详情</a></div></td>
                                    <td><div style="width: 70px"><a class="reserve" @click="toOrderIndependent" :data-id="item.id">预定</a></div></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import Cookies from "js-cookie";
import $router from "vue-router";
import bus from "../js/eventBus.js";
import $ from "jquery";
import axios from "axios";
import store from "store";
import util from "../js/util.js";
import "../js/filter.js";
import lengthInput from "../component/inputDuration.vue";
import amountInput from "../component/inputAmount.vue";

export default {
  name: "resourceDetail",
  data() {
    return {
      independent: null,
      innovation: null,
      images: [],
      banner: null,
      bannerClass: null,
      independentShow: false,
      innovationShow: true,
      resName: null,
      resPosition: null,
      resAddress: null,
      independentDesc: null,
      innovationDesc: null,
      screenWidth: null,
      c: null,
      parkId: null,
      parkName: null,
      resId: null,
      resDesImg: null,
      showVisitMask: false,
      parkAreaNum: null,
      parkStationNum: null,
      isZero: false,
    };
  },
  components: {
    lengthInput,
    amountInput,
  },
  methods: {
    toOrderIndependent(e) {
      var independentList = JSON.parse(JSON.stringify(this.independent.data));
      var submitList = [];
      for (var i = 0; i < independentList.length; i++) {
        if (independentList[i].productQuantity > 0) {
          submitList.push(independentList[i]);
        }
      }
      if (submitList.length == 0) {
        alert("请选择您要购买的产品");
        return false;
      }
      store.set("independentCart", JSON.stringify(submitList));
      var vm = this;
      if (util.isLogined()) {
        vm.$router.push({ path: "/independentOrderSure" });
      } else {
        bus.$emit("showLogin");
        vm.$router.push({ path: "/independentOrderSure" });
        //这种方式也可以
        // vm.$router.replace({ path: "/independentOrderSure" });
      }
    },
    toOrderInnovation() {
      var innovationList = JSON.parse(JSON.stringify(this.innovation));
      var submitList = [];
      var total = 0;
      for (var i = 0; i < innovationList.length; i++) {
        var item = innovationList[i];
        if (item.leaseLength > 0 && item.leaseQuantity > 0) {
          submitList.push(item);
          total +=
            item.productUnitPrice * item.leaseLength * item.leaseQuantity;
        }
      }
      if (submitList.length == 0) {
        alert("请选择您要购买的产品");
        return false;
      }
      if (total > 99999999999) {
        alert("总价不能超过99999999999。");
        return false;
      }
      store.set("innovationCart", JSON.stringify(submitList));

      var vm = this;
      if (util.isLogined()) {
        vm.$router.push({ path: "/innovationOrderSure" });
      } else {
        bus.$emit("showLogin");
        vm.$router.push({ path: "/innovationOrderSure" });
        //这种方式也可以
        // vm.$router.replace({ path: "/innovationOrderSure" });
      }
    },
    showDetail(productType, productName, productUnitPrice, productDesc) {
      switch (productType) {
        case 0:
          c = "混合云服务";
          break;
        case 1:
          c = "孵化服务";
          break;
        case 2:
          c = "高速办公网络";
          break;
        case 3:
          c = "独立办公空间";
          break;
        case 4:
          c = "双创云办公空间";
          break;
        default:
          c = "独立办公空间";
      }
      this.$refs.detail.showDetail(
        c,
        productName,
        productUnitPrice,
        productDesc
      );
    },
    showIndependent() {
      this.independentShow = true;
      this.innovationShow = false;
    },
    showInnovation() {
      this.independentShow = false;
      this.innovationShow = true;
    },
    initData() {
      var vm = this;
      axios
        .get("/park/resources/" + vm.resId)
        .then(function(resProduct) {
          var pArray =
            resProduct.data.resPosition == null
              ? []
              : resProduct.data.resPosition.split(",");
          console.log(resProduct.data.resPosition);
          var resAddress = pArray.length == 3 ? pArray[2] : null;
          Object.assign(vm, {
            resName: resProduct.data.resName,
            resPosition: resProduct.data.resPosition,
            parkAreaNum: resProduct.data.parkAreaNum,
            parkStationNum: resProduct.data.parkStationNum,
            resAddress: resAddress,
            resDesImg: resProduct.data.resDesImg,
            banner: resProduct.data.resBannerImgs[0]
          });


          var images = [];
          var indShow = false;
          var innShow = false;
          images.push(resProduct.data.resBannerImgs[0]);
          if (resProduct.data.IndependentOffice != null) {
            var independentOffice = resProduct.data.IndependentOffice;
            for (var i = 0; i < independentOffice.data.length; i++) {
              images.push(independentOffice.data[i].productImg);
              independentOffice.data[i]["productQuantity"] = 0;
            }
            vm.independent = independentOffice;
            if (independentOffice.officeDesc) {
              vm.independentDesc = unescape(independentOffice.officeDesc);
            }
            indShow = true;
          }
          var innovations = [];
          if (resProduct.data.innovationOffice != null) {
            var innovationOffice = resProduct.data.innovationOffice;
            if (innovationOffice.officeDesc != null) {
              vm.innovationDesc = unescape(innovationOffice.officeDesc);
            }
            for (var i = 0; i < innovationOffice.data.length; i++) {
              innovations.push(innovationOffice.data[i]);
              if (innovationOffice.data[i].productCategory != 4) {
                images.push(innovationOffice.data[i].productImg);
              }
            }
            innShow = true;
          }
          var setInnovations = function() {
            vm.innovation = innovations;
            if (innShow) {
              vm.innovationShow = true;
            } else if (indShow) {
              vm.independentShow = true;
            }
          };
          setInnovations();
          vm.images = images;
        })
        .catch(function(error) {
          if (error.response) {
            if (error.response.status == 404) {
              vm.banner = "images/none_banner.png";
              vm.bannerClass = "none_banner";
            }
          }
          vm.innovationShow = false;
          vm.independentShow = false;
          console.log(error);
        });
    },
  },
  computed: {
    // 计算双创云办公总价
    totalPrice: function() {
      var result = 0;
      var v = this;
      var innovationData = this.innovation;
      for (var i = 0; i < innovationData.length; i++) {
        var leaseLength = innovationData[i].leaseLength;
        var leaseQuantity = innovationData[i].leaseQuantity;
        var productUnitPrice = innovationData[i].productUnitPrice;
        result += leaseLength * 100 * leaseQuantity * productUnitPrice / 100;
      }
      return result.toFixed(2);
    }
  },
  mounted() {
    var vm = this;
    vm.screenWidth = document.body.clientWidth;
    $(window).resize(function() {
      vm.screenWidth = document.body.clientWidth;
    });
    vm.c = util.getParameterByName("c");
    vm.resId = util.getParameterByName("id");
    vm.parkId = util.getParameterByName("parkId");
    vm.parkName = util.getParameterByName("parkName");
    vm.initData();
  }
};
</script>

<style>
@import "../assets/css/lib/swiper.min.css";
@import "../assets/css/detail_carousel.css";
@import "../assets/css/content.css";
</style>
