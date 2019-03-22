<template>
  <div v-if="body" class="ml18 mb18">
    <div class="amd-title amd-title--sticky bg-white px36 py24"><!-- wmax940 mx-auto -->
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
          <div class="flex-parent flex-parent--center-cross">
            <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
              <img src='../../assets/images/pen.svg' class="wmax-none">
            </Button>
            <b class="adm-text-big color-dark-lighter">Почтовое извещение</b>
          </div>
          <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
            <img src='../../assets/images/wiki.svg' class="wmax-none">
          </Button>
        </div>
    </div>
    <div class="adm-form">
      <div class="adm-form__container  mt0 mx0">
        <!-- <h2 class="adm-text-big color-dark-light adm-form__headding">Данные об участнике дела</h2> -->
        <div class="adm-form__content my6 py12 px36">
          <div v-if="isNotEmptyField(body.docN)" class="adm-form__item">
            <small class="adm-text-small adm-form__label">Номер извещения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.docN"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div v-if="isNotEmptyField(body.dateSost)" class="adm-form__item">
            <small class="adm-text-small adm-form__label">Дата составления</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.dateSost | formatDateTime('DD.MM.YYYY')" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div v-if="isNotEmptyField(body.dateRasm)" class="adm-form__item">
            <small class="adm-text-small adm-form__label">Рассмотрения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.dateRasm | formatDateTime('DD.MM.YYYY')" ></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div v-if="isNotEmptyField(body.dateUved)" class="adm-form__item">
            <small class="adm-text-small adm-form__label">Вручения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.dateUved | formatDateTime('DD.MM.YYYY')" ></Input>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <div class="adm-form__container">
        <h2 class="adm-text-big color-dark-light adm-form__headding">Должностное лицо составившее Извещение</h2>
        <div class="adm-form__content my6 py12 px36">
          <div v-if="isNotEmptyField(body.inspSostKod) && isNotEmptyField(body.inspSostName)" class="adm-form__item">
            <small class="adm-text-small adm-form__label">Код сотрудника - Ф.И.О.</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.inspSostKod, body.inspSostName  | concatByDelimiter('-')"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </Col>
              </Row>
            </div>
          </div>

          <div v-if="isNotEmptyField(body.inspSostRang) && isNotEmptyField(body.inspSostDolz)" class="adm-form__item">
            <small class="adm-text-small adm-form__label">Звание, Должность</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.inspSostRang, body.inspSostDolz | concatByDelimiter(',')"></Input>
                </Col>
              </Row>
            </div>
          </div>

          <div v-if="isNotEmptyField(body.placeSost.placeFull)" class="adm-form__item">
            <small class="adm-text-small adm-form__label">Место составления Извещения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.placeSost.placeFull"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </Col>
              </Row>
            </div>
          </div>

          <div v-if="isNotEmptyField(body.stotvKod)" class="adm-form__item">
            <small class="adm-text-small adm-form__label">Статья основания</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.stotvKod"></Input>
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
  import {mapGetters} from 'vuex';

  export default {
    name: "DlgAdvice",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        await this.$store.dispatch('dlgAdviceSetCid', currentForm.cid);

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
        this.$store.watch(this.$store.getters.dlgAdviceGetCommand, async () => {
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
      this.$store.dispatch('dlgAdviceSetCid', null);
      this.$store.dispatch('dlgAdviceSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'dlgAdviceGetData'
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
      isNotEmptyField(field) {
        if (typeof field === 'string') {
          return funcUtils.isNotEmpty(field) && field.length > 0;
        }
        return funcUtils.isNotEmpty(field);
      },
    }
  }
</script>


<style scoped lang="scss">
  .adm-form-content{

  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
    // outline: 1px solid red;
    padding-bottom: 20px;
    // min-height: 90px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 210px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
