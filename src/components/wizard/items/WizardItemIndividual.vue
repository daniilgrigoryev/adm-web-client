<template>
  <div v-if="data" style="margin-bottom: 50px; border-bottom: 1px solid black;">
    <div>
      <div>
        <span>ФИО</span>

        <input v-model="fio" @change="changeFIO" />
      </div>

      <div>
        <span>ДР</span>

        <input type="date" v-model="data.birthdayDay" @change="storeElementData" />
      </div>

      <div>
        <span>Место рождения</span>

        <Select v-model="data.birthMestoKod" filterable clearable @on-change="storeElementData">
          <Option v-for="item in birthList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
        </Select>
      </div>

      <div>
        <span>Гражданство</span>

        <Select v-model="data.gragdKod" filterable clearable @on-change="storeElementData">
          <Option v-for="item in gragdanstvoList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
        </Select>
      </div>

      <div>
        <span>Пол</span>

        <input v-model="data.sex" @change="storeElementData" />
      </div>

      <div>
        <span>Телефон</span>

        <input v-model="data.phone" @change="storeElementData" />
      </div>
      <div>
        <span>Место работы</span>

        <input v-model="data.workPlace" @change="storeElementData" />
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "WizardItemIndividual",
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        birthList: null,
        gragdanstvoList: null,
        fio: null
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

        this.parseFIO();

        await this.fillBirthList();
        await this.fillGragdanstvoList();
      },
      async fillBirthList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getBirthMestoDictionary',
            data: null
          }
        });
        let birthList = [];
        let birthDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < birthDict.length; i++) {
          let birth = birthDict[i];
          birthList.push({
            label: birth.BIRTH_MESTO,
            value: birth.BIRTH_MESTO_KOD
          });
        }
        this.birthList = birthList;
      },
      async fillGragdanstvoList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'invokeElementMethod',
          params: {
            eCID: this.info.eCID,
            methodName: 'getGragdanstvoDictionary',
            data: null
          }
        });
        let gragdanstvoList = [];
        let gragdanstvoDict = JSON.parse(JSON.parse(eventResponse.response).data);
        for (let i = 0; i < gragdanstvoDict.length; i++) {
          let gragdanstvo = gragdanstvoDict[i];
          gragdanstvoList.push({
            label: gragdanstvo.GRAGD_NAME,
            value: gragdanstvo.GRAGD_KOD
          });
        }
        this.gragdanstvoList = gragdanstvoList;
      },
      changeFIO() {
        let fio = '';
        this.data.firstName = null;
        this.data.secondName = null;
        this.data.thirdName = null;
        let fioLength = 0;
        let fioArr = this.fio.split(' ');
        for (let i = 0; i < fioArr.length && fioLength < 3; i++) {
          let express = /^[а-яА-ЯёЁ]+$/;
          let item = fioArr[i];
          if (item.length > 0 && express.test(item)) {
            switch (fioLength) {
              case 0: {
                this.data.firstName = item;
                fio += item;
                break;
              }
              case 1: {
                this.data.secondName = item;
                fio += ' ' + item;
                break;
              }
              case 2: {
                this.data.thirdName = item;
                fio += ' ' + item;
                break;
              }
            }
            fioLength++;
          }
        }
        this.fio = fio;
        this.storeElementData();
      },
      parseFIO () {
        this.fio = '';
        if (funcUtils.isNotEmpty(this.data.firstName)) {
          this.fio += this.data.firstName + ' ';
        }
        if (funcUtils.isNotEmpty(this.data.secondName)) {
          this.fio += this.data.secondName + ' ';
        }
        if (funcUtils.isNotEmpty(this.data.thirdName)) {
          this.fio += this.data.thirdName;
        }
        this.fio = this.fio.trim();
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
