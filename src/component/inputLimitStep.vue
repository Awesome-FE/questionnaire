<template>
   <input ref="input" type="number" v-bind:value="value" v-on:blur="updateValue($event.target.value)" style="padding-left: 5px"/>
</template>

<script>
export default {
  name: "limitStepInput",
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    default: {
      type: Number,
      default: 0
    }
  },
  mounted: function() {
    this.updateValue(this.default);
  },
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function(value) {
      var formattedValue = Number(value);
      // 步长处理
      formattedValue =
        formattedValue % this.step == 0
          ? formattedValue
          : Math.ceil(formattedValue / this.step) * this.step;
      formattedValue =
        formattedValue > Number(this.max) ? Number(this.max) : formattedValue;
      formattedValue =
        Number(formattedValue) < this.min ? this.min : formattedValue;
      // 如果值不统一，手动覆盖以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue;
      }
      // 通过 input 事件发出数值
      this.$emit("input", Number(formattedValue));
    }
  }
};
</script>
