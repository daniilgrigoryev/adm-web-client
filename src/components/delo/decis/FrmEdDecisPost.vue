<template>
  <div v-if="body" class="ml18">

    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDecisEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Решение по делу - {{body.decisName }}</b>
        </div>
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item
            label="Дата вручения"
            :value="body.dateUved | formatDateTime('DD.MM.YYYY')"
            style="grid-column: span 2;"
          />
          <div class="mt12" style="grid-column: span 2; padding-left: 60px;">
            <p class="adm-14 color-dark-lighter mb6">Список документов</p>
            <div v-if="body.provideMaterialsList && body.provideMaterialsList.length > 0">
              <p v-for="(item, index) in body.provideMaterialsList" class="adm-text-big color-dark-base" :key="index">{{ item.name }}</p><br />
            </div>
            <p v-else class="adm-text-big color-dark-base">Нет информации</p>
          </div>
          <div class="mt12" style="grid-column: span 2; padding-left: 60px;">
            <p class="adm-14 color-dark-lighter mb6">Обеспечить явку</p>
            <div v-if="body.providePresenceList && body.providePresenceList.length > 0">
              <p v-for="(item, index) in body.providePresenceList" class="adm-text-big color-dark-base" :key="index">{{ item.name }}</p><br />
            </div>
            <p v-else class="adm-text-big color-dark-base">Нет информации</p>
          </div>
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
    name: "FrmEdDecisPost",
    components: {
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDecisPostGetCommand, async () => {
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
    destroyed() {
      this.$store.dispatch('frmEdDecisPostSetCid', null);
      this.$store.dispatch('frmEdDecisPostSetData', null);
		},
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDecisPostGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
          res.diskvMes? res.diskvMes += " Месяца" : "";
          res.diskvDay? res.diskvDay += " Дня" : "";
        }
        return res;
      },
    },
    methods: {
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('frmEdDecisPostSetCid', currentForm.cid);

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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      getDecisEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDecisEdit,
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

