<template>
  <div v-click-outside="hide">
    <calendar-body :maskFormat="maskFormat" :momentFormat="momentFormat" @change="bodyChange" @onClick="show" @onClear="onClear" :value="currentValue" :placeholder="placeholder" clearable></calendar-body>

    <calendar-header v-show="visible" ref="calendarHeader" :type="type" style="position: absolute; background: red; z-index: 15;" @change="headerChange" :value="currentValue"></calendar-header>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import CalendarHeader from "~/components/CalendarHeader";
  import CalendarBody from "~/components/CalendarBody";
  import ClickOutside from 'vue-click-outside'

  export default {
    name: "DatePickerMask",
    components: {CalendarBody, CalendarHeader},
    directives: {
      ClickOutside
    },
    props: {
      value: [Date, Number],
      clearable: Boolean,
      placeholder: String,
      type: String,
      maskFormat: String,
      momentFormat: String,
    },
    created() {
      this.formatValue();
    },
    data() {
      return {
        currentValue: null,
        visible: false
      }
    },
    watch: {
      value(newValue, oldValue) {
        this.formatValue();
      },
    },
    methods: {
      formatValue() {
        let value  = this.value;
        if (funcUtils.isNotEmpty(value)) {
          if (value instanceof Number) {
            this.currentValue = new Date(value);
          } else if (value instanceof Date) {
            this.currentValue = value;
          }
        }
      },
      hide() {
        this.visible = false;
      },
      show() {
        this.visible = true;
      },
      onClear() {
        this.$emit('input', null);
        this.$emit('change', null);
        this.$refs.calendarHeader.clearCurrent();
      },
      headerChange(date) {
        this.$emit('input', date);
        this.$emit('change', date);
      },
      bodyChange(date) {
        this.$emit('input', date);
        this.$emit('change', date);
        if (funcUtils.isEmpty(date)) {
          this.$refs.calendarHeader.clearCurrent();
        }
      },
    }
  }
</script>

<style scoped>

</style>
