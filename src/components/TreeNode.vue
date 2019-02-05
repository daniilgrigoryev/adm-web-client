<template>
  <div v-if="model !== null">
    <div style="display: flex; align-items: center;">
      <div
        @click="nodeClick"
        :class="{bold: isFolder}"
        :style="model.selected ? 'color: red;': 'color: black;'"
        v-html="model.name">
      </div>
      <span v-if="isFolder">
      <img v-if='open' @click="toggle" src='../assets/controls-switch-chevron-up.svg'>
      <img v-else @click="toggle" src='../assets/controls-switch-chevron-down.svg'>
    </span>
    </div>
    <div v-show="open" v-if="isFolder">
      <tree-node
        style="padding-left: 30px"
        v-for="(modelChild, index) in model.children"
        :key="index"
        :model="modelChild">
      </tree-node>
    </div>
  </div>
</template>

<script>
  import { bus } from "../assets/js/utils/bus";

  export default {
    name: "TreeNode",
    props: {
      model: Object
    },
    data() {
      return {
        open: false
      }
    },
    computed: {
      isFolder() {
        return this.model.children && this.model.children.length > 0;
      }
    },
    methods: {
      toggle() {
        if (this.isFolder) {
          this.open = !this.open;
        }
      },
      nodeClick() {
        bus.$emit('nodeClick', this.model);
      },
    }
  }
</script>

<style lang='scss'>
  .bold {

  }
</style>
