<template>
  <div v-if="data">
    <div v-if="dolzModal.visible" class="modal dolz" style="width: 50vw; height: 50vh;">
      <button type="button" @click="showDolzModal" style="width: 20px; height: 20px; background: black;"></button>

      <div>
        <span>Нагрудный знак</span>
        <input v-model="data.inspSostKod" @change="changeInspSostKod" />
      </div>

      <div>
        <span>ФИО</span>
        <input v-model="data.inspSostName" @change="clearInspSostDolz" />
        <button type="button" @click="showSispList" style="width: 20px; height: 20px; background: black;"></button>
      </div>

      <div>
        <span>Должность</span>
        <input v-model="data.inspSostDolz" @change="clearInspSostDolz" />
      </div>

      <div>
        <span>Звание</span>
        <input v-model="data.inspSostRang" @change="clearInspSostDolz" />
      </div>

      <div v-if="dolzModal.visibleSispList" style="height: 40vh; width: 50vw; overflow-y: auto;">
        <table>
          <thead>
            <tr>
              <td>Нагрудный знак</td>
              <td>ФИО</td>
              <td>Должность</td>
              <td>Звание</td>
              <td>Код подразделения</td>
              <td>Подразделение</td>
              <td>Отдел</td>
              <td>Телефон</td>
              <td>Дата начала действия</td>
              <td>Дата окончания действия</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dolzModal.sispList" :key="index" @dblclick="onSispClick(item)">
              <td>{{item.inspKod}}</td>
              <td>{{item.inspName}}</td>
              <td>{{item.inspDolz}}</td>
              <td>{{item.inspRang}}</td>
              <td>{{item.organKod}}</td>
              <td>{{item.ogaiName}}</td>
              <td>{{item.otdName}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.dateBeg}}</td>
              <td>{{item.dateEnd}}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <div v-if="organModal.visible" class="modal dolz" style="width: 50vw; height: 50vh;">
      <button type="button" @click="showOrganModal" style="width: 20px; height: 20px; background: black;"></button>

      <div style="height: 40vh; width: 50vw; overflow-y: auto;">
        <table>
          <thead>
          <tr>
            <td>Код органа</td>
            <td>Код региона</td>
            <td>Регион</td>
            <td>Район</td>
            <td>Тип</td>
            <td>Название</td>
            <td>Контакты</td>
            <td>Адрес</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in organModal.gibddList" :key="index" @dblclick="onGibddClick(item)">
            <td>{{item.ORGAN_KOD}}</td>
            <td>{{item.RESP_KOD}}</td>
            <td>{{item.REGION_NAME}}</td>
            <td>{{item.RAYON_NAME}}</td>
            <td>{{item.TIP}}</td>
            <td>{{item.ORGAN_NAME}}</td>
            <td>{{item.CONTACTS}}</td>
            <td>{{item.KA_ADR_FULL}}</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>

    <div>
      <div>
        <span>№ постановления</span>
        <input v-model="data.docN" />
        <button type="button" @click="createNewUIN" style="width: 20px; height: 20px; background: black;"></button>
      </div>

      <div>
        <span>Уникальный номер АПН</span>
        <input v-model="data.apn" />
      </div>

      <div>
        <span>Время вынесения</span>
        <input type="date" v-model="data.dateSost" />
      </div>

      <div>
        <span>Должностное лицо</span>
        <input v-model="inspSostDolz" @change="changeInspSostDolz" />
        <button type="button" @click="showDolzModal" style="width: 20px; height: 20px; background: black;"></button>
      </div>

      <div>
        <span>Орган</span>
        <input v-model="data.organSostName" @change="changeOrganSostName" />
        <button type="button" @click="showOrganModal" style="width: 20px; height: 20px; background: black;"></button>
      </div>
    </div>

  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemDocPostFirst",
    props: {
      info: Object
    },
    async created() {
     await this.initData();
    },
    data() {
      return {
        data: null,
        inspSostDolz: null,
        dolzModal: {
          visible: false,
          fio: null,
          visibleSispList: false,
          sispList: null
        },
        organModal: {
          visible: false,
          gibddList: null
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
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isNotEmpty(this.data.inspSostName) && funcUtils.isNotEmpty(this.data.inspSostDolz)) {
          this.inspSostDolz = this.data.inspSostName + ', ' + this.data.inspSostDolz;
        }
      },
      async changeOrganSostName() {
        let isInteger = Number.isInteger(+this.data.organSostName);
        if (this.data.organSostName.length !== 0 && isInteger) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getGibddDict',
              data: JSON.stringify({
                organKod: this.data.organSostName
              })
            }
          });
          let gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
          if (gibddList.length > 0) {
            this.organModal.visible = !this.organModal.visible;
            this.organModal.gibddList = gibddList;
          }
        }
      },
      async changeInspSostDolz() {
        let isInteger = Number.isInteger(+this.inspSostDolz);
        if (this.inspSostDolz.length === 0 || !isInteger) {
          this.clearInspSostDolz();
        } else if (funcUtils.isNotEmpty(this.inspSostDolz) && this.inspSostDolz.length !== 0) {
          let eventResponse = await RequestApi.prepareData({
            method: 'invokeElementMethod',
            params: {
              eCID: this.info.eCID,
              methodName: 'getSinspList',
              data: JSON.stringify({
                inspKod: this.inspSostDolz
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
            this.inspSostDolz = data.inspName + ', ' + data.inspDolz;
          } else {
            this.clearInspSostDolz();
          }
        }
        this.storeElementData();
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
        this.data = JSON.parse(JSON.parse(eventResponse.response).data);
        this.storeElementData();
      },
      showDolzModal() {
        this.dolzModal.visible = !this.dolzModal.visible;
      },
      async showOrganModal() {
        this.organModal.visible = !this.organModal.visible;
        if (this.organModal.visible) {
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
        }
      },
      async changeInspSostKod() {
        let isInteger = Number.isInteger(+this.data.inspSostKod);
        if (this.data.inspSostKod.length === 0 || !isInteger) {
          this.clearInspSostDolz();
        } else if (funcUtils.isNotEmpty(this.data.inspSostKod) && this.data.inspSostKod.length !== 0) {
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
            this.inspSostDolz = data.inspName + ', ' + data.inspDolz;
          } else {
            this.clearInspSostDolz();
          }
        }
        this.storeElementData();
      },
      async showSispList() {
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
        this.dolzModal.visibleSispList = !this.dolzModal.visibleSispList;
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
        this.inspSostDolz = data.inspName + ', ' + data.inspDolz;
        this.dolzModal.visibleSispList = !this.dolzModal.visibleSispList;
        this.dolzModal.visible = !this.dolzModal.visible;
        this.storeElementData();
      },
      onGibddClick(data) {
        this.data.organSostId = data.ID;
        this.data.organSostKod = data.ORGAN_KOD;
        this.data.organSostName = data.ORGAN_NAME;
        this.organModal.visible = !this.organModal.visible;
        this.storeElementData();
      },
      clearInspSostDolz() {
        this.clearInspSost();
        this.inspSostDolz = null;
      },
      clearInspSost() {
        this.data.inspSostId = null;
        this.data.inspSostKod = null;
        this.data.inspSostName = null;
        this.data.inspSostDolz = null;
        this.data.inspSostRang = null;
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
