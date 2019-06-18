<template>
  <div v-if="data">
    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

    <div class="adm-form__container">
      <h2 class="adm-form__headding">Ввод данных по постановлению об административном правонарушении</h2>
      <div class="adm-form__content">
        <div class="adm-form__item">
          <small class="adm-form__label">Постановление №</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <masked-input inputClass="adm-input adm-input--regular wmin120" :maskProps="maskInputProt" v-model="data.docN" @onInputChange="storeElementData"></masked-input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Дата и время составления</small>
          <div class="adm-form__item_content">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.dateSost" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
          </div>
        </div>
        <slot></slot>
        <div class="adm-form__item">
          <small class="adm-form__label">Должностное лицо</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="4" :md="4" :lg="4">
                <masked-input inputClass="adm-input adm-input--regular" v-model="data.inspSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeInspSostKod" ></masked-input>
              </Col>
              <Col :xs="18" :md="18" :lg="18">
                <Input class="adm-input adm-input--regular" disabled v-model="data.inspSostName"></Input>
              </Col>
              <Col :xs="2" :md="2" :lg="2">
                <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                  <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="30" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Подразделение</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="4" :md="4" :lg="4">
                <masked-input inputClass="adm-input adm-input--regular" v-model="data.organSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="changeOrganSostKod"></masked-input>
              </Col>
              <Col :xs="18" :md="18" :lg="18">
                <Input class="adm-input adm-input--regular" disabled v-model="data.organSostName" @on-input-change="changeOrganSostKod" ></Input>
              </Col>
              <Col :xs="2" :md="2" :lg="2">
                <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                  <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="30" />
                </Button>
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
import wizardItemDocPostFirstMethods from "~/components/mixins/post/wizardItemDocPostFirstMethods.js";

export default {
	name: "WizardItemDocPostFirst",
  mixins: [wizardItemDocPostFirstMethods],
  components: {
    WizardModal: () => import('~/components/wizard/items/WizardModal'),
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
      maskInputProt: {
        regex: '[0-9]+',
        casing: 'upper',
        placeholder: ''
      },
		}
	},
  computed: {
    isNotEmptyParentNode() {
      return funcUtils.isNotEmpty(this.info.parentNode);
    },
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
        this.$store.dispatch('errorsModal/changeContent', {title: error.errorMsg, desc: error.errorDesc,});
      } else {
        this.data = data;
      }
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
