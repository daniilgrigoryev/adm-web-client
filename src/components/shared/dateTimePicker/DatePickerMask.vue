<template>
  <div v-click-outside="hide">
    <calendar-body :maskFormat="maskFormat" :momentFormat="momentFormat" @change="change" @onClick="show" @onClear="onClear" @hide="hide" :value="currentValue" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :clearable="clearable"></calendar-body>

    <calendar-header ref="datePickerMaskHeader" v-if="visible" class="calendar-header" :format="maskFormat" :type="type" @change="change" @hide="hide" :value="currentValue"></calendar-header>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import CalendarHeader from "~/components/shared/dateTimePicker/CalendarHeader";
  import CalendarBody from "~/components/shared/dateTimePicker/CalendarBody";
  import ClickOutside from 'vue-click-outside';

  /*
  * type: date, time, datetime
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
      value: [Date, Number, String],
      clearable: Boolean,
      placeholder: String,
      disabled: {
        type: Boolean
      },
      readonly: {
        type: Boolean
      },
      type: String,
      maskFormat: String,
      momentFormat: String,
      stringFormat: String
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
    updated() {
      let datePickerMaskHeader = this.$refs.datePickerMaskHeader;
      if (datePickerMaskHeader) {
        let datePickerMaskHeaderOffset = datePickerMaskHeader.$el.getBoundingClientRect();

        if (datePickerMaskHeaderOffset.bottom > window.innerHeight) {
          datePickerMaskHeader.$el.style.top = '-277px';
        }
      }
    },
    methods: {
      formatValue(value) {
        if (this.validType(value)) {
          if (funcUtils.isNumber(value)) {
            this.currentValue = new Date(value);
          } else if (value instanceof Date) {
            this.currentValue = value;
          } else if (typeof value === 'string') {
            let date = funcUtils.formatDateTime(value, this.stringFormat);
            if (date.isValid()) {
              this.currentValue = date.toDate();
            } else {
              this.currentValue = null;
            }
          }
        } else {
          this.currentValue = null;
        }
      },
      validType(value) {
        return funcUtils.isNumber(value) || funcUtils.isDate(value) || funcUtils.isString(value);
      },
      hide() {
        this.visible = false;
      },
      show() {
        if (!this.disabled && !this.readonly) {
          this.visible = true;
        }
      },
      onClear() {
        this.$emit('input', null);
        this.$emit('change', null);
      },
      change(date) {
        if (funcUtils.isString(this.value)) {
          date = funcUtils.parseDateTime(date, this.stringFormat);
        }
        this.$emit('input', date);
        this.$emit('change', date);
      },
    }
  }
</script>

<style scoped lang="scss">
  .calendar-header {
    position: absolute;
    height: 277px;
    background: #fff;
    border-color: rgb(81, 90, 110);
    z-index: 15;
  }
</style>
