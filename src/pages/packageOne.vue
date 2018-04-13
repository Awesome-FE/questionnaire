<template>
    <div class="package w">
        <div class="bread_crumb w"><a href="index.html">首页</a>&nbsp;&gt;&nbsp;<a href="javascript:;" class="current">云解决方案</a></div>
        <div class="title">云解决方案</div>
        <p class="description" style="margin-bottom: 30px;">为不同规模的企业客户提供灵活、可扩展和低成本的2套云解决方案，帮助企业客户能够快速构建应用，轻松迈入互联网时代。</p>
        <div class="package_content clearfix">
            <ul class="tab_head fl">
                <li class="selected"><a href="javascript:;">方案一</a></li>
                <li><router-link :to="{path: '/packageTwo'}">方案二</router-link></li>
            </ul>
            <div class="fl tab_body">
                <p class="description_content">针对日活1万-10万的小型网站，提供安全可靠、支持弹性升级的架构解决方案。</p>
                <div class="clearfix">
                    <div class="fl middle_content">
                        <div class="parameters">
                            <div class="cpu common_info clearfix">
                                <div class="name">实力配置：</div>
                                <div class="number">2核4GB</div>
                                <div class="number_progress_bg"><div class="number_progress" style="width: 150px;"></div></div>
                            </div>
                            <div class="disk common_info clearfix">
                                <div class="name">系统盘：</div>
                                <div class="number">40GB</div>
                                <div class="number_progress_bg"><div class="number_progress" style="width: 300px;"></div></div>
                            </div>
                            <div class="bandwidth common_info clearfix">
                                <div class="name">网络：</div>
                                <div class="number">2M</div>
                                <div class="number_progress_bg"><div class="number_progress" style="width: 120px;"></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="fl data">
                        <div class="area_box clearfix">
                            <div class="name fl">地域</div>
                            <div class="area fl">华北地区</div>
                        </div>
                        <div class="mirror_box clearfix">
                            <div class="name fl">镜像</div>
                            <div class="mirror fl" @click="showMirror" v-cloak>{{cloudOrderData.mirror}}</div>
                            <ul v-if="isMirrorDown" class="mirror_down" v-cloak>
                                <li><a href="javascript:;" @click="selectMirror('CentOS6.5')">CentOS6.5</a></li>
                                <li><a href="javascript:;" @click="selectMirror('CentOS6.6')">CentOS6.6</a></li>
                                <li><a href="javascript:;"@click="selectMirror('CentOS7.1')">CentOS7.1</a></li>
                                <li><a href="javascript:;"@click="selectMirror('CentOS7.2')">CentOS7.2</a></li>
                                <li><a href="javascript:;"@click="selectMirror('Ubuntu14.04')">Ubuntu14.04</a></li>
                                <li><a href="javascript:;"@click="selectMirror('Ubuntu16.04')">Ubuntu16.04</a></li>
                            </ul>
                        </div>
                        <div class="price_box clearfix">
                            <div class="name fl">价格</div>
                            <div class="fl">
                                <ul class="clearfix choose_time">
                                    <li v-cloak v-for="(item,index) in priceData" v-bind:class="{ selected : index==selectItem }" @click="changeClass(index)">
                                        <div>￥{{(item.discountsPrice)}}<span style="font-size: 12px;">/{{item.buyLength | cloud_year_length_format}}/{{item.productQuantity}}台</span></div>
                                        <div class="original_price">￥{{item.totalPrice}}/{{item.buyLength | cloud_year_length_format}}/{{item.productQuantity}}台</div>
                                    </li>
                                </ul>
                                <div class="price_description">优惠仅可使用一次，购买时间越长越划算。</div>
                            </div>
                        </div>
                        <div class="immediately_buy clearfix"><a href="javascript:;" @click="immediatelyBuy">立即订购</a><div v-cloak class="add_price">￥{{cloudOrderData.packageTotalPrice}}.00</div></div>
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
import store from "store";
import bus from "../js/eventBus.js";
import util from "../js/util.js";
import "../js/filter.js";

export default {
  name: "packageOne",
  data() {
    return {
      cloudOrderData: {
        productType: "6", //产品类型[3:独立办公空间 4:双创云空间 5:自定义混合云服务 6:标准混合云服务]
        terrain: "华北",
        isPubNetworkIP: "1", //是否分配公网IP[0:否 1:是]
        bandwidth: 2, //带宽数量
        mirror: "CentOS6.5",
        cloudHostConfig: "2核4GB",
        systemDiskSize: 40,
        buyLength: 12, //购买时长
        productQuantity: 2, //购买数量
        dataDisks: [],
        packageTotalPrice: 5472,
        cloudSolutionType: "0"
      },
      priceData: [
        {
          totalPrice: 6080,
          discountsPrice: 5472,
          buyLength: 12,
          productQuantity: 2
        },
        {
          totalPrice: 10742,
          discountsPrice: 9668,
          buyLength: 24,
          productQuantity: 2
        },
        {
          totalPrice: 13279,
          discountsPrice: 11951,
          buyLength: 36,
          productQuantity: 2
        }
      ],
      selectItem: 0,
      isMirrorDown: false
    };
  },
  methods: {
    showMirror() {
      this.isMirrorDown = !this.isMirrorDown;
    },
    selectMirror(mirror) {
      this.cloudOrderData.mirror = mirror;
      this.isMirrorDown = false;
    },
    changeClass(index) {
      this.selectItem = index;
      this.cloudOrderData.buyLength = this.priceData[index].buyLength;
      this.cloudOrderData.productQuantity = this.priceData[
        index
      ].productQuantity;
      this.cloudOrderData.packageTotalPrice = this.priceData[
        index
      ].discountsPrice;
    },
    immediatelyBuy() {
      var vm = this;
      var cloudOrderData = JSON.parse(JSON.stringify(this.cloudOrderData));
      store.set("cloudOrderDataCart", JSON.stringify(cloudOrderData));
      if (util.isLogined()) {
        vm.$router.push({ path: "/mixedOrderSure" });
      } else {
        bus.$emit("showLogin");
        vm.$router.push({ path: "/mixedOrderSure" });
        //这种方式也可以
        // vm.$router.replace({ path: "/mixedOrderSure" });
      }
    },
  }
};
</script>

<style>
@import "../assets/css/content.css";
</style>
