<template>
    <div class="resource_search clearfix">
        <div class="province">
            <ul>
                <li v-for="(province, index) in provinces">
                    <a href="javascript:;" :class="{red: index==checkedProvince}" @click.stop="checkProvince(index)">{{province.provinceName}}</a>
                </li>
            </ul>
        </div>
        <div class="region">
            <ul>
                <li v-if="provinces[checkedProvince]" v-for="(region, index) in provinces[checkedProvince].regions" @click.stop="checkRegion(index)">
                    <a href="javascript:;" :class="{red: index==checkedRegion}">{{region.regionName}}</a>
                </li>
            </ul>
        </div>
        <div class="park">
            <ul>
                <li v-if="provinces[checkedProvince].regions[checkedRegion]" v-for="(park, index) in provinces[checkedProvince].regions[checkedRegion].parks"><a href="javascript:;" @click="billRes(park.parkId, park.parkName)">{{park.parkName}}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import bus from "../js/eventBus.js";

export default {
  name: "billSearch",
  props: ["selectedParkId"],
  data() {
    return {
      provinces: [{ regions: [{ parks: [] }] }],
      searchParks: null,
      checkedProvince: 0,
      checkedRegion: 0,
      checkedPark: 0
    };
  },
  methods: {
    checkProvince(index) {
      this.checkedProvince = index;
      this.checkedRegion = 0;
      this.checkedPark = 0;
    },
    checkRegion(index) {
      this.checkedRegion = index;
      this.checkedPark = 0;
    },
    billRes(parkId, parkName) {
      this.$emit("selected", parkId, parkName);
      bus.$emit("hideSearch");
    }
  },
  mounted() {
    var vueObj = this;
    axios
      .get("/park/names")
      .then(function(response) {
        var provinces = response.data;
        vueObj.provinces = provinces;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
@import "../assets/css/lib/swiper.min.css";
@import "../assets/css/content.css";
</style>