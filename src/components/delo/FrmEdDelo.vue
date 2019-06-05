<template>
  <div v-if="body && viol" class="px36 pb6">
    <!-- данные по делу  -->

      <!-- <div class="flex-parent flex-parent--end-main py24">
        <Button @click="getDeloEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
          <img src='../../assets/images/icons/pen.svg' class="wmax-none">
        </Button>
      </div> -->

      <div class="ml60 pt36">
        <div>
          <div v-if="isNotEmptyField(viol.violDatNar)" class="flex-parent my6">
            <div class="flex-parent flex-parent--center-cross w-full">
              <div class="s40 flex-parent flex-parent--center-cross flex-parent--center-main">
                <img src="../../assets/images/icons/time.svg" class="wmax-none" alt="">
              </div>
              <div class="ml18">
                <p class="adm-14 color-dark-lighter">Дата - время нарушения</p>
                <p class="adm-text-big color-dark-base py6">{{viol.violDatNar | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
              </div>
            </div>
          </div>

          <div v-if="isNotEmptyField(viol.violPlaceNarFull)"  class="flex-parent my6">
            <div class="flex-parent flex-parent--center-cross w-full">
              <div class="s40 flex-parent flex-parent--center-cross flex-parent--center-main">
                <img src="../../assets/images/icons/map.svg" class="wmax-none" alt="">
              </div>
              <div class="ml18">
                <p class="adm-14 color-dark-lighter">Место нарушения</p>
                <p class="adm-text-big color-dark-base py6">{{viol.violPlaceNarFull}}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isNotEmptyField(viol.violPnpaKod)" class="ml60 my18">
          <p class="adm-14 color-dark-lighter ">Пункт НПА</p>
          <h2 class="adm-h2 color-dark-base mb6">{{viol.violPnpaKod}}</h2>
          <p class="adm-text-italic color-dark-base">{{viol.violPnpaName || 'нет информации'}}</p>
        </div>


        <div v-if="isNotEmptyField(body.stotvZakon)" class="ml60 my18">
          <p class="adm-14 color-dark-lighter ">Статья {{body.stotvZakon}}</p>
          <h2 class="adm-h2 color-dark-base mb6">{{viol.violStotvKod || 'нет информации'}}</h2>
          <p class="adm-text-italic color-dark-base">{{viol.violStotvName || 'нет информации'}}</p>
        </div>

        <div>
          <div class="flex-parent py18" style="border-top: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC;" v-if="isNotEmptyField(body.inspVozbName) || isNotEmptyField(body.inspVozbRang) || isNotEmptyField(body.organVozbId)">
            <div class="s40 mt12">
                <img src="../../assets/images/icons/police.svg" class="w-full h-full" alt="">
            </div>
            <div class="ml18">
              <div v-if="isNotEmptyField(body.inspVozbName)">
                <p class="adm-14 color-dark-lighter ">Должностное лицо, возбудившее дело. ФИО. Код сотрудника.</p>
                <p class="adm-text-big color-dark-base">{{body.inspVozbName, body.inspVozbKod | concatByDelimiter('-')}}</p>
              </div>

              <div v-if="isNotEmptyField(body.inspVozbRang)">
                <p class="adm-text-italic color-dark-base mb6">{{ body.inspVozbRang, body.inspVozbDolz | concatByDelimiter(',') }}</p>
              </div>

              <div v-if="isNotEmptyField(body.organVozbId)" class="mt18">
                <p class="adm-14 color-dark-lighter ">Орган, возбудивший дело</p>
                <p class="adm-text-big color-dark-base">{{body.organVozbId, body.organVozbName | concatByDelimiter('-') }}</p>
              </div>
            </div>
          </div>


          <div class="ml60">
            <div v-if="isNotEmptyField(body.docVozbName)" class="mt12">
              <p class="adm-14 color-dark-lighter ">Документ основание</p>
              <p class="adm-text-big color-dark-base">{{body.docVozbName}}</p>
            </div>

            <div v-if="isNotEmptyField(viol.mvidFisFull)" class="mt12">
              <p class="adm-14 color-dark-lighter ">Уникальный номер АП</p>
              <p class="adm-text-big color-dark-base">{{viol.mvidFisFull}}</p>
            </div>

            <div v-if="isNotEmptyField(body.deloMainDescr)" class="mt12">
              <p class="adm-14 color-dark-lighter ">Дело - основание</p>
              <p class="adm-text-big color-dark-base link color-blue-light-on-hover cursor-pointer txt-underline-on-hover" @click="getMainDelo(body.deloMainId)">{{body.deloMainDescr}}</p>
            </div>

            <Button @click="searchSecondaryCases" type="primary" class="search-secondary-cases-btn">Найти связанные дела</Button>
            <p v-if="typeof secondaryCases === 'string'" class="adm-14 color-dark-lighter ">{{secondaryCases}}</p>
            <div v-if="secondaryCases && (typeof secondaryCases === 'object') && secondaryCases.length > 0">
              <p class="adm-14 color-dark-lighter ">Список дел, связанных с текущим делом</p>
              <div v-for="(item, index) in secondaryCases" :key="index" >
                <p class="adm-text-big color-dark-base link color-blue-light-on-hover cursor-pointer txt-underline-on-hover" @click="getMainDelo(item.deloId)">Дело №{{item.deloN}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="errors-table errors-table--v2">
        <div class="errors-table__container">
          <h2 @click="hideMore = !hideMore" class="adm-form__headding bg-white cursor-pointer flex-parent flex-parent--space-between-main">
            <span class="adm-h4 color-dark-lighter" style="line-height: inherit;">Ошибки</span>
            <Button type="text" class="bg-transparent" style="box-shadow: none;">
              <Icon v-if="hideMore" type="md-remove" class="color-gray" :size="25" title="свернуть" />
              <Icon v-else type="md-add" class="color-gray" :size="25" title="развернуть"/>
            </Button>
          </h2>
          <div class="errors-table__content" v-show="hideMore">
            <table class='adm-table-simple table table--fixed border--0'>
              <thead>
                <tr class="bg-white-light">
                  <th class="error-th"></th>
                  <th class="w180 align-middle">
                    <p class="adm-text-big txt-normal color-dark-lighter">Код ошибки</p>
                  </th>
                  <th class="w180 align-middle">
                    <p class="adm-text-big txt-normal color-dark-lighter">Проверил</p>
                    <i class="adm-txt-regular txt-normal color-dark-lighter">Время проверки</i>
                  </th>
                  <th class="align-middle">
                    <p class="adm-text-big txt-normal color-dark-lighter">Ошибка</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(error, index) in errors">
                  <td class="align-center align-middle">
                    <div class="inline-block round-full w12 h12" :class="changeClass(error.priority)">
                    </div>
                  </td>
                  <td class="align-middle">
                    <p class="adm-14">{{error.kod}}</p>
                  </td>
                  <td>
                    <p class="adm-14 color-dark-base">{{error.checkIspName}}</p>
                    <p class="adm-12">{{error.checkDate | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
                  </td>
                  <td>
                    <p class="adm-14 color-dark-base">{{error.mesg}}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdDelo",
    data() {
      return {
        hideMore: false,
        secondaryCases: []
      }
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDeloGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            this.$store.dispatch('errors/changeContent', {title: e.message,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDeloSetCid', null);
      this.$store.dispatch('frmEdDeloSetData', null);
    },
    methods: {
      isNotEmptyField(field) {
        if (typeof field === 'string') {
          return funcUtils.isNotEmpty(field) && field.length > 0;
        }
        return funcUtils.isNotEmpty(field);
      },
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('frmEdDeloSetCid', currentForm.cid);

          let prepareParams = {
            method: 'restore',
            cid: currentForm.cid
          };
          if (funcUtils.isEmpty(currentForm.restore)) {
            prepareParams.method = 'getData';
            prepareParams.params = {
              'node': currentForm.params
            };
            currentForm.restore = true;
          } else {
            delete currentForm['restore'];
          }
          innerFormStack.updateCurrent(currentForm);
          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});
          this.secondaryCases = [];
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      async searchSecondaryCases() {
        let currentForm = innerFormStack.getCurrent();
        let eventResponse = await RequestApi.prepareData({
          method: 'searchSecondaryCases',
          cid: currentForm.cid
        });
        let responseData = JSON.parse(eventResponse.response).data;
        if (responseData && responseData.length) {
          this.secondaryCases = responseData;
        } else {
          this.secondaryCases = "Связанных дел не найдено";
        }
      },
      getMainDelo(deloId) {
        this.$emit('getMainDelo', deloId);
      },
      changeClass(errorPriority) {
        if (funcUtils.isNotEmpty(errorPriority)) {
          switch (errorPriority) {
            // 0-3 - красный
            // 4-7 - жёлтый
            // 8 и выше - зелёный
            case 0: {
              return "bg-red";
            }
            case 1: {
              return "bg-red";
            }
            case 2: {
              return "bg-red";
            }
            case 3: {
              return "bg-red";
            }
            case 4: {
              return "bg-yellow";
            }
            case 5: {
              return "bg-yellow";
            }
            case 6: {
              return "bg-yellow";
            }
            case 7: {
              return "bg-yellow";
            }
            case 8: {
              return "bg-green";
            }
            case 9: {
              return "bg-green";
            }
            default: {
              return "";
            }
          }
        }
      },
      getDeloEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDeloEdit,
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
        dataStore: 'frmEdDeloGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
      viol() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.viol;
        }

        return res;
      },
      errors() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.errors;
        }
        return res;
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search-secondary-cases-btn {
    margin: 10px 0;
  }
  .errors-table{
    .table td{
      border-bottom: 0;
    }
    margin-top: 30px;
    .error-th{
      width: 60px;
    }
    .adm-table-simple thead tr th{
      padding: 8px 12px;
    }
    .adm-form__headding{
      height: 40px;
      line-height: 40px;
      padding-left: 40px;
    }
  }
  .errors-table--v2 .errors-table__container{
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.26), 0 0 4px 0 rgba(0,0,0,0.16);
    background: #fff;
  }
</style>

