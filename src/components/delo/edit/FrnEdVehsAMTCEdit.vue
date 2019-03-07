<template>
  <div v-if="vehsAMTC">
    <Button @click="getPrev" type="text">Назад</Button>
    <Button @click="save" type="text">Сохранить</Button>

    <div class="adm-form">

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ГРЗ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.regno"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Марка ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.markaAvto"
                    clearable @on-clear="changeMarkaAvto" @on-change="changeMarkaAvto" filterable>
              <Option v-for="item in markAvtoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Модель ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.modavtoName"
                    clearable @on-change="store" :disabled="!isNotEmptyMarkId()" filterable>
              <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Модификация</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.modifavtoName"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">VIN</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.vin"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">№ кузова</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.nkuzov"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">№ шасси</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.nshasi"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Экологический класс</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.motorEcologClass"
                    clearable @on-clear="store" @on-change="store" filterable>
              <Option v-for="item in motorEcologClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Масса без нагрузки</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.massa"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Максимальная масса</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.massaMax"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Год выпуска</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <!--<Input class="adm-input adm-input&#45;&#45;regular" v-model="vehsAMTC.yearVyp"></Input>-->
            <input-mask v-model="vehsAMTC.yearVyp" :maskProps="maskInputYearVyp" inputClass="adm-input adm-input--regular" clearable></input-mask>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Цвет</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.color"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Тип</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.tiptcKod"
                    clearable @on-change="store" filterable>
              <Option v-for="item in typeTCList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Тип кузова ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.tipkuzKod"
                    clearable @on-change="store" filterable>
              <Option v-for="item in kuzovTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Категория ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.katcKod"
                    clearable @on-clear="store" @on-change="store" filterable>
              <Option v-for="item in categoryTCList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Тип мотора ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.motorTip"
                    clearable @on-clear="store" @on-change="store" filterable>
              <Option v-for="item in motorTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <hr />

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">СТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.ctc"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ПТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.ptcN"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата выдачи ПТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="vehsAMTC.ptcDate" format="dd-MM-yyyy" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Кем выдан ПТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.ptcKemVydan"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">№ ОСАГО</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="vehsAMTC.osagoN"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата выдачи ОСАГО</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="vehsAMTC.osagoDate" format="dd-MM-yyyy" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата окончания ОСАГО</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePicker class="adm-input adm-input--regular wmin120 wmax180" type="datetime" v-model="vehsAMTC.osagoSrok" format="dd-MM-yyyy" @on-change="store" placeholder="Select date"></DatePicker>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Кем выдан ОСАГО</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.osagoKemVydanId"
                    clearable @on-clear="store" @on-change="store" filterable>
              <Option v-for="item in osagoCompanyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
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
  import InputMask from "../../InputMask";

  export default {
    name: "FrnEdVehsAMTCEdit",
    components: {
      InputMask
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frnEdVehsAMTCEditSetCid', current.cid);
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
        let vehsAMTC = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(vehsAMTC)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.parseDate(vehsAMTC);
          this.vehsAMTC = vehsAMTC;

          await this.fillKuzovTypeList();
          await this.fillMarkAvtoList();
          await this.fillMotorTypeList();
          await this.fillMotorEcologClassList();
          await this.fillCategoryTCList();
          await this.fillTypeTCList();
          await this.fillOsagoCompanyList();
          if (this.isNotEmptyMarkId()) {
            await this.fillModelList();
          }
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frnEdVehsAMTCEditSetCid', null);
      this.$store.dispatch('frnEdVehsAMTCEditSetData', null);
    },
    data() {
      return {
        vehsAMTC: null,
        markAvtoList: null,
        kuzovTypeList: null,
        motorTypeList: null,
        motorEcologClassList: null,
        categoryTCList: null,
        modelList: null,
        osagoCompanyList: null,
        typeTCList: null,
        maskInputYearVyp: {
          alias: "datetime",
          inputFormat: 'yyyy'
        },
      }
    },
    methods: {
      parseDate(data) {
        data.ptcDate = funcUtils.convertNumberToDate(data.ptcDate);
        data.osagoDate = funcUtils.convertNumberToDate(data.osagoDate);
        data.osagoSrok = funcUtils.convertNumberToDate(data.osagoSrok);
      },
      async fillMarkAvtoList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getMarkAvtoDictionary'
        });
        let markAvtoList = [];
        let markAvtoDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < markAvtoDict.length; i++) {
          let markAvto = markAvtoDict[i];
          markAvtoList.push({
            label: markAvto.MARKA_AVTO,
            value: markAvto.MARKA_AVTO
          });
        }
        this.markAvtoList = markAvtoList;
      },
      async fillKuzovTypeList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getKuzovTypeDictionary'
        });
        let kuzovTypeList = [];
        let kuzovTypeDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < kuzovTypeDict.length; i++) {
          let kuzovType = kuzovTypeDict[i];
          kuzovTypeList.push({
            label: kuzovType.TIPKUZ_NAME,
            value: kuzovType.TIPKUZ_KOD
          });
        }
        this.kuzovTypeList = kuzovTypeList;
      },
      async fillModelList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getModelListByMark',
          params: {
            markName: this.vehsAMTC.markaAvto
          }
        });
        let modelList = [];
        let modelDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < modelDict.length; i++) {
          let model = modelDict[i];
          modelList.push({
            label: model.modName,
            value: model.modName // id
          });
        }
        this.modelList = modelList;
      },
      async fillMotorTypeList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getMotorTipDictionary'
        });
        let motorTypeList = [];
        let motorTypeDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < motorTypeDict.length; i++) {
          let motorType = motorTypeDict[i];
          motorTypeList.push({
            label: motorType.TIPMOTOR,
            value: motorType.TIPMOTOR
          });
        }
        this.motorTypeList = motorTypeList;
      },
      async fillMotorEcologClassList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getMotorEcologClassDictionary'
        });
        let motorEcologClassList = [];
        let motorEcologClassDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < motorEcologClassDict.length; i++) {
          let motorEcologClass = motorEcologClassDict[i];
          motorEcologClassList.push({
            label: motorEcologClass.ECOLOG_CLASS,
            value: motorEcologClass.ECOLOG_CLASS
          });
        }
        this.motorEcologClassList = motorEcologClassList;
      },
      async fillCategoryTCList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getKategTcDictionary'
        });
        let categoryTCList = [];
        let categoryTCDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < categoryTCDict.length; i++) {
          let categoryTC = categoryTCDict[i];
          categoryTCList.push({
            label: categoryTC.KATC_NAME,
            value: categoryTC.KATC_KOD
          });
        }
        this.categoryTCList = categoryTCList;
      },
      async fillOsagoCompanyList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getOsagoCompanyDictionary'
        });
        let osagoCompanyList = [];
        let osagoCompanyDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < osagoCompanyDict.length; i++) {
          let osagoCompany = osagoCompanyDict[i];
          osagoCompanyList.push({
            label: osagoCompany.COMPANY_FULL_NAME,
            value: osagoCompany.COMPANY_ID
          });
        }
        this.osagoCompanyList = osagoCompanyList;
      },
      async fillTypeTCList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getTipTcDictionary'
        });
        let typeTCList = [];
        let typeTCDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < typeTCDict.length; i++) {
          let typeTC = typeTCDict[i];
          typeTCList.push({
            label: typeTC.TIPTC_NAME,
            value: typeTC.TIPTC_KOD
          });
        }
        this.typeTCList = typeTCList;
      },
      async changeMarkaAvto() {
        this.modelList = null;
        this.vehsAMTC.modavtoName = null;
        if (this.isNotEmptyMarkId()) {
          await this.fillModelList();
        }
        this.store();
      },
      isNotEmptyMarkId() {
        return funcUtils.isNotEmpty(this.vehsAMTC.markaAvto);
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.vehsAMTC
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
</script>

<style scoped>

</style>
