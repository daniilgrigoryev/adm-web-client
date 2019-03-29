<template>
  <div v-if="vehsAMTC" class="mx-auto wmax1280">
    <div class="amd-title amd-title--sticky px36 py24 bg-white-light">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getPrev" type="text" style="outline: 0!important;" class="py0 px0 mr18 bg-transparent-on-hover" title="вернуться назад">
            <Icon type="ios-arrow-dropleft" class="bg-whte color-gray-light color-blue-on-hover transition" :size="35" />
          </Button>
          <b class="adm-text-big color-dark-lighter">Редактирование ТС</b>
        </div>
        <div class="buttons-wrap">
          <button @click="itemsStyleClass = ''">v1</button>
          <button @click="itemsStyleClass = '__grid'">v2</button>
          <button @click="itemsStyleClass = 'new-grid'">v3</button>
          <button @click="itemsStyleClass = 'gray-blocks-style'">v4</button>
        </div>
        <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../../assets/images/wiki.svg' class="wmax-none">
        </Button>
      </div>
    </div>
    <div class="items-wrap" :class="itemsStyleClass">
      <div class="adm-form">
        <div class="adm-form__container ">
          <h2 class="adm-text-big color-dark-light adm-form__headding">Основные сведения</h2>
          <div class="adm-form__content py24 px36">
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">ГРЗ</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <masked-input inputClass="adm-input adm-input--regular" @onInputChange="store" v-model="vehsAMTC.regno" placeholder="ГРЗ" :maskProps="{regex: '[a-zA-Zа-яА-Я0-9]+', casing: 'upper', placeholder: ''}"  clearable></masked-input> 
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Марка</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.markaAvto"
                            clearable @on-clear="changeMarkaAvto" @on-change="changeMarkaAvto" filterable>
                      <Option v-for="item in markAvtoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Модель</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.modavtoName"
                            clearable @on-change="store" :disabled="!isNotEmptyMarkId()" filterable>
                      <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Модификация</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.modifavtoName"></Input>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="adm-form">
        <div class="adm-form__container ">
          <h2 class="adm-text-big color-dark-light adm-form__headding">Документы</h2>
          <div class="adm-form__content py24 px36">
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">СТС</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.ctc"></Input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">ПТС</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.ptcN"></Input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Дата выдачи ПТС</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vehsAMTC.ptcDate" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
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
      </div>
      <div class="adm-form">
        <div class="adm-form__container ">
          <h2 class="adm-text-big color-dark-light adm-form__headding">Технические характеристики</h2>
          <div class="adm-form__content py24 px36">
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Категория ТС</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.katcKod"
                            clearable @on-clear="store" @on-change="store" filterable>
                      <Option v-for="item in categoryTCList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Тип кузова ТС</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.tipkuzKod"
                            clearable @on-change="store" filterable>
                      <Option v-for="item in kuzovTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Тип двигателя</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.motorTip"
                            clearable @on-clear="store" @on-change="store" filterable>
                      <Option v-for="item in motorTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>  
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Экологический класс</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.motorEcologClass"
                            clearable @on-clear="store" @on-change="store" filterable>
                      <Option v-for="item in motorEcologClassList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Цвет</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular" v-model="vehsAMTC.color"></Input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Масса без нагрузки</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.massa"></Input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Максимальная масса</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.massaMax"></Input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-text-small adm-form__label">Год выпуска</small>
              <div class="adm-form__item_content">
                <Row type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <!--<Input class="adm-input adm-input&#45;&#45;regular" v-model="vehsAMTC.yearVyp"></Input>-->
                    <masked-input v-model="vehsAMTC.yearVyp" :maskProps="maskInputYearVyp" @onInputChange="store" inputClass="adm-input adm-input--regular" clearable :placeholder="maskInputYearVyp.placeholder"></masked-input>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sub-wrap">
        <div class="adm-form">
          <div class="adm-form__container ">
            <h2 class="adm-text-big color-dark-light adm-form__headding">Агрегаты</h2>
            <div class="adm-form__content py24 px36">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">VIN</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.vin"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">№ кузова</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.nkuzov"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">№ шасси</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.nshasi"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="adm-form">
          <div class="adm-form__container ">
            <h2 class="adm-text-big color-dark-light adm-form__headding">Полис ОСАГО</h2>
            <div class="adm-form__content py24 px36">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">№</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="vehsAMTC.osagoN"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Кем выдан ОСАГО</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="vehsAMTC.osagoKemVydanId"
                              clearable @on-clear="store" @on-change="store" filterable>
                        <Option v-for="item in osagoCompanyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Дата выдачи</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vehsAMTC.osagoDate" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Дата окончания</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="vehsAMTC.osagoSrok" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-parent flex-parent--center-cross flex-parent--end-main px36 adm-btn-footer--sticky bg-white-light py18">
      <Button @click="getPrev" type="text" class="adm-btn adm-btn-small bg-transparent">Отменить изменения</Button>
      <Button @click="save" type="text" class="adm-btn adm-btn-regular color-blue-base adm-btn-border txt-uppercase">Сохранить</Button>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import MaskedInput from "../../shared/MaskedInput";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";

  export default {
    name: "FrmEdVehsAMTCEdit",
    components: {
      MaskedInput,
      DatePickerMask
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
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
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
        osagoCompanyList: null,
        typeTCList: null,
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

<style  lang="scss">
  
  .buttons-wrap {
    display: grid;
    grid-gap: 10px;
    grid-auto-flow: column;
    button {
      width: 100px;
      height: 30px;
      border-radius: 5px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #1888CC;
      transition: .3s ease;
      &:hover {
          opacity: .8;
      }
    } 
  }
  .items-wrap {
    display: block;
    .adm-form__content {
      padding-left: 330px !important;
    }
    &.__grid {
      grid-template-columns: repeat(2, 1fr);
      display: grid;
      .adm-form .adm-form__container {
        margin: 0;
        height: 100%;
      }
      .adm-form__content{
        padding-left: 36px !important;
        padding: 8px !important;
      }
    }
    &.new-grid {
      display: grid;
      grid-gap: 15px;
      padding: 0 20px;
      .adm-form {
        margin: 0;
        .adm-form__container {
          height: 100%;
          margin: 0;
          padding: 15px 40px;
          .adm-form__headding {
            height: auto;
            padding: 0;
            background: transparent;
            color: #797979;
            margin-bottom: 10px;
          }
          .adm-form__content{
            padding: 0 !important;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 5px;
          }
          .adm-form__label {
            min-width: 160px;
          }
        }
      }
      .sub-wrap {
        grid-gap: 15px;
        display: grid;
      }
    }
    &.gray-blocks-style {
      .adm-form {
        margin: 0;
        border-bottom: 1px solid #e4e4e4;
        .adm-form__container {
          background: #f3f3f3;
          margin: 0;
          border: none;
          border-radius: 0;
          .adm-form__headding {
            border-radius: 0;
            background: #fff;
            height: 46px;
            color: #6b94c2;
            border-bottom: 1px solid #e4e4e4;
          }
          .adm-form__content{
            padding: 20px 50px !important;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 5px;
            .adm-form__label {
              min-width: 160px;
              font-weight: 500;
            }
            .adm-input .ivu-select-selection {
              outline: none;
            }
            .adm-input .ivu-select-input, .adm-input .ivu-input {
              border: 1px solid #DEDEDE;
              background: #fff;
              &:hover {
                border-color: #9A9A9A;
              }
              &:focus {
                border-color: #53A4D6;
              }
            }
          }
        }
      }
    }
  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0;
  }
  .chast-title {
    display: flex;
    align-items: center;
    padding: 24px 36px;
  }
  .adm-form {
    margin: 10px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 150px;
  }
  .adm-input--regular {
    max-width: 240px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
