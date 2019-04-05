import * as funcUtils from "../../../assets/js/utils/funcUtils";
import RequestApi from "../../../assets/js/api/requestApi";

export default {
  data() {
    return {
      dolzModal: {
        visible: false,
        sispList: null,
        columnsOptions:
          [
            {
              title: 'Нагрудный знак',
              key: 'inspKod',
              minWidth: 120,
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
        columnsOptions:
          [
            {
              title: 'Код органа',
              key: 'ORGAN_KOD',
              minWidth: 120,
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
    async showDolzModal(visible) {
      if (visible && funcUtils.isEmpty(this.dolzModal.sispList)) {
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
      }
      this.dolzModal.visible = visible;
    },
    async showOrganModal(visible) {
      if (visible && funcUtils.isEmpty(this.organModal.gibddList)) {
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
      this.organModal.visible = visible;
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
  }
}
