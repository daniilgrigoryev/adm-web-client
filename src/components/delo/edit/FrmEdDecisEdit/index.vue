<template>
  <aside-template :listSectionNav="listSectionNav" title="Решение по делу" v-if="decis">
    <div class="layout-wrap">
      <div class="layout">
        <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding">{{decis.decisName}}</h2>
            <div class="adm-form__content">
              <component 
                :is="decisComponentName" 
                :decis="decis" 
                @store="store()" 
              />
              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.warning)"></div>-->
              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.observ)"></div>-->
              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.withdrawal)"></div>-->
              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.confiscation)"></div>-->
              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.exclusion)"></div>-->
              <template v-if="decisByResh()">
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата вручения</small><!-- Дата уведомления -->
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <DatePickerMask class="adm-input adm-input--regular wmax240" v-model="decis.dateUved" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item" >
                  <small class="adm-form__label">Дата вступления</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24" style="display:flex;">
                        <DatePickerMask class="adm-input adm-input--regular wmax240" v-model="decis.dateVstup" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                        <button @click="calcDateVstup" class="adm-form__icon-button" :disabled="!decis.dateUved" title="Расчитать дату вступления в законную силу" type="button">
                          <img :src="require('~/assets/images/copyData.png')" alt="Скопировать данные владельца">
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </template>
            </div>
          </div>
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
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";

  const req = require.context('./', false, /\.vue$/);
  const decisComponent = {};
  req.keys().forEach(filename => {
    const name = `${filename.split('.')[1].split('/')[1]}`;
    if (name === 'index') {return}
    const component = req(filename).default;
    decisComponent[name] = component;
  });
  
  export default {
    name: "FrmEdDecisEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardModal: () => import('~/components/wizard/items/WizardModal'),
      ...decisComponent
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdDecisEditSetCid', current.cid);
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
        let decis = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(decis)) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {

          this.decis = decis;
        }
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDecisEditSetCid', null);
      this.$store.dispatch('frmEdDecisEditSetData', null);
    },
    data() {
      return {
        decis: null,
        listSectionNav: [
          // {
          //   title: 'Прекратить производство по делу'
          // }
        ],
        decisKods: {
          Lish: 29, // Лишить права управления ТС
          Warning: 51, // Предупредить
          Shtraf: 65, // Оштрафовать
          Arest: 90, // Арестовать
          Discval: 91, // Дисквалифицировать
          Observ: 99, // Устное замечание
          HoursToWork: 71, // Обязательные работы
          Forced: 73, // Принудительные работы
          Imprisonment: 74, // Лишение свободы
          Withdrawal: 75, // Возмездное изъятие
          Confiscation: 76, // Конфискация
          Exclusion: 77, // Выдворение за пределы РФ
          StopWorkDay: 78, // Приостановление деятельности
          Rasm: 92, // Назначить дату и место рассмотрения
          IstrSved: 100, // Истребовать сведения
          ExtendPeriod: 101, // Продлить срок административного расследования
          Refuse: 102, // Отказать в удовлетворении ходатайства
        },
        organModal: {
          visible: false,
          gibddList: null,
          srcList: null,
          columnsOptions:
            [
              {
                title: 'Код органа',
                key: 'ORGAN_KOD',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Код региона',
                key: 'RESP_KOD',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Регион',
                key: 'REGION_NAME',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Район',
                key: 'RAYON_NAME',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Тип',
                key: 'TIP',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Название',
                key: 'ORGAN_NAME',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Контакты',
                key: 'CONTACTS',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Адрес',
                key: 'KA_ADR_FULL',
                minWidth: 120,
                ellipsis: true,
                sortable: 'custom',
                filterable: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              }
            ]
        },
      }
    },
    computed: {
      decisComponentName() {
        if (this.decis) {
          return Object.keys(this.decisKods).find(key => this.decisKods[key] === this.decis.decisKod);
        }
      }
    },
    methods: {
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.decis
          }
        });
      },
      showByDecisKod(decisKod) {
        return this.decis.decisKod == decisKod;
      },
      decisByResh() {
        const exceptions = [
          this.decisKods.Refuse,
          this.decisKods.ExtendPeriod
        ]
        if (exceptions.includes(this.decis.decisKod)) {
          return false;
        }
        return true;
      },
      async showOrganModal(visible) {
        if (visible && funcUtils.isEmpty(this.organModal.srcList)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: null
            }
          });
          this.organModal.srcList = JSON.parse(eventResponse.response).data;
        }
        if (visible) {
          this.organModal.gibddList = this.organModal.srcList;
        } else {
          this.organModal.gibddList = null;
        }
        this.organModal.visible = visible;
      },
      async changeOrganNapravlKod() {
        if (funcUtils.isNotEmpty(this.decis.organNapravlKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: this.decis.organNapravlKod
            }
          });
          this.clearOrganNapravl();
          let gibddList = JSON.parse(eventResponse.response).data;
          if (gibddList.length > 0) {
            this.organModal.visible = true;
            this.organModal.gibddList = gibddList;
          }
        } else {
          this.clearOrganNapravl();
        }
      },
      async calcDateVstup() {
        return;
        // let eventResponse = await RequestApi.prepareData({
        //   method: 'invokeElementMethod',
        //   params: {
        //     eCID: this.info.eCID,
        //     methodName: 'calcDateVstup',
        //     data: null
        //   }
        // });
        // let dateVstup = JSON.parse(JSON.parse(eventResponse.response).data);
        // if (dateVstup) {
        //   this.decis.dateVstup = dateVstup;
        // }
      },
      onGibddClick(data) {
        this.decis.organNapravlId = data.ID;
        this.decis.organNapravlKod = data.ORGAN_KOD;
        this.decis.organNapravlName = data.ORGAN_NAME;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
        this.store();
      },
      clearOrganNapravl() {
        this.decis.organNapravlId = null;
        this.decis.organNapravlKod = null;
        this.decis.organNapravlName = null;
        this.store();
      },
      async save() {
        await this.store();
        let eventResponse = await RequestApi.prepareData({
          method: 'update'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
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
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    },
  }
</script>
