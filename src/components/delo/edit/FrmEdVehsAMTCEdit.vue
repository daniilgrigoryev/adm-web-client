<template>
  <aside-template :listSectionNav="listSectionNav" title="Редактирование ТС" v-if="vehsAMTC">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">Основные сведения</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">ГРЗ</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" @onInputChange="store" v-model="vehsAMTC.regno" placeholder="ГРЗ" :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', casing: 'upper', placeholder: ''}"  clearable></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Марка</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.markaAvto"
                              clearable @on-clear="changeMarkaAvto" @on-change="changeMarkaAvto" filterable>
                        <Option v-for="item in markAvtoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Модель</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.modavtoName"
                              clearable @on-change="store" :disabled="!isNotEmptyMarkId()" filterable>
                        <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Модификация</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240 wmin180" @on-input-change="store" v-model="vehsAMTC.modifavtoName"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="doc">Документы</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">СТС</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240 wmin180" @on-input-change="store" v-model="vehsAMTC.ctc"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">ПТС</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240 wmin180" @on-input-change="store" v-model="vehsAMTC.ptcN"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Дата выдачи ПТС</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmax240 wmin180" v-model="vehsAMTC.ptcDate" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Кем выдан ПТС</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.ptcKemVydan"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="teh">Технические характеристики</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Категория ТС</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.katcKod"
                              clearable @on-clear="store" @on-change="store" filterable>
                        <Option v-for="item in categoryTCList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Тип</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.tiptcKod"
                              clearable @on-change="changeTipTc" filterable>
                        <Option v-for="item in typeTCList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Тип кузова ТС</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.tipkuzKod"
                              :disabled="!isNotEmptyTipTcKod()" clearable @on-change="store" filterable>
                        <Option v-for="item in kuzovTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Тип двигателя</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.motorTip"
                              clearable @on-clear="store" @on-change="store" filterable>
                        <Option v-for="item in motorTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Экологический класс</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.motorEcologClass"
                              clearable @on-clear="store" @on-change="store" filterable>
                        <Option v-for="item in motorEcologClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Цвет</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" v-model="vehsAMTC.color" @onInputChange="store" :maskProps="{casing: 'upper', regex: '[а-яА-Я0-9 .-]+', placeholder: ''}" placeholder=""></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Масса без нагрузки</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" @onInputChange="store" v-model="vehsAMTC.massa" placeholder="" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}"  clearable></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Максимальная масса</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax240 wmin180" @onInputChange="store" v-model="vehsAMTC.massaMax" placeholder="" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}"  clearable></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Год выпуска</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <masked-input v-model="vehsAMTC.yearVyp" :maskProps="maskInputYearVyp" @onInputChange="store" inputClass="adm-input adm-input--regular wmax240 wmin180" clearable :placeholder="maskInputYearVyp.placeholder"></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div class="adm-form__container ">
            <h2 class="adm-form__headding" id="aggregates">Агрегаты</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">VIN</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240 wmin180" @on-input-change="store" v-model="vehsAMTC.vin"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">№ кузова</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240 wmin180" @on-input-change="store" v-model="vehsAMTC.nkuzov"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">№ шасси</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240 wmin180" @on-input-change="store" v-model="vehsAMTC.nshasi"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div class="adm-form__container ">
            <h2 class="adm-form__headding" id="osago">Полис ОСАГО</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">№</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240 wmin180" @on-input-change="store" v-model="vehsAMTC.osagoN"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Кем выдан ОСАГО</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240 wmin180" @on-input-change="store" v-model="vehsAMTC.osagoKemVydan"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Дата выдачи</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmax240 wmin180" v-model="vehsAMTC.osagoDate" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Дата окончания</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmax240 wmin180" v-model="vehsAMTC.osagoSrok" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
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
    name: "FrmEdVehsAMTCEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdVehsAMTCEditSetCid', current.cid);
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
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
        } else {
          this.vehsAMTC = vehsAMTC;

          if (this.isNotEmptyTipTcKod()) {
            await this.fillKuzovTypeList();
          }
          await this.fillMarkAvtoList();
          await this.fillMotorTypeList();
          await this.fillMotorEcologClassList();
          await this.fillCategoryTCList();
          await this.fillTypeTCList();
          if (this.isNotEmptyMarkId()) {
            await this.fillModelList();
          }
        }
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdVehsAMTCEditSetCid', null);
      this.$store.dispatch('frmEdVehsAMTCEditSetData', null);
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
        typeTCList: null,
        listSectionNav: [
          {
            title: "Основные сведения",
            name: "head",
          },
          {
            title: "Документы",
            name: "doc",
          },
          {
            title: "Технические характеристики",
            name: "teh",
          },
          {
            title: "Агрегаты",
            name: "aggregates",
          },
          {
            title: "Полис ОСАГО",
            name: "osago",
          },
        ],
        maskInputYearVyp: {
          alias: "datetime",
          inputFormat: 'yyyy',
          placeholder: 'гггг'
        },
        itemsStyleClass: "new-grid"
      }
    },
    methods: {
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
          method: 'getKuzovTypeDictionary',
          params: {
            tipTcKod: this.vehsAMTC.tiptcKod
          }
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
        let modelListTemp = [];
        let modelDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < modelDict.length; i++) {
          let model = modelDict[i];
          if (!modelListTemp.includes(model.modName)) {
            modelList.push({
              label: model.modName,
              value: model.modName // id
            });
            modelListTemp.push(model.modName);
          }
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
      async changeTipTc() {
        this.kuzovTypeList = null;
        this.vehsAMTC.tipkuzKod = null;
        if (this.isNotEmptyTipTcKod()) {
          await this.fillKuzovTypeList();
        }
        this.store();
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
      isNotEmptyTipTcKod() {
        return funcUtils.isNotEmpty(this.vehsAMTC.tiptcKod);
      },
      async store() {
        let eventResponse = await RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.vehsAMTC
          }
        });
        if (eventResponse.response) {
          this.vehsAMTC = JSON.parse(eventResponse.response).data;
        }
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

<style lang="scss">
</style>
