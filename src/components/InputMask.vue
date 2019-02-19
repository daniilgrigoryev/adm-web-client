<template>
  <Input ref="maskedField" @input="onInput" :value="value" :class="inputProps.class"></Input>
</template>

<script>
  import Inputmask from 'inputmask';

  export default {
    name: "InputMask",
    props: {
      inputProps: {
        type: Object
      },
      value: {
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
    }
  }
</script>

<style scoped>

</style>
