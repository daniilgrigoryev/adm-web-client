<template>
  <div v-if="body" class="mb18">
    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
          <div class="flex-parent flex-parent--center-cross">
            <Button @click="getUchastFLIndividEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
              <img src='../../assets/images/icons/pen.svg' class="wmax-none">
            </Button>
            <!-- <b class="adm-text-big color-dark-lighter">{{body.individ.firstName, body.individ.secondName, body.individ.thirdName | concatByDelimiter(' '), body.individ.birthdayDay.replace(/[\.\/]/g,'/') | concatByDelimiter('-'), body.individ.birthdayYear | concatByDelimiter('/')}}</b> -->
            <b class="adm-text-big color-dark-lighter">{{'Участник дела', body.uchastVidName | concatByDelimiter('-')}}</b>

          </div>
          <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
            <img src='../../assets/images/icons/wiki.svg' class="wmax-none">
          </Button> -->
        </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item
            label="ФИО, дата рождения"
            :value="body.individ.firstName, body.individ.secondName, body.individ.thirdName | concatByDelimiter(' '), parsedBirthday | concatByDelimiter('-'), body.individ.birthdayYear | concatByDelimiter('.')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/owner.svg')"
          />
          <view-data-item
            label="Место рождения"
            :value="body.individ.birthMesto"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/map.svg')"
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
            :icon="require('../../assets/images/icons/map.svg')"
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
          <template v-if="body.uchastStatus === constants.UCHAST_INDIVID">
            <view-data-item
              label="ИНН"
              :value="body.individ.inn"
              style="grid-column: span 2;"
            />
            <view-data-item
              label="ОГРНИП"
              :value="body.individ.ogrn"
              style="grid-column: span 2;"
            />
          </template>
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
  import * as constants from "~/assets/js/utils/constants";

  export default {
    name: "FrmEdUchastFLIndivid",
    props: {
      delo: Object
    },
    components: {
    },
    data() {
      return {
        constants
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
            node: currentForm.params,
            title: 'Дело №' + this.delo.deloN,
          };

          formStack.toNext({
            module: this.$store.state.frmEdUchastFLIndividEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
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
      },
      parsedBirthday() {
        let res = null;
        if (this.body && this.body.individ.birthdayDay) {
          res = this.body.individ.birthdayDay.replace(/[\.\/]/g,'.');
        }
        return res;
      },
    },
  }
</script>
