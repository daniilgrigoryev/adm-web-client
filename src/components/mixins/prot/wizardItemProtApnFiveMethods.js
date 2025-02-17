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
      }
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
  }
}
