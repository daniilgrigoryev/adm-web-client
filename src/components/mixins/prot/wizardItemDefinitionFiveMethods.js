import * as funcUtils from "~/assets/js/utils/funcUtils";
import RequestApi from "~/assets/js/api/requestApi";

export default {
  data() {
    return {
      rasmModal: {
        visible: false,
        rasmList: null,
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
      },
      inspUtvModal: {
        visible: false,
        inspUtvList: null,
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
    }
  },
  methods: {
    async showRasmModal(visible) {
      if (visible && funcUtils.isEmpty(this.rasmModal.srcList)) {
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
        this.rasmModal.srcList = JSON.parse(JSON.parse(eventResponse.response).data);
      }
      if (visible) {
        this.rasmModal.rasmList = this.rasmModal.srcList;
      } else {
        this.rasmModal.rasmList = null;
      }
      this.rasmModal.visible = visible;
    },
    async changeRasmKod() {
      if (funcUtils.isNotEmpty(this.data.organRasmKod)) {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getGibddDict',
            data: JSON.stringify({
              organKod: this.data.organRasmKod
            })
          }
        });
        this.clearRasmSost();
        let gibddList = JSON.parse(JSON.parse(eventResponse.response).data);
        if (gibddList.length > 0) {
          this.rasmModal.visible = true;
          this.rasmModal.rasmList = gibddList;
        }
      } else {
        this.clearRasmSost();
      }
    },
    async onRasmClick(data) {
      this.data.organRasmId = data.ID;
      this.data.organRasmKod = data.ORGAN_KOD;
      this.data.organRasmName = data.ORGAN_NAME;
      this.rasmModal.visible = false;
      this.rasmModal.rasmList = null;
      await this.storeElementData();
    },
    async clearRasmSost() {
      this.data.organRasmId = null;
      this.data.organRasmKod = null;
      this.data.organRasmName = null;
      await this.storeElementData();
    },
    async showInspUtvModal(visible) {
      if (funcUtils.isEmpty(this.inspUtvModal.srcList)) {
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
        this.inspUtvModal.srcList = JSON.parse(JSON.parse(eventResponse.response).data);
      }
      if (visible) {
        this.inspUtvModal.inspUtvList = this.inspUtvModal.srcList;
      } else {
        this.inspUtvModal.inspUtvList = null;
      }
      this.inspUtvModal.visible = visible;
    },
    async changeInspUtvKod() {
      if (funcUtils.isNotEmpty(this.data.inspUtvKod)) {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getSinspList',
            data: JSON.stringify({
              inspKod: this.data.inspUtvKod
            })
          }
        });
        await this.clearInspUtv();
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isNotEmpty(data) && data.length > 0) {
          data = data.getFirst();
          this.data.inspUtvId = data.inspId;
          this.data.inspUtvKod = data.inspKod;
          this.data.inspUtvName = data.inspName;
          this.data.inspUtvDolz = data.inspDolz;
          this.data.inspUtvRang = data.inspRang;
          await this.storeElementData();
        }
      } else {
        this.clearInspUtv();
      }
    },
    async onInspUtvClick(data) {
      this.data.inspUtvId = data.inspId;
      this.data.inspUtvKod = data.inspKod;
      this.data.inspUtvName = data.inspName;
      this.data.inspUtvDolz = data.inspDolz;
      this.data.inspUtvRang = data.inspRang;
      this.inspUtvModal.visible = false;
      this.inspUtvModal.inspUtvList = null;
      await this.storeElementData();
    },
    async clearInspUtv() {
      this.data.inspUtvId = null;
      this.data.inspUtvKod = null;
      this.data.inspUtvName = null;
      this.data.inspUtvDolz = null;
      this.data.inspUtvRang = null;
      await this.storeElementData();
    },
  }
}
