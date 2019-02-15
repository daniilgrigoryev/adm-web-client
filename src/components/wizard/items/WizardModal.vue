<template>
  <div v-if="visible" class="modal dolz" style="position: absolute; background: black; color: white; z-index: 99; top: 0; left: 0; right: 0; bottom: 0;">
    <Button @click="showModal(false)" type="primary" class="ml12">Закрыть</Button>

    <div style="height: 40vh; width: 50vw; overflow-y: auto;">
      <Table :columns="columnsOptions" @on-row-dblclick="onRowDbClick" :data="data"></Table>
    </div>

  </div>
</template>

<script>
  export default {
    name: "WizardModal",
    props: {
      visible: Boolean,
      columnsOptions: Array,
      data: Array,
    },
    methods: {
      onRowDbClick(item) {
        this.$emit('onRowDbClick', item);
      },
      showModal(visible) {
        this.$emit('showModal', visible);
      },
    }
  }
</script>

<style scoped>

</style>
