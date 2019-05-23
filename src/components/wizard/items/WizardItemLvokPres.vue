<template>
  <div v-if="data">
    <div class="adm-form">
      <div class="adm-form__container">
        <h2 class="adm-form__headding" id="lvok">Сведения о явке</h2>
        <div class="adm-form__content">
					<div class="adm-form__item">
						<small class="adm-form__label">Статус</small>
						<Row :gutter="16" type="flex" align="middle">
							<Col>
								<Select class="wmin360 adm-input adm-input--regular" placeholder="" v-model="data.status" clearable @on-change="changeStatus">
									<Option class="wmin360" v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
								</Select>
							</Col>
						</Row>
					</div>
					<div class="adm-form__item">
						<small class="adm-form__label">Присутствие ЛВОКа</small>
						<Row :gutter="16" type="flex" align="middle">
							<Col :xs="24" :md="14" :lg="16">
								<Select class="adm-input adm-input--regular wmax360" v-model="data.presentType" :disabled="!data.status" filterable clearable @on-change="storeElementData" placeholder="">
									<Option v-for="item in presenceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardItemLvokPres",
    props: {
      info: Object
    },
    components: {
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        statusList: null,
        presenceTypeList: null
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

        await this.fillStatusList();

        if (this.data.status) {
          await this.fillPresenceTypeList();
        }
      },
      async fillStatusList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getStatusDict',
            data: null
          }
        });
        let statusList = [];
        let statusDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < statusDict.length; i++) {
          let status = statusDict[i];
          statusList.push({
            label: status.UCHAST_STATUS_NAME,
            value: status.UCHAST_STATUS
          });
        }
        this.statusList = statusList;
      },
      async fillPresenceTypeList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getPresenceTypeDict',
            data: JSON.stringify({
              status: this.data.status
            })
          }
        });
        let presenceTypeList = [];
        let presenceTypeDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < presenceTypeDict.length; i++) {
          let presenceType = presenceTypeDict[i];
          presenceTypeList.push({
            label: presenceType.name,
            value: presenceType.id
          });
        }
        this.presenceTypeList = presenceTypeList;
      },
      async changeStatus() {
        this.data.presentType = null;
        if (this.data.status) {
          await this.fillPresenceTypeList();
        }
        await this.storeElementData();
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
