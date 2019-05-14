<template>
  <div v-if="data">
    <div class="adm-form__container">
      <h2 id="data-source" class="adm-form__headding">Сведения об источнике данных</h2>
      <div class="adm-form__content">
        <div class="adm-form__item">
          <small class="adm-form__label">Тип источника</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col>
              <Select class="wmax240 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.vsTypeId" clearable @on-change="storeElementData">
                <Option class="wmax360 " v-for="item in violSourceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div v-if="data.vsTypeId === 1" class="adm-form__item">
          <small class="adm-form__label">Фамилия</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col>
              <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.vsFlFirstName"
                            :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я]+', placeholder: ''}"
                            @onInputChange="storeElementData"></masked-input>
            </Col>
          </Row>
        </div>
        <div v-if="data.vsTypeId === 1" class="adm-form__item">
          <small class="adm-form__label">Имя</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col>
              <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.vsFlSecondName"
                            :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я]+', placeholder: ''}"
                            @onInputChange="storeElementData"></masked-input>
            </Col>
          </Row>
        </div>
        <div v-if="data.vsTypeId === 1" class="adm-form__item">
          <small class="adm-form__label">Отчество</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col>
              <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.vsFlThirdName"
                            :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я]+', placeholder: ''}"
                            @onInputChange="storeElementData"></masked-input>
            </Col>
          </Row>
        </div>
        <div v-if="data.vsTypeId === 1" class="adm-form__item">
          <small class="adm-form__label">Пол</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Select class="adm-input adm-input--regular wmin180 wmax240" placeholder="" v-model="data.vsFlSex" clearable filterable @on-change="storeElementData">
                  <Option class="" v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>

        <div v-if="data.vsTypeId !== 1" class="adm-form__item">
          <small class="adm-form__label">Наименование</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.vsName" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Входящий №</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.vsIncomingNumber" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Дата обращения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.vsIncomingDate" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>

    <div class="adm-form__container">
      <h2 id="owner-details" class="adm-form__headding">Сведения о владельце разрешения</h2>
      <div class="adm-form__content">
        <div class="adm-form__item">
          <small class="adm-form__label">Статус держателя лицензии</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col span="10">
              <Select class="wmax240 wmin180 adm-input adm-input--regular" placeholder="" v-model="data.status" clearable @on-change="storeElementData">
                <Option class="wmax360 " v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="6">
              <Button @click="ownerToLicense" type="text" style="outline: 0!important; box-shadow: none; padding: 0 5px;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                <Icon type="md-key" title="" :size="30" />
              </Button>
            </Col>
          </Row>
        </div>
        <slot></slot>
      </div>
    </div>
    <div class="adm-form__container">
      <h2 id="permission-details" class="adm-form__headding">Сведения о разрешении</h2>
      <div class="adm-form__content">
        <div class="adm-form__item">
          <small class="adm-form__label">Номер разрешения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.tlNumber" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Дата начала срока действия</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.tlDateBeg" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Дата окончания срока действия</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.tlDateEnd" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Организация, выдавшая разрешение такси</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="24" :lg="24">
                <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.tlLicensor" ></Input>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";
  import wizardItemProtFourMethods from "~/components/mixins/prot/wizardItemProtFourMethods";

  export default {
    name: "WizardItemDefinitionTaxiFour",
    mixins: [wizardItemProtFourMethods],
    components: {
      MaskedInput: () => import('~/components/shared/MaskedInput'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask')
    },
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        violSourceTypeList: null,
        statusList: null,
        sexList: [
          {
            label: 'Мужской',
            value: 'М'
          },
          {
            label: 'Женский',
            value: 'Ж'
          },
        ],
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
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          await this.fillViolSourceTypeList();
          await this.fillStatusList();

          this.data = data;
        }
      },

      async fillViolSourceTypeList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getViolSourceTypeDict',
            data: null
          }
        });
        let violSourceTypeList = [];
        let violSourceTypeDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < violSourceTypeDict.length; i++) {
          let violSourceType = violSourceTypeDict[i];
          violSourceTypeList.push({
            label: violSourceType.NAME,
            value: violSourceType.ID
          });
        }
        this.violSourceTypeList = violSourceTypeList;
      },
      async fillStatusList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getStatusDict',
            data: null
          }
        });
        let statusList = [];
        let statusDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < statusDict.length; i++) {
          let status = statusDict[i];
          statusList.push({
            label: status.UCHAST_STATUS_NAME,
            value: status.UCHAST_STATUS
          });
        }
        this.statusList = statusList;
      },

      async storeElementData() {
        return new Promise((resolve, reject) => {
          this.$emit('storeElementData', {
            eCID: this.info.eCID,
            data: this.data,
            resolve: resolve
          });
        });
      },
    }
  }
</script>

<style scoped>

</style>
