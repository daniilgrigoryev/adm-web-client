<template>
  <div v-if="body" class="ml18">


    <div class="adm-title px36 py24">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getVuPredEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Предъявлен</b>
        </div>
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div>


    <div class="adm-form">
      <div class="adm-form__container mt6">
        <div class="adm-form__content py24 px36">
          <Row type="flex" :gutter="60">
            <Col :xs="24" :md="24" :lg="24">
              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Вид предъявленного документа</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.docTipName" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Номер документа</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.vuN" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дата выдачи</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.dateVyd | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Срок действия</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.dateSrok | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Кем выдан документ. Код - Название организации</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.ogaiVydKod, body.ogaiVydName | concatByDelimiter('-')" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дополнительные сведения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.remarks"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Предъявленный документ</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.vuPred"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Статус документа</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.statusName" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дата задержания</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.dateZader | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дата возврата</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.dateVozv | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дата утилизации документа</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.dateUtil | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div class="adm-form__item">
                <small class="adm-text-small color-gray-medium adm-form__label">Дата утраты документа</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.dateUtrat | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
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
    name: "FrmEdVuPred",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
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
        }
        delete currentForm['restore'];
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdVuPredGetCommand, async () => {
          try {
            let current = formStack.getCurrent();
            let currentForm = innerFormStack.getCurrent({
              uid: current.moduleName
            });
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
      getVuPredEdit() {
        try {
          let current = formStack.getCurrent();
          let currentForm = innerFormStack.getCurrent({
            uid: current.moduleName
          });
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
    padding-top: 12px;
    padding-bottom: 12px;
    // min-height: 90px;
    // outline: 1px solid;
  }
  .adm-form__label{
    padding: 0;
    min-width: 210px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
