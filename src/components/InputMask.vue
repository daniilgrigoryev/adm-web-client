<template>
  <Input ref="maskedField"
         @input="onInput"
         @on-input-change="onInputChange"

         :value="value"
         :class="inputClass"
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
    name: "InputMask",
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
      let im = new Inputmask(this.maskProps);
      im.mask(this.$refs.maskedField.$refs.input);
    },
    data() {
      return {}
    },
    methods: {
      onInput(e) {
        this.$emit('input', e);
      },
      onInputChange(e) {
        this.$emit('onInputChange', e);
      },
    }
  }
</script>

<style scoped>

</style>
