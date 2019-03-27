<template>
  <div v-if="body" class="ml18">
    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDocsProtEdit()" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Протокол об АНП</b>
        </div>
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div>

    <div class="adm-form">
      <div class="adm-form__container mt6">
        <div class="adm-form__content px36">
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Пункт НПА</small>
            <Row type="flex" align="middle">
              <Input class="adm-input adm-input--regular" readonly :value="body.pnpaName" ></Input>
            </Row>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Статья КРФоАП</small>
            <Row type="flex" align="middle">
              <Input class="adm-input adm-input--regular" readonly :value="body.stotvName" ></Input>
            </Row>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дата и время нарушения</small>
            <Row type="flex" align="middle">
              <Input class="adm-input adm-input--regular" readonly :value="body.dateNar | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
            </Row>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Место нарушения</small>
            <Row type="flex" align="middle">
              <Input class="adm-input adm-input--regular" readonly :value="body.placeNar.placeFull" ></Input>
            </Row>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Должностное лицо</small>
            <Row type="flex" align="middle">
              <Input class="adm-input adm-input--regular" readonly :value="body.inspSostName + body.inspSostDolz" ></Input>
            </Row>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
            <Row type="flex" align="middle">
              <Input class="adm-input adm-input--regular" readonly :value="body.organSostName" ></Input>
            </Row>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Место вынесения</small>
            <Row type="flex" align="middle">
              <Input class="adm-input adm-input--regular" readonly :value="body.placeSost.placeFull" ></Input>
            </Row>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Дата и время рассмотр.</small>
            <Row type="flex" align="middle">
              <Input class="adm-input adm-input--regular" readonly :value="body.dateRasm" ></Input>
            </Row>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Орган рассмотрения</small>
            <Row type="flex" align="middle">
              <Input class="adm-input adm-input--regular" readonly :value="body.organRasmName" ></Input>
            </Row>
          </div>
          <div class="my12 adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Место рассмотрения</small>
            <Row type="flex" align="middle">
              <!-- TODO -->
              <Input class="adm-input adm-input--regular" readonly value="" ></Input>
              <!-- ENDTODO -->
            </Row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdDocsProt",
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
        await this.$store.dispatch('frmEdDocsProtSetCid', currentForm.cid);

        let prepareParams = {
          method: 'restore',
          cid: currentForm.cid
        };
        if (funcUtils.isEmpty(currentForm.restore)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'node': currentForm.params
          };
        }
        delete currentForm['restore'];
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDocsProtGetCommand, async () => {
          try {
            let current = formStack.getCurrent();
            let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
            let currentForm = innerFormStack.getCurrent(uid);
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
      this.$store.dispatch('frmEdDocsProtSetCid', null);
      this.$store.dispatch('frmEdDocsProtSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDocsProtGetData'
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
      getDocsProtEdit() {
        try {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsProtEdit,
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


<style scoped lang="scss"> 
  .adm-form__label {
    min-width: 180px;
  }
</style>
