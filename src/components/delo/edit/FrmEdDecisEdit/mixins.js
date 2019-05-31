import RequestApi from "~/assets/js/api/requestApi";
import * as formStack from '~/assets/js/api/formStack';
export default {
  props: {
    decis: {
      type: Object,
      default: {}
    },
  },
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
      },
    }
  },
  methods: {
    store() {
      this.$emit("store");
    },
    changeOrganNapravlKod() {
      this.$emit("changeOrganNapravlKod");
    },
    showDolzModal() {
      this.$emit("showDolzModal");
    },
    showOrganModal() {
      this.$emit("showOrganModal");
    },
    getPlaceSost() {
      this.$emit("getPlaceSost");
    },
    calcDateVstup() {
      this.$emit("calcDateVstup");
    },
  },
}
