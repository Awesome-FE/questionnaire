<template>
    <div class="footer">
        <div class="w">
            <div class="visit_box clearfix">
                <input type="text" placeholder="姓名" v-model="name"/>
                <input type="text" placeholder="手机号" v-model="phone"/>
                <div class="park">
                    <input type="text" placeholder="园区" v-model="selectedParkName"  v-bind:class="{searchDown: isDown}" @click.stop="maskStatus" readonly/>
                    <bill_search id="resourceInfo" :class="{\'none\':!areaSelect}" v-on:selected="selectPark"></bill_search>
                </div>
                <Datepicker class="startTime" placeholder="日期" language="zh" :disabled="state.disabled" :format="cusromFormatter"></Datepicker>
                <a href="javascript:;" class="btn" @click="submitVisitInfo">预约参观</a>
            </div>
            <ul class="clearfix footer_top">
                <li>
                    <div class="serve_phone">400-186-9900</div>
                    <div class="describe">7*24小时热线服务</div>
                    <div class="language_change">
                        <select name="" id="">
                            <option value="" selected="true">中文</option>
                            <option value="">英文</option>
                        </select>
                    </div>
                </li>
                <li>
                    <div class="name">帮助中心</div>
                    <div class="second_title"><a href="">购买指南</a></div>
                </li>
                <li>
                    <div class="name">关于我们</div>
                    <div class="second_title"><a href="">新浪微博</a></div>
                    <div class="second_title"><a href="">官方微信</a></div>
                </li>
                <li class="QR_code"><img src="../assets/images/QR_code.png" alt=""/></li>
            </ul>
            <ul class="footer_bottom clearfix">
                <li class="company"></li>
                <li class="icp_records">
                    <p>Copyright&copy;2016-2017 www.cecpark.net&nbsp;All&nbsp;rights&nbsp;reserved.</p>
                    <p>京ICP备16019652号-11</p>
                </li>
                <li class="assets/images">
                    <img src="../assets/images/footer_honest.png" alt=""/>
                    <img src="../assets/images/footer_believe.png" alt=""/>
                    <img src="../assets/images/footer_deal.png" alt=""/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Datepicker from "vuejs-datepicker"; // vue 的日期插件
import moment from "moment"; // 格式化日期的插件

export default {
  name: "app",
  data() {
    return {
      isDown: false,
      areaSelect: false,
      // 申请预约参观  需要的数据
      visitDate: null,
      name: null,
      phone: null,
      message: null,
      error: false,
      selectedParkName: null,
      selectedParkId: null
    };
  },
  components: {
    billSearch,
    Datepicker
  },
  methods: {
    maskStatus() {
      // 更改显示状态
      this.areaSelect = !this.areaSelect;
      this.isDown = !this.isDown;
    },
    selectPark(parkId, parkName) {
      this.selectedParkId = parkId;
      this.selectedParkName = parkName;
    },
    submitVisitInfo() {
      var vueObj = this;
      var datepic = $("#visitDay").val();
      // 这个园区id需要获取: 需要在bill_search组件里传递过来
      axios({
        method: "post",
        url: "/visit",
        data: {
          visitDate: datepic,
          name: vueObj.name,
          phone: vueObj.phone,
          resId: vueObj.selectedParkId
        }
      })
        .then(function(response) {
          // 申请预约参观弹窗弹出
          bus.$emit("showSuccess");
          setTimeout(function() {
            bus.$emit("hideSuccess");
          }, 2000);
          vueObj.visitDate = null;
          vueObj.name = null;
          vueObj.phone = null;
          vueObj.resId = null;
          vueObj.selectedParkName = null;
        })
        .catch(function(error) {
          var response = error.response;
          if (response) {
            if (response.status == 403) {
              bus.$emit("showLogin");
            } else if (response.status == 400) {
              vueObj.error = true;
              vueObj.message = response.data.desc;
              $(document.body).scrollTop(0);
            }
          } else {
            vueObj.error = true;
            console.log("Error", error.message);
            vueObj.message = response.data.desc;
          }
        });
    },
    datepicker() {
      var vueObj = this;
      $("#visitDay").datepicker({
        minDate: new Date(),
        maxDate: "99Y",
        dateFormat: "yy-mm-dd",
        onSelect: function() {
          var datepic = $("#visitDay").val();
          vueObj.visitDate = datepic;
        }
      });
    }
  },
  mounted() {
    bus.$on(
      "hideSearch",
      function() {
        this.areaSelect = false;
        this.isDown = false;
      }.bind(this)
    );
  }
};
</script>
