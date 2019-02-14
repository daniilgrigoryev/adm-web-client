<template>
  <div v-if="data">
    <div v-if="dolzModal.visible" class="modal dolz" style="position: absolute; background: black; color: white; z-index: 99; top: 0; left: 0; right: 0; bottom: 0;">
      <button type="button" @click="showDolzModal(false)" style="width: 20px; height: 20px; background: white;"></button>

      <div style="height: 40vh; width: 50vw; overflow-y: auto;">
        <table>
          <thead>
          <tr>
            <td>Нагрудный знак</td>
            <td>ФИО</td>
            <td>Должность</td>
            <td>Звание</td>
            <td>Код подразделения</td>
            <td>Подразделение</td>
            <td>Отдел</td>
            <td>Телефон</td>
            <td>Дата начала действия</td>
            <td>Дата окончания действия</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in dolzModal.sispList" :key="index" @dblclick="onSispClick(item)">
            <td>{{item.inspKod}}</td>
            <td>{{item.inspName}}</td>
            <td>{{item.inspDolz}}</td>
            <td>{{item.inspRang}}</td>
            <td>{{item.organKod}}</td>
            <td>{{item.ogaiName}}</td>
            <td>{{item.otdName}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.dateBeg}}</td>
            <td>{{item.dateEnd}}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

    <div v-if="sudModal.visible" class="modal dolz" style="position: absolute; background: black; color: white; z-index: 99; top: 0; left: 0; right: 0; bottom: 0;">
      <button type="button" @click="showSudModal(false)" style="width: 20px; height: 20px; background: white;"></button>

      <div style="height: 40vh; width: 50vw; overflow-y: auto;">
        <table>
          <thead>
          <tr>
            <td>Код органа</td>
            <td>Название</td>
            <td>Тип</td>
            <td>Код региона</td>
            <td>Регион</td>
            <td>Адрес</td>
            <td>Контакты</td>
            <td>Район</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in sudModal.sudList" :key="index" @dblclick="onSudClick(item)">
            <td>{{item.ORGAN_KOD}}</td>
            <td>{{item.ORGAN_NAME}}</td>
            <td>{{item.TIP}}</td>
            <td>{{item.RESP_KOD}}</td>
            <td>{{item.REGION_NAME}}</td>
            <td>{{item.KA_ADR_FULL}}</td>
            <td>{{item.CONTACTS}}</td>
            <td>{{item.REGION_NAME}}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

    <div v-if="deloModal.visible" class="modal dolz" style="position: absolute; background: black; color: white; z-index: 99; top: 0; left: 0; right: 0; bottom: 0;">
      <button type="button" @click="showDeloModal(false)" style="width: 20px; height: 20px; background: white;"></button>

      <RadioGroup v-model="deloModal.paramKey">
        <Radio label="deloNum">По номеру дела</Radio>
        <Radio label="postNum">По номеру постановления</Radio>
      </RadioGroup>

      <Input v-model="deloModal.paramValue" @on-input-change="changeDeloValue" placeholder="Enter something..."></Input>

      <Button @click="findDeloList" :disabled="!deloModal.paramKey || !deloModal.paramValue" type="primary" class="ml12">Поиск</Button>

      <Select v-if="deloModal.deloList" class="wmax240 wmin180" placeholder="" filterable @on-change="onDeloSelect">
        <Option class="wmax360 txt-break-word" v-for="item in deloModal.deloList" :value="item.value.delo" :key="item.value.id">{{ item.label }}</Option>
      </Select>

    </div>

    <Form :label-width="180" abel-position="right">
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Номер постановления</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="data.docN" @on-input-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="createProtNum" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Получить уникальный номер</a>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Уникальный номер дела</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input :disabled="data.deloN !== null" @on-input-change="storeElementData" v-model="data.deloN" placeholder="Enter something..."></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" :disabled="data.deloN !== null" @click="createNewDeloNum" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Получить уникальный номер</a>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата и Время вынесения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker type="datetime" v-model="data.dateSost" format="dd-MM-yyyy HH:mm" @on-change="storeElementData" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Личный номер сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="data.inspSostKod" @on-input-change="changeInspSostKod" placeholder="Enter something..."></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showDolzModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник сотрудников</a>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ФИО сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="data.inspSostName" @on-input-change="changeFIO" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Должность сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="data.inspSostDolz" @on-input-change="clearInspSostKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Звание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="data.inspSostRang" @on-input-change="clearInspSostKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Код подразделения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="data.organSostKod" disabled placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Подразделение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="data.organSostName" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Статья ответственности</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="stotv" disabled placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Орган рассмотрения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="data.organRasmName" disabled placeholder="Enter something..."></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showSudModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник судов</a>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата и Время рассмотрения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker type="datetime" v-model="data.dateRasm" format="dd-MM-yyyy HH:mm" @on-change="storeElementData" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дело - основание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input v-model="mainDelo" disabled placeholder="Enter something..."></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showDeloModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник</a>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemDocProt2025",
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        dolzModal: {
          visible: false,
          sispList: null
        },
        sudModal: {
          visible: false,
          sudList: null
        },
        deloModal: {
          visible: false,
          paramKey: 'deloNum',
          paramValue: null,
          deloList: null
        },
      }
    },
    computed: {
      stotv() {
        if (funcUtils.isNotEmpty(this.data.stotvKod) && funcUtils.isNotEmpty(this.data.stotvName)) {
          return this.data.stotvKod + ', ' + this.data.stotvName;
        }
        return '';
      },
      mainDelo() {
        if (funcUtils.isNotEmpty(this.data.mainDeloN) && funcUtils.isNotEmpty(this.data.mainDeloDate)) {
          return this.data.mainDeloN + ' от ' + funcUtils.parseDateTime(this.data.mainDeloDate, 'DD.MM.YYYY');
        }
        return '';
      },
    },
    methods: {
      async initData() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getElementData',
          params: {
            eCID: this.info.eCID
          }
        });
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.data = data;
          if (funcUtils.isNotEmpty(this.data.dateSost)) {
            this.data.dateSost = new Date(this.data.dateSost);
          }

          if (funcUtils.isNotEmpty(this.data.dateRasm)) {
            this.data.dateRasm = new Date(this.data.dateRasm);
          }

          if (funcUtils.isNotEmpty(this.data.mainDeloDate)) {
            this.data.mainDeloDate = new Date(this.data.mainDeloDate);
          }
        }
      },

      async createProtNum() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'createProtNum',
            data: null
          }
        });
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.data = data;
          if (funcUtils.isNotEmpty(this.data.dateSost)) {
            this.data.dateSost = new Date(this.data.dateSost);
          }

          if (funcUtils.isNotEmpty(this.data.dateRasm)) {
            this.data.dateRasm = new Date(this.data.dateRasm);
          }

          if (funcUtils.isNotEmpty(this.data.mainDeloDate)) {
            this.data.mainDeloDate = new Date(this.data.mainDeloDate);
          }
        }
      },
      async createNewDeloNum() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'createDeloNum',
            data: null
          }
        });
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.data = data;
          if (funcUtils.isNotEmpty(this.data.dateSost)) {
            this.data.dateSost = new Date(this.data.dateSost);
          }

          if (funcUtils.isNotEmpty(this.data.dateRasm)) {
            this.data.dateRasm = new Date(this.data.dateRasm);
          }

          if (funcUtils.isNotEmpty(this.data.mainDeloDate)) {
            this.data.mainDeloDate = new Date(this.data.mainDeloDate);
          }
        }
      },

      async showDolzModal(visible) {
        this.dolzModal.visible = visible;
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSinspList',
              data: JSON.stringify({
                inspKod: null
              })
            }
          });
          this.dolzModal.sispList = JSON.parse(JSON.parse(eventResponse.response).data);
        } else {
          this.dolzModal.sispList = null;
        }
      },
      async showSudModal(visible) {
        this.sudModal.visible = visible;
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSudDict',
              data: null
            }
          });
          this.sudModal.sudList = JSON.parse(JSON.parse(eventResponse.response).data);
        } else {
          this.sudModal.sudList = null;
        }
      },
      async showDeloModal(visible) {
        this.deloModal.visible = visible;
        this.deloModal.deloList = null;
        this.deloModal.paramValue = null;
      },

      changeDeloValue() {
        let express = /^\d+$/;
        if (funcUtils.isEmpty(this.deloModal.paramValue) || !express.test(this.deloModal.paramValue)) {
          this.deloModal.paramValue = null;
          this.deloModal.deloList = null;
        }
      },
      async changeInspSostKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.data.inspSostKod) && express.test(this.data.inspSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSinspList',
              data: JSON.stringify({
                inspKod: this.data.inspSostKod
              })
            }
          });
          let data = JSON.parse(JSON.parse(eventResponse.response).data);
          if (funcUtils.isNotEmpty(data) && data.length > 0) {
            data = data[0];
            this.data.inspSostId = data.inspId;
            this.data.inspSostKod = data.inspKod;
            this.data.inspSostName = data.inspName;
            this.data.inspSostDolz = data.inspDolz;
            this.data.inspSostRang = data.inspRang;
            this.data.organSostId = data.ogaiId;
            this.data.organSostKod = data.organKod;
            this.data.organSostName = data.ogaiName;
          } else {
            this.clearInspSost();
          }
        } else {
          this.clearInspSost();
        }
        this.storeElementData();
      },

      changeFIO() {
        let fioLength = 0;
        let fioArr = this.data.inspSostName.split(' ');
        this.data.inspSostName = '';
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0:
              {
                this.data.inspSostName += item;
                break;
              }
              case 1:
              {
                this.data.inspSostName += ' ' + item;
                break;
              }
              case 2:
              {
                this.data.inspSostName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspSostKod();
      },

      async findDeloList() {
        if (funcUtils.isNotEmpty(this.deloModal.paramValue) && this.deloModal.paramValue.length > 0) {
          let methodName;
          let params = {};
          params[this.deloModal.paramKey] = this.deloModal.paramValue;
          if (this.deloModal.paramKey === 'deloNum') {
            methodName = 'findDeloListByNum';
          } else if (this.deloModal.paramKey === 'postNum') {
            methodName = 'findDeloListByPostNum';
          }
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: methodName,
              data: JSON.stringify(params)
            }
          });
          let deloList = [];
          let deloDict = JSON.parse(JSON.parse(eventResponse.response).data);
          for (let i = 0; i < deloDict.length; i++) {
            let delo = deloDict[i];
            let label;
            if (funcUtils.isNotEmpty(delo.date) && delo.date > 0) {
              label = delo.num + ' от ' + funcUtils.parseDateTime(delo.date, 'DD/MM/YYYY');
            } else {
              label = delo.num;
            }
            deloList.push({
              label: label,
              value: {
                id: delo.id,
                delo: JSON.stringify(delo)
              },
            });
          }
          this.deloModal.deloList = deloList;
        }
      },

      onDeloSelect(e) {
        if (funcUtils.isNotEmpty(e)) {
          let delo = JSON.parse(e);
          this.data.mainDeloId = delo.id;
          this.data.mainDeloN = delo.num;
          this.data.mainDeloDate = new Date(delo.date);
          this.deloModal.visible = false;
          this.deloModal.deloList = null;
        }
        this.storeElementData();
      },

      onSudClick(data) {
        this.data.organRasmId = data.ID;
        this.data.organRasmKod = data.ORGAN_KOD;
        this.data.organRasmName = data.ORGAN_NAME;
        this.sudModal.visible = false;
        this.sudModal.sudList = null;
        this.storeElementData();
      },

      onSispClick(data) {
        this.data.inspSostId = data.inspId;
        this.data.inspSostKod = data.inspKod;
        this.data.inspSostName = data.inspName;
        this.data.inspSostDolz = data.inspDolz;
        this.data.inspSostRang = data.inspRang;
        this.data.organSostId = data.ogaiId;
        this.data.organSostKod = data.organKod;
        this.data.organSostName = data.ogaiName;
        this.dolzModal.visible = false;
        this.dolzModal.sispList = null;
        this.storeElementData();
      },

      clearInspSostKod() {
        this.data.inspSostId = null;
        this.data.inspSostKod = null;
        this.storeElementData();
      },
      clearInspSost() {
        this.data.inspSostId = null;
        this.data.inspSostKod = null;
        this.data.inspSostName = null;
        this.data.inspSostDolz = null;
        this.data.inspSostRang = null;
        this.storeElementData();
      },

      storeElementData() {
        this.$emit('storeElementData', {
          eCID: this.info.eCID,
          data: this.data
        });
      },
    }
  }
</script>

<style scoped>

</style>
