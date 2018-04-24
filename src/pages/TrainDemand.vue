<template>
  <div class="home-container">
    <group :title="title1">
      <x-textarea :placeholder="placeholder" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
    </group>
    <group :title="title2">
      <x-textarea :placeholder="placeholder" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
    </group>
    <group :title="title3">
      <x-textarea :placeholder="placeholder" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
    </group>
    <group :title="title4">
      <x-textarea :placeholder="placeholder" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
    </group>
    <group :title="title5">
      <x-textarea :placeholder="placeholder" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
    </group>
  </div>
</template>

<script>
import axios from "axios";

import { XButton, Group, XTextarea } from "vux";
export default {
  data() {
    return {
			title1: "1.您迫切需要哪方面的培训？",
			title2: "2.您所在团队(单位,班组)最需要哪方面的培训？",
			title3: "3.您期望的培训方式？",
			title4: "4.您对培训师的要求：",
			title5: "5.您对公司培训工作有哪些建议和希望？",
			data1: '',
			data2: '',
			data3: '',
			data4: '',
			data5: '',
		};
  },
  components: {
		Group,
    XButton,
		XTextarea 
  },
  methods: {
    onEvent (event) {
      console.log('on', event)
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
<style>
h3 {
  text-align: center;
  margin-bottom: 10px;
}
.home-container {
  padding: 40px;
}
.ad-message,
.fast-entry {
  border: 1px solid #ccc;
  padding: 10px;
}
.fast-entry {
  margin-bottom: 20px;
}
</style>
