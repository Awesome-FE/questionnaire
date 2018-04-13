<template>
    <div class="length_input">
        <span @click="changeMoney(-1)">-</span>
        <input ref="input" type="number" :value="value" :style="inputStyle" v-on:input="updateValue($event.target.value)">
        <span @click="changeMoney(1)">+</span>
    </div>
</template>

<script>
export default {
  name: "inputDuration",
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number
    },
    default: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      inputStyle: {
        color: "#999",
        fontWeight: "normal"
      }
    };
  },
  mounted() {
    this.updateValue(this.default);
  },
  methods: {
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue(value) {
      var formattedValue =
        Number(value) > Number(this.max) ? Number(this.max) : value;
      formattedValue = Number(formattedValue) < 0 ? 0 : formattedValue;
      // 如果值不统一，手动覆盖以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue;
      }
      // 通过 input 事件发出数值
      this.$emit("input", Number(formattedValue));
      if (formattedValue != 0) {
        this.inputStyle.color = "#333";
        this.inputStyle.fontWeight = "bold";
      } else {
        this.inputStyle.color = "#999";
        this.inputStyle.fontWeight = "normal";
      }
    },
    changeMoney(delta) {
      var formattedValue = Number(this.$refs.input.value);
      if (delta > 0) {
        formattedValue = formattedValue + 1;
        formattedValue =
          formattedValue > Number(this.max) ? Number(this.max) : formattedValue;
        var $input = this.$refs.input;
        this.inputStyle.color = "#333";
        this.inputStyle.fontWeight = "bold";
      } else {
        formattedValue = formattedValue - 1;
        if (formattedValue < 1) {
          formattedValue = 0;
          var $input = this.$refs.input;
          this.inputStyle.color = "#999";
          this.inputStyle.fontWeight = "normal";
        }
      }
      this.$emit("input", formattedValue);
    }
  }
};
</script>
