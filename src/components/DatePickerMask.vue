<template>
  <div v-click-outside="hide">
    <calendar-body :maskFormat="maskFormat" :momentFormat="momentFormat" @change="bodyChange" @onClick="show" @onClear="onClear" :value="currentValue" :placeholder="placeholder" clearable></calendar-body>

    <calendar-header v-if="visible" :format="maskFormat" :type="type" style="position: absolute; background: #fff; border-color: rgb(81, 90, 110); z-index: 15;" @change="headerChange" :value="currentValue"></calendar-header>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import CalendarHeader from "~/components/CalendarHeader";
  import CalendarBody from "~/components/CalendarBody";
  import ClickOutside from 'vue-click-outside';

  /*
  * Маски для moment - https://momentjs.com/docs/
  * Маски для inputmask - https://github.com/RobinHerbots/Inputmask
  */

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
      this.formatValue(this.value);
    },
    data() {
      return {
        currentValue: null,
        visible: false
      }
    },
    watch: {
      value(newValue, oldValue) {
        this.formatValue(newValue);
      },
    },
    methods: {
      formatValue(value) {
        if (funcUtils.isNotEmpty(value)) {
          if (value instanceof Number) {
            this.currentValue = new Date(value);
          } else if (value instanceof Date) {
            this.currentValue = value;
          }
        } else {
          this.currentValue = null;
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
      },
      headerChange(date) {
        this.$emit('input', date);
        this.$emit('change', date);
      },
      bodyChange(date) {
        this.$emit('input', date);
        this.$emit('change', date);
      },
    }
  }
</script>

<style scoped>

</style>
