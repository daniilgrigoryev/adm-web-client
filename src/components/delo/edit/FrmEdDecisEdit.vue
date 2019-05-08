<template>
  <aside-template :listSectionNav="listSectionNav" title="Решение по делу" v-if="decis">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding">{{decis.decisName}}</h2>
            <div class="adm-form__content">
              
              <div v-if="decis.decisKod && showByDecisKod(decisKods.lish)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество месяцев</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.lishMes" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество дней</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.lishDay" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата начала срока лишения</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="decis.periodStart" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>

              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.warning)"></div>-->

              <div v-if="decis.decisKod && showByDecisKod(decisKods.shtraf)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Сумма штрафа</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.sumShtraf" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div v-if="decis.decisKod && showByDecisKod(decisKods.arest)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество дней</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.arestDay" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата и время начала ареста</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="decis.arestTimeBeg" @change="store" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>

              <div v-if="decis.decisKod && showByDecisKod(decisKods.discval)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество дней</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.diskvDay" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество месяцев</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.diskvMes" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата начала дисквалификации</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="decis.datDiskvBeg" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата окончания дисквалификации</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="decis.datDiskvEnd" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>

              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.observ)"></div>-->

              <div v-if="decis.decisKod && showByDecisKod(decisKods.hoursToWork)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество часов обязательных работ</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.hoursToWork" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div v-if="decis.decisKod && showByDecisKod(decisKods.forced)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата начала работ</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="decis.periodStart" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество месяцев</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.period" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество дней</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.period2" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div v-if="decis.decisKod && showByDecisKod(decisKods.imprisonment)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата начала лишения свободы</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="decis.periodStart" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество месяцев</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.period" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество дней</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.period2" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>

              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.withdrawal)"></div>-->

              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.confiscation)"></div>-->

              <!--    <div v-if="decis.decisKod && showByDecisKod(decisKods.exclusion)"></div>-->


              <div v-if="decis.decisKod && showByDecisKod(decisKods.stopWorkDay)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата начала приостановления</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="decis.periodStart" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Количество суток</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="16">
                      <masked-input inputClass="adm-input adm-input--regular" v-model="decis.period2" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>

              <div v-if="decis.decisKod && showByDecisKod(decisKods.rasm)">
                <div class="adm-form__item">
                  <small class="adm-form__label">Орган рассмотрения</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <masked-input inputClass="adm-input adm-input--regular" v-model="decis.organNapravlName" :maskProps="{casing: 'upper', placeholder: ''}" @onInputChange="store"></masked-input>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div class="adm-form__item">
                  <small class="adm-form__label">Дата и время рассмотрения</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <DatePickerMask class="adm-input adm-input--regular wmax240" v-model="decis.dateRasm" @change="store" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
                     </Col>
                    </Row>
                  </div>
                </div>
              </div>

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
              <div v-if="!decis.decisKod && showByDecisKod(!decisKods.rasm)" class="adm-form__item" >
                <small class="adm-form__label">Дата вступления</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmax240" v-model="decis.dateVstup" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
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

  export default {
    name: "FrmEdDecisEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
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
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg,});
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
          lish: 29, // Лишить права управления ТС
          warning: 51, // Предупредить
          shtraf: 65, // Оштрафовать
          arest: 90, // Арестовать
          discval: 91, // Дисквалифицировать
          observ: 99, // Устное замечание
          hoursToWork: 71, // Обязательные работы
          forced: 73, // Принудительные работы
          imprisonment: 74, // Лишение свободы
          withdrawal: 75, // Возмездное изъятие
          confiscation: 76, // Конфискация
          exclusion: 77, // Выдворение за пределы РФ
          stopWorkDay: 78, // Приостановление деятельности
          rasm: 92, // Назначить дату и место рассмотрения
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
      async save() {
        await this.store();
        let eventResponse = await RequestApi.prepareData({
          method: 'update'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg,});
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
