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
        <div class="items-wrap">
          <view-data-item 
            label="ФИО, дата рождения" 
            :value="body.individ.firstName, body.individ.secondName, body.individ.thirdName | concatByDelimiter(' '), body.individ.birthdayDay.replace(/[\.\/]/g,'.') | concatByDelimiter('-'), body.individ.birthdayYear | concatByDelimiter('.')" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/owner.svg')"
          />
          <view-data-item 
            label="Место рождения" 
            :value="body.individ.birthMesto" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/map.svg')"
          />
          <view-data-item 
            label="Гражданство" 
            :value="body.individ.gragdName" 
            style="grid-column: span 2;"
          />
          <hr>
          <view-data-item 
            label="Адрес регистрации" 
            :value="body.individ.address.adrFull" 
            style="grid-column: span 2;"
            :icon="require('../../assets/images/map.svg')"
          />
          <view-data-item 
            label="Фактический адрес" 
            :value="body.factAddr.adrFull" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Телефон" 
            :value="body.individ.phone" 
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
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdUchastFLIndivid",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
    },
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
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
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
