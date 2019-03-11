<template>
  <div v-if="body && viol" class="px36 pb6">
    <!-- данные по делу  -->

      <div class="flex-parent flex-parent--end-main py24">
        <Button @click="getDeloEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
          <img src='../../assets/images/pen.svg' class="wmax-none">
        </Button>
      </div>

    <!-- <div class="amd-title px36 py24">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDeloEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Обложка дела</b>
        </div>
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div> -->


      <div class="wmax600 mx-auto">
        <div>
          <div class="grid">
            <div class="col">
              <div class="px12">
                <p class="adm-text-big color-dark-lighter">Статья КРФоАП</p>
                <h1 class="adm-h1 color-dark-lighter">{{viol.violStotvKod}}</h1>
                <p class="adm-txt-regular color-dark-lighter txt-em wmax300">{{viol.violStotvName}}</p>
              </div>
            </div>
            <div class="col">
              <div class="px12">
                <p class="adm-text-big color-dark-lighter">Пункт НПА</p>
                <h1 class="adm-h1 color-dark-lighter">{{viol.violPnpaKod}}</h1>
                <p class="adm-txt-regular color-dark-lighter txt-em">{{viol.violPnpaName}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt36">
          <div class="flex-parent my6">
            <div class="flex-parent flex-parent--center-cross w240 h36">
              <div class="s40 flex-parent flex-parent--center-cross flex-parent--center-main">
                <img src="../../assets/images/time.svg" alt="">
              </div>
              <p class="adm-txt-regular color-dark-lighter">Дата - время нарушения</p>
            </div>
            <div>
              <p class="adm-txt-regular color-dark-lighter py6">{{viol.violDatNar | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
            </div>
          </div>

          <div class="flex-parent my6">
            <div class="flex-parent flex-parent--center-cross w240 h36">
              <div class="s40 flex-parent flex-parent--center-cross flex-parent--center-main">
                <img src="../../assets/images/map.svg" alt="">
              </div>
              <p class="adm-txt-regular color-dark-lighter">Место нарушения</p>
            </div>
            <div>
              <p class="adm-txt-regular color-dark-lighter wmax300 py6">{{viol.violPlaceNarFull}}</p>
            </div>
          </div>
        </div>

        <div class="pt18">
          <p class="adm-txt-regular color-dark-lighter">Уникальный номер АП</p>
          <h3 class="adm-h3 color-dark-lighter">{{viol.mvidFisFull}}</h3>
        </div>

        <div class="my60">
          <div class="flex-parent">
            <div class="mr24 mt24">
                <img src="../../assets/images/police.svg" alt="">
            </div>
            <div>
              <p class="adm-txt-regular color-dark-lighter">Должностное лицо возбудившее дело</p>
              <h3 class="adm-h3 color-dark-lighter">{{body.inspVozbName}}</h3>
              
              <div class="my12">
                <p class="adm-txt-regular color-dark-lighter txt-em wmax360">Код сотрудника: {{body.inspVozbKod}} </p>
                <p class="adm-txt-regular color-dark-lighter txt-em wmax360">{{ body.inspVozbRang, body.inspVozbDolz | concatByDelimiter(',') }}</p>
              </div>

              <div class="my12">
                <p class="adm-txt-regular color-dark-lighter wmax360">Орган возбудивший дело</p>
                <p class="adm-text-big color-dark-lighter wmax360">{{body.organVozbId, body.organVozbName | concatByDelimiter('-') }}</p>
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
    name: "FrmEdDelo",
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

<style scoped>

</style>
