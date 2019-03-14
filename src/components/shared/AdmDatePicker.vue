<template>
  <DatePicker
    @on-change="handleChange"
    :open="isOpen"
    :class="className"
    :type="type"
    :format="format"
    v-model="dateValue"
    clearable>

    <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type ivu-date-picker-editor">
      <i @click="clearDate"
         class="ivu-icon ivu-icon-ios-calendar-outline ivu-input-icon ivu-input-icon-normal cursor-pointer"></i>
      <input
        ref="custom-input"
        type="text"
        class="ivu-input ivu-input-default"/>
    </div>
  </DatePicker>
</template>

<script>
  import Vue from 'vue';
  import jQuery from 'jquery';
  import mask from 'jquery-mask-plugin';
  import moment from 'moment';

  moment.locale('ru');

  export default {
    name: "AdmDatePicker",
    props: {
      value: [Date, String],
      mask: {
        type: String
      },
      className: {
        type: String
      },
      type: {
        type: String
      },
      format: {
        type: String
      },
      placeholder: {
        type: String
      },
      clearable: {
        type: Boolean
      },
    },
    data() {
      return {
        isOpen: false,
        isValid: false,
        el: null,
        dateValue: null
      }
    },

    mounted() {
      this.dateValue = this.$props.value;
      this.el = this.$refs['custom-input'];

      this.el.addEventListener('click', (e) => {
        if (!this.isOpen) this.isOpen = true;
      });

      this.el.addEventListener('focus', (e) => {
        this.isOpen = true;

      });

      this.el.addEventListener('blur', (e) => {
        this.isOpen = false;

        if (!e.target.value || !this.isValid) {
          this.clearDate();
        }
      });

      jQuery(this.el).mask(this.mask, {
        placeholder: this.placeholder,
        onComplete: (val) => {
          this.dateValue = val;
          this.isValid = true;
          this.isOpen = false;
          this.updateDate();
        }
      });
    },

    methods: {
      updateDate() {
        Vue.nextTick(() => {
          this.$emit('input', this.dateValue)
        });
      },
      clearDate() {
        this.dateValue = null;
        this.$refs['custom-input'].value = '';
        this.updateDate();
      },
      handleChange(date) {
        this.isOpen = false;
        this.el.value = date;
        this.updateDate();
      },
    }
  }
</script>
