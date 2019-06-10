<template>
  <div class="content">
    <masked-input v-model="currentValue" @onClick="onClick" @onEnter="onEnter" @onClear="onClear" @onBlur="onBlur" :maskProps="maskInput" :disabled="disabled" :readonly="readonly" :clearable="clearable" :placeholder="maskInput.placeholder" :inputClass="inputClass"></masked-input>

    <i v-if="!isHidden" :class="{active: currentValue === null}" @click="onClick" class="date-icon ivu-icon ivu-icon-ios-calendar-outline ivu-input-icon ivu-input-icon-normal"></i>
  </div>
</template>

<script>
import * as funcUtils from "~/assets/js/utils/funcUtils";

export default {
  name: "CalendarBody",
  components: {},
  props: {
    valueFirst: Date,
    valueSecond: Date,
    clearable: Boolean,
    disabled: {
      type: Boolean
    },
    readonly: {
      type: Boolean
    },
    placeholder: String,
    maskFormat: String,
    momentFormat: String,
    inputClass: String
  },
  created() {
    this.maskInput.placeholder = this.placeholder + " - " + this.placeholder;
    this.formatValues(this.valueFirst, this.valueSecond);
  },
  watch: {
    valueFirst(newValue, oldValue) {
      this.formatValues(newValue, this.valueSecond);
    },
    valueSecond(newValue, oldValue) {
      this.formatValues(this.valueFirst, newValue);
    }
  },
  computed: {
    isHidden() {
      return this.disabled || this.readonly;
    }
  },
  data() {
    return {
      maskInput: {
        alias: "datetime",
        inputFormat: this.maskFormat + " - " + this.maskFormat
      },
      currentValue: null
    };
  },
  methods: {
    formatValues(valueFirst, valueSecond) {
      if (
        funcUtils.isNotEmpty(valueFirst) &&
        funcUtils.isNotEmpty(valueSecond) &&
        valueFirst.getTime() <= valueSecond.getTime()
      ) {
        this.currentValue =
          funcUtils.parseDateTime(valueFirst, this.momentFormat) +
          " - " +
          funcUtils.parseDateTime(valueSecond, this.momentFormat);
      } else {
        this.currentValue = null;
      }
    },
    onEnter(e) {
      let res = {
        valueFirst: null,
        valueSecond: null
      };
      let value = e.currentTarget.value;
      let dates = value.split(" - ");
      let valueFirst = funcUtils.formatDateTime(dates[0], this.momentFormat);
      let valueSecond = funcUtils.formatDateTime(dates[1], this.momentFormat);
      if (valueFirst.isValid() && valueSecond.isValid()) {
        if (valueSecond.toDate().getTime() < valueFirst.toDate().getTime()) {
          let tmp = valueSecond;
          valueSecond = valueFirst;
          valueFirst = tmp;
        }
        res.valueFirst = valueFirst.toDate();
        res.valueSecond = valueSecond.toDate();
      } else {
        this.currentValue = null;
      }
      this.$emit("change", res);
      this.$emit("hide");
    },
    onBlur(e) {
      let value = e.currentTarget.value;
      if (value !== this.currentValue) {
        let res = {
          valueFirst: null,
          valueSecond: null
        };
        let dates = value.split(" - ");
        let valueFirst = funcUtils.formatDateTime(dates[0], this.momentFormat);
        let valueSecond = funcUtils.formatDateTime(dates[1], this.momentFormat);
        if (valueFirst.isValid() && valueSecond.isValid()) {
          if (valueSecond.toDate().getTime() < valueFirst.toDate().getTime()) {
            let tmp = valueSecond;
            valueSecond = valueFirst;
            valueFirst = tmp;
          }
          res.valueFirst = valueFirst.toDate();
          res.valueSecond = valueSecond.toDate();
          this.$emit("change", res);
          this.$emit("hide");
        }
      } else {
        let dates = value.split(" - ");
        let valueFirst = funcUtils.formatDateTime(dates[0], this.momentFormat);
        let valueSecond = funcUtils.formatDateTime(dates[1], this.momentFormat);
        if (!valueFirst.isValid() || !valueSecond.isValid()) {
          this.onClear();
        } else {
          this.$emit("change", {
            valueFirst: valueFirst.toDate(),
            valueSecond: valueSecond.toDate()
          });
        }
      }
    },
    onClick(e) {
      if (!this.disabled && !this.readonly) {
        this.$emit("onClick");
      }
    },
    onClear(e) {
      this.currentValue = null;
      this.$emit("onClear");
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-items: flex-start;
  align-items: center;
  .date-icon {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  &:hover {
    .date-icon {
      display: none;
      &.active {
        display: block;
      }
    } 
  }
}
</style>