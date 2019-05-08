<template>
  <aside-template :listSectionNav="[]" title="Оплата штрафа" v-if="ispoln">
    <div class="layout-wrap">
      <div class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding">Оплата штрафа</h2>
            <div class="adm-form__content">
              <div class="adm-form__item">
                <small class="adm-form__label">Дата оплаты штрафа</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <DatePickerMask class="adm-input adm-input--regular wmax240" v-model="ispoln.dateStadIspoln" readonly @change="store" clearable type="date" placeholder="дд/мм/гггг" momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DatePickerMask>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">Сумма оплаты штрафа</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <masked-input inputClass="adm-input adm-input--regular wmax240" v-model="ispoln.sumOpl" @onInputChange="store" :maskProps="{regex: '[0-9]+', casing: 'upper', placeholder: ''}" clearable></masked-input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-form__label">УИП</small>
                <div class="adm-form__item_content">
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular wmax240" v-model="ispoln.uip" @on-input-change="store" placeholder=""></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot-wrap">
      <Button @click="getPrev" type="text">Отменить изменения</Button>
      <Button @click="save" type="primary" class="ml12">Сохранить</Button>
    </div>
  </aside-template>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "FrmEdIspolnEdit",
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      MaskedInput: () => import('~/components/shared/MaskedInput'),
      DatePickerMask: () => import('~/components/shared/dateTimePicker/DatePickerMask')
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdIspolnEditSetCid', current.cid);
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.node)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'node': this.$route.params.node
          };
        }
        let eventResponse = await RequestApi.prepareData(prepareParams);
        let ispoln = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(ispoln)) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg,});
        } else {
          this.ispoln = ispoln;
        }
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message.error,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdIspolnEditSetCid', null);
      this.$store.dispatch('frmEdIspolnEditSetData', null);
    },
    data() {
      return {
        ispoln: null,
      }
    },
    methods: {
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.ispoln
          }
        });
      },
      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'update'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          this.$store.dispatch('errors/changeContent', {title: error.errorMsg,});
        } else {
          this.getPrev();
        }
      },
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message.error,});
        }
      },
    },
  }
</script>
