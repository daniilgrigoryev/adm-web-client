<template>
  <div v-if="body" class="mx18 mb18">

    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getUchastFLOrganizationEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">{{'Участник дела', body.uchastTipName | concatByDelimiter('-')}}</b>
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
            label="Наименование организации" 
            :value="body.organization.name" 
            style="grid-column: span 2;"
          />
          <hr>
          <view-data-item 
            label="ИНН" 
            :value="body.organization.inn" 
          />
          <view-data-item 
            label="КПП" 
            :value="body.organization.kpp" 
          />
          <view-data-item 
            label="ОГРН" 
            :value="body.organization.ogrn" 
          />
          <view-data-item 
            label="Дата регистрации" 
            :value="stringToDateFormat(body.organization.dateReg) | formatDateTime('DD.MM.YYYY')" 
          />
          <hr>
          <view-data-item 
            label="Адрес регистрации" 
            :value="body.organization.address.adrFull" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Фактический адрес" 
            :value="body.factAddr.adrFull" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Телефон" 
            :value="body.organization.phone" 
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
    name: "FrmEdUchastFLOrganization",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
    },
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
          let currentForm = innerFormStack.getCurrent();
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
          this.$store.dispatch('errors/changeContent', {title: e.message.error,});
        }
      },
      stringToDateFormat(stringDate){
        if(funcUtils.isNotEmpty(stringDate)){
          let parts = stringDate.split('-');
          let dateFormat = new Date(parts[0], parts[1] - 1, parts[2]); 
          return dateFormat;
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

