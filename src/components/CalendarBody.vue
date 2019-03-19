<template>
  <div class="content">
    <input-mask v-model="currentValue" @onClick="onClick" @onEnter="onEnter" @onClear="onClear" :maskProps="maskInput" :clearable="clearable" :placeholder="placeholder"></input-mask>

    <i @click="onClick" class="date-icon ivu-icon ivu-icon-ios-calendar-outline ivu-input-icon ivu-input-icon-normal"></i>
  </div>
</template>

<script>
  import InputMask from "~/components/InputMask";
  import * as funcUtils from "~/assets/js/utils/funcUtils";

  export default {
    name: "CalendarBody",
    components: {
      InputMask
    },
    props: {
      value: Date,
      clearable: Boolean,
      placeholder: String,
      maskFormat: String,
      momentFormat: String,
    },
    created() {
      if (funcUtils.isNotEmpty(this.value)) {
        this.currentValue = funcUtils.parseDateTime(this.value, this.momentFormat);
      } else {
        this.currentValue = null;
      }
    },
    watch: {
      value(newValue, oldValue) {
        if (funcUtils.isNotEmpty(this.value)) {
          this.currentValue = funcUtils.parseDateTime(newValue, this.momentFormat);
        } else {
          this.currentValue = null;
        }
      },
    },
    data() {
      return {
        maskInput: {
          alias: "datetime",
          placeholder: this.placeholder,
          inputFormat: this.maskFormat
        },
        currentValue: null
      }
    },
    methods: {
      onEnter(e) {
        let value = e.currentTarget.value;
        let date = funcUtils.formatDateTime(value, this.momentFormat);
        if (date.isValid()) {
          this.$emit('change', date.toDate());
        } else {
          this.$emit('change', null);
          this.currentValue = null;
        }
      },
      onClick(e) {
        this.$emit('onClick');
      },
      onBlur(e) {
        // @onBlur="onBlur"
        let value = e.currentTarget.value;
        if (value !== funcUtils.parseDateTime(this.currentValue, this.momentFormat)) {
          let date = funcUtils.formatDateTime(value, this.momentFormat);
          if (date.isValid()) {
            this.$emit('change', date.toDate());
          } else {
            this.$emit('change', null);
            this.currentValue = null;
          }
        }
      },
      onClear(e) {
        this.currentValue = null;
        this.$emit('onClear');
      },
    }
  }
</script>

<style scoped lang="scss">
  .content {
    display: flex;
    justify-items: flex-start;
    align-items: center;

    .date-icon {
      position: relative;
    }
  }
</style>
