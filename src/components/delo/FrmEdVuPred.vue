<template>
  <div v-if="body">
    <Form :label-width="180" label-position="right">

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Вид предъявленного документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.docTipName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Номер документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.vuN" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата выдачи</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateVyd | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Срок действия</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateSrok | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Кем выдан документ. Код - Название организации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.ogaiVydKod, body.ogaiVydName | concatByDelimiter('-')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дополнительные сведения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.remarks" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Предъявленный документ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.vuPred" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Статус документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.statusName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата задержания</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateZader | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата возврата</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateVozv | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата утилизации документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateUtil | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата утраты документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateUtrat | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

    </Form>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdVuPred",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        await this.$store.dispatch('frmEdVuPredSetCid', currentForm.cid);

        let prepareParams = {
          method: 'restore',
          cid: currentForm.cid
        };
        if (funcUtils.isEmpty(currentForm.restore)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'node': currentForm.params
          };
        }
        delete currentForm['restore'];
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdVuPredSetCid', null);
      this.$store.dispatch('frmEdVuPredSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdVuPredGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
    },
  }
</script>

<style scoped>

</style>
