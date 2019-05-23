<!-- prettier-ignore -->
<template>
  <Select ref="select" :placeholder="placeholder" :value="value" :clearable="clearable" :filterable="filterable"
          @on-query-change="onQueryChange" @on-change="onChange" @on-open-change="onOpenChange" @on-clear="onClear" @input="input">
    <slot></slot>
  </Select>
</template>

<script>
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
      },
      input(value) {
        this.$emit('input', value);
      },
      onChange(value) {
        this.$emit('on-change', value);
      },
      onOpenChange(state) {
        this.$emit('on-open-change', state);
      },
      onQueryChange(query) {
        this.query = query;
        this.$emit('on-query-change', query);
      },
      validateOption({children, elm, propsData}) {
        let label = ((elm && elm.textContent) || (children || []).reduce((str, node) => {
          const nodeText = node.elm ? node.elm.textContent : node.text;
          return `${str} ${nodeText}`;
        }, '') || '').toLowerCase().trim();
        let value = (propsData.value + '').toLowerCase();
        const query = this.query.toLowerCase().trim();

        if (this.filterMethod) {
          return this.filterMethod(label, value).startsWith(query);
        }
        return label.includes(query);
      },
    },
  }
</script>

<style scoped>

</style>
