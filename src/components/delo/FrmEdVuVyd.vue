<template>
  <div v-if="body" class="ml18">

    <div class="adm-title px36 py24">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getVuVydEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">{{body.docTipName}}</b>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item 
            label="Вид предъявленного документа" 
            :value="body.docTipName" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Номер документа" 
            :value="body.vuN" 
          />
          <view-data-item 
            label="Дата выдачи" 
            :value="body.dateVyd | formatDateTime('DD.MM.YYYY HH:mm')" 
          />
          <view-data-item 
            label="Срок действия" 
            :value="body.dateSrok | formatDateTime('DD.MM.YYYY HH:mm')" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Личный номер сотрудника" 
            :value="body.inspVydKod" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="ФИО сотрудника" 
            :value="body.inspVydName" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Должность сотрудника" 
            :value="body.inspVydDolz" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Звание" 
            :value="body.inspVydRang" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Кем выдан документ. Код - Название организации" 
            :value="body.ogaiVydKod, body.ogaiVydName | concatByDelimiter('-')" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Дополнительные сведения" 
            :value="body.remarks" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Предъявленный документ" 
            :value="body.vuPred" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Статус документа" 
            :value="body.statusName" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Дата утилизации документа" 
            :value="body.dateUtil | formatDateTime('DD.MM.YYYY HH:mm')" 
            style="grid-column: span 2;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdVuVyd",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdVuVydGetCommand, async () => {
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
      this.$store.dispatch('frmEdVuVydSetCid', null);
      this.$store.dispatch('frmEdVuVydSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdVuVydGetData'
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
          await this.$store.dispatch('frmEdVuVydSetCid', currentForm.cid);

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
      getVuVydEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdVuVydEdit,
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
