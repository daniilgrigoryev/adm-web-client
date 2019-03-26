<template>
  <div v-if="data">
    <div class="adm-form">
      <div class="adm-form__container mt6">
        <h2 class="adm-text-big adm-form__headding" id="tc">Транспортное средство</h2>
        <div class="adm-form__content px36 py24">
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">ГРЗ</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <input-mask inputClass="adm-input adm-input--regular wmax240" :maskProps="maskInputRegno" v-model="data.regno" @on-input-change="storeElementData"></input-mask>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Марка</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.markaAvto" clearable @on-clear="changeMarkaAvto" @on-change="changeMarkaAvto" filterable>
                    <Option v-for="item in markAvtoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Модель</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.modavtoName" clearable @on-change="storeElementData" :disabled="!isNotEmptyMarkId()" filterable>
                    <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Модификация</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                <!-- TODO -->
                  <input-mask inputClass="adm-input adm-input--regular wmax240"  @on-input-change="storeElementData" :maskProps="{casing: 'upper'}"></input-mask>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Тип</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.tipkuzKod" clearable @on-change="storeElementData" filterable>
                    <Option v-for="item in kuzovTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">СТС</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <!-- TODO -->
                  <input-mask inputClass="adm-input adm-input--regular wmax240" :maskProps="{casing: 'upper'}" @on-input-change="storeElementData" ></input-mask>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">VIN</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <input-mask inputClass="adm-input adm-input--regular wmax240" v-model="data.vin" :maskProps="{casing: 'upper'}"  @on-input-change="storeElementData"></input-mask>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-text-small color-gray-medium adm-form__label">Цвет</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="14" :lg="16">
                  <input-mask inputClass="adm-input adm-input--regular wmax240" v-model="data.color" :maskProps="{casing: 'upper'}"  @on-input-change="storeElementData"></input-mask>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as funcUtils from "../../../assets/js/utils/funcUtils";
import * as formStack from '../../../assets/js/api/formStack';
import RequestApi from "../../../assets/js/api/requestApi";
import InputMask from "~/components/InputMask";

export default {
    name: "WizardItemVehs",
    components: {InputMask},
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
            modelList: null,
            maskInputRegno: {
              casing: 'upper',
              placeholder: ' '
            },
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

            await this.fillKuzovTypeList();
            await this.fillMarkAvtoList();
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
                    data: null
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
            let modelList = [];
            let modelDict = JSON.parse(JSON.parse(eventResponse.response).data);
            for (let i = 0; i < modelDict.length; i++) {
                let model = modelDict[i];
                modelList.push({
                    label: model.modName,
                    value: model.modName // id
                });
            }
            this.modelList = modelList;
        },
        async changeMarkaAvto() {
            this.modelList = null;
            this.data.modavtoName = null;
            if (this.isNotEmptyMarkId()) {
                await this.fillModelList();
            }
            this.storeElementData();
        },
        isNotEmptyMarkId() {
            return funcUtils.isNotEmpty(this.data.markaAvto);
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

<style lang="scss" scoped>
  .adm-form-content{
    // border: 1px solid #000;
  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    // min-height: 90px;
    // outline: 1px solid;
  }
  .adm-form__label{
    padding: 0;
    min-width: 130px;
    padding-right: 12px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>

