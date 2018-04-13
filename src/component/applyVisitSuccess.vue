<template>
    <div class="visit_success_mask mask" v-show="show">
        <div class="apply_visit_success">
            <div class="image">
                <img src="../assets/images/order_visit_mask.png" alt=""/>
            </div>
            <div class="text">恭喜您预约成功！</div>
            <div>稍后工作人员会与您联系。</div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import bus from "../js/eventBus.js";
export default {
  name: "applyVisitSuccess",
  data() {
    return {
      show: false
    };
  },
  mounted() {
    bus.$on(
      "showSuccess",
      function() {
        this.show = true;
      }.bind(this)
    );
    bus.$on(
      "hideSuccess",
      function() {
        this.show = false;
      }.bind(this)
    );
  }
};
</script>
