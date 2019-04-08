<template>
  <div v-if="data">
    <wizard-modal v-if="rasmModal.visible" :columnsOptions="rasmModal.columnsOptions" :data="rasmModal.rasmList" @showModal="showRasmModal" @onRowDbClick="onRasmClick"></wizard-modal>

    <div class="adm-form__item">
      <small class="adm-form__label">Подразделение</small>
      <div class="adm-form__item_content">
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="4" :md="4" :lg="4">
            <Input class="adm-input adm-input--regular" v-model="data.organRasmKod" @on-input-change="changeRasmKod"></Input>
          </Col>
          <Col :xs="18" :md="18" :lg="18">
            <Input class="adm-input adm-input--regular" disabled v-model="data.organRasmName"></Input>
          </Col>
          <Col :xs="2" :md="2" :lg="2">
            <Button @click="showRasmModal(true)" type="text" style="outline: 0!important; box-shadow: none; padding: 0;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus">
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
  import wizardItemProtApnFiveMethods from "~/components/mixins/prot/wizardItemProtApnFiveMethods";

  export default {
    name: "WizardItemProtApnFive",
    mixins: [wizardItemProtApnFiveMethods],
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
        data: null
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
