<template>
  <DatePicker ref="datePicker" :class="dateClass" :type="type" :format="format" :value="value" @keydown.enter.native="onEnter" @on-change="onChange" :placeholder="placeholder" clearable></DatePicker>
</template>

<script>
  import Inputmask from 'inputmask';
  import * as funcUtils from "../assets/js/utils/funcUtils";

  export default {
    name: "DatePickerMask",
    props: {
      dateClass: String,
      type: String,
      value: {
        type: [String, Date, Number]
      },
      format: String,
      momentFormat: String,
      maskFormat: String,
      clearable: {
        type: Boolean
      },
      placeholder: {
        type: String
      },
    },
    mounted () {
      this.setMask();
    },
    data() {
      return {
      }
    },
    methods: {
      setMask() {
        let mask = {
          alias: "datetime",
          inputFormat: this.maskFormat,
          placeholder: this.placeholder
        };
        let im = new Inputmask(mask);
        im.mask(this.$refs.datePicker.$refs.input.$refs.input);
      },
      onEnter(e) {
        this.updateValue(e.target.value);
      },
      onChange(e) {
        this.updateValue(e);
      },
      updateValue(val) {
        let value = null;
        let date = funcUtils.formatDateTime(val, this.momentFormat);
        if (date.isValid()) {
          value = date.toDate();
        }
        this.$emit('input', value);
        this.$emit('change', value);
        this.setMask();
        this.$refs.datePicker.$refs.input.$forceUpdate();
      },
    }
  }
</script>

<style scoped>

</style>
