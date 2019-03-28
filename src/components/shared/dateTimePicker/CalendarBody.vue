<template>
  <div class="content">
    <masked-input v-model="currentValue" @onClick="onClick" @onEnter="onEnter" @onClear="onClear" @onInputChange="onInputChange" :maskProps="maskInput" :disabled="disabled" :readonly="readonly" :clearable="clearable" :placeholder="placeholder"></masked-input>

    <i v-if="!isHidden" @click="onClick" class="date-icon ivu-icon ivu-icon-ios-calendar-outline ivu-input-icon ivu-input-icon-normal"></i>
  </div>
</template>

<script>
  import MaskedInput from "../MaskedInput";
  import * as funcUtils from "../../../assets/js/utils/funcUtils";

  export default {
    name: "CalendarBody",
    components: {
      MaskedInput
    },
    props: {
      value: Date,
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
    computed: {
      isHidden() {
        return this.disabled || this.readonly;
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
        if (!this.disabled && !this.readonly) {
          this.$emit('onClick');
        }
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
      onInputChange(e) {
        let value = e.currentTarget.value;
        let date = funcUtils.formatDateTime(value, this.momentFormat);
        if (value.length > 0 && value.indexOf(this.momentFormat) === -1 && date.isValid()) {

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
