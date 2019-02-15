<template>
  <div class="absolute bg-white z5 scroll-hidden" style="top: 0; bottom: 0; right: 0; left: 0;">
    <div class="flex-parent flex-parent--space-between-main">

      <Page :total="data.length" :current="currentPage" :page-size="limit" class="mr12" @on-change="changePage"/>
      
      <Button type="text" @click="showModal(false)" class="px0 py0">
        <div class="flex-parent flex-parent--center-cross">
          <div class="adm-text-big color-blue-base">Закрыть</div>
          <Icon type="md-close" size="50" class="color-blue-base cursor-pointer"/>
        </div>
      </Button>
    </div>
    <div>
      <Table :columns="columnsOptions" @on-row-dblclick="onRowDbClick" :data="dataList" class="custom-table" ref="selection"  :height="tableHeight"  id="modalTable" size="large" ></Table>
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
