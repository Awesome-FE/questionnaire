<template>
    <div class="user_defined">
        <div class="w">
            <div class="bread_crumb w"><router-link :to="{path: '/home'}">首页</router-link>&nbsp;&gt;&nbsp;<a href="javascript:;" class="current">混合云服务</a></div>
            <div class="configuration_module clearfix configuration_module_area">
                <div class="name">地域</div>
                <div class="options default_option">{{cloudOrderData.terrain}}</div>
            </div>
            <div class="configuration_module clearfix configuration_module_net">
                <div class="name">网络</div>
                <div class="options">
                    <div class="default_option">专有网络</div>
                    <div class="clearfix" style="margin-top: 20px;">
                        <div class="public_net_ip">公网IP地址：</div>
                        <div style="position: relative; float: left;">
                            <div class="is_allocating" v-show="cloudOrderData.isPubNetworkIP == 1">分配</div>
                            <div class="is_allocating" v-show="cloudOrderData.isPubNetworkIP == 0">不分配</div>
                            <ul class="allocatingDown">
                                <li><a href="javascript:;" @click="needIp()">分配</a></li>
                                <li><a href="javascript:;" @click="noNeedIp()">不分配</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="configuration_module clearfix configuration_module_mainframe">
                <div class="name">实例配置</div>
                <ul class="options mainframe_radio">
                    <li v-bind:class="{ on : this.cloudOrderData.cloudHostConfig == '2核4GB' }" @click="selectSpec('2核4GB')">2核4GB</li>
                    <li v-bind:class="{ on : this.cloudOrderData.cloudHostConfig == '2核8GB' }" @click="selectSpec('2核8GB')">2核8GB</li>
                    <li v-bind:class="{ on : this.cloudOrderData.cloudHostConfig == '4核8GB' }" @click="selectSpec('4核8GB')">4核8GB</li>
                    <li v-bind:class="{ on : this.cloudOrderData.cloudHostConfig == '4核16GB' }" @click="selectSpec('4核16GB')">4核16GB</li>
                    <li v-bind:class="{ on : this.cloudOrderData.cloudHostConfig == '8核16GB' }" @click="selectSpec('8核16GB')">8核16GB</li>
                    <li v-bind:class="{ on : this.cloudOrderData.cloudHostConfig == '8核32GB' }" @click="selectSpec('8核32GB')">8核32GB</li>
                </ul>
            </div>
            <div class="configuration_module clearfix configuration_module_broadband">
                <div class="name">公网带宽</div>
                <div id="tiao" class="fl">
                    <div class="clearfix">
                        <div class="data_progress" style="width: 100px">50M</div>
                        <div class="data_progress" style="width: 100px">100M</div>
                        <div class="data_progress" style="width: 200px; border-right: none">200M</div>
                    </div>

                    <div id="yuan" v-on:mousedown="slideBall" v-on:mouseup="noSlide">|&nbsp;|</div>
                    <div id="jindu"></div>
                </div>
                <div class="fl">
                    <div class="clearfix manual_input_box">
                        <inputLimitStep id="input" class="manual_input" v-model.number="cloudOrderData.bandwidth" v-bind:default="cloudOrderData.bandwidth" v-bind:max="200" v-bind:min="0" v-bind:step="1" :disabled="bandwidthDisabled"></inputLimitStep><span class="broadband_unit">Mbps</span>
                    </div>
                </div>
            </div>
            <div class="configuration_module clearfix configuration_module_mirror">
                <div class="name">镜像</div>
                <ul class="options mirror_radio">
                    <li v-bind:class="{ on : this.cloudOrderData.mirror == 'CentOS6.5' }" @click="selectMirror('CentOS6.5')">CentOS6.5</li>
                    <li v-bind:class="{ on : this.cloudOrderData.mirror == 'CentOS6.6' }" @click="selectMirror('CentOS6.6')">CentOS6.6</li>
                    <li v-bind:class="{ on : this.cloudOrderData.mirror == 'CentOS7.1' }" @click="selectMirror('CentOS7.1')">CentOS7.1</li>
                    <li v-bind:class="{ on : this.cloudOrderData.mirror == 'CentOS7.2' }" @click="selectMirror('CentOS7.2')">CentOS7.2</li>
                    <li v-bind:class="{ on : this.cloudOrderData.mirror == 'Ubuntu14.04' }" @click="selectMirror('Ubuntu14.04')">Ubuntu14.04</li>
                    <li v-bind:class="{ on : this.cloudOrderData.mirror == 'Ubuntu16.04' }" @click="selectMirror('Ubuntu16.04')">Ubuntu16.04</li>
                </ul>
            </div>
            <div class="configuration_module clearfix configuration_module_storage">
                <div class="name">存储</div>
                <div class="options">
                    <div class="clearfix">
                        <div class="fl disk_name">系统盘：</div>
                        <div class="fl">
                            <div class="clearfix manual_input_box">
                                <inputLimitStep class="manual_input" v-model.number="cloudOrderData.systemDiskSize" v-bind:max="100" v-bind:min="40" v-bind:step="10"></inputLimitStep><span class="broadband_unit">GB</span>
                            </div>
                            <div class="storage_hint">可选大小40GB-100GB,10GB为步长</div>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="fl disk_name">数据盘：</div>
                        <div class="fl">
                            <ul>
                                <li :is="item.component" v-for="item in items"></li>
                            </ul>
                            <div class="clearfix add_box" style="margin: 9px 0 10px;">
                                <div class="add_dish fl" @click="addEfficientDisk('addEfficientDiv')" v-bind:style="{backgroundColor: eDiskAvailableNumber == 0 ? '#c8c8c8' : ''}">+</div>
                                <div class="fl">增加高效云盘</div>
                                <div class="fl" style="color: #999; margin: 0 10px;">您还可选配<span>{{eDiskAvailableNumber}}</span>块</div>
                                <div class="fl theme_color">高效云盘单块可选100GB-2048GB,10GB为步长，最多4块。</div>
                            </div>
                            <div class="clearfix add_box" style="margin: 9px 0 10px;">
                                <div class="add_dish fl" @click="addSSDDisk('addSSDDiv')" v-bind:style="{backgroundColor: ssdAvailableNumber == 0 ? '#c8c8c8' : ''}">+</div>
                                <div class="fl">增加SSD云盘</div>
                                <div class="fl maxSSD" style="color: #999; margin: 0 10px;">您还可选配<span>{{ssdAvailableNumber}}</span>块</div>
                                <div class="fl theme_color">SSD云盘单块可选50GB-1024GB,10GB为步长，最多4块。</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="configuration_module clearfix configuration_module_quantity">
                <div class="name">购买量</div>
                <div class="options">
                    <ul class="quantity_radio clearfix">
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 1 }" @click="selectTime(1)">1<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 1 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 2 }" @click="selectTime(2)">2<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 2 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 3 }" @click="selectTime(3)">3<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 3 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 4 }" @click="selectTime(4)">4<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 4 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 5 }" @click="selectTime(5)">5<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 5 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 6 }" @click="selectTime(6)">6<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 6 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 7 }" @click="selectTime(7)">7<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 7 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 8 }" @click="selectTime(8)">8<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 8 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 9 }" @click="selectTime(9)">9<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 9 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 10 }" @click="selectTime(10)">10<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 10 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 11 }" @click="selectTime(11)">11<span v-bind:class="{ selected : this.cloudOrderData.buyLength == 11 }">个月</span></li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 12 }" @click="selectTime(12)">1年</li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 24 }" @click="selectTime(24)">2年</li>
                        <li v-bind:class="{ on : this.cloudOrderData.buyLength == 36 }" @click="selectTime(36)">3年</li>
                    </ul>
                    <div class="clearfix manual_input_box">
                        <inputLimitStep title="最多可购买10台" class="manual_input" v-model.number="cloudOrderData.productQuantity" v-bind:max="10" v-bind:min="1"></inputLimitStep><span class="broadband_unit">台</span>
                    </div>
                </div>
            </div>
            <div class="configuration_module clearfix configuration_module_setting">
                <div class="name">当前配置</div>
                <table class="fr">
                    <tr>
                        <td><span class="color_nine">地域：</span>{{cloudOrderData.terrain}}</td>
                        <td><span class="color_nine">网络：</span>公网带宽 <span v-cloak>{{cloudOrderData.bandwidth}}</span> Mbps(专有网络)</td>
                    </tr>
                    <tr>
                        <td><span class="color_nine">实例配置：</span><span class="mainframeVal">{{cloudOrderData.cloudHostConfig}}</span></td>
                        <td><span class="color_nine">镜像：</span><span class="mirrorVal">{{cloudOrderData.mirror}}</span></td>
                    </tr>
                    <tr>
                        <td><span class="color_nine">系统盘：</span>{{cloudOrderData.systemDiskSize}}GB</td>
                        <td class="clearfix">
                            <div class="fl"><span class="color_nine">数据盘：</span></div>
                            <div class="fl">
                                <div v-if="cloudOrderData.dataDisks.length != 0" v-for="disk in cloudOrderData.dataDisks">
                                    {{disk.dataDiskName}}({{disk.dataDiskSize}}GB)
                                </div>
                                <div v-if="cloudOrderData.dataDisks.length == 0"> - </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><span class="color_nine">购买量：</span><span class="quantityVal">{{cloudOrderData.buyLength | cloud_month_length_format}} {{cloudOrderData.productQuantity}}台</span></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="price_container">
            <div class="configuration_cost" id="fixedPrice" style="position: absolute;">
                <div class="w clearfix">
                    <div class="fl" style="font-size: 14px; margin-left: 33px;">配置费用：</div>
                    <div class="fl red total_price">￥{{totalPrice}}</div>
                    <div class="fr btn"><a href="javascript:;" @click="jumpToOrder">立即订购</a></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import bus from "../js/eventBus.js";
import util from "../js/util.js";
import axios from "axios";
import Cookies from "js-cookie";
import store from "store";
import $ from "jquery";
import inputLimitStep from "../component/inputLimitStep.vue";
import addEfficientDiv from "../component/addEfficientDiv.vue"
import addSSDDiv from "../component/addSSDDiv.vue"

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
  name: "userDefined",
  data() {
    return {
      items: [],
      cloudOrderData: {
        productType: "5",
        terrain: "华北",
        isPubNetworkIP: "1",
        bandwidth: 1,
        mirror: "CentOS6.5",
        dataDisks: [],
        cloudHostConfig: "2核4GB",
        systemDiskSize: 40,
        productQuantity: 1,
        buyLength: 1,
        cloudSolutionType: "0"
      },
      dataDiskCount: {
        高效云盘: 0,
        SSD云盘: 0
      },
      tempBandwidth: 10,
      bandwidthDisabled: false,
      needIpSelectEnabled: false,
      noNeedIpSelectEnabled: true,
      ssdAvailableNumber: 4,
      eDiskAvailableNumber: 4,
      isSlide: false
    };
  },
  components: {
    addEfficientDiv,
    addSSDDiv,
    inputLimitStep
  },
  mounted: function() {
    bus.$on(
      "deleteDisk",
      function(disk) {
        for (let i = 0; i < this.cloudOrderData.dataDisks.length; i++) {
          if (this.cloudOrderData.dataDisks[i] == disk) {
            this.cloudOrderData.dataDisks.splice(i, 1);
            this.dataDiskCount[disk.dataDiskName]--;
            if (disk.dataDiskName == "高效云盘") {
              this.eDiskAvailableNumber++;
            } else {
              this.ssdAvailableNumber++;
            }
            break;
          }
        }
      }.bind(this)
    );
    bus.$on(
      "addDisk",
      function(disk) {
        this.cloudOrderData.dataDisks.push(disk);
        this.dataDiskCount[disk.dataDiskName]++;
      }.bind(this)
    );
    bus.$on(
      "updateDisk",
      function(disk) {
        for (let i = 0; i < this.cloudOrderData.dataDisks.length; i++) {
          if (this.cloudOrderData.dataDisks[i].id == disk.id) {
            this.cloudOrderData.dataDisks[i] = disk;
            break;
          }
        }
      }.bind(this)
    );
  },
  methods: {
    addEfficientDisk(component) {
      if (this.eDiskAvailableNumber == 0) {
        return;
      }
      this.items.push({
        component: component
      });
      this.eDiskAvailableNumber--;
    },
    addSSDDisk(component) {
      if (this.ssdAvailableNumber == 0) {
        return;
      }
      this.items.push({
        component: component
      });

      this.ssdAvailableNumber--;
    },
    needIp() {
      if (this.needIpSelectEnabled) {
        this.cloudOrderData.isPubNetworkIP = "1";
        this.cloudOrderData.bandwidth =
          this.tempBandwidth < 1 ? 1 : this.tempBandwidth;
        this.bandwidthDisabled = false;
        this.needIpSelectEnabled = false;
        this.noNeedIpSelectEnabled = true;
      }
    },
    noNeedIp() {
      if (this.noNeedIpSelectEnabled) {
        this.cloudOrderData.isPubNetworkIP = "0";
        this.tempBandwidth = this.cloudOrderData.bandwidth;
        this.cloudOrderData.bandwidth = 0;
        this.bandwidthDisabled = true;
        this.needIpSelectEnabled = true;
        this.noNeedIpSelectEnabled = false;
      }
    },
    selectTime(time) {
      this.cloudOrderData.buyLength = time;
    },
    selectMirror(mirror) {
      this.cloudOrderData.mirror = mirror;
    },
    selectSpec(spec) {
      this.cloudOrderData.cloudHostConfig = spec;
    },
    jumpToOrder() {
      var cloudOrderData = JSON.parse(JSON.stringify(this.cloudOrderData));
      store.set("cloudOrderDataCart", JSON.stringify(cloudOrderData));
      var vm = this;
      if (util.isLogined()) {
        vm.$router.push({ path: "/mixedOrderSure" })
      } else {
        bus.$emit("showLogin");
        vm.$router.push({ path: "/mixedOrderSure" })
        //这种方式也可以
        // vm.$router.replace({ path: "/mixedOrderSure" });
      }
    },
    hitJumpToOrder() {
      var cloudOrderData = JSON.parse(JSON.stringify(this.cloudOrderData));
      store.set("cloudOrderDataCart", JSON.stringify(cloudOrderData));
      checkUserThenDoAction(function() {
        window.location.href = "hit/hit_order_sure.html";
      }, "hit/hit_order_sure.html");
    },
    slideBall(e) {
      var v = this;
      this.isSlide = true;
      var yuan = document.getElementById("yuan");
      var jindu = document.getElementById("jindu");
      var tiao = document.getElementById("tiao");
      var tiaoW = tiao.offsetWidth;

      var X = e.clientX; //获取当前元素相对于窗口的X左边

      var offleft = yuan.offsetLeft; //当前元素相对于父元素的左边距

      var max = tiao.offsetWidth - yuan.offsetWidth; //宽度的差值

      yuan.onmousemove = function(e) {
        if (v.isSlide == false) {
          return;
        }
        var changeX = e.clientX; //在移动的时候获取X坐标

        var moveX = Math.min(max, Math.max(-2, offleft + (changeX - X))); //超过总宽度取最大宽
        v.cloudOrderData.bandwidth = Math.round(Math.max(0, moveX / max) * 200);
        yuan.style.marginLeft = Math.max(0, moveX) + "px";
        jindu.style.width = moveX + "px";
      };
    },
    noSlide() {
      this.isSlide = false;
    }
  },
  computed: {
    totalPrice() {
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
  }
};

$(function() {
  $(".is_allocating").click(function(e) {
    $(".allocatingDown").toggle();
    e.stopPropagation();
    $("body").click(function() {
      $(".allocatingDown").hide();
    });
  });
  $(".allocatingDown").click(function(e) {
    e.stopPropagation();
  });
  // 分配 下拉 赋值操作
  $(".allocatingDown a").click(function() {
    $(".is_allocating").html($(this).text());
    $(".allocatingDown").hide();
  });

  // 页面底部总金额固定底部
  var $fixedPrice = $("#fixedPrice");
  var $priceContainer = $("#price_container");
  $(window).on("scroll", getPosition);
  function getPosition() {
    var targetTop = $priceContainer.offset().top + $priceContainer.height();
    var position = $fixedPrice.css("position");

    // 可视区域底部 距离 文档顶部的距离 = 文档被上卷的高度 + 可视区域的高度
    var bottomToDocTop = $(document).scrollTop() + $(window).height();
    if (bottomToDocTop < targetTop && position !== "fixed") {
      $fixedPrice.css("position", "fixed");
    }

    if (bottomToDocTop >= targetTop && position === "fixed") {
      $fixedPrice.css("position", "absolute");
    }
  }

  // 带宽，进度条，滑动时，input里面的值变，反之亦然
  var input = document.getElementById("input");
  var yuan = document.getElementById("yuan");
  var jindu = document.getElementById("jindu");
  var tiao = document.getElementById("tiao");
  var tiaoW = tiao.offsetWidth;

  function schedule() {
    input.onblur = function() {
      var theV = this.value * 1;
      var xxx = theV / 200 * tiaoW;
      yuan.style.marginLeft = xxx + "px";
      jindu.style.width = xxx + "px";
    };
  }
  schedule();
});
</script>

<style>
@import "../assets/css/content.css";
</style>