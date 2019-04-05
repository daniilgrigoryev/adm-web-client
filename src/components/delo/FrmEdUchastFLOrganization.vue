<template>
  <div v-if="body" class="mx18 mb18">

    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getUchastFLOrganizationEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">{{body.organization.name}}</b>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
    </div>
    <div class="view-data">
      <div class="view-data__container">
          <div class="ml60">
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Наименование организации</p>
                  <p class="adm-text-big color-dark-base">{{body.organization.name || 'нет информации'}}</p>
                </div>
              </div>
            </div>

            <div class="my18" style="border-bottom: 1px solid #CCCCCC;">
              <div class="my12">
                <div class="grid">
                  <div class="col col--6">
                    <p class="adm-14 color-dark-lighter mb6">ИНН</p>
                    <p class="adm-text-big color-dark-base">{{body.organization.inn || 'нет информации'}}</p>
                  </div>
                  <div class="col col--6">
                    <p class="adm-14 color-dark-lighter mb6">КПП</p>
                    <p class="adm-text-big color-dark-base">{{body.organization.kpp || 'нет информации'}}</p>
                  </div>
                </div>
              </div>
              <div class="my12">
                <div class="grid">
                  <div class="col col--6">
                    <p class="adm-14 color-dark-lighter mb6">ОГРН</p>
                    <p class="adm-text-big color-dark-base">{{body.organization.ogrn || 'нет информации'}}</p>
                  </div>
                  <div class="col col--6">
                    <p class="adm-14 color-dark-lighter mb6">Дата регистрации</p>
                    <p class="adm-text-big color-dark-base">{{body.organization.dateReg || 'нет информации'}}</p>
                  </div>
                </div>
              </div>
            </div>



            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Адрес регистрации</p>
                  <p class="adm-text-big color-dark-base">{{body.organization.address.adrFull || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Фактический адрес</p>
                  <p class="adm-text-big color-dark-base">{{body.factAddr.adrFull || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Телефон</p>
                  <p class="adm-text-big color-dark-base">{{body.organization.phone || 'нет информации'}}</p>
                </div>
              </div>
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
    name: "FrmEdUchastFLOrganization",
    data() {
      return {}
    },
    methods: {
      isNotEmptyField(field) {
        if (typeof field === 'string') {
          return funcUtils.isNotEmpty(field) && field.length > 0;
        }
        return funcUtils.isNotEmpty(field);
      },
      getUchastFLOrganizationEdit() {
        try {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
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
