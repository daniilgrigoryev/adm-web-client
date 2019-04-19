<template>
  <Input ref="maskedField"
         @input="onInput"
         @on-input-change="onInputChange"
         @on-enter="onEnter"
         :value="value"
         :class="[inputClass, {'ivu-input-icon-clear-hidden': hiddenClear}]"
         :placeholder="placeholder"
         :type="type"
         :size="size"
         :maxlength="maxlength"
         :disabled="disabled"
         :icon="icon"
         :autosize="autosize"
         :rows="rows"
         :readonly="readonly"
         :name="name"
         :number="number"
         :autofocus="autofocus"
         :spellcheck="spellcheck"
         :autocomplete="autocomplete"
         :wrap="wrap"
         :prefix="prefix"
         :suffix="suffix"
         :search="search"
         :enterButton="enterButton"
         :clearable="clearable"></Input>
</template>

<script>
  import Inputmask from 'inputmask';

  export default {
    name: "MaskedInput",
    props: {
      type: {
        type: String
      },
      value: {
        type: [String, Number]
      },
      size: {
        type: String,
      },
      placeholder: {
        type: String
      },
      maxlength: {
        type: Number
      },
      disabled: {
        type: Boolean
      },
      icon: String,
      autosize: {
        type: [Boolean, Object]
      },
      rows: {
        type: Number
      },
      readonly: {
        type: Boolean
      },
      name: {
        type: String
      },
      number: {
        type: Boolean
      },
      autofocus: {
        type: Boolean
      },
      spellcheck: {
        type: Boolean
      },
      autocomplete: {
        type: String
      },
      clearable: {
        type: Boolean
      },
      wrap: {
        type: String
      },
      prefix: {
        type: String
      },
      suffix: {
        type: String
      },
      search: {
        type: Boolean
      },
      enterButton: {
        type: [Boolean, String]
      },
      inputClass: {
        type: String
      },
      maskProps: {
        type: Object
      },
    },
    mounted () {
      this.init();
    },
    data() {
      return {}
    },
    computed: {
      hiddenClear() {
        return this.disabled || this.readonly;
      },
    },
    methods: {
      init() {
        let input = this.$refs.maskedField.$refs.input;
        let im = new Inputmask(this.maskProps);
        im.mask(input);
        input.addEventListener('click', this.onClick);
        input.addEventListener('blur', this.onBlur);
      },
      onInput(e) {
        if (e.length === 0) {
          this.$emit('onClear');
          this.$emit('input', null);
          this.$emit('onInputChange', null);
        } else {
          this.$emit('input', e);
        }
      },
      onInputChange(e) {
        let value = e.target.value;
        if (value.length === 0) {
          this.$emit('input', null);
        } else {
          this.$emit('input', value);
        }
        this.$emit('onInputChange', e);
      },
      onClick(e) {
        this.$emit('onClick', e);
      },
      onBlur(e) {
        this.$emit('onBlur', e);
      },
      onEnter(e) {
        this.$emit('onEnter', e);
      },
    }
  }
</script>

<style lang="scss">
  .ivu-input-icon-clear-hidden {
    .ivu-input-icon-clear {
      display: none !important;
    }
  }
</style>
