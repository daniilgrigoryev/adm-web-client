<template>
  <aside-template title="Редактирование Извещения">

    <div class="adm-form">
      <div class="adm-form__container">
        <h2 class="adm-form__headding" id="head">Редактирование Извещения</h2>
        <div class="adm-form__content">
          <Row>
            <Col span="12">
              <div class="adm-form__item">
                <small class="adm-form__label">Номер извещения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input @onInputChange="store" v-model="dataAdvice.docN" inputClass="adm-input adm-input--regular" :maskProps="{placeholder: '', regex: '[0-9\/\-]+'}" clearable></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="12">
              <div class="adm-form__item">
                <small class="adm-form__label">Дата рассмотрения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="16">
                      <DatePickerMask v-model="dataAdvice.dateRasm" @change="changeDateNar" class="adm-input adm-input--regular wmin120 wmax180"  clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <div class="adm-form__item">
                <small class="adm-form__label">Дата составления</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask v-model="dataAdvice.dateSost" @change="changeDateNar" class="adm-input adm-input--regular"  clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span="12">
              <div class="adm-form__item">
                <small class="adm-form__label">Дата вручения</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask v-model="dataAdvice.dateUved" @change="changeDateNar" class="adm-input adm-input--regular"  clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div> 
      </div>
      <div class="adm-form__container">
        <h2 class="adm-form__headding">Должностное лицо составившее Извещение</h2>
          <div class="adm-form__content">
            <div class="adm-form__item">
              <small class="adm-form__label">Должностное лицо</small><!-- Личный номер - ФИО сотрудника Звание / Должность -->
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="22" :md="22" :lg="22">
                    <Input class="adm-input adm-input--regular" readonly :value="dataAdvice.inspSostKod, dataAdvice.inspSostName | concatByDelimiter('-'), dataAdvice.inspSostRang, dataAdvice.inspSostDolz | concatByDelimiter(',')"></Input>
                  </Col>
                  <Col :xs="2" :md="2" :lg="2">
                    <!-- <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                      <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="35" />
                    </Button> -->
                  </Col>
                </Row>
              </div>
            </div>
            <!-- <div class="adm-form__item">
              <small class="adm-form__label">Подразделение - Код подразделения</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="22" :md="22" :lg="22">
                    <Input class="adm-input adm-input--regular" readonly :value="docsPost.organSostName" ></Input>
                  </Col>
                  <Col :xs="2" :md="2" :lg="2">
                    <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                      <Icon type="ios-bookmarks-outline" class=" " title="Справочник подразделений" :size="35" />
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-form__label">Место составления, индекс</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="22" :md="22" :lg="22">
                    <Input class="adm-input adm-input--regular" disabled v-model="docsPost.placeSost.placeFull"></Input>
                  </Col>
                  <Col :xs="2" :md="2" :lg="2">
                    <Button @click="getPlaceSost" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                      <Icon type="ios-bookmarks-outline" class=" " title="адресный справочник" :size="35" />
                    </Button>
                  </Col>
                </Row>
              </div>
            </div> -->
          </div>
      </div>
    </div>

    <div class="bot-wrap">
      <Button @click="getPrev" type="text">Отменить изменения</Button>
      <Button @click="save" type="primary" class="ml12">Сохранить</Button>
    </div>
  </aside-template>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import AsideTemplate from "~/components/templates/AsideTemplate.vue";
  import MaskedInput from "../../shared/MaskedInput";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";

  export default {
    name: "DlgAdviceEdit",
    components: {
      AsideTemplate,
      MaskedInput,
      DatePickerMask
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('dlgAdviceEditSetCid', current.cid);
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.node)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'node': this.$route.params.node
          };
        }
        let eventResponse = await RequestApi.prepareData(prepareParams);
        let dataAdvice = JSON.parse(eventResponse.response).data;
        
        if (funcUtils.isEmpty(dataAdvice)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        }else{
          this.dataAdvice = dataAdvice;
        }

      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('dlgAdviceEditSetCid', null);
      this.$store.dispatch('dlgAdviceEditSetData', null);
    },
    data() {
      return {
        dataAdvice: null
      }
    },
    methods: {
      store() {
        let copy = JSON.parse(JSON.stringify(this.dataAdvice));
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: copy
          }
        });
      },
      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'update'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          alert(error.errorMsg);
        } else {
          this.getPrev();
        }
      },
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          alert(e.message);
        }
      },
    },
  }

//   export default {
//     name: "DlgAdviceEdit",
//     async created() {
//       try {
//         let current = formStack.getCurrent();
//         let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
//         let currentForm = innerFormStack.getCurrent(uid);
//         await this.$store.dispatch('dlgAdviceEditSetCid', currentForm.cid);

//         let prepareParams = {
//           method: 'restore',
//           cid: currentForm.cid
//         };
//         if (funcUtils.isEmpty(currentForm.restore)) {
//           prepareParams.method = 'getData';
//           prepareParams.params = {
//             'node': currentForm.params
//           };
//         }
//         delete currentForm['restore'];
//         let eventResponse = await RequestApi.prepareData(prepareParams);
//         await this.$store.dispatch('fillModule', {'event': eventResponse});

//         let vm = this;
//         this.$store.watch(this.$store.getters.dlgAdviceEditGetCommand, async () => {
//           try {
//             let current = formStack.getCurrent();
//             let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
//             let currentForm = innerFormStack.getCurrent(uid);
//             let eventResponse = await RequestApi.prepareData({
//               cid: currentForm.cid,
//               withSpinner: false
//             });
//             await vm.$store.dispatch('fillModule', {'event': eventResponse});
//           } catch (e) {
//             alert(e.message);
//           }
//         });
//       } catch (e) {
//         alert(e.message);
//       }
//     },
//     destroyed() {
//       this.$store.dispatch('dlgAdviceEditSetCid', null);
//       this.$store.dispatch('dlgAdviceEditSetData', null);
//     },
//     computed: {
//       ...mapGetters({
//         dataStore: 'dlgAdviceEditGetData'
//       }),
//       data() {
//         let res = null;
//         if (this.dataStore) {
//           res = this.dataStore.body;
//         }
//         return res;
//       },
//     },
//   }
</script>
