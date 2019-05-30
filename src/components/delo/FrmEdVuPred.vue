<template>
  <div v-if="body" class="ml18">


    <div class="adm-title px36 py24">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getVuPredEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Документ участника</b>
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
            label="Тип документа"
            :value="body.docTipName"
          />
          <view-data-item
            label="Статус"
            :value="body.statusName"
          />
          <hr>
          <view-data-item
            label="Серия номер"
            :value="body.vuN"
          />
          <view-data-item
            label="Дата выдачи"
            :value="body.dateVyd | formatDateTime('DD.MM.YYYY')"
          />
          <hr>
          <view-data-item
            label="Кем выдан"
            :value="body.ogaiVydName"
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
    name: "FrmEdVuPred",
    components: {
    },
    async created() {
      try {
        await this.init();
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdVuPredSetCid', null);
      this.$store.dispatch('frmEdVuPredSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdVuPredGetData'
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
          await this.$store.dispatch('frmEdVuPredSetCid', currentForm.cid);

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

          let vm = this;
          this.$store.watch(this.$store.getters.frmEdVuPredGetCommand, async () => {
            try {
              let currentForm = innerFormStack.getCurrent();
              let eventResponse = await RequestApi.prepareData({
                cid: currentForm.cid,
                withSpinner: false
              });
              await vm.$store.dispatch('fillModule', {'event': eventResponse});
            } catch (e) {
              this.$store.dispatch('errors/changeContent', {title: e.message,});
            }
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      getVuPredEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdVuPredEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>
