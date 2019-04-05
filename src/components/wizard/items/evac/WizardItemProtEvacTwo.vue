<template>
  <div v-if="data">
    <wizard-modal v-if="dolzModal.visible" :columnsOptions="dolzModal.columnsOptions" :data="dolzModal.sispList" @showModal="showDolzModal" @onRowDbClick="onSispClick"></wizard-modal>
    <wizard-modal v-if="organModal.visible" :columnsOptions="organModal.columnsOptions" :data="organModal.gibddList" @showModal="showOrganModal" @onRowDbClick="onGibddClick"></wizard-modal>

    <div class="adm-form__item">
      <small class="adm-form__label">Должностное лицо</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="4" :md="4" :lg="4">
            <Input class="adm-input adm-input--regular" v-model="data.inspSostKod" @on-input-change="changeInspSostKod" ></Input>
          </Col>
          <Col :xs="18" :md="18" :lg="18">
            <Input class="adm-input adm-input--regular" disabled v-model="data.inspSostName" @on-input-change="changeFIO" ></Input>
          </Col>
          <Col :xs="2" :md="2" :lg="2">
            <Button @click="showDolzModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="30" />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
    <div class="adm-form__item">
      <small class="adm-form__label">Подразделение</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="4" :md="4" :lg="4">
            <Input class="adm-input adm-input--regular" v-model="data.organSostKod" @on-input-change="changeOrganSostKod" ></Input>
          </Col>
          <Col :xs="18" :md="18" :lg="18">
            <Input class="adm-input adm-input--regular" disabled v-model="data.organSostName" @on-input-change="changeOrganSostKod" ></Input>
          </Col>
          <Col :xs="2" :md="2" :lg="2">
            <Button @click="showOrganModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
              <Icon type="ios-bookmarks-outline" class=" " title="Список должностных лиц" :size="30" />
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../../assets/js/api/formStack';
  import RequestApi from "../../../../assets/js/api/requestApi";
  import DatePickerMask from "~/components/shared/dateTimePicker/DatePickerMask";
  import WizardModal from "~/components/wizard/items/WizardModal";
  import MaskedInput from "~/components/shared/MaskedInput";
  import wizardItemProtTwoMethods from "~/components/mixins/prot/wizardItemProtTwoMethods";

  export default {
    name: "WizardItemProtEvacTwo",
    mixins: [wizardItemProtTwoMethods],
    components: {
      WizardModal, 
      DatePickerMask, 
      MaskedInput
    },
    props: {
      info: Object
    },
    async created() {
      await this.initData();
    },
    data() {
      return {
        data: null,
        maskInputProt: {
          regex: '[0-9]+',
          casing: 'upper',
          placeholder: 'номер протокола'
        },
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
        let data = JSON.parse(JSON.parse(eventResponse.response).data);
        if (funcUtils.isEmpty(data)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          this.data = data;
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
