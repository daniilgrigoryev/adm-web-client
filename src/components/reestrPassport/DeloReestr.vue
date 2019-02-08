<template>
	<div v-if="dataStore">

    <div>
      <div>
        <span>{{filter.flagYear.name}}</span>
        <input name="one" type="radio" v-model="filter.flagYear.value" />
        <input name="one" type="radio" v-model="filter.flagYear.value" />
      </div>
      <div>
        <span>{{filter.deloN.name}}</span>
        <input type="text" v-model="filter.deloN.value" />
      </div>
      <div>
        <span>{{filter.deloDat.name}}</span>
        <input type="date" v-model="filter.deloDat.value" />
      </div>
      <div>
        <span>{{filter.docVid.name}}</span>
        <select v-model="filter.docVid.value" :name="filter.docVid.value">
          <option value="null"> </option>
          <option v-for="(item, index) in this.documentVidDict" v-model="item.value" :value="item.value" :key="index">{{item.label}}</option>
        </select>
      </div>
      <div>
        <span>{{filter.stadDeloKod.name}}</span>
        <select v-model="filter.stadDeloKod.value" :name="filter.stadDeloKod.value">
          <option value="null"> </option>
          <option v-for="(item, index) in this.stateDeloDict" v-model="item.value" :value="item.value" :key="index">{{item.label}}</option>
        </select>
      </div>
      <div>
        <span>{{filter.stotvId.name}}</span>
        <select v-model="filter.stotvId.value" :name="filter.stotvId.value">
          <option value="null"> </option>
          <option v-for="(item, index) in this.articleProcDict" v-model="item.value" :value="item.value" :key="index">{{item.label}}</option>
        </select>
      </div>
      <div>
        <span>{{filter.checkPriority.name}}</span>
        <input type="number" v-model="filter.checkPriority.value" />
      </div>
      <div>
        <span>{{filter.docN.name}}</span>
        <input type="text" v-model="filter.docN.value" />
      </div>
      <div>
        <span>{{filter.ulName.name}}</span>
        <input type="text" v-model="filter.ulName.value" />
      </div>
      <div>
        <span>{{filter.firstName.name}}</span>
        <input type="text" v-model="filter.firstName.value" />
      </div>
      <div>
        <span>{{filter.secondName.name}}</span>
        <input type="text" v-model="filter.secondName.value" />
      </div>
      <div>
        <span>{{filter.thirdName.name}}</span>
        <input type="text" v-model="filter.thirdName.value" />
      </div>
      <div>
        <span>{{filter.birthday.name}}</span>
        <input type="text" v-model="filter.birthday.value" />
      </div>
      <div>
        <span>{{filter.regno.name}}</span>
        <input type="text" v-model="filter.regno.value" />
      </div>
      <div>
        <span>{{filter.upi.name}}</span>
        <input type="text" v-model="filter.upi.value" />
      </div>

      <div class="prose my24 border">
        <h4 class="my0 px0 inline align-middle">Верстка:</h4>
        <button  class="txt-kbd" type="button" @click="admAccounting">админ учет</button>
        <button  class="txt-kbd" type="button" @click="admDelo">дело</button>
      </div>


      <div>
        <button type="button" @click="filterClick">Фильтровать</button>
        <button type="button" @click="createWizard">Создать</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th v-for="(field, key, index) in tableColumns" :key="index" style="border: 1px solid black;">
            {{key + ' - ' + field}}
          </th>
          <th style="border: 1px solid black;">Операции</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(delo, index) in cases" :key="index">
          <td v-for="(deloField, key, index) in tableColumns" :key="index" style="border: 1px solid black;">
            {{delo[key]}}
          </td>
          <td style="border: 1px solid black;">
            <button type="button" @click="getDelo(delo.deloId)">Открыть дело</button>
          </td>
        </tr>
      </tbody>
    </table>

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
            value: item.values['STOTV_ID']
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
            name: 'flagYear',
            value: null
          },
          deloN: {
            name: 'deloN',
            value: null
          },
          deloDat: {
            name: 'deloDat',
            value: null
          },
          docVid: {
            name: 'docVid',
            value: null
          },
          docVidName: {
            name: 'docVidName',
            value: null
          },
          stadDeloKod: {
            name: 'stadDeloKod',
            value: null
          },
          stadDeloName: {
            name: 'stadDeloName',
            value: null
          },
          stotvId: {
            name: 'stotvId',
            value: null
          },
          stotvKod: {
            name: 'stotvKod',
            value: null
          },
          checkPriority: {
            name: 'checkPriority',
            value: null
          },
          docN: {
            name: 'docN',
            value: null
          },
          ulName: {
            name: 'ulName',
            value: null
          },
          firstName: {
            name: 'firstName',
            value: null
          },
          secondName: {
            name: 'secondName',
            value: null
          },
          thirdName: {
            name: 'thirdName',
            value: null
          },
          birthday: {
            name: 'birthday',
            value: null
          },
          regno: {
            name: 'regno',
            value: null
          },
          upi: {
            name: 'upi',
            value: null
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'deloReestrGetData'
      }),
      cases() {
        let res = {};
        if (this.dataStore) {
          res = this.dataStore.data.data;
        }
        return res;
      },
      tableColumns() {
        let res = {};
        if (this.dataStore) {
          this.dataStore.data.fields.forEach((item) => {
            switch (item) {
              case 'deloId': {
                res[item] = '1';
                break;
              }
              case 'birthday': {
                res[item] = '2';
                break;
              }
              case 'checkPriority': {
                res[item] = '3';
                break;
              }
              case 'DateStadIspolnLast': {
                res[item] = '4';
                break;
              }
              case 'decisDateFirst': {
                res[item] = '5';
                break;
              }
              case 'decisDateLast': {
                res[item] = '6';
                break;
              }
              case 'decisNameFirst': {
                res[item] = '7';
                break;
              }
              case 'decisNameLast': {
                res[item] = '8';
                break;
              }
              case 'deloDate': {
                res[item] = '9';
                break;
              }
              case 'deloN': {
                res[item] = '10';
                break;
              }
              case 'deloVidName': {
                res[item] = '11';
                break;
              }
              case 'docN': {
                res[item] = '12';
                break;
              }
              case 'lockName': {
                res[item] = '13';
                break;
              }
              case 'lvokName': {
                res[item] = '14';
                break;
              }
              case 'opredN': {
                res[item] = '15';
                break;
              }
              case 'postN': {
                res[item] = '16';
                break;
              }
              case 'protN': {
                res[item] = '17';
                break;
              }
              case 'regno': {
                res[item] = '18';
                break;
              }
              case 'stadDeloName': {
                res[item] = '19';
                break;
              }
              case 'stadIspolnNameLast': {
                res[item] = '20';
                break;
              }
              case 'stotv': {
                res[item] = '21';
                break;
              }
              case 'stotvKod': {
                res[item] = '22';
                break;
              }
              case 'uchastName': {
                res[item] = '23';
                break;
              }
              case 'ulName': {
                res[item] = '24';
                break;
              }
            }
          });
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
