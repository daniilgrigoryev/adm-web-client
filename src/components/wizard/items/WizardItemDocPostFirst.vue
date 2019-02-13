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

    <div v-if="organModal.visible" class="modal dolz" style="position: absolute; background: black; color: white; z-index: 99; top: 0; left: 0; right: 0; bottom: 0;">
      <button type="button" @click="showOrganModal(false)" style="width: 20px; height: 20px; background: white;"></button>

      <div style="height: 40vh; width: 50vw; overflow-y: auto;">
        <table>
          <thead>
          <tr>
            <td>Код органа</td>
            <td>Код региона</td>
            <td>Регион</td>
            <td>Район</td>
            <td>Тип</td>
            <td>Название</td>
            <td>Контакты</td>
            <td>Адрес</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in organModal.gibddList" :key="index" @dblclick="onGibddClick(item)">
            <td>{{item.ORGAN_KOD}}</td>
            <td>{{item.RESP_KOD}}</td>
            <td>{{item.REGION_NAME}}</td>
            <td>{{item.RAYON_NAME}}</td>
            <td>{{item.TIP}}</td>
            <td>{{item.ORGAN_NAME}}</td>
            <td>{{item.CONTACTS}}</td>
            <td>{{item.KA_ADR_FULL}}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

    <Form :label-width="200" abel-position="right">
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Номер постановления</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.docN" @on-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
          <Col :xs="24" :sm="6" :md="6" :lg="8">
            <a href="#" @click="createNewUIN" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Получить уникальный номер</a>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Уникальный номер правонарушения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.apn" @on-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Уникальный номер дела</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input :disabled="data.deloN !== null" @on-change="storeElementData" v-model="data.deloN" placeholder="Enter something..."></Input>
          </Col>
          <Col :xs="24" :sm="6" :md="6" :lg="8">
            <a href="#" :disabled="data.deloN !== null" @click="createNewDeloNum" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Получить уникальный номер</a>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата и Время вынесения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <DatePicker type="datetime" v-model="data.dateSost" format="dd-MM-yyyy HH:mm" @on-change="storeElementData" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
          </Col>
        </Row>
      </FormItem>
    </Form>

    <hr class="txt-hr my24">

    <Form :label-width="200" abel-position="right">
      <h2 class="adm-text-big color-dark-light my12">Составил</h2>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Личный номер сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.inspSostKod" search @on-search="changeInspSostKod" placeholder="Enter something..."></Input>
          </Col>
          <Col :xs="24" :sm="6" :md="6" :lg="8">
            <a href="#" @click="showDolzModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник сотрудников</a>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ФИО сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.inspSostName" @on-change="changeFIO" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Должность сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.inspSostDolz" @on-change="clearInspSostKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Звание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.inspSostRang" @on-change="clearInspSostKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Код подразделения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.organSostKod" search @on-search="changeOrganSostKod" placeholder="Enter something..."></Input>
          </Col>
          <Col :xs="24" :sm="6" :md="6" :lg="8">
            <a href="#" @click="showOrganModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Уполномеченные органы</a>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Подразделение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.organSostName" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
    name: "WizardItemDocPostFirst",
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
        organModal: {
          visible: false,
          gibddList: null
        }
      }
    },
    methods: {
      async initData() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getElementData',
          params: {
            eCID: this.info.eCID
          }
        });
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);

        if (funcUtils.isNotEmpty(this.data.dateSost)) {
          this.data.dateSost = new Date(this.data.dateSost);
        }
      },

      async createNewUIN() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'createNewUIN',
            data: null
          }
        });
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);

        if (funcUtils.isNotEmpty(this.data.dateSost)) {
          this.data.dateSost = new Date(this.data.dateSost);
        }
        this.storeElementData();
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
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);

        if (funcUtils.isNotEmpty(this.data.dateSost)) {
          this.data.dateSost = new Date(this.data.dateSost);
        }
        this.storeElementData();
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
      async showOrganModal(visible) {
        this.organModal.visible = visible;
        if (visible) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getGibddDict',
              data: JSON.stringify({
                organKod: null
              })
            }
          });
          this.organModal.gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
        } else {
          this.organModal.gibddList = null;
        }
      },

      async changeOrganSostKod() {
        let express = /^\d+$/;
        if (funcUtils.isNotEmpty(this.data.organSostKod) && express.test(this.data.organSostKod)) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getGibddDict',
              data: JSON.stringify({
                organKod: this.data.organSostKod
              })
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
        this.storeElementData();
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
              case 0: {
                this.data.inspSostName += item;
                break;
              }
              case 1: {
                this.data.inspSostName += ' ' + item;
                break;
              }
              case 2: {
                this.data.inspSostName += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.clearInspSostKod();
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
      onGibddClick(data) {
        this.data.organSostId = data.ID;
        this.data.organSostKod = data.ORGAN_KOD;
        this.data.organSostName = data.ORGAN_NAME;
        this.organModal.gibddList = null;
        this.organModal.visible = false;
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
      clearOrganSost() {
        this.data.organSostId = null;
        this.data.organSostKod = null;
        this.data.organSostName = null;
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
