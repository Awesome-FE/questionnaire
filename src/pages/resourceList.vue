<template>
    <div @click="hideSearch">
        <div class="w detail_search">
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
            <div class="model_title clearfix" v-show="cloudResources.length != 0"><span class="model_title_bar"></span><span class="model_title_text">云服务</span></div>
            <ul class="id_inner mobile_datalist clearfix resource_datalist">
                <li v-for="item in cloudResources" class="resource_list_li">
                    <!--高速办公网络和孵化服务-->
                    <router-link v-if="item.parkResCategory == '1' || item.parkResCategory == '3'" :to="{path: '/resourceDetailHatch', query: {id: item.id, parkName: item.parkName, parkId: item.parkId, c: item.parkResCategory}} " target="_blank">
                        <div class="image" v-bind:style="{ background: 'url(' + item.parkResThumb + ') no-repeat' }"></div>
                        <p class="name" v-bind:title="item.parkResName">{{item.parkResName}}</p>
                        <p class="describe broadband" v-bind:title="item.parkResSubTitle" v-if="item.parkResSubTitle != null">{{item.parkResSubTitle}}</p>
                        <router-link class="buy" :to="{path: '/resourceDetailHatch', query: {id: item.id, parkName: item.parkName, parkId: item.parkId, c: item.parkResCategory}} " target="_blank">订购</router-link>
                    </router-link>

                    <!--混合云服务-->
                    <router-link v-if="item.parkResCategory == '0'" :to="{path: '/packageOne'}" target="_blank">
                        <div class="image" v-bind:style="{ background: 'url(' + item.parkResThumb + ') no-repeat' }"></div>
                        <p class="name" v-bind:title="item.parkResName">{{item.parkResName}}</p>
                        <p class="describe broadband" v-bind:title="item.parkResSubTitle" v-if="item.parkResSubTitle != null">{{item.parkResSubTitle}}</p>
                        <router-link class="buy" :to="{path: '/packageOne'}" target="_blank">订购</router-link>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="w dataList clearfix" style="padding-bottom: 0px; padding-top: 0px;" v-cloak>
            <div class="model_title clearfix" v-show="parkResources.length != 0"><span class="model_title_bar"></span><span class="model_title_text">园区空间</span></div>
            <ul class="id_inner mobile_datalist clearfix resource_datalist">
                <li v-for="item in parkResources" class="resource_list_li">
                  <router-link :to="{path: '/resourceDetail', query: {id: item.id, parkName: item.parkName, parkId: item.parkId, c: item.parkResCategory}} " target="_blank">
                    <div class="image" v-bind:style="{ background: 'url(' + item.parkResThumb + ') no-repeat' }"></div>
                        <p class="name" v-bind:title="item.parkResName">{{item.parkResName}}</p>
                        <p class="describe broadband" v-bind:title="item.independentOfficeType" v-if="item.independentOfficeType != null && item.independentOfficeType != ''">{{item.independentOfficeType}}&nbsp;<span v-bind:title="item.innovationOfficeType" v-if="item.innovationOfficeType != null && item.innovationOfficeType != ''">/&nbsp;{{item.innovationOfficeType}}</span></p>
                        <router-link class="buy" :to="{path: '/resourceDetail', query: {id: item.id, name: item.parkName, parkId: item.parkId, c: item.parkResCategory}} " target="_blank">订购</router-link>
                  </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import resourceSearch from "../component/resourceSearch.vue";
import util from "../js/util.js";
import Datepicker from "vuejs-datepicker"; // vue 的日期插件
import moment from "moment"; // 格式化日期的插件

var parkId = util.getParameterByName("id");
var parkName = util.getParameterByName("name");

export default {
  name: "resourceList",
  data() {
    return {
      parkId: parkId,
      parkName: parkName,
      resources: null,
      areaSelect: false,
      firstResourceId: null,
      isDown: false,
      cloudResources: [],
      parkResources: [],
      state: {
        disabled: {
          to: new Date()
        }
      }
    };
  },
  components: {
    resourceSearch,
    Datepicker
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
    loadData() {
      let vm = this;
      parkId = util.getParameterByName("id");
      parkName = util.getParameterByName("name");
      axios
        .get("/park/resources", {
          params: {
            parkId: parkId
          }
        })
        .then(function(response) {
          var resources = response.data.data;
          vm.resources = resources;
          vm.firstResourceId = resources[0].id;
          vm.areaSelect = false;
          var markerArr = [];
          for (var i = 0; i < resources.length; i++) {
            var resource = resources[i];
            if (
              resource.parkResCategory == "2" &&
              resource.parkResPosition != null
            ) {
              var marker = {};
              marker["sid"] = resource.id;
              marker["title"] = resource.parkResName;
              marker["point"] = resource.parkResPosition;
              marker["icon"] = resource.parkResThumb;
              marker["address"] = resource.parkResAddress;
              markerArr.push(marker);
            }
            if (resource.parkResCategory == "2") {
              vm.parkResources.push(resource);
            }

            if (
              resource.parkResCategory == "0" ||
              resource.parkResCategory == "1" ||
              resource.parkResCategory == "3"
            ) {
              vm.cloudResources.push(resource);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted: function() {
    this.loadData();
  },
  beforeRouteUpdate(to, from, next) {
    this.loadData();
  }
};
</script>

<style>
.detail_search {
  margin-top: 20px;
  margin-bottom: 30px;
}
</style>



