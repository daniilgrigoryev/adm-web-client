<template>
  <div v-if="body" class="ml18"><!-- wmax1280 mx-auto -->
    <!-- постановление по делу -->
    <div class="amd-title amd-title--sticky px36 pt24 pb18"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button  @click="getDocsPostEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Постановление по делу № {{ body.docN }} от {{ body.dateSost | formatDateTime('DD.MM.YYYY') }}</b>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
      <!-- <div class="adm-nav-jump">
        <a href='#regulation' class='link color-blue-base adm-txt-regular mx18 inline-block'>Постановление составил</a>
        <a href='#violation' class='link color-blue-base adm-txt-regular mx18 inline-block'>Нарушение</a>
        <a href='#decision' class='link color-blue-base adm-txt-regular mx18 inline-block'>Решение по делу</a>
      </div> -->
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item 
            label="Пункт НПА" 
            :value="body.pnpaKod, body.pnpaName | concatByDelimiter(',')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/case_decision_gray.svg')"
          />
          <view-data-item 
            label="Статья КРФоАП" 
            :value="body.stotvKod, body.stotvName | concatByDelimiter(',')" 
            style="grid-column: span 2;"
          />

          <hr>

          <view-data-item 
            label="Дата вручения" 
            :value="body.datUved | formatDateTime('DD.MM.YYYY')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/letter.svg')"
          />
          <view-data-item 
            label="Дата вступления" 
            :value="body.dateSost | formatDateTime('DD.MM.YYYY')" 
            style="grid-column: span 2;"
          />

          <hr>

          <view-data-item 
            label="Должностное лицо" 
            :value="body.inspSostName, body.inspSostDolz, body.inspSostRang | concatByDelimiter(',')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/police.svg')"
          />
          <view-data-item 
            label="Подразделение" 
            :value="body.organSostName || 'нет информации'" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Место вынесения" 
            :value="body.placeSost.placeFull || 'нет информации'" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/map.svg')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdDocsPost",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDocsPostGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            alert(e.message);
          }
        });
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDocsPostSetCid', null);
      this.$store.dispatch('frmEdDocsPostSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDocsPostGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
    },
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('frmEdDocsPostSetCid', currentForm.cid);

          let prepareParams = {
            method: 'restore',
            cid: currentForm.cid
          };
          if (funcUtils.isEmpty(currentForm.restore)) {
            prepareParams.method = 'getData';
            prepareParams.params = {
              'node': currentForm.params
            };
            currentForm.restore = true;
          } else {
            delete currentForm['restore'];
          }
          innerFormStack.updateCurrent(currentForm);
          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});
        } catch (e) {
          alert(e.message);
        }
      },
      getDocsPostEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsPostEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
    }
  }
</script>
