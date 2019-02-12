<template>
  <div v-if="data" style="margin-bottom: 50px; border-bottom: 1px solid black;">
    <div>
      <span>Решение</span>

      <Select v-model="data.decisKod" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
        <Option v-for="item in decisList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
      </Select>
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.shtraf)">
      <span>Сумма штрафа</span>
      <input v-model="data.sumShtraf" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.lish)">
      <span>Срок лишения (мес.)</span>
      <input v-model="data.lishMes" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.lish)">
      <span>Дата изъятия ВУ</span>
      <input v-model="data.dateLishBeg" type="date" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.discval)">
      <span>Срок дисквалификации (мес.)</span>
      <input v-model="data.diskvMes" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.arest)">
      <span>Срок ареста (дни)</span>
      <input v-model="data.arestDay" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.arest)">
      <span>Время начала ареста</span>
      <input v-model="data.arestTimeBeg" type="date" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.hoursToWork)">
      <span>Кол-во часов обяз-х работ</span>
      <input v-model="data.hoursToWork" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.stopWorkDay)">
      <span>Количество суток</span>
      <input v-model="data.stopWorkDay" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.stopWorkDay)">
      <span>Дата начала</span>
      <input v-model="data.stopWorkBeg" type="date" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.decis.decis1, decisKods.decis.decis2)">
      <span>Количество месяцев</span>
      <input v-model="data.decisMes" @change="storeElementData" />
    </div>

    <div v-if="data.decisKod && showByDecisKod(decisKods.decis.decis1, decisKods.decis.decis2)">
      <span>Количество дней</span>
      <input v-model="data.decisDay" @change="storeElementData" />
    </div>

  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemDecis",
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        decisList: null,
        decisKods: {
          shtraf: 65,
          lish: 29,
          discval: 91,
          arest: 90,
          hoursToWork: 71,
          stopWorkDay: 78,
          decis: {
            decis1: 73,
            decis2: 74,
          }
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

        await this.fillDecisList();
      },
      async fillDecisList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getDecisDictionary',
            data: null
          }
        });
        let decisList = [];
        let decisDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < decisDict.length; i++) {
          let decis = decisDict[i];
          decisList.push({
            label: decis.DECIS_NAME,
            value: decis.DECIS_KOD
          });
        }
        this.decisList = decisList;
      },

      showByDecisKod(decisKod, decisKod2) {
        if (funcUtils.isEmpty(decisKod2)) {
          return this.data.decisKod == decisKod;
        } else if (funcUtils.isNotEmpty(decisKod2)) {
          return this.data.decisKod == decisKod || this.data.decisKod == decisKod2;
        }
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
