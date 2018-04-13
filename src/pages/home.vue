<template>
  <div @click="hideSearch">
    <div class="banner">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide banner_one"></div>
            <div class="swiper-slide banner_two" @click="toMixedCloud"></div>
            <div class="swiper-slide banner_three" @click="toPackage"></div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div class="search_box">
            <div class="search">
                <div class="w clearfix">
                    <div style="position: relative">
                      <div class="search_park_icon"></div>
                      <input id="searchCity" class="searchCity" v-bind:class="{searchDown: isDown}" @click.stop="maskStatus" type="text" placeholder="请选择城市/园区" readonly/>
                      <resourceSearch :class="{'none':!areaSelect} "></resourceSearch>
                    </div>
                    <div>
                      <Datepicker class="startTime" placeholder="起租时间" language="zh" :disabled="state.disabled" :format="cusromFormatter"></Datepicker>
                    </div>
                    <div class="timeArrow"><div class="time_line"></div></div>
                    <div>
                        <Datepicker class="endTime" placeholder="结束时间" language="zh" :disabled="state.disabled" :format="cusromFormatter"></Datepicker>
                    </div>
                    <div class="searchBtn">
                        <router-link target="_blank" :to="{path: '/areaList'}">搜索</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="service ">
      <div class="model_title"><span class="model_title_bar"></span><span class="decorate_line"></span><span class="decorate_ball"></span><span class="text">办公空间</span><span class="decorate_ball"></span><span class="decorate_line"></span></div>
      <div class="model_description">CEC&nbsp;PARK提供最便捷最中心的办公地点，满足你全方位的办公需求</div>
      <div class="w " v-cloak>
        <ul class="clearfix">
          <li v-for="item in parks">
            <router-link target="_blank" :to="{path: '/resourceList', query: {id: item.id, name: item.parkName}} ">
              <div class="image " v-bind:style="{ background: 'url(' + item.parkThumb + ') no-repeat' } "></div>
              <p class="name " v-bind:title="item.parkName ">{{item.parkName}}</p>
              <p class="describe service_position " v-bind:title="item.parkAddress " v-if="item.parkAddress !=null && item.parkAddress !='' ">{{item.parkAddress}}</p>
              <div class="park_mask" v-cloak>
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
            </router-link>
          </li>
        </ul>
      </div>
      <div class="more_service ">
        <router-link target="_blank" :to="{path: '/areaList'}">园区列表</router-link>
      </div>
    </div>
    <div class="mixed_cloud">
        <div class="model_title"><span class="model_title_bar"></span><span class="decorate_line"></span><span class="decorate_ball"></span><span class="text">云服务</span><span class="decorate_ball"></span><span class="decorate_line"></span></div>
        <div class="model_description">可为租入者提供安全性价比高的云服务，安全可靠</div>
        <ul class="clearfix w mixed_ul">
            <li>
              <router-link target="_blank" :to="{path: '/userDefined'}">
                  <div class="mixedCloud_head">
                      <div class="image"><img src="../assets/images/mixed_product.png" alt=""/></div>
                      <div>混合云</div>
                  </div>
                  <div class="mixedCloud_body">
                      <p class="describe">提供99.9999999%的数据可靠性的高效云盘与SSD云存储，可自定义IP地址、网段、路由、防火墙的专属私有网络VPC。</p>
                      <div><router-link class="btn" target="_blank" :to="{path: '/userDefined'}">查看详情</router-link></div>
                  </div>
              </router-link>
            </li>
            <li class="hover defaultHover">
              <router-link target="_blank" :to="{path: '/packageOne'}">
                  <div class="mixedCloud_head">
                      <div class="image"><img src="../assets/images/mixed_solution.png" alt=""/></div>
                      <div>云解决方案</div>
                  </div>
                  <div class="mixedCloud_body">
                      <p class="describe">为不同规模的企业客户提供灵活、可扩展和低成本的云解决方案。</p>
                      <div><router-link class="btn" target="_blank" :to="{path: '/packageOne'}">查看详情</router-link></div>
                  </div>
              </router-link></li>
            <li><a href="javascript:;">
                <div class="mixedCloud_head">
                    <div class="image"><img src="../assets/images/mixed_cdn.png" alt=""/></div>
                    <div>CDN</div>
                </div>
                <div class="mixedCloud_body">
                    <p class="describe">通过将服务内容分发至全网加速节点，有效提高可用性、降低访问延迟及失败率，提升用户体验度。</p>
                    <div class="userDefined_btn"><a href="javascript:;" class="btn">敬请期待...</a></div>
                </div>
            </a></li>
        </ul>
    </div>
    <div class="day_serve">
        <div class="model_title" style="padding-top: 100px;"><span class="model_title_bar"></span><span class="decorate_line"></span><span class="decorate_ball"></span><span class="text">我们的服务</span><span class="decorate_ball"></span><span class="decorate_line"></span></div>
        <div class="model_description">优质高效的企业服务，助您的企业快速成长</div>
        <ul class="w clearfix">
            <li>
                <a href="javascript:;">
                    <div class="image minute15"></div>
                    <div class="name">15分钟紧急响应</div>
                    <div class="description">15分钟内对紧急情况进行处理，为您的信息保驾护航</div>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <div class="image hour24"></div>
                    <div class="name">7*24小时客服</div>
                    <div class="description">优质高效的企业服务，助您的企业快速成长企业快速成长</div>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <div class="image wifi"></div>
                    <div class="name">高速办公网络</div>
                    <div class="description">高速办公网络具有可靠、易管理、智能冗余的高效性能</div>
                </a>
            </li>
            <li>
                <a href="javascript:;">
                    <div class="image more_garden"></div>
                    <div class="name">企业服务</div>
                    <div class="description">优质高效的企业服务，助您的企业快速成长企业快速成长</div>
                </a>
            </li>
        </ul>
    </div>
    <div class="global_cec">
        <div class="model_title"><span class="model_title_bar"></span><span class="decorate_line"></span><span class="decorate_ball"></span><span class="text">CEC&nbsp;PARK&nbsp;在全球</span><span class="decorate_ball"></span><span class="decorate_line"></span></div>
        <div class="model_description">在交通便利、商业繁荣的核心区域，邂逅你最满意的办公室</div>
        <ul class="clearfix">
            <li class="one"><span>北京</span></li>
            <li class="two"><span>天津</span></li>
            <li class="three"><span>上海</span></li>
            <li class="four"><span>深圳</span></li>
            <li class="five"><span>广州</span></li>
            <li class="six"><span>珠海</span></li>
            <li class="seven"><span>纽约</span></li>
            <li class="eight"><span>洛杉矶</span></li>
            <li class="nine"><span>伦敦</span></li>
            <li class="ten"><span>硅谷</span></li>
        </ul>
        <div class="scare_data w clearfix">
            <div>
                <div class="number">11</div>
                <div class="name">开放城市</div>
            </div>
            <div>
                <div class="number">15</div>
                <div class="name">已有园区</div>
            </div>
            <div>
                <div class="number">65,000+</div>
                <div class="name">拥有工位</div>
            </div>
            <div>
                <div class="number">60,000,000m&sup2;</div>
                <div class="name">运营面积</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Swiper from "swiper";
import axios from "axios";
import Vue from "vue";
import resourceSearch from "../component/resourceSearch.vue";
import Datepicker from "vuejs-datepicker"; // vue 的日期插件
import moment from "moment"; // 格式化日期的插件

export default {
  name: "home",
  data() {
    return {
      parks: null,
      areaSelect: false,
      isDown: false,
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
    toMixedCloud() {
      this.$router.push({ path: "/userDefined" });
    },
    toPackage() {
      this.$router.push({ path: "/packageOne" });
    },
    initSwiper() {
      var mySwiper = new Swiper(".swiper-container", {
        loop: true,
        effect: "fade",
        
        // swiper 4 的写法
        // autoplay: {
        //   delay: 4000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false,
        // },
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        // navigation: {
        //   prevEl: ".swiper-button-prev",
        //   nextEl: ".swiper-button-next",
        // },
        
        // swiper 3 的写法
        autoplay: 4000,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
      });
    }
  },
  mounted() {
    this.initSwiper();

    let vm = this;
    axios
      .get("/park/list", {
        params: {
          listType: 1,
          pageIndex: 1,
          pageSize: 6
        }
      })
      .then(function(response) {
        vm.parks = response.data.data;
        vm.areaSelect = false;
      })
      .catch(function(error) {
        console.log(error);
      });

    $(".mixed_ul li").mouseover(function() {
      $(".mixed_ul li")
        .eq($(this).index())
        .addClass("hover")
        .siblings()
        .removeClass("hover");
    });
    $(".mixed_ul li").mouseleave(function() {
      $(".mixed_ul .defaultHover")
        .addClass("hover")
        .siblings()
        .removeClass("hover");
    });
  }
};
</script>

<style>
@import "../assets/css/lib/swiper.min.css";
@import "../assets/css/content.css";
</style>