<!-- prettier-ignore -->
<template>
  <aside-template v-if="postRegistry">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">Создание нового почтового реестра</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Исходящий номер</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="postRegistry.curIssue"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Тип реестра</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular  wmin180" placeholder="" v-model="postRegistry.regType" clearable filterable  @on-change="changeRegType" @on-enter="changeRegType">
                        <Option class=" " v-for="item in postRegTypeDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Статус реестра</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular  wmin180" placeholder="" v-model="postRegistry.status" clearable filterable  @on-change="store" @on-enter="store">
                        <Option class=" " v-for="item in postRegStatusDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Тип доставки реестра</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular  wmin180" placeholder="" v-model="postRegistry.deliveryType" :disabled="!postRegistry.regType" clearable filterable  @on-change="changeDeliveryType" @on-enter="changeDeliveryType">
                        <Option class=" " v-for="item in deliveryTypeDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Ассоциированный контракт</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular  wmin180" placeholder="" v-model="postRegistry.contractId" clearable filterable  @on-change="changeContract" @on-enter="changeContract">
                        <Option class=" " v-for="item in contractsDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Почтовое отделение</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <CustomSelect class="adm-input adm-input--regular  wmin180" placeholder="" v-model="postRegistry.postNum" clearable filterable  @on-change="store" @on-enter="store">
                        <Option class=" " v-for="item in postOfficesDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </CustomSelect>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Отправлений в конверте</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="postRegistry.coverLimit"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Дата отправки реестра</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="postRegistry.sendDate" @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Комментарий</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="postRegistry.comments"></Input>
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
    name: "PostRegistryCreate",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
    },
    async created() {
      await this.init();
      let vm = this;
      this.$store.watch(this.$store.getters.postRegistryCreateGetCommand, async () => {
        try {
          await vm.init();
        } catch (e) {
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      });
    },
    async destroyed() {
      this.$store.dispatch('postRegistryCreateSetCid', null);
      this.$store.dispatch('postRegistryCreateSetData', null);
    },
    data() {
      return {
        postRegistry: null,
        postRegTypeDict: [],
        postRegStatusDict: [],
        deliveryTypeDict: [],
        postOfficesDict: [],
        contractsDict: [],
      }
    },
    methods: {
      async init() {
        try {
          let current = formStack.getCurrent();
          await this.$store.dispatch('dlgAdviceEditSetCid', current.cid);
          let eventResponse = await RequestApi.prepareData({
            method: 'restore'
          });
          let postRegistry = JSON.parse(eventResponse.response).data;

          if (funcUtils.isEmpty(postRegistry)) {
            let error = JSON.parse(eventResponse.response).error;
            this.$store.dispatch('errorsModal/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
          } else {
            this.postRegistry = postRegistry;

            await this.fillPostRegTypeDict();
            await this.fillPostRegStatusDict();
            await this.fillPostOfficesDict();
            await this.fillContractsDict();
            if (funcUtils.isNotEmpty(postRegistry.regType)) {
              await this.fillDeliveryTypeDict();
            }

          }
        } catch (e) {
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      },
      async changeRegType() {
        this.postRegistry.deliveryType = null;
        await this.store();
        if (this.postRegistry.regType) {
          await this.fillDeliveryTypeDict();
        }
      },
      async changeDeliveryType() {
        await this.store();
        await this.fillContractsDict();
        await this.fillPostOfficesDict();
      },
      async changeContract() {
        await this.store();
        await this.fillPostOfficesDict();
      },
      async fillPostRegTypeDict() {
        let postRegTypeDict = [];
        let eventResponse = await RequestApi.prepareData({
          method: 'getPostRegTypeDictionary'
        });
        let postRegTypeList = JSON.parse(eventResponse.response).data;
        postRegTypeList.forEach((item) => {
          postRegTypeDict.push({
            label: item.values['NAME'],
            value: item.values['ID']
          })
        });
        this.postRegTypeDict = postRegTypeDict;
      },
      async fillPostRegStatusDict() {
        let postRegStatusDict = [];
        let eventResponse = await RequestApi.prepareData({
          method: 'getPostRegStatusDictionary'
        });
        let postRegStatusList = JSON.parse(eventResponse.response).data;
        postRegStatusList.forEach((item) => {
          postRegStatusDict.push({
            label: item.values['NAME'],
            value: item.values['ID']
          })
        });
        this.postRegStatusDict = postRegStatusDict;
      },
      async fillDeliveryTypeDict() {
        let deliveryTypeDict = [];
        let eventResponse = await RequestApi.prepareData({
          method: 'getDeliveryType'
        });
        let deliveryTypeList = JSON.parse(eventResponse.response).data;
        deliveryTypeList.forEach((item) => {
          deliveryTypeDict.push({
            label: item.values['NAME'],
            value: item.values['ID']
          })
        });
        this.deliveryTypeDict = deliveryTypeDict;
      },
      async fillPostOfficesDict() {
        let postOfficesDict = [];
        let eventResponse = await RequestApi.prepareData({
          method: 'getPostOfficesDictionary'
        });
        let postOfficesList = JSON.parse(eventResponse.response).data;
        postOfficesList.forEach((item) => {
          postOfficesDict.push({
            label: item.name,
            value: item.id
          })
        });
        this.postOfficesDict = postOfficesDict;
      },
      async fillContractsDict() {
        let contractsDict = [];
        let eventResponse = await RequestApi.prepareData({
          method: 'getPostContractsByRegion'
        });
        let contractsList = JSON.parse(eventResponse.response).data;
        contractsList.forEach((item) => {
          contractsDict.push({
            label: item.name,
            value: item.id
          })
        });
        this.contractsDict = contractsDict;
      },
      async store() {
        return RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.postRegistry
          }
        });
      },
      async save() {
        await this.store();
        let eventResponse = await RequestApi.prepareData({
          method: 'save'
        });

        let eventResp =  JSON.parse(eventResponse.response);
        if (eventResp.error && eventResp.error.errorId) {
          this.$store.dispatch('errorsModal/changeContent', {title: eventResp.error.errorMsg, desc: eventResp.error.errorDesc,});
        } else {
          await this.getPrev();
        }
      },
      async getPrev() {
        try {
          await formStack.toPrev({
            vm: this
          });
        } catch (e) {
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>
