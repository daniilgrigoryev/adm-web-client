<template>
  <div id="root" class="absolute bg-white z5 scroll-hidden" style="top: 0; bottom: 0; right: 0; left: 0;">
    <div id="pagingWrap" class="flex-parent flex-parent--space-between-main">

      <Page v-if="limit" :total="data.length" :current="currentPage" :page-size="limit" class="mr12" @on-change="changePage"/>
      
      <Button type="text" @click="showModal(false)" class="px0 py0">
        <div class="flex-parent flex-parent--center-cross">
          <div class="adm-text-big color-blue-base">Закрыть</div>
          <Icon type="md-close" size="50" class="color-blue-base cursor-pointer"/>
        </div>
      </Button>
    </div>
    <div>
      <Table :columns="columnsOptions" @on-row-dblclick="onRowDbClick" :data="dataList" class="custom-table" ref="selection" size="large" ></Table>
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
      let header = document.querySelector('.ivu-table-header').offsetHeight;
      let pagingWrap = document.getElementById('pagingWrap').offsetHeight;
      this.limit = Math.round((document.getElementById('root').offsetHeight - header - pagingWrap) / 60);
      this.to = this.limit;
      this.delta = this.limit;
      this.fillDataList();
    },
    data() {
      return {
        from: 0,
        to: null,
        limit: null,
        delta: null,
        currentPage: 1,
        dataList: []
      }
    },
    methods: {
      changePage(nextPage) {
        this.to = this.delta * nextPage;
        this.from = (this.delta * nextPage) - this.delta;
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
