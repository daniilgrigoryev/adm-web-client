<template>
  <div v-if="list" class="adm-wizard-modal">
    <div class="flex-parent flex-parent--center-cross flex-parent--space-between-main bg-white">
      <Page v-if="list.length > limit" :total="list.length" :current="currentPage" :page-size="limit" class="ml12 adm-txt-regular" @on-change="changePage"/>
      <div class="flex-parent flex-parent--center-cross ml">
        <Input class="adm-input adm-input--big wmin600" @on-enter="filterClick" v-model="filter" placeholder="Фильтр" clearable></Input>
        <Button @click="filterClick" type="default" :disabled="!filterKeys" class="adm-btn-primary--free adm-btn-regular color-white h36 px24 ml24">поиск</Button>
      </div>
      <Button type="text" @click="showModal(false)" class="px0 py0 bg-transparent" style="box-shadow: none">
        <div class="flex-parent flex-parent--center-cross">
          <div class="adm-text-big color-blue-base">Закрыть</div>
          <Icon type="md-close" size="50" class="color-blue-base cursor-pointer"/>
        </div>
      </Button>
    </div>
    <div>
      <Table :columns="columnsOptions" @on-row-dblclick="onRowDbClick" :data="dataList" @on-sort-change="sortChange" class="custom-table" :height="tableHeight" ref="selection" size="large" ></Table>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";

  export default {
    name: "WizardModal",
    props: {
      columnsOptions: Array,
      data: Array
    },
    created() {
      this.list = this.data.slice();
      let filterKeys = [];
      this.columnsOptions.forEach((item) => {
        if (item.filterable) {
          filterKeys.push(item.key);
        }
      });
      if (filterKeys.length > 0) {
        this.filterKeys = filterKeys;
      }
    },
    mounted() {
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
        for (let i = this.from; i < this.to; i++) {
          let item = this.list[i];
          if (item) {
            res.push(item);
          }
        }
        return res;
      },
    },
    data() {
      return {
        tableHeight: 0,
        from: 0,
        to: 40,
        limit: 40,
        currentPage: 1,
        list: null,
        filter: '',
        filterKeys: null
      }
    },
    methods: {
      filterClick() {
        this.from = 0;
        this.to = 40;
        this.currentPage = 1;
        if (this.filter.length === 0) {
          this.list = this.data;
          return;
        }
        this.list = [];
        let filter = this.filter.toUpperCase();
        for (let i = 0; i < this.data.length; i++) {
          let item = this.data[i];
          for (let j = 0; j < this.filterKeys.length; j++) {
            let itemValue = item[this.filterKeys[j]];
            if (funcUtils.isNotEmpty(itemValue)) {
              itemValue = ('' + itemValue).toUpperCase();
              if (itemValue.indexOf(filter) !== -1) {
                this.list.push(item);
                break;
              }
            }
          }
        }
      },
      sortChange(options) {
        this.list.sort((a, b) => {
          let aS = +a[options.key] || a[options.key];
          let bS = +b[options.key] || b[options.key];
          if (aS > bS) return 1;
          if (aS < bS) return -1;
          if (aS === bS) return 0;
        });
        switch (options.order) {
          case 'desc': {
            this.list.reverse();
            break;
          }
          case 'normal': {
            this.list = this.data.slice();
            break;
          }
        }
      },
      changePage(nextPage) {
        this.to = this.limit * nextPage;
        this.from = (this.limit * nextPage) - this.limit;
        this.currentPage = nextPage;
      },
      changeTableHeight() {
        let tableBounds = this.$refs.selection.$el.getBoundingClientRect();
        this.tableHeight = window.innerHeight - tableBounds.y;
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
