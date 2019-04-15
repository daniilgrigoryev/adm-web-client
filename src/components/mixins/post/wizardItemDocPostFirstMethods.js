import * as funcUtils from "../../../assets/js/utils/funcUtils";
import RequestApi from "../../../assets/js/api/requestApi";

export default {
  data() {
    return {
      dolzModal: {
        visible: false,
        sispList: null,
        srcList: null,
        columnsOptions:
          [
            {
              title: 'Нагрудный знак',
              key: 'inspKod',
              minWidth: 120,
              ellipsis: true,
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
        srcList: null,
        columnsOptions:
          [
            {
              title: 'Код органа',
              key: 'ORGAN_KOD',
              minWidth: 120,
              ellipsis: true,
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
              sortable: 'custom',
              filterable: true,
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
      if (funcUtils.isEmpty(this.dolzModal.srcList)) {
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
        this.dolzModal.srcList = JSON.parse(JSON.parse(eventResponse.response).data);
      }
      if (visible) {
        this.dolzModal.sispList = this.dolzModal.srcList;
      } else {
        this.dolzModal.sispList = null;
      }
      this.dolzModal.visible = visible;
    },
    async showOrganModal(visible) {
      if (visible && funcUtils.isEmpty(this.organModal.srcList)) {
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
        this.organModal.srcList = JSON.parse(JSON.parse(eventResponse.response).data);
      }
      if (visible) {
        this.organModal.gibddList = this.organModal.srcList;
      } else {
        this.organModal.gibddList = null;
      }
      this.organModal.visible = visible;
    },

    async changeOrganSostKod() {
      if (funcUtils.isNotEmpty(this.data.organSostKod)) {
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
        this.clearOrganSost();
        let gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
        if (gibddList.length > 0) {
          this.organModal.visible = true;
          this.organModal.gibddList = gibddList;
        }
      } else {
        this.clearOrganSost();
      }
    },
    async changeInspSostKod() {
      if (funcUtils.isNotEmpty(this.data.inspSostKod)) {
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
        this.clearInspSost();
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isNotEmpty(data) && data.length > 0) {
          data = data.getFirst();
          this.data.inspSostId = data.inspId;
          this.data.inspSostKod = data.inspKod;
          this.data.inspSostName = data.inspName;
          this.data.inspSostDolz = data.inspDolz;
          this.data.inspSostRang = data.inspRang;
          this.data.organSostId = data.ogaiId;
          this.data.organSostKod = data.organKod;
          this.data.organSostName = data.ogaiName;
          this.storeElementData();
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
  }
}
