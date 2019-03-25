<template>
  <div v-if="body && viol" class="px36 pb6">
    <!-- данные по делу  -->

      <!-- <div class="flex-parent flex-parent--end-main py24">
        <Button @click="getDeloEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
          <img src='../../assets/images/pen.svg' class="wmax-none">
        </Button>
      </div> -->

      <div class="ml60 pt36">
        <div>
          <div v-if="isNotEmptyField(viol.violDatNar)" class="flex-parent my6">
            <div class="flex-parent flex-parent--center-cross  wmin240 wmax240 h36">
              <div class="s40 flex-parent flex-parent--center-cross flex-parent--center-main">
                <img src="../../assets/images/time.svg" alt="">
              </div>
              <p class="adm-14 color-dark-lighter">Дата - время нарушения</p>
            </div>
            <div>
              <p class="adm-14 color-dark-lighter py6">{{viol.violDatNar | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
            </div>
          </div>

          <div v-if="isNotEmptyField(viol.violPlaceNarFull)"  class="flex-parent my6">
            <div class="flex-parent flex-parent--center-cross wmin240 wmax240 h36">
              <div class="s40 flex-parent flex-parent--center-cross flex-parent--center-main">
                <img src="../../assets/images/map.svg" alt="">
              </div>
              <p class="adm-14 color-dark-lighter">Место нарушения</p>
            </div>
            <div>
              <p class="adm-14 color-dark-lighter wmax600 pr12 py6">{{viol.violPlaceNarFull}}</p>
            </div>
          </div>
        </div>

        <div v-if="isNotEmptyField(viol.violPnpaKod)" class="px12 my24">
          <p class="adm-text-big color-dark-lighter ">Пункт НПА</p>
          <div class="flex-parent flex-parent--center-cross my6">
            <h3 class="adm-h3 color-dark-lighter">{{viol.violPnpaKod}}</h3>
            <p class="adm-14 color-dark-lighter ml18">{{viol.violPnpaName}}</p>
          </div>
        </div>
        <div v-if="isNotEmptyField(body.stotvZakon)" class="px12 my24">
          <p class="adm-text-big color-dark-lighter">Статья {{body.stotvZakon}}</p>
          <div class="flex-parent flex-parent--center-cross my6">
            <h3 class="adm-h3 color-dark-lighter">{{viol.violStotvKod}}</h3>
            <p class="adm-14 color-dark-lighter ml18">{{viol.violStotvName}}</p>
          </div>
        </div>

        <div class="">
          <div class="flex-parent my36">
            <div class="mr24 mt24">
                <img src="../../assets/images/police.svg" alt="">
            </div>
            <div>
              <div v-if="isNotEmptyField(body.inspVozbName)">
                <p class="adm-14 color-dark-lighter mb6">Должностное лицо, возбудившее дело</p>
                <h3 class="adm-h3 color-dark-lighter">{{body.inspVozbName}}</h3>
              </div>
              
              <div class="my8">
                <!-- <p class="adm-14 color-dark-lighter txt-em my6">Код сотрудника: {{body.inspVozbKod}} </p> -->
                <p v-if="isNotEmptyField(body.inspVozbRang)" class="adm-14 color-dark-lighter txt-em my6">{{ body.inspVozbRang, body.inspVozbDolz | concatByDelimiter(',') }}</p>
              </div>

              <div class="my12">
                <p class="adm-14 color-dark-lighter">Орган, возбудивший дело</p>
                <p class="adm-text-big color-dark-lighter">{{body.organVozbId, body.organVozbName | concatByDelimiter('-') }}</p>
              </div>
            </div>
          </div>

          <div v-if="isNotEmptyField(body.docVozbName)" class="my12">
            <p class="adm-14 color-dark-lighter">Документ основание</p>
            <h3 class="adm-h3 color-dark-lighter">{{body.docVozbName}}</h3>
          </div>


          <div v-if="isNotEmptyField(viol.mvidFisFull)" class="my12">
            <p class="adm-14 color-dark-lighter">Уникальный номер АП</p>
            <h3 class="adm-h3 color-dark-lighter">{{viol.mvidFisFull}}</h3>
          </div>

          <div v-if="isNotEmptyField(body.deloMainDescr)" class="my12">
            <p class="adm-14 color-dark-lighter">Дело - основание</p>
            <h3 class="adm-h3 color-dark-lighter link color-blue-light-on-hover cursor-pointer txt-underline-on-hover" @click="getMainDelo">{{body.deloMainDescr}}</h3>
          </div>
        </div>
      </div>

      <div class="adm-form errors-table" v-if="isNotEmptyField(errors)">
        <div class="adm-form__container">
          <h2  @click="hideMore = !hideMore" class="adm-text-big color-dark-light adm-form__headding cursor-pointer flex-parent flex-parent--space-between-main">
            <span>Ошибки</span>
            <Button type="text" class="bg-transparent" style="box-shadow: none;">
              <Icon v-if="hideMore" type="md-remove" class="color-white" :size="25" title="свернуть" />
              <Icon v-else type="md-add" class="color-white" :size="25" title="развернуть"/>
            </Button>
          </h2>
          <div class="adm-form__content" v-show="hideMore">
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
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import {bus} from "../../assets/js/utils/bus";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdDelo",
    data() {
      return {
        hideMore: false,
      }
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
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
        }
        delete currentForm['restore'];
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDeloGetCommand, async () => {
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
      getMainDelo() {
        bus.$emit('getMainDelo', this.body.deloMainId);
      },
      changeClass(errorPriority) {
        if (funcUtils.isNotEmpty(errorPriority)) {
          switch (errorPriority) {
            case 1: {
              return "bg-red";
            }
            case 2: {
              return "bg-orange";
            }
            case 3: {
              return "bg-yellow";
            }
            case 4: {
              return "bg-green";
            }
            case 5: {
              return "bg-blue";
            }
            case 6: {
              return "bg-purple";
            }
            case 7: {
              return "bg-gray";
            }
            case 8: {
              return "bg-black";
            }
            case 9: {
              return "bg-blue-faint";
            }
            default: {
              return "";
            }
          }
        }
      },
      getDeloEdit() {
        try {
          let current = formStack.getCurrent();
          let currentForm = innerFormStack.getCurrent({
            uid: current.moduleName
          });
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
          alert(e.message);
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
</style>

