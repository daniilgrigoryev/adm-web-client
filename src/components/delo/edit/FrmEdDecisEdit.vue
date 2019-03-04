<template>
  <div v-if="decis">
    <!-- данные по делу  -->

    <Button @click="getPrev" type="text">Назад</Button>
    <Button @click="save" type="text">Сохранить</Button>

    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>

    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

    <wizard-modal v-if="organNapravModal.visible" :columnsOptions="organNapravModal.columnsOptions" :data="organNapravModal.gibddList" @showModal="showOrganNapravModal" @onRowDbClick="onOrganNapravlick"></wizard-modal>

    <!--

    "organNapravlId",
    "organNapravlKod",
    "organNapravlName",

    "uchastGalobId",


    "hoursToWork",
    "period",
    "periodDim",
    "period2",
    "period2Dim",
    "periodStart"-->

    <div class="adm-form">

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Лишение месяцы</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.lishMes" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Лишение дни</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.lishDay" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дисквалификация месяцы</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.diskvMes" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дисквалификация дни</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.diskvDay" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Арест дни</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.arestDay" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Личный номер сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.inspSostKod" @on-input-change="changeInspSostKod" ></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showDolzModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник сотрудников</a>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ФИО сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.inspSostName" @on-input-change="changeFIO" ></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Должность сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.inspSostDolz" @on-input-change="clearInspSostKod" ></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Звание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.inspSostRang" @on-input-change="clearInspSostKod" ></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Код подразделения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.organSostKod" @on-input-change="changeOrganSostKod" ></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showOrganModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Уполномеченные органы</a>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.organSostName" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>

      <hr />
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Код куда направить</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.organNapravlKod" @on-input-change="changeOrganNapravSostKod" ></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showOrganModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Уполномеченные органы</a>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.organNapravlName" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>
      <hr />




      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Код решения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="decis.decisKod" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in decisList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Текст решения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.decisFormtxt" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дополнительные сведения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.dopSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Сумма штрафа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.sumShtraf" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Недостатки</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.nedostat" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Предмет доследования</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.predmetDosled" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Основание переноса</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.perenosOsnovanie" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Основание отмены</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.otmenaOsnovanie" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Входящий номер</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.vxodNumb" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">УИН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.uin" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Результат экспертизы</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.rezExpert" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Сумма оплаченная</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.sumOpl" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Сумма не оплаченная</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="decis.sumNopl" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата решения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.decisDate" format="dd-MM-yyyy HH:mm" @on-change="changeDecisDate" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата вступления</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.dateVstup" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата уведомления</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.dateUved" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата начала лишения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.dateLishBeg" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата окончания лишения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.datLishEnd" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата исполнения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.dateIspoln" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата начала дисквалификации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.dateDiskvBeg" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата окончания дисквалификации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.datDiskvEnd" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата возврата</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.dateVozv" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата рассмотрения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.dateRasm" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата отправки</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.dateOtprav" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата переноса</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.datePerenos" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Время начала ареста</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.arestTimeBeg" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Время конца ареста</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="decis.arestTimeEnd" format="dd-MM-yyyy HH:mm" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Место решения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" disabled v-model="decis.placeDecis.placeFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="getPlaceDecis" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Адресный справочник</a>
          </Col>
        </Row>
      </div>
    </div>

  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import WizardModal from "~/components/wizard/items/WizardModal";

  export default {
    name: "FrmEdDecisEdit",
    components: {WizardModal},
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
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillPnpaList();
          await this.fillDecisList();

          this.parseDate(decis);
          this.decis = decis;

          if (funcUtils.isNotEmpty(decis.decisDate)) {
            this.fillStotvSearchInfo();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDecisEditSetCid', null);
      this.$store.dispatch('frmEdDecisEditSetData', null);
    },
    data() {
      return {
        decis: null,
        decisList: null,
        pnpaList: null,
        stotvSearchInfoList: null,
        dolzModal: {
          visible: false,
          sispList: null,
          columnsOptions:
            [
              {
                title: 'Нагрудный знак',
                key: 'inspKod',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'ФИО',
                key: 'inspName',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Должность',
                key: 'inspDolz',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Звание',
                key: 'inspRang',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Код подразделения',
                key: 'organKod',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Подразделение',
                key: 'ogaiName',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Отдел',
                key: 'otdName',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Телефон',
                key: 'phone',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Дата начала действия',
                key: 'dateBeg',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              },
              {
                title: 'Дата окончания действия',
                key: 'dateEnd',
                minWidth: 120,
                ellipsis: true,
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              }
            ]
        },
        organModal: {
          visible: false,
          gibddList: null,
          columnsOptions:
            [
              {
                title: 'Код органа',
                key: 'ORGAN_KOD',
                minWidth: 120,
                ellipsis: true,
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
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              }
            ]
        },
        organNapravModal: {
          visible: false,
          gibddList: null,
          columnsOptions:
            [
              {
                title: 'Код органа',
                key: 'ORGAN_KOD',
                minWidth: 120,
                ellipsis: true,
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
                tooltip: true,
                renderHeader: (h, params) => {
                  return h('h4', params.column.title)
                }
              }
            ]
        },
      }
    },
    methods: {
      parseDate(data) {
        data.decisDate = funcUtils.convertNumberToDate(data.decisDate);
        data.dateVstup = funcUtils.convertNumberToDate(data.dateVstup);
        data.dateUved = funcUtils.convertNumberToDate(data.dateUved);
        data.dateLishBeg = funcUtils.convertNumberToDate(data.dateLishBeg);
        data.datLishEnd = funcUtils.convertNumberToDate(data.datLishEnd);
        data.dateIspoln = funcUtils.convertNumberToDate(data.dateIspoln);
        data.dateDiskvBeg = funcUtils.convertNumberToDate(data.dateDiskvBeg);
        data.datDiskvEnd = funcUtils.convertNumberToDate(data.datDiskvEnd);
        data.dateVozv = funcUtils.convertNumberToDate(data.dateVozv);
        data.dateRasm = funcUtils.convertNumberToDate(data.dateRasm);
        data.dateOtprav = funcUtils.convertNumberToDate(data.dateOtprav);
        data.datePerenos = funcUtils.convertNumberToDate(data.datePerenos);
        data.arestTimeBeg = funcUtils.convertNumberToDate(data.arestTimeBeg);
        data.arestTimeEnd = funcUtils.convertNumberToDate(data.arestTimeEnd);
      },

      async fillPnpaList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getPnpaDict'
        });
        let pnpaList = [];
        let pnpaDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < pnpaDict.length; i++) {
          let pnpa = pnpaDict[i];
          pnpaList.push({
            label: pnpa.PNPA_NAME,
            value: pnpa.PNPA_KOD,
            id: pnpa.PNPA_ID
          });
        }
        this.pnpaList = pnpaList;
      },
      async fillDecisList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getDecisDict'
        });
        let decisList = [];
        let decisDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < decisDict.length; i++) {
          let decis = decisDict[i];
          decisList.push({
            label: decis.DECIS_NAME,
            value: decis.DECIS
          });
        }
        this.decisList = decisList;
      },
      async fillStotvSearchInfo() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getStotvSearchInfo',
          params: {
            date: this.decis.decisDate
          }
        });
        let stotvSearchInfoList = [];
        let stotvSearchInfoDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < stotvSearchInfoDict.length; i++) {
          let stotvSearchInfo = stotvSearchInfoDict[i];
          stotvSearchInfoList.push({
            label: stotvSearchInfo.stotvName,
            value: stotvSearchInfo.stotvKod,
            id: stotvSearchInfo.stotvId
          });
        }
        this.stotvSearchInfoList = stotvSearchInfoList;
      },

      changeDecisDate() {
        this.stotvSearchInfoList = null;
        if (funcUtils.isNotEmpty(this.decis.decisDate)) {
          this.fillStotvSearchInfo();
        }

        this.store();
      },
      async showDolzModal(visible) {
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: null
            }
          });
          this.dolzModal.sispList = JSON.parse(eventResponse.response).data;
        } else {
          this.dolzModal.sispList = null;
        }
        this.dolzModal.visible = visible;
      },
      async showOrganModal(visible) {
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: null
            }
          });
          this.organModal.gibddList = JSON.parse(eventResponse.response).data;
        } else {
          this.organModal.gibddList = null;
        }
        this.organModal.visible = visible;
      },
      async showOrganNapravModal(visible) {
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: null
            }
          });
          this.organNapravModal.gibddList = JSON.parse(eventResponse.response).data;
        } else {
          this.organNapravModal.gibddList = null;
        }
        this.organNapravModal.visible = visible;
      },

      async changeOrganSostKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.decis.organSostKod) && express.test(this.decis.organSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: this.decis.organSostKod
            }
          });
          let gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
          if (gibddList.length > 0) {
            this.organModal.visible = true;
            this.organModal.gibddList = gibddList;
          } else {
            this.clearOrganSost();
          }
        } else {
          this.clearOrganSost();
        }
      },
      async changeOrganNapravSostKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.decis.organNapravlKod) && express.test(this.decis.organNapravlKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getGibddDict',
            params: {
              organKod: this.decis.organNapravlKod
            }
          });
          let gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
          if (gibddList.length > 0) {
            this.organNapravModal.visible = true;
            this.organNapravModal.gibddList = gibddList;
          } else {
            this.clearOrganNaprav();
          }
        } else {
          this.clearOrganNaprav();
        }
      },
      async changeInspSostKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.decis.inspSostKod) && express.test(this.decis.inspSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getSinspList',
            params: {
              inspKod: this.decis.inspSostKod
            }
          });
          let data = JSON.parse(JSON.parse(eventResponse.response).data);
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data[0];
            this.decis.inspSostId = data.inspId;
            this.decis.inspSostKod = data.inspKod;
            this.decis.inspSostName = data.inspName;
            this.decis.inspSostDolz = data.inspDolz;
            this.decis.inspSostRang = data.inspRang;
            this.decis.organSostId = data.ogaiId;
            this.decis.organSostKod = data.ogaiKod;
            this.decis.organSostName = data.ogaiName;
            debugger;
            this.decis.ogaiSostKod = data.ogaiKod;
            this.store();
          } else {
            this.clearInspSost();
          }
        } else {
          this.clearInspSost();
        }
      },
      changeFIO() {
        let fioLength = 0;
        let fioArr = this.decis.inspSostName.split(' ');
        this.decis.inspSostName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.decis.inspSostName += item;
                break;
              }
              case 1:
              {
                this.decis.inspSostName += ' ' + item;
                break;
              }
              case 2:
              {
                this.decis.inspSostName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspSostKod();
      },

      onSispClick(data) {
        this.decis.inspSostId = data.inspId;
        this.decis.inspSostKod = data.inspKod;
        this.decis.inspSostName = data.inspName;
        this.decis.inspSostDolz = data.inspDolz;
        this.decis.inspSostRang = data.inspRang;
        this.decis.organSostId = data.ogaiId;
        this.decis.organSostKod = data.organKod;
        this.decis.organSostName = data.ogaiName;
        debugger;
        this.decis.ogaiSostKod = data.ogaiKod;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.store();
      },
      onGibddClick(data) {
        this.decis.organSostId = data.ID;
        this.decis.organSostKod = data.ORGAN_KOD;
        this.decis.organSostName = data.ORGAN_NAME;
        debugger;
        this.decis.ogaiSostKod = data.OGAI_KOD;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
        this.store();
      },
      onOrganNapravlick(data) {
        this.decis.organNapravlId = data.ID;
        this.decis.organNapravlKod = data.ORGAN_KOD;
        this.decis.organNapravlName = data.ORGAN_NAME;
        this.organNapravModal.gibddList = null;
        this.organNapravModal.visible = false;
        this.store();
      },

      clearInspSostKod() {
        this.decis.inspSostId = null;
        this.decis.inspSostKod = null;
        this.store();
      },
      clearInspSost() {
        this.decis.inspSostId = null;
        this.decis.inspSostKod = null;
        this.decis.inspSostName = null;
        this.decis.inspSostDolz = null;
        this.decis.inspSostRang = null;
        this.store();
      },
      clearOrganSost() {
        this.decis.organSostId = null;
        this.decis.organSostKod = null;
        this.decis.organSostName = null;
        this.decis.ogaiSostKod = null;
        this.store();
      },

      clearOrganNaprav() {
        this.decis.organNapravlId = null;
        this.decis.organNapravlKod = null;
        this.decis.organNapravlName = null;
        this.store();
      },

      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.decis
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
      async getPlaceDecis() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getPlaceDecisCID'
        });
        let cid = JSON.parse(eventResponse.response).data;

        formStack.toNext({
          module: this.$store.state.placeViewEdit,
          vm: this,
          notRemoved: false,
          withCreate: false,
          cid: cid
        });
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
</script>

<style scoped>

</style>
