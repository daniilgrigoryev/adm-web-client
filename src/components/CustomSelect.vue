<template>
  <Select :class="selectClass" @input="onInput" :value="value" :placeholder="placeholder" :filterable="filterable" :clearable="clearable" @on-query-change="changeQuery" @on-clear="changeQuery">
    <Option v-for="item in copyData" :value="getItemValue(item)" :key="getItemValue(item)">{{ getItemLabel(item) }}</Option>
  </Select>
</template>

<script>
  import * as funcUtils from "./../assets/js/utils/funcUtils";

  export default {
    name: "CustomSelect",
    props: {
      value: {
        type: [String, Number, Array]
      },
      label: {
        type: [String, Number, Array]
      },
      multiple: {
        type: Boolean
      },
      disabled: {
        type: Boolean
      },
      clearable: {
        type: Boolean
      },
      placeholder: {
        type: String
      },
      filterable: {
        type: Boolean
      },
      filterMethod: {
        type: Function
      },
      remoteMethod: {
        type: Function
      },
      loading: {
        type: Boolean
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
        type: Boolean
      },
      autoComplete: {
        type: Boolean
      },
      name: {
        type: String
      },
      selectClass: {
        type: String
      },
      optionsList: {
        type: Array
      },
      labelValue: {
        type: Boolean
      },
    },
    created() {
      if (!this.fillIfEmpty()) {
        this.copyData = this.optionsList;
      }
    },
    data() {
      return {
        copyData: null
      }
    },
    methods: {
      onInput(e) {
        this.$emit('input', e);
      },
      getItemValue(item) {
        if (funcUtils.isNotEmpty(item) && funcUtils.isNotEmpty(item.id)) {
          return item.id;
        } else if (funcUtils.isNotEmpty(item) && funcUtils.isNotEmpty(item.value)) {
          return item.value;
        }
      },
      getItemLabel(item) {
        if (funcUtils.isNotEmpty(item) && this.labelValue) {
          return item.value + ', ' + item.label;
        } else if (funcUtils.isNotEmpty(item) && !this.labelValue) {
          return item.label;
        }
      },
      fillIfEmpty() {
        if (funcUtils.isEmpty(this.optionsList)) {
          this.copyData = [];
          return true;
        }
        return false;
      },
      changeQuery(query) {
        if (this.fillIfEmpty()) {
          return;
        }

        if ((funcUtils.isEmpty(query) || query.split(' ').join('').length === 0)) {
          this.copyData = this.optionsList;
          return;
        }
        this.copyData = this.optionsList.filter((item) => {
          let search = '';
          if (funcUtils.isNotEmpty(item.value)) {
            search += item.value;
          }
          if (funcUtils.isNotEmpty(item.label)) {
            search += item.label;
          }
          if (search.length > 0) {
            return search.split(' ').join('').includes(query.split(' ').join(''));
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
