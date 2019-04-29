<template>
  <div v-click-outside="hide" class="calendar-parent">
    <calendar-body ref="dateRangePickerMaskBody" :maskFormat="maskFormat" :momentFormat="momentFormat" @change="change" @hide="hide" @onClick="show" @onClear="onClear" :valueFirst="currentValueFirst" :valueSecond="currentValueSecond" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :clearable="clearable" :inputClass="inputClass"></calendar-body>

    <calendar-header ref="dateRangePickerMaskHeader" v-if="visible" class="calendar-header" :format="maskFormat" :type="type" @change="change" @onClear="onClear" @hide="hide" :valueFirst="currentValueFirst" :valueSecond="currentValueSecond"></calendar-header>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import ClickOutside from 'vue-click-outside';

  /*
  * type: date, time, datetime
  * Маски для moment - https://momentjs.com/docs/
  * Маски для inputmask - https://github.com/RobinHerbots/Inputmask
  */

  export default {
    name: "DatePickerMask",
    components: {
      CalendarBody: () => import('~/components/shared/dateTimeRangePicker/CalendarBody'),
      CalendarHeader: () => import('~/components/shared/dateTimeRangePicker/CalendarHeader')
    },
    directives: {
      ClickOutside
    },
    props: {
      valueFirst: [Date, Number, String],
      valueSecond: [Date, Number, String],
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
      stringFormat: String,
      inputClass: String
    },
    created() {
      this.currentValueFirst = this.formatValue(this.valueFirst);
      this.currentValueSecond = this.formatValue(this.valueSecond);
    },
    data() {
      return {
        currentValueFirst: null,
        currentValueSecond: null,
        visible: false
      }
    },
    watch: {
      valueFirst(newValue, oldValue) {
        this.currentValueFirst = this.formatValue(newValue);
      },
      valueSecond(newValue, oldValue) {
        this.currentValueSecond = this.formatValue(newValue);
      },
    },
    updated() {
      let dateRangePickerMaskHeader = this.$refs.dateRangePickerMaskHeader;
      let dateRangePickerMaskBody = this.$refs.dateRangePickerMaskBody;
      if (dateRangePickerMaskHeader) {
        let dateRangePickerMaskHeaderOffset = dateRangePickerMaskHeader.$el.getBoundingClientRect();
        let dateRangePickerMaskBodyOffset = dateRangePickerMaskBody.$el.getBoundingClientRect();

        if ((dateRangePickerMaskHeaderOffset.bottom + dateRangePickerMaskHeaderOffset.height) > window.innerHeight) {
          dateRangePickerMaskHeader.$el.style.bottom = dateRangePickerMaskBodyOffset.height  + 'px';
        }
      }
    },
    methods: {
      formatValue(value) {
        if (this.validType(value)) {
          if (funcUtils.isNumber(value)) {
            return new Date(value);
          } else if (value instanceof Date) {
            return value;
          } else if (typeof value === 'string') {
            let date = funcUtils.formatDateTime(value, this.stringFormat);
            if (date.isValid()) {
              return date.toDate();
            } else {
              return null;
            }
          }
        } else {
          return null;
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
        this.$emit('change', {
          valueFirst: null,
          valueSecond: null
        });
      },
      change(dates) {
        let valueFirst = dates.valueFirst;
        let valueSecond = dates.valueSecond;
        if (funcUtils.isString(this.valueFirst)) {
          valueFirst = funcUtils.parseDateTime(valueFirst, this.stringFormat);
        }
        if (funcUtils.isString(this.valueSecond)) {
          valueSecond = funcUtils.parseDateTime(valueSecond, this.stringFormat);
        }
        this.$emit('change', {
          valueFirst: valueFirst,
          valueSecond: valueSecond
        });
      },
    }
  }
</script>

<style scoped lang="scss">
  .calendar-parent {
    position: relative;

    .calendar-header {
      position: absolute;
      height: 277px;
      background: #fff;
      border-color: rgb(81, 90, 110);
      z-index: 15;
      .calendar .time .time-list{
        max-width: none;
      }
    }
  }
</style>
