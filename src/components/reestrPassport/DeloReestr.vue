<template>
	<div v-if="dataStore">

    <div>
      <div class="prose my24 border">
        <h4 class="my0 px0 inline align-middle">Верстка:</h4>
        <button  class="txt-kbd" type="button" @click="admAccounting">админ учет</button>
        <button  class="txt-kbd" type="button" @click="admDelo">дело</button>
        <button  class="txt-kbd" type="button" @click="admOffense">возбуждение адм. правонарушения</button>
      </div>


      <div>
        <button type="button" @click="filterClick">Фильтровать</button>
        <button type="button" @click="createWizard">Создать</button>
      </div>
    </div>

    <div>
      <div>
        <span>{{filter.flagYear.name}}</span>

        <RadioGroup v-model="filter.flagYear.value">
          <Radio label="true">Да</Radio>
          <Radio label="false">Нет</Radio>
        </RadioGroup>
      </div>
      <div>
        <Input :placeholder="filter.deloN.name" v-model="filter.deloN.value"></Input>
      </div>
      <div>
        <DatePicker type="date" format="dd-MM-yyyy" v-model="filter.deloDat.value"
                    :placeholder="filter.deloDat.name"></DatePicker>
      </div>
      <div>
        <span>{{filter.docVid.name}}</span>
        <Select v-model="filter.docVid.value" filterable clearable>
          <option value="null"> </option>
          <Option v-for="item in documentVidDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <span>{{filter.stadDeloKod.name}}</span>
        <Select v-model="filter.stadDeloKod.value" filterable clearable>
          <option value="null"> </option>
          <Option v-for="item in stateDeloDict" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <span>{{filter.stotvId.name}}</span>
        <Select v-model="filter.stotvId.value" filterable clearable>
          <option value="null"> </option>
          <Option v-for="item in articleProcDict" :value="item.id" :key="item.id">{{ item.value + ', ' + item.label }}</Option>
        </Select>
      </div>
      <div>
        <Input :placeholder="filter.checkPriority.name" v-model="filter.checkPriority.value"></Input>
      </div>
      <div>
        <Input :placeholder="filter.docN.name" v-model="filter.docN.value"></Input>
      </div>
      <div>
        <Input :placeholder="filter.ulName.name" v-model="filter.ulName.value"></Input>
      </div>
      <div>
        <Input :placeholder="filter.firstName.name" v-model="filter.firstName.value"></Input>
      </div>
      <div>
        <Input :placeholder="filter.secondName.name" v-model="filter.secondName.value"></Input>
      </div>
      <div>
        <Input :placeholder="filter.thirdName.name" v-model="filter.thirdName.value"></Input>
      </div>
      <div>
        <Input :placeholder="filter.birthday.name" v-model="filter.birthday.value"></Input>
      </div>
      <div>
        <Input :placeholder="filter.regno.name" v-model="filter.regno.value"></Input>
      </div>
      <div>
        <Input :placeholder="filter.upi.name" v-model="filter.upi.value"></Input>
      </div>
    </div>

    <div class="bg-white">
      <div class="wmax1280 mx-auto">
        <Table ref="selection" :columns="tableColumns" :data="cases" size="large" :stripe="false" :border="false" height="400"></Table>
      </div>
    </div>

  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "DeloReestr",
    async created() {
      try {
        let current = formStack.getCurrent();
        let cid = funcUtils.getfromLocalStorage(this.$store.state.deloReestr.moduleName);
        let eventResponse = await RequestApi.prepareData({
          method: 'getStageDeloDictionary'
        });
        let stateDeloDict = JSON.parse(eventResponse.response).data;
        stateDeloDict.forEach((item) => {
          this.stateDeloDict.push({
            label: item.values['STAD_DELO_NAME'],
            value: item.values['STAD_DELO_KOD']
          })
        });

        eventResponse = await RequestApi.prepareData({
          method: 'getDocumetVidDictionary'
        });
        let documentVidDict = JSON.parse(eventResponse.response).data;
        documentVidDict.forEach((item) => {
          this.documentVidDict.push({
            label: item.values['DOC_VID_NAME'],
            value: item.values['DOC_VID']
          })
        });

        eventResponse = await RequestApi.prepareData({
          method: 'getArticleProcDictionary'
        });
        let articleProcDict = JSON.parse(eventResponse.response).data;
        articleProcDict.forEach((item) => {
          this.articleProcDict.push({
            label: item.values['STOTV_NAME'],
            value: item.values['STOTV_KOD'],
            id: item.values['STOTV_ID']
          })
        });

        if (funcUtils.isNull(cid)) {
          funcUtils.addToLocalStorage(this.$store.state.deloReestr.moduleName, current.cid);
          eventResponse = await RequestApi.prepareData({
            method: 'getData',
            params: {
              find: null,
              kind: null
            }
          });
        } else {
          eventResponse = await RequestApi.prepareData({
            method: 'restore'
          });

          let filter = JSON.parse(eventResponse.response).data.find;
          if (funcUtils.isNotEmpty(filter)) {
            for (let prop in filter) {
              if (filter.hasOwnProperty(prop)) {
                let item = filter[prop];
                if (this.filter[prop] && funcUtils.isNotEmpty(item)) {
                  this.filter[prop].value = item + '';
                }
              }
            }
          }
        }

        await this.$store.dispatch('deloReestrSetCid', current.cid);
        await this.$store.dispatch('fillModule', {'event': eventResponse});
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('deloReestrSetCid', null);
      this.$store.dispatch('deloReestrSetData', null);
    },
    data() {
      return {
        stateDeloDict: [],
        documentVidDict: [],
        articleProcDict: [],
        filter: {
          flagYear: {
            name: 'Искать только в текущем году',
            value: null
          },
          deloN: {
            name: 'Номер дела',
            value: null
          },
          deloDat: {
            name: 'Дата дела',
            value: null
          },
          docVid: {
            name: 'Тип документа',
            value: null
          },
          stadDeloKod: {
            name: 'Стадия дела',
            value: null
          },
          stotvId: {
            name: 'Ст.ответственности',
            value: null
          },
          checkPriority: {
            name: 'Приоритет ошибки',
            value: null
          },
          docN: {
            name: '№ документа',
            value: null
          },
          ulName: {
            name: 'Наименование ЮЛ',
            value: null
          },
          firstName: {
            name: 'Фамилия',
            value: null
          },
          secondName: {
            name: 'Имя',
            value: null
          },
          thirdName: {
            name: 'Отчество',
            value: null
          },
          birthday: {
            name: 'Дата рождения',
            value: null
          },
          regno: {
            name: 'Рег.знак',
            value: null
          },
          upi: {
            name: 'УПИ (ШПИ)',
            value: null
          }
        },
        columnsOption: []
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'deloReestrGetData'
      }),
      cases() {
        let res = [];
        if (this.dataStore) {
          res = this.dataStore.data.data;
        }
        return res;
      },
      tableColumns() {
        let res = [];
        if (this.dataStore) {
          this.dataStore.data.fields.forEach((item) => {
            switch (item) {
              case 'deloId': {
                res.push({
                  title: 'Код дела',
                  key: 'deloId',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'birthday': {
                res.push({
                  title: 'Дата рождения',
                  key: 'birthday',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'checkPriority': {
                res.push({
                  title: 'Приоритет ошибки',
                  key: 'checkPriority',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'DateStadIspolnLast': {
                res.push({
                  title: 'Дата посл.ст.исп.',
                  key: 'DateStadIspolnLast',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });                break;
              }
              case 'decisDateFirst': {
                res.push({
                  title: 'Дата реш.',
                  key: 'decisDateFirst',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });                break;
              }
              case 'decisDateLast': {
                res.push({
                  title: 'Дата посл.реш.',
                  key: 'decisDateLast',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });                break;
              }
              case 'decisNameFirst': {
                res.push({
                  title: 'Перв.реш.',
                  key: 'decisNameFirst',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });                break;
              }
              case 'decisNameLast': {
                res.push({
                  title: 'Посл.реш.',
                  key: 'decisNameLast',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });                break;
              }
              case 'deloDate': {
                res.push({
                  title: 'Дата оформления',
                  key: 'deloDate',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });                break;
              }
              case 'deloN': {
                res.push({
                  title: 'Номер дела',
                  key: 'deloN',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'deloVidName': {
                res.push({
                  title: 'Вид дела',
                  key: 'deloVidName',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'docN': {
                res.push({
                  title: 'Протокол',
                  key: 'docN',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'lockName': {
                res.push({
                  title: 'Блок.дела',
                  key: 'lockName',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'lvokName': {
                res.push({
                  title: 'ЛВОК',
                  key: 'lvokName',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'opredN': {
                res.push({
                  title: 'Определение/Доп.прот.',
                  key: 'opredN',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'postN': {
                res.push({
                  title: 'Постан./ПК',
                  key: 'postN',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'protN': {
                res.push({
                  title: 'Протокол АПН',
                  key: 'protN',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'regno': {
                res.push({
                  title: 'РегЗнак',
                  key: 'regno',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'stadDeloName': {
                res.push({
                  title: 'Стадия',
                  key: 'stadDeloName',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'stadIspolnNameLast': {
                res.push({
                  title: 'Посл.ст.исп.',
                  key: 'stadIspolnNameLast',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'stotv': {
                res.push({
                  title: 'Статья',
                  key: 'stotv',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'stotvKod': {
                res.push({
                  title: 'Ст.-основание',
                  key: 'stotvKod',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'uchastName': {
                res.push({
                  title: 'Участник',
                  key: 'uchastName',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
              case 'ulName': {
                res.push({
                  title: 'Участник',
                  key: 'ulName',
                  minWidth: 120,
                  ellipsis: true,
                  tooltip: true,
                  renderHeader: (h, params) => {
                    return h('h4', params.column.title)
                  }
                });
                break;
              }
            }
          });
          if (res.length > 0) {
            res.push({
              title: "Действия",
              width: 80,
              align: "center",
              visible: true,
              fixed: "right",
              renderHeader: (h, params) => {
                return h('Tooltip', {
                  props: {
                    placement: 'left',
                    content: params.column.title,
                    transfer: true,
                  }
                }, [
                  h('span', params.column.title)
                ])
              },
              render: (h, params) => {
                return h("Icon", {
                  props: {
                    type: "ios-open-outline",
                    size: 18,
                  },
                  style: {
                    cursor: "pointer",
                    color: "#2d8cf0"
                  },
                  attrs: {
                    title: 'открыть'
                  },
                  on: {
                    click: () => {
                      this.getDelo(params.row.deloId);
                    }
                  }
                });
              },
            });
          }
        }
        return res;
      },
    },
    methods: {
      getFilterFields() {
        let filterObj = {};
        let filter = this.filter;
        for (let prop in filter) {
          if (filter.hasOwnProperty(prop)) {
            let propObj = filter[prop];
            if (funcUtils.isNotEmpty(propObj.value) && (propObj.value === "null" || propObj.value.length === 0)) {
              propObj.value = null;
            }
            filterObj[prop] = propObj.value;
          }
        }

        return filterObj;
      },
      async filterClick() {
        let filter = this.getFilterFields();
        let eventResponse = await RequestApi.prepareData({
          method: 'getData',
          params: {
            find: filter,
            kind: null
          }
        });
        await this.$store.dispatch('fillModule', {'event': eventResponse});
      },
      admAccounting() {
        try {
          formStack.toNext({
            module: this.$store.state.accounting,
            vm: this,
            notRemoved: true,
            withCreate: false
          });
        } catch (e) {
          alert(e.message);
        }
      },
      admOffense() {
        try {
          formStack.toNext({
            module: this.$store.state.offense,
            vm: this,
            notRemoved: true,
            withCreate: false
          });
        } catch (e) {
          alert(e.message);
        }
      },
      admDelo() {
        try {
          formStack.toNext({
            module: this.$store.state.delo,
            vm: this,
            notRemoved: true,
            withCreate: false
          });
        } catch (e) {
          alert(e.message);
        }
      },
      getDelo(deloId) {
        try {
          let params = {
            deloId: deloId
          };

          formStack.toNext({
            module: this.$store.state.deloTreeCardView,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
      createWizard() {
        try {
          let params = {
            scenarioName: 'CreatePost'
          };

          formStack.toNext({
            module: this.$store.state.wizardExecuter,
            vm: this,
            notRemoved: true,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
    }
  }
</script>

<style lang='scss' scoped>
</style>
