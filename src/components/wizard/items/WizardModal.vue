<template>
  <div class="modal dolz" style="position: absolute; background: black; color: white; z-index: 99; top: 0; left: 0; right: 0; bottom: 0;">
    <Button @click="showModal(false)" type="primary" class="ml12">Закрыть</Button>

    <Page :total="data.length" :current="currentPage" :page-size="limit" class="mr12" @on-change="changePage"/>

    <div style="height: 40vh; width: 50vw; overflow-y: auto;">
      <Table :columns="columnsOptions" @on-row-dblclick="onRowDbClick" :data="dataList"></Table>
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
    created() {
      this.fillDataList();
    },
    data() {
      return {
        from: 0,
        to: 10,
        limit: 10,
        currentPage: 1,
        dataList: []
      }
    },
    methods: {
      changePage(nextPage) {
        let delta = 10;
        this.to = delta * nextPage;
        this.from = (delta * nextPage) - delta;
        this.currentPage = nextPage;

        this.fillDataList();
      },
      fillDataList() {
        let res = [];
        for (let i = this.from; i < this.to; i++) {
          let item = this.data[i];
          if (item) {
            res.push(item);
          }
        }
        this.dataList = res;
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
