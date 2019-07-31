<!-- prettier-ignore -->
<template>
  <Select ref="select" :placeholder="placeholder" :value="value" :clearable="clearable" :filterable="filterable" :disabled="disabled"
          @on-enter="onEnter" @on-query-change="onQueryChange" @on-change="onChange" @on-open-change="onOpenChange" @on-clear="onClear" @input="input">
    <slot></slot>
  </Select>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";

  export default {
    name: "CustomSelect",
    props: {
      value: {
        type: [String, Number, Array],
      },
      label: {
        type: [String, Number, Array],
      },
      multiple: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
      },
      clearable: {
        type: Boolean,
      },
      placeholder: {
        type: String
      },
      filterable: {
        type: Boolean,
      },
      filterMethod: {
        type: Function
      },
      remoteMethod: {
        type: Function
      },
      loading: {
        type: Boolean,
      },
      loadingText: {
        type: String
      },
      size: {
        type: String
      },
      labelInValue: {
        type: Boolean
      },
      notFoundText: {
        type: String
      },
      placement: {
        type: String
      },
      transfer: {
        type: Boolean,
      },
      autoComplete: {
        type: Boolean,
      },
      name: {
        type: String
      },
      elementId: {
        type: String
      }
    },
    mounted() {
      this.$refs.select.validateOption = this.validateOption;
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      onClear() {
        this.$emit('on-clear');
        this.$emit('input', null);
        this.$emit('on-change', null);
      },
      input(value) {
        if (funcUtils.isNotEmpty(value)) {
          this.$emit('input', value);
        }
      },
      onChange(value) {
        if (funcUtils.isNotEmpty(value)) {
          this.$emit('on-change', value);
        }
      },
      onOpenChange(state) {
        this.$emit('on-open-change', state);
      },
      onEnter(option) {
        this.$emit('input', option.value);
        this.$emit('on-enter', option);
      },
      onQueryChange(query) {
        this.query = query;
        this.$emit('on-query-change', query);
      },
      validateOption({children, elm, propsData}, query) {
        const queryNumber = Number(query);
        const isQueryNumber = funcUtils.isNumber(queryNumber);
        const queryFormatted = query.toLowerCase().trim();
        let label = ((elm && elm.textContent) || (children || []).reduce((str, node) => {
          const nodeText = node.elm ? node.elm.textContent : node.text;
          return `${str} ${nodeText}`;
        }, '') || '').toLowerCase().trim();
        let value = (propsData.value + '').toLowerCase();

        if (this.filterMethod && isQueryNumber) {
          return this.filterMethod(label, value).startsWith(queryFormatted);
        }
        return label.includes(queryFormatted);
      },
    },
  }
</script>

<style scoped>

</style>
