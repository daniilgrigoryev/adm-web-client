<template>
  <div v-if="data">
    <div class="adm-form__container">
      <h2 class="adm-form__headding" id="tc">Транспортное средство</h2>
      <div class="adm-form__content">
        
            <div class="adm-form__item">
              <small class="adm-form__label">ГРЗ</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="16">
                    <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.regno"
                                  @onInputChange="storeElementData" placeholder="ГРЗ"
                                  :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', casing: 'upper', placeholder: ''}"
                                  clearable></masked-input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-form__label">VIN</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="16">
                    <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.vin"
                                  :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', placeholder: '', casing: 'upper'}"
                                  @onInputChange="storeElementData"></masked-input>
                  </Col>
                </Row>
              </div>
            </div>
          
        
            <div class="adm-form__item">
              <small class="adm-form__label">Марка</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="16">
                    <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.markaAvto"
                            clearable @on-clear="changeMarkaAvto" @on-change="changeMarkaAvto" filterable>
                      <Option v-for="item in markAvtoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-form__label">Модель</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="16">
                    <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.modavtoName"
                            clearable @on-change="storeElementData" :disabled="!isNotEmptyMarkId()" filterable>
                      <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
          
        
            <div class="adm-form__item">
              <small class="adm-form__label">СТС</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="16">
                    <!-- TODO -->
                    <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.regdoc"
                                  :maskProps="{casing: 'upper', regex: '[a-zA-Zа-яА-Я0-9]+', placeholder: ''}"
                                  @onInputChange="storeElementData"></masked-input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-form__label">Цвет</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="16">
                    <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="data.color" :maskProps="{regex: '[а-яА-Я0-9 .-]+', placeholder: '', casing: 'upper'}" @onInputChange="storeElementData"></masked-input>
                  </Col>
                </Row>
              </div>
            </div>


        <div class="adm-form__item">
          <small class="adm-form__label">Категория</small>
          <div class="adm-form__item_content">
            <Row type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="24">
                <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.katcKod"
                        clearable @on-change="storeElementData" filterable>
                  <Option v-for="item in categoryTCList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Тип</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.tiptcKod"
                        clearable @on-change="changeTipTc" filterable>
                  <Option v-for="item in typeTCList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Тип кузова ТС</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.tipkuzKod"
                        :disabled="!isNotEmptyTipTcKod()" clearable @on-change="storeElementData" filterable>
                  <Option v-for="item in kuzovTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Col>
            </Row>
          </div>
        </div>

        <div class="adm-form__item">
          <small class="adm-form__label">Владелец</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="22" :lg="22">
                <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.ownerTip" clearable @on-change="storeElementData" filterable>
                  <Option v-for="item in ownerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
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

  export default {
    name: "WizardItemVehs",
    components: {
      MaskedInput: () => import('~/components/shared/MaskedInput')
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
        markAvtoList: null,
        kuzovTypeList: null,
        categoryTCList: null,
        typeTCList: null,
        modelList: null,
        ownerList: [{
          label: 'ЛВОК',
          value: 1
        },
          {
            label: 'Другое лицо',
            value: 2
          }
        ]
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

        if (this.isNotEmptyTipTcKod()) {
          await this.fillKuzovTypeList();
        }
        await this.fillMarkAvtoList();
        await this.fillCategoryTCList();
        await this.fillTypeTCList();
        if (this.isNotEmptyMarkId()) {
          await this.fillModelList();
        }
      },
      async fillMarkAvtoList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getMarkAvtoDictionary',
            data: null
          }
        });
        let markAvtoList = [];
        let markAvtoDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < markAvtoDict.length; i++) {
          let markAvto = markAvtoDict[i];
          markAvtoList.push({
            label: markAvto.MARKA_AVTO,
            value: markAvto.MARKA_AVTO // MARK_ID
          });
        }
        this.markAvtoList = markAvtoList;
      },
      async fillKuzovTypeList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getKuzovTypeDictionary',
            data: JSON.stringify({
              tipTcKod: this.data.tiptcKod
            })
          }
        });
        let kuzovTypeList = [];
        let kuzovTypeDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < kuzovTypeDict.length; i++) {
          let kuzovType = kuzovTypeDict[i];
          kuzovTypeList.push({
            label: kuzovType.TIPKUZ_NAME,
            value: kuzovType.TIPKUZ_KOD
          });
        }
        this.kuzovTypeList = kuzovTypeList;
      },
      async fillCategoryTCList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getKategTCDictionary',
            data: null
          }
        });
        let categoryTCList = [];
        let categoryTCDict =  JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < categoryTCDict.length; i++) {
          let categoryTC = categoryTCDict[i];
          categoryTCList.push({
            label: categoryTC.KATC_NAME,
            value: categoryTC.KATC_KOD
          });
        }
        this.categoryTCList = categoryTCList;
      },
      async fillTypeTCList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getTypeTCDictionary',
            data: null
          }
        });
        let typeTCList = [];
        let typeTCDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < typeTCDict.length; i++) {
          let typeTC = typeTCDict[i];
          typeTCList.push({
            label: typeTC.TIPTC_NAME,
            value: typeTC.TIPTC_KOD
          });
        }
        this.typeTCList = typeTCList;
      },
      async fillModelList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getModelListByMark',
            data: JSON.stringify({
              markName: this.data.markaAvto
            })
          }
        });
        let modNames = [];
        let modelList = [];
        let modelDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < modelDict.length; i++) {
          let model = modelDict[i];
          if (!modNames.includes(model.modName)) {
            modelList.push({
              label: model.modName,
              value: model.modName // id
            });
            modNames.push(model.modName);
          }
        }
        this.modelList = modelList;
      },
      async changeTipTc() {
        this.kuzovTypeList = null;
        this.data.tipkuzKod = null;
        if (this.isNotEmptyTipTcKod()) {
          await this.fillKuzovTypeList();
        }
        await this.storeElementData();
      },
      async changeMarkaAvto() {
        this.modelList = null;
        this.data.modavtoName = null;
        if (this.isNotEmptyMarkId()) {
          await this.fillModelList();
        }
        await this.storeElementData();
      },
      isNotEmptyTipTcKod() {
        return funcUtils.isNotEmpty(this.data.tiptcKod);
      },
      isNotEmptyMarkId() {
        return funcUtils.isNotEmpty(this.data.markaAvto);
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

<style lang="scss" scoped>



  .adm-form__item_content {
    width: 100%;
  }
</style>

