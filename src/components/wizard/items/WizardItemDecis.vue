<template>
  <div v-if="data">
    <Form :label-width="200" abel-position="right">
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Решение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Select class="wmax240 wmin180" placeholder="" v-model="data.decisKod" filterable clearable @on-clear="storeElementData" @on-change="storeElementData">
              <Option v-for="item in decisList" :value="item.value" :key="item.value">{{ item.value + ', ' + item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.shtraf)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Сумма штрафа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.sumShtraf" @on-input-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.lish)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Срок лишения (мес.)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.lishMes" @on-input-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.lish)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата изъятия ВУ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <DatePicker type="date" v-model="data.dateLishBeg" format="dd-MM-yyyy" @on-change="storeElementData" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.discval)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Срок дисквалификации (мес.)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.diskvMes" @on-input-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.arest)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Срок ареста (дни)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.arestDay" @on-input-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.arest)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Время начала ареста</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <DatePicker type="date" v-model="data.arestTimeBeg" format="dd-MM-yyyy" @on-change="storeElementData" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.hoursToWork)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Кол-во часов обяз-х работ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.hoursToWork" @on-input-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.stopWorkDay)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Количество суток</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.stopWorkDay" @on-input-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.stopWorkDay)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата начала</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <DatePicker type="date" v-model="data.stopWorkBeg" format="dd-MM-yyyy" @on-change="storeElementData" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.decis.decis1, decisKods.decis.decis2)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Количество месяцев</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.decisMes" @on-input-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem v-if="data.decisKod && showByDecisKod(decisKods.decis.decis1, decisKods.decis.decis2)" class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Количество дней</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :sm="6" :md="6" :lg="16">
            <Input v-model="data.decisDay" @on-input-change="storeElementData" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
    </Form>
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

        if (funcUtils.isNotEmpty(this.data.dateLishBeg)) {
          this.data.dateLishBeg = new Date(this.data.dateLishBeg);
        }

        if (funcUtils.isNotEmpty(this.data.arestTimeBeg)) {
          this.data.arestTimeBeg = new Date(this.data.arestTimeBeg);
        }

        if (funcUtils.isNotEmpty(this.data.stopWorkBeg)) {
          this.data.stopWorkBeg = new Date(this.data.stopWorkBeg);
        }

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
