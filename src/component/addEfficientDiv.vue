<template>
   <div class="clearfix increasable_div" v-show="isShow">
       　<div style="position: relative; float: left; margin-right: 10px;">
           　<div class="cloud_storage">高效云盘</div>
       　</div>
        <div class="fl">
            <div class="clearfix manual_input_box">
                <inputLimitStep class="manual_input" v-model.number="valObj.dataDiskSize" v-bind:max="2048" v-bind:min="100" v-bind:step="10"></inputLimitStep><span class="broadband_unit">GB</span>
            </div>
        </div>
        <div class="delete_dish fl" @click="remove">×</div>
   </div>
</template>

<script>
import bus from "../js/eventBus.js";
import inputLimitStep from "../component/inputLimitStep.vue";

export default {
  name: "addEfficientDiv",
  data() {
    return {
      valObj: {
        id: null,
        dataDiskName: "高效云盘",
        dataDiskSize: 100
      },
      isShow: true
    };
  },
  components: {
    inputLimitStep
  },
  mounted: function() {
    this.id = this._uid;
    bus.$emit("addDisk", this.valObj);
  },
  methods: {
    remove: function() {
      this.isShow = false;
      bus.$emit("deleteDisk", this.valObj);
    },
    update: function() {
      bus.$emit("updateDisk", this.valObj);
    },
  }
};
</script>
