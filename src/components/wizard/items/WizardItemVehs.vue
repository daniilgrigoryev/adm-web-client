<template>
  <div v-if="data">
    <div class="adm-form">
      <Row :gutter="16" type="flex" align="middle">
        <Col>
          <h2 class="adm-text-big color-dark-light my12">Транспортное средство</h2>
        </Col>
      </Row>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Регистрационный знак ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.regno" @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>
       
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Цвет</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.color" @on-input-change="storeElementData" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Тип кузова ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.tipkuzKod" clearable @on-change="storeElementData" filterable>
              <Option v-for="item in kuzovTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Марка ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.markaAvto" clearable @on-clear="changeMarkaAvto" @on-change="changeMarkaAvto" filterable>
              <Option v-for="item in markAvtoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Модель ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.modavtoName" clearable @on-change="storeElementData" :disabled="!isNotEmptyMarkId()" filterable>
              <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Принадлежность ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="data.ownerTip" clearable @on-change="storeElementData">
              <Option v-for="item in ownerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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

export default {
    name: "WizardItemVehs",
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

<style scoped>

</style>
