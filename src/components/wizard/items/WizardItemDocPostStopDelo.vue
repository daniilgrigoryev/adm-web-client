<template>
  <div v-if="data">
    <div class="adm-form__item">
      <small class="adm-form__label">Статья-основание</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <Select class="adm-input adm-input--regular wmin180" placeholder="" v-model="data.stotvId" clearable filterable @on-change="storeElementData">
              <Option class="" v-for="item in stotvSearchInfoList" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>
    </div>

		<div class="adm-form__item">
			<small class="adm-form__label">Дата прекращения</small>
			<div class="adm-form__item_content">
				<DatePickerMask class="adm-input adm-input--regular wmin120 wmax180 ivu-date-picker" v-model="data.dateStop" @change="storeElementData" clearable type="datetime" placeholder="дд/мм/гггг чч:мм" momentFormat="DD/MM/YYYY HH:mm" maskFormat="dd/mm/yyyy HH:MM"></DatePickerMask>
			</div>
		</div>
    <div class="adm-form__item">
      <small class="adm-form__label">Дополнительные сведения</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="22" :lg="22">
            <Input class="adm-input adm-input--regular" @on-input-change="storeElementData" v-model="data.dopSved"></Input>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
		name: "WizardItemDocPostStopDelo",
		components: {
			DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask'),
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
				stotvSearchInfoList: null,
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
					await this.fillStotvSearchInfo();
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
			async fillStotvSearchInfo() {
				let eventResponse = await RequestApi.prepareData({
					method: 'invokeElementMethod',
					params: {
						eCID: this.info.eCID,
						methodName: 'getStotvDecisSearchInfo',
						data: null
					}
				});
				let stotvSearchInfoList = [];
				let stotvSearchInfoDict = JSON.parse(JSON.parse(eventResponse.response).data);
				for (let i = 0; i < stotvSearchInfoDict.length; i++) {
					let stotvSearchInfo = stotvSearchInfoDict[i];
					stotvSearchInfoList.push({
						label: stotvSearchInfo.stotvName,
						value: stotvSearchInfo.stotvKod,
						id: stotvSearchInfo.stotvId
					});
				}
				this.stotvSearchInfoList = stotvSearchInfoList;
			},
    }
  }
</script>

<style scoped>

</style>
