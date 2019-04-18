<template>
  <div v-if="body" class="ml18 mb18">
    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
          <div class="flex-parent flex-parent--center-cross">
            <Button @click="getUchastFLIndividEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
              <img src='../../assets/images/pen.svg' class="wmax-none">
            </Button>
            <!-- <b class="adm-text-big color-dark-lighter">{{body.individ.firstName, body.individ.secondName, body.individ.thirdName | concatByDelimiter(' '), body.individ.birthdayDay.replace(/[\.\/]/g,'/') | concatByDelimiter('-'), body.individ.birthdayYear | concatByDelimiter('/')}}</b> -->
            <b class="adm-text-big color-dark-lighter">{{'Участник дела', body.uchastVidName | concatByDelimiter('-')}}</b>

          </div>
          <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
            <img src='../../assets/images/wiki.svg' class="wmax-none">
          </Button> -->
        </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="flex-parent flex-parent--center-cross">
          <div class="s40">
            <img src="../../assets/images/owner.svg" class="mx-auto block" alt="">
          </div>
          <div class="ml18">
            <div class="mt12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">ФИО, дата рождения</p>
                  <p class="adm-text-big" :class="{'color-dark-base' : body.individ.firstName != null, 'color-gray-medium' : body.individ.firstName == null}">{{body.individ.firstName, body.individ.secondName, body.individ.thirdName | concatByDelimiter(' '), body.individ.birthdayDay.replace(/[\.\/]/g,'.') | concatByDelimiter('-'), body.individ.birthdayYear | concatByDelimiter('.') || 'нет информации'}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ml60">
          <div class="w-full">
            <div class="mb18" style="border-bottom: 1px solid #CCCCCC;">
              <div class="my12">
                <div class="grid">
                  <div class="col col--12">
                    <p class="adm-14 color-dark-lighter mb6">Место рождения</p>
                    <p class="adm-text-big" :class="{'color-dark-base' : body.individ.birthMesto != null, 'color-gray-medium' : body.individ.birthMesto == null}">{{body.individ.birthMesto || 'нет информации'}}</p>
                  </div>
                </div>
              </div>
              <div class="my12">
                <div class="grid">
                  <div class="col col--12">
                    <p class="adm-14 color-dark-lighter mb6">Гражданство</p>
                    <p class="adm-text-big" :class="{'color-dark-base' : body.individ.gragdName != null, 'color-gray-medium' : body.individ.gragdName == null}">{{body.individ.gragdName || 'нет информации'}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Адрес регистрации</p>
                  <p class="adm-text-big" :class="{'color-dark-base' : body.individ.address.adrFull != null, 'color-gray-medium' : body.individ.address.adrFull == null}">{{body.individ.address.adrFull || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="my12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Фактический адрес</p>
                  <p class="adm-text-big" :class="{'color-dark-base' : body.factAddr.adrFull != null, 'color-gray-medium' : body.factAddr.adrFull == null}">{{body.factAddr.adrFull || 'нет информации'}}</p>
                </div>
              </div>
            </div>
            <div class="mt12">
              <div class="grid">
                <div class="col col--12">
                  <p class="adm-14 color-dark-lighter mb6">Телефон</p>
                  <p class="adm-text-big" :class="{'color-dark-base' : body.individ.phone != null, 'color-gray-medium' : body.individ.phone == null}">{{body.individ.phone || 'нет информации'}}</p>
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
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdUchastFLIndivid",
    data() {
      return {
      }
    },
    methods: {
      isNotEmptyField(field) {
        if (typeof field === 'string') {
          return funcUtils.isNotEmpty(field) && field.length > 0;
        }
        return funcUtils.isNotEmpty(field);
      },
      getUchastFLIndividEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdUchastFLIndividEdit,
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
