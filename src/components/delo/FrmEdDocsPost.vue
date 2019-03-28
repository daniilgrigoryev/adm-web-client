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
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
      <!-- <div class="adm-nav-jump">
        <a href='#regulation' class='link color-blue-base adm-txt-regular mx18 inline-block'>Постановление составил</a>
        <a href='#violation' class='link color-blue-base adm-txt-regular mx18 inline-block'>Нарушение</a>
        <a href='#decision' class='link color-blue-base adm-txt-regular mx18 inline-block'>Решение по делу</a>
      </div> -->
    </div>

    <div class="adm-form">
      <div class="adm-form__container mt6">
        <div class="adm-form__content px36">
          <Row>
            <Col>
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Пункт НПА</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <!-- <Input class="adm-input adm-input--regular" readonly :value="" ></Input> -->
                      <p class="adm-txt-regular color-dark-base">{{body.pnpaKod, body.pnpaName | concatByDelimiter(',')}}</p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Статья КРФоАП</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <!-- <Input class="adm-input adm-input--regular" readonly :value="body.stotvKod, body.stotvName | concatByDelimiter(',')" ></Input> -->
                      <p class="adm-txt-regular color-dark-base">{{body.stotvKod, body.stotvName | concatByDelimiter(',')}}</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дата вручения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <!-- <Input class="adm-input adm-input--regular" readonly :value="body.datUved | formatDateTime('DD.MM.YYYY')" ></Input> -->
                      <p class="adm-txt-regular color-dark-base">{{body.datUved | formatDateTime('DD.MM.YYYY')}}</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="12">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дата вступления</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <!-- <Input class="adm-input adm-input--regular" readonly :value="body.dateSost | formatDateTime('DD.MM.YYYY')" ></Input> -->
                      <p class="adm-txt-regular color-dark-base">{{body.dateSost | formatDateTime('DD.MM.YYYY')}}</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Должностное лицо</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <!-- <Input class="adm-input adm-input--regular" readonly :value="body.inspSostName, body.inspSostDolz, body.inspSostRang | concatByDelimiter(',')" ></Input> -->
                  <p class="adm-txt-regular color-dark-base">{{body.inspSostName, body.inspSostDolz, body.inspSostRang | concatByDelimiter(',')}}</p>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <!-- <Input class="adm-input adm-input--regular" readonly :value="body.organSostName" ></Input> -->
                  <p class="adm-txt-regular color-dark-base">{{body.organSostName}}</p>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Место вынесения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <!-- <Input class="adm-input adm-input--regular" readonly :value="body.placeSost.placeFull" ></Input> -->
                  <p class="adm-txt-regular color-dark-base">{{body.placeSost.placeFull}}</p>
                </Col>
              </Row>
            </div>
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
    name: "FrmEdDocsPost",
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
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
        }
        delete currentForm['restore'];
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDocsPostGetCommand, async () => {
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
      getDocsPostEdit() {
        try {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
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

<style scoped lang="scss">
  .adm-form-content{
    // border: 1px solid #000;
  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 80px;
    // outline: 1px solid;
  }
  .adm-form__label{
    padding: 0;
    min-width: 130px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
