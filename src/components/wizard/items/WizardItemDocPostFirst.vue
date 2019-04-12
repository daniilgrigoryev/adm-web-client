<template>
  <div v-if="data">
    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

    <div class="adm-form__container">
      <h2 class="adm-form__headding" id="lvok">Возбуждение дела</h2>
      <div class="adm-form__content">
        <div class="adm-form__item">
          <small class="adm-form__label">№ Постановления</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.docN" @on-input-change="storeElementData" placeholder="Номер постановления" clearable></Input>
            </Col>
            <Col :xs="24" :md="14" :lg="8">
              <a href="#" @click="createNewUIN" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Получить уникальный номер</a>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">№ правонарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.apn" @on-input-change="storeElementData" placeholder="Уникальный номер правонарушения"></Input>
            </Col>
          </Row>
        </div>
        <div v-if="data.deloN === null" class="adm-form__item">
          <small class="adm-form__label">№ дела</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.deloN" placeholder="Уникальный номер дела"></Input>
            </Col>
            <Col :xs="24" :md="14" :lg="8">
              <a href="#" @click="createNewDeloNum" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Получить уникальный номер</a>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Дата и время задержания</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateSost" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="adm-form__container">
      <h2 class="adm-form__headding" id="lvok">Составил</h2>
      <div class="adm-form__content">
        <div class="adm-form__item">
          <small class="adm-form__label">Личный номер сотрудника</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="22" :md="22" :lg="22">
              <masked-input inputClass="adm-input adm-input--regular" v-model="data.inspSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" placeholder="Личный номер сотрудника" @onInputChange="changeInspSostKod" ></masked-input>
            </Col>
            <Col :xs="2" :md="2" :lg="2">
              <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="35" />
              </Button>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">ФИО сотрудника</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.inspSostName" @on-input-change="changeFIO" placeholder="ФИО сотрудника"></Input>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Должность сотрудника</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.inspSostDolz" @on-input-change="clearInspSostKod" placeholder="Должность сотрудника"></Input>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Звание</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.inspSostRang" @on-input-change="clearInspSostKod" placeholder="Звание"></Input>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Код подразделения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="22" :md="22" :lg="22">
              <masked-input inputClass="adm-input adm-input--regular" v-model="data.organSostKod" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" placeholder="Код подразделения" @onInputChange="changeOrganSostKod" ></masked-input>
            </Col>
            <Col :xs="2" :md="2" :lg="2">
              <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
                <Icon type="ios-bookmarks-outline" class=" " title="Справочник подразделений" :size="35" />
              </Button>
            </Col>
          </Row>
        </div>
        <div class="adm-form__item">
          <small class="adm-form__label">Подразделение</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" v-model="data.organSostName" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as funcUtils from "../../../assets/js/utils/funcUtils";
import * as formStack from '../../../assets/js/api/formStack';
import RequestApi from "../../../assets/js/api/requestApi";
import WizardModal from "~/components/wizard/items/WizardModal";
import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";
import MaskedInput from "~/components/shared/MaskedInput";
import wizardItemDocPostFirstMethods from "~/components/mixins/post/wizardItemDocPostFirstMethods.js";

export default {
	name: "WizardItemDocPostFirst",
  mixins: [wizardItemDocPostFirstMethods],
  components: {WizardModal, MaskedInput, DatePickerMask},
  props: {
		info: Object
	},
	async created() {
		await this.initData();
	},
	data() {
		return {
			data: null
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
        let error = JSON.parse(eventResponse.response).error.errorMsg;
        alert(error);
      } else {
        this.data = data;
      }
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
