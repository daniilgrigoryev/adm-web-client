<template>
  <div class="modal dolz" style="position: absolute; background: black; color: white; z-index: 99; top: 0; left: 0; right: 0; bottom: 0;">
    <Button @click="showModal(false)" type="primary" class="ml12">Закрыть</Button>

    <div style="height: 40vh; width: 50vw; overflow-y: auto;">
      <Table id="modalTable" :columns="columnsOptions" @on-row-dblclick="onRowDbClick" :data="dataList"></Table>
    </div>

  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";

  export default {
    name: "WizardModal",
    props: {
      columnsOptions: Array,
      data: Array,
    },
    mounted() {
      let modalTable = document.getElementById('modalTable');
      if (funcUtils.isNotEmpty(modalTable)) {
        let modalTableParent = modalTable.parentElement;
        modalTableParent.addEventListener('scroll', this.handleScroll);
      }
    },
    computed: {
      dataList() {
        let res = [];
        for (let i = 0; i < this.scrollCount; i++) {
          let item = this.data[i];
          if (item) {
            res.push(item);
          }
        }
        return res;
      },
    },
    data() {
      return {
        scrollCount: 40
      }
    },
    methods: {
      handleScroll() {
        if (this.checkScroll() && this.scrollCount < this.data.length) {
          let count = 40;
          if (this.data.length < this.scrollCount + count) {
            count = this.data.length - this.scrollCount;
          }
          this.scrollCount += count;
          let modalTableParent = document.getElementById('modalTable').parentElement;
          modalTableParent.scrollTop -= 1;

        }
      },
      checkScroll() {
        let modalTableParent = document.getElementById('modalTable').parentElement;
        return (modalTableParent.offsetHeight + modalTableParent.scrollTop >= modalTableParent.scrollHeight);
      },
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
