<template>
    <div @click="hideSearch">
        <div class="w detail_search search_fix">
            <div class="search">
                <div class="w clearfix">
                    <div style="position: relative">
                      <div class="search_park_icon"></div>
                        <input id="searchCity" class="searchCity" v-bind:class="{searchDown: isDown}" @click.stop="maskStatus" type="text" v-model="parkName" placeholder="请选择城市/园区" readonly/>
                        <resourceSearch :selected-park-id="parkId" :class="{'none':!areaSelect} "></resourceSearch>
                    </div>
                    <div>
                        <Datepicker class="startTime" placeholder="起租时间" language="zh" :disabled="state.disabled" :format="cusromFormatter"></Datepicker>
                    </div>
                    <div class="timeArrow"><div class="time_line"></div></div>
                    <div>
                        <Datepicker class="endTime" placeholder="结束时间" language="zh" :disabled="state.disabled" :format="cusromFormatter"></Datepicker>
                    </div>
                    <div class="searchBtn">
                        <a href="area_list.html">搜索</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="w dataList clearfix" v-cloak>
            <div class="fl mobile_datalist dataList_fix">
              <ul id="listBox" class="clearfix">
                  <li v-for="item in parks">
                    <router-link target="_blank" :to="{path: '/resourceList', query: {id: item.id, name: item.parkName}}">
                      <div class="image" v-bind:style="{backgroundImage: 'url(' + item.parkThumb + ')'}"></div>
                          <p class="name" v-bind:title="item.parkName">{{item.parkName}}</p>
                          <p class="describe service_position" v-bind:title="item.parkAddress" v-if="item.parkAddress != null && item.parkAddress != ''">{{item.parkAddress}}</p>
                          <div class="park_mask">
                              <div class="park_info">
                                  <div class="title">园区详情</div>
                                  <div class="content">办公面积{{item.parkAreaNum}}m&sup2;</div>
                                  <div class="content">办公工位{{item.parkStationNum}}个</div>
                              </div>
                              <div class="cloud_sevice">
                                  <div class="title">云服务</div>
                                  <div class="content" v-for="service in item.parkServiceList">{{service}}</div>
                              </div>
                          </div>
                          <router-link target="_blank" :to="{path: '/resourceList', query: {id: item.id, name: item.parkName}}" class="buy">查看</router-link>
                    </router-link>
                  </li>
              </ul>
              
              <pagination :page=page :url=url v-on:getData="getData"></pagination>
            </div>
            <div class="fr map_fix">
                <div id="map_list" class="map_list">
                    <baidu-map :center="mapInfo.mapCenter"  :scroll-wheel-zoom=true :zoom="mapInfo.zoom" @ready="handler" class="bm-view">
                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                        <bm-marker v-for="item in parks" :key="item.id" :position=transPoint(item.parkPosition) :dragging="true" @click="infoWindowOpen(item.id)">
                          <bm-info-window :show="bmInfoId == item.id" @close="infoWindowClose(item.id)"><img class="bm_img" v-bind:src="item.parkThumb"/><p>{{item.parkAddress}}</p></bm-info-window> 
                        </bm-marker>
                    </baidu-map>
                </div>
            </div>
          </div>
    </div>
</template>

<script>
import Vue from "vue";
import BaiduMap from "vue-baidu-map";
import resourceSearch from "../component/resourceSearch.vue";
import util from "../js/util.js";
import Datepicker from "vuejs-datepicker"; // vue 的日期插件
import moment from "moment"; // 格式化日期的插件
import pagination from "../component/pagination.vue";

export default {
  name: "areaList",
  data() {
    return {
      url: "/park/list",
      parks: [],
      parkId: null,
      parkName: null,
      areaSelect: false,
      isDown: false,
      state: {
        disabled: {
          to: new Date()
        }
      },
      page: {
        currentPage: 1,
        totalPage: null,
        pageSize: 12
      },
      mapInfo: {
        zoom: 5,
        mapCenter: { lng: 116.404, lat: 39.915 },
        points: []
      },
      bmInfoId: null
    };
  },
  components: {
    resourceSearch,
    Datepicker,
    pagination
  },
  methods: {
    maskStatus() {
      // 更改显示状态
      this.areaSelect = !this.areaSelect;
      this.isDown = !this.isDown;
    },
    hideSearch() {
      this.areaSelect = false;
      this.isDown = false;
    },
    cusromFormatter(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    getData(data) {
      this.parks = data;
      this.handler(this.parks);
      for (var i = 0; i < this.parks.length; i++) {
        this.bmInfoId = null;
      }
    },
    transPoint(parkPosition) {
      if (
        parkPosition != null ||
        parkPosition != undefined ||
        parkPosition != ""
      ) {
        var pArray = parkPosition.split(",");
        return {
          lng: pArray[0],
          lat: pArray[1]
        };
      }
    },
    handler(markerArr) {
      var points = [];
      for (var i = 0; i < markerArr.length; i++) {
        if (
          markerArr[i].parkPosition != null ||
          markerArr[i].parkPosition != undefined ||
          markerArr[i].parkPosition != ""
        ) {
          var pArray = markerArr[i].parkPosition.split(",");
          var point = this.transPoint(pArray[0], pArray[1]);
          points.push(point);
        }
      }
      this.mapInfo.points = points;
    },
    infoWindowOpen(id) {
      this.bmInfoId = id;
    },
    infoWindowClose(id) {
      this.bmInfoId = null;
    }
  },
  mounted: function() {},
  beforeRouteUpdate(to, from, next) {},
  computed: {
    getShowStatus(id) {
      console.log(this.infoShow[id]);
      return this.infoShow[id];
    }
  }
};
</script>

<style>
.nav {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1;
  border-bottom: 1px solid #f4f4f4;
  box-shadow: none;
}
.footer {
  display: none;
}
</style>
