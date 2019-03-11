<template>
  <div v-if="body" class="mx18 mb18">

    <div class="amd-title px36 py24"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getUchastFLOrganizationEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Участник дела</b>
        </div>
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div>

    <div class="adm-form">
      <div class="adm-form__container my0 mx0 py12 px36">
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Наименование организации</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" readonly :value="body.organization.name"></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">ИНН</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" readonly :value="body.organization.inn"></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">ОГРН</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" readonly :value="body.organization.ogrn"></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">КПП</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" readonly :value="body.organization.kpp"></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Дата регистрации</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" readonly :value="body.organization.dateReg | formatDateTime('DD.MM.YYYY')"></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Адрес регистрации</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" type="textarea" :autosize="{minRows: 2,maxRows: 5}" readonly :value="body.organization.address.adrFull" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Фактический адрес</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" type="textarea" :autosize="{minRows: 2,maxRows: 5}" readonly :value="body.factAddr.adrFull" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Телефон</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" readonly :value="body.organization.address.phone" ></Input>
              </Col>
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
    name: "FrmEdUchastFLOrganization",
    data() {
      return {}
    },
    methods: {
      getUchastFLOrganizationEdit() {
        try {
          let current = formStack.getCurrent();
          let currentForm = innerFormStack.getCurrent({
            uid: current.moduleName
          });
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdUchastFLOrganizationEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdUchastFLGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      }
    },
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
