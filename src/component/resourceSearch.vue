<template>
    <div class="resource_search clearfix">
        <div class="search_all"><router-link target="_blank" :to="{path: '/areaList'}">全部</router-link></div>
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
                <li v-if="provinces[checkedProvince].regions[checkedRegion]" v-for="(park, index) in provinces[checkedProvince].regions[checkedRegion].parks">
                    <router-link target="_blank" :class="{red: index==checkedPark}" :to="{path: '/resourceList', query: {id: park.parkId, name: park.parkName}}">{{park.parkName}}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
    name: "app",
    props: ['selectedParkId'],
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
        }
    },
    mounted() {
        var vueObj = this;
        axios.get('/park/names')
            .then(function(response) {
                var provinces = response.data;
                vueObj.provinces = provinces;
                for (var i = 0; i < provinces.length; i++) {
                    for (var j = 0; j < provinces[i].regions.length; j++) {
                        for (var k = 0; k < provinces[i].regions[j].parks.length; k++) {
                            var park = provinces[i].regions[j].parks[k];
                            if (park.parkId == vueObj.selectedParkId) {
                                vueObj.checkedProvince = i;
                                vueObj.checkedRegion = j;
                                vueObj.checkedPark = k;
                                return;
                            }
                        }
                    }
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}
</script>

<style>
@import "../assets/css/lib/swiper.min.css";
@import "../assets/css/content.css";
</style>