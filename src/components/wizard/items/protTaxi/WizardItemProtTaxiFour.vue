<template>
  <div v-if="data">
    <div class="adm-form__container">
      <h2 id="nar" class="adm-form__headding">Сведения о нарушении</h2>
      <div class="adm-form__content">
        <slot name="wizard-item-prot-three"/>
        <div class="adm-form__item">
          <small class="adm-form__label">Пункт НПА</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="22" :lg="22">
                <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.pnpaId" clearable filterable @on-change="storeElementData" :filterMethod="filterStotv">
                  <Option class="" v-for="item in pnpaList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                </CustomSelect>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Статья КРФоАП</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="22" :lg="22">
                <CustomSelect class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.stotvId" clearable filterable @on-change="changeStotvSearchInfo" :filterMethod="filterStotv">
                  <Option class="" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
                </CustomSelect>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item" v-if="KBKSearchInfoList">
          <small class="adm-form__label">КБК</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.kbk" clearable filterable :disabled="!data.stotvId" @on-change="storeElementData">
                <Option class="wmax360 " v-for="item in KBKSearchInfoList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
              </CustomSelect>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Фактические сведения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="22" :lg="22">
                <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.factSved" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Дополнительные сведения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="22" :lg="22">
                <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.dopSved" ></Input>
              </Col>
            </Row>
          </div>
        </div>
        <list-items-docs :items="data.annexesList" title="Список приложений" @change="storeElementData"></list-items-docs>
      </div>
    </div>
    <div class="adm-form__container">
      <h2 id="owner-details" class="adm-form__headding">Сведения о владельце разрешения</h2>
      <div class="adm-form__content">
        <div class="adm-form__item">
          <small class="adm-form__label">Статус держателя лицензии</small>
          <Row type="flex" align="middle">
            <Col span="12">
              <CustomSelect class="adm-input adm-input--regular wmax360 wmin180" ref="city" placeholder="" v-model="data.status" filterable clearable @on-change="storeElementData">
                <Option class="" v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </CustomSelect>
            </Col>
            <Col span="4">
              <button @click="ownerToLicense" class="adm-form__icon-button" type="button">
                <img :src="require('~/assets/images/copyData.png')" alt="Скопировать данные владельца">
              </button>
            </Col>
          </Row>
        </div>
        <slot name="owner-details"/>
      </div>
    </div>
    <div class="adm-form__container">
      <h2 id="permission-details" class="adm-form__headding">Сведения о разрешении</h2>
      <div class="adm-form__content">
        <div class="adm-form__item">
          <small class="adm-form__label">Номер разрешения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <masked-input inputClass="adm-input adm-input--regular" v-model="data.tlNumber" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="storeElementData" ></masked-input>
            </Col>
          </Row>
        </div>

        <div class="adm-form__item">
          <small class="adm-form__label">Дата начала действия</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.tlDateBeg" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
            </Col>
          </Row>
        </div>

        <div class="adm-form__item">
          <small class="adm-form__label">Дата окончания действия</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.tlDateEnd" @change="storeElementData" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
            </Col>
          </Row>
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
    name: "WizardItemProtFour",
    mixins: [wizardItemProtFourMethods],
    props: {
      info: Object
    },
    components: {
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        statusList: null,
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
          await this.fillPnpaList();
          await this.fillStotvSearchInfo();
          await this.fillStatusList();

          this.data = data;
        }

        if (funcUtils.isNotEmpty(this.data.stotvId)) {
          this.fillKBKSearchInfo();
        }
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
