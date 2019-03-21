<template>
 <div v-if="data">

    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>

    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

    <div class="adm-form">
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Номер постановления</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.docN" @on-input-change="storeElementData" placeholder="Номер постановления" clearable></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="createNewUIN" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Получить уникальный номер</a>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Уникальный номер правонарушения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.apn" @on-input-change="storeElementData" placeholder="Уникальный номер правонарушения"></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Уникальный номер дела</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" :disabled="data.deloN !== null" @on-input-change="storeElementData" v-model="data.deloN" placeholder="Уникальный номер дела"></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" :disabled="data.deloN !== null" @click="createNewDeloNum" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Получить уникальный номер</a>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата и время задержания</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <DatePickerMask class="adm-input adm-input--regular wmin120 wmax180" v-model="data.dateSost" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
          </Col>
        </Row>
      </div>
    </div>

    <hr class="txt-hr my24">

    <div class="adm-form">
      <h2 class="adm-text-big color-dark-light my12">Составил</h2>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Личный номер сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.inspSostKod" @on-input-change="changeInspSostKod" placeholder="Личный номер сотрудника"></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showDolzModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Справочник сотрудников</a>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ФИО сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.inspSostName" @on-input-change="changeFIO" placeholder="ФИО сотрудника"></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Должность сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.inspSostDolz" @on-input-change="clearInspSostKod" placeholder="Должность сотрудника"></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Звание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.inspSostRang" @on-input-change="clearInspSostKod" placeholder="Звание"></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Код подразделения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.organSostKod" @on-input-change="changeOrganSostKod" placeholder="Код подразделения"></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="showOrganModal(true)" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Уполномеченные органы</a>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" v-model="data.organSostName" disabled type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
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
import WizardModal from "~/components/wizard/items/WizardModal";
import DatePickerMask from "~/components/DatePickerMask";

export default {
	name: "WizardItemDocPostFirst",
  components: {WizardModal, DatePickerMask},
  props: {
		info: Object
	},
	async created() {
		await this.initData();
	},
	data() {
		return {
			data: null,
			dolzModal: {
				visible: false,
				sispList: null,
        columnsOptions:
          [
            {
              title: 'Нагрудный знак',
              key: 'inspKod',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'ФИО',
              key: 'inspName',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Должность',
              key: 'inspDolz',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Звание',
              key: 'inspRang',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Код подразделения',
              key: 'organKod',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Подразделение',
              key: 'ogaiName',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Отдел',
              key: 'otdName',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Телефон',
              key: 'phone',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Дата начала действия',
              key: 'dateBeg',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Дата окончания действия',
              key: 'dateEnd',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            }
          ]
			},
			organModal: {
				visible: false,
				gibddList: null,
        columnsOptions:
          [
            {
              title: 'Код органа',
              key: 'ORGAN_KOD',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Код региона',
              key: 'RESP_KOD',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Регион',
              key: 'REGION_NAME',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Район',
              key: 'RAYON_NAME',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Тип',
              key: 'TIP',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Название',
              key: 'ORGAN_NAME',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Контакты',
              key: 'CONTACTS',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            },
            {
              title: 'Адрес',
              key: 'KA_ADR_FULL',
              minWidth: 120,
              ellipsis: true,
              tooltip: true,
              renderHeader: (h, params) => {
                return h('h4', params.column.title)
              }
            }
          ]
			}
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

		async createNewUIN() {
			let eventResponse = await RequestApi.prepareData({
				method: 'invokeElementMethod',
				params: {
					eCID: this.info.eCID,
					methodName: 'createNewUIN',
					data: null
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
		async createNewDeloNum() {
			let eventResponse = await RequestApi.prepareData({
				method: 'invokeElementMethod',
				params: {
					eCID: this.info.eCID,
					methodName: 'createDeloNum',
					data: null
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

		async showDolzModal(visible) {
			if (visible) {
				let eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getSinspList',
						data: JSON.stringify({
							inspKod: null
						})
					}
				});
				this.dolzModal.sispList = JSON.parse(JSON.parse(eventResponse.response).data);
			} else {
				this.dolzModal.sispList = null;
			}
      this.dolzModal.visible = visible;
		},
		async showOrganModal(visible) {
			if (visible) {
				let eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getGibddDict',
						data: JSON.stringify({
							organKod: null
						})
					}
				});
				this.organModal.gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
			} else {
				this.organModal.gibddList = null;
			}
      this.organModal.visible = visible;
		},

		async changeOrganSostKod() {
			let express = /^\d+$/;
			if (funcUtils.isNotEmpty(this.data.organSostKod) && express.test(this.data.organSostKod)) {
				let eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getGibddDict',
						data: JSON.stringify({
							organKod: this.data.organSostKod
						})
					}
				});
				let gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
				if (gibddList.length > 0) {
					this.organModal.visible = true;
					this.organModal.gibddList = gibddList;
				} else {
					this.clearOrganSost();
				}
			} else {
				this.clearOrganSost();
			}
		},
		async changeInspSostKod() {
			let express = /^\d+$/;
			if (funcUtils.isNotEmpty(this.data.inspSostKod) && express.test(this.data.inspSostKod)) {
				let eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getSinspList',
						data: JSON.stringify({
							inspKod: this.data.inspSostKod
						})
					}
				});
				let data = JSON.parse(JSON.parse(eventResponse.response).data);
				if (funcUtils.isNotEmpty(data) && data.length > 0) {
					data = data[0];
					this.data.inspSostId = data.inspId;
					this.data.inspSostKod = data.inspKod;
					this.data.inspSostName = data.inspName;
					this.data.inspSostDolz = data.inspDolz;
					this.data.inspSostRang = data.inspRang;
					this.data.organSostId = data.ogaiId;
					this.data.organSostKod = data.organKod;
					this.data.organSostName = data.ogaiName;
					this.storeElementData();
				} else {
					this.clearInspSost();
				}
			} else {
				this.clearInspSost();
			}
		},
		changeFIO() {
			let fioLength = 0;
			let fioArr = this.data.inspSostName.split(' ');
			this.data.inspSostName = '';
			for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
				let express = /^[а-яА-ЯёЁ]+$/;
				let item = fioArr[i];
				if (item.length > 0 && express.test(item)) {
					switch (fioLength) {
						case 0:
							{
								this.data.inspSostName += item;
								break;
							}
						case 1:
							{
								this.data.inspSostName += ' ' + item;
								break;
							}
						case 2:
							{
								this.data.inspSostName += ' ' + item;
								break;
							}
					}
					fioLength++;
				}
			}
			this.clearInspSostKod();
		},

		onSispClick(data) {
			this.data.inspSostId = data.inspId;
			this.data.inspSostKod = data.inspKod;
			this.data.inspSostName = data.inspName;
			this.data.inspSostDolz = data.inspDolz;
			this.data.inspSostRang = data.inspRang;
			this.data.organSostId = data.ogaiId;
			this.data.organSostKod = data.organKod;
			this.data.organSostName = data.ogaiName;
			this.dolzModal.visible = false;
			this.dolzModal.sispList = null;
			this.storeElementData();
		},
		onGibddClick(data) {
			this.data.organSostId = data.ID;
			this.data.organSostKod = data.ORGAN_KOD;
			this.data.organSostName = data.ORGAN_NAME;
			this.organModal.gibddList = null;
			this.organModal.visible = false;
			this.storeElementData();
		},

		clearInspSostKod() {
			this.data.inspSostId = null;
			this.data.inspSostKod = null;
			this.storeElementData();
		},
		clearInspSost() {
			this.data.inspSostId = null;
			this.data.inspSostKod = null;
			this.data.inspSostName = null;
			this.data.inspSostDolz = null;
			this.data.inspSostRang = null;
			this.storeElementData();
		},
		clearOrganSost() {
			this.data.organSostId = null;
			this.data.organSostKod = null;
			this.data.organSostName = null;
			this.storeElementData();
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
