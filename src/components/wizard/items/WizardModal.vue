<template>
  <div class="absolute bg-white z5 scroll-hidden" style="top: 0; bottom: 0; right: 0; left: 0;">
    <div class="flex-parent flex-parent--end-main">
      <Button type="text" @click="showModal(false)" class="px0 py0">
        <div class="flex-parent flex-parent--center-cross">
          <div class="adm-text-big color-blue-base">Закрыть</div>
          <Icon type="md-close" size="50" class="color-blue-base cursor-pointer"/>
        </div>
      </Button>
    </div>
    <div>
      <Table class="custom-table" ref="selection" :columns="columnsOptions" :data="dataList" :height="tableHeight"  id="modalTable" size="large" @on-row-dblclick="onRowDbClick"></Table>
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
      try {
        this.$nextTick(() => {
          this.changeTableHeight();
        });
        window.addEventListener('resize', () => {
          this.changeTableHeight();
        });
      } catch (e) {
        this.$Notice.warning({
          title: 'Ошибка получения данных',
          desc: e.message,
          duration: 10
        });
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
        scrollCount: 40,
        tableHeight: 0
      }
    },
    methods: {
      changeTableHeight() {
        let tableBounds = this.$refs.selection.$el.getBoundingClientRect();
        this.tableHeight = window.innerHeight - tableBounds.y;
      },
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
