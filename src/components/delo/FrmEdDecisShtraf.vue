<template>
  <div v-if="body">
    <Form :label-width="180" label-position="right">
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Код - решение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.decisKod + ' - ' + body.decisName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата вынесения решения по делу</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.decisDate | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата вручения постановления</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateUved | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата вступления в законную силу</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateVstup | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Сумма наложенного штрафа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.sumShtraf" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Сумма оплаченного штрафа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.sumOpl" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Сумма неоплаченного штрафа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.sumNopl" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата исполнения решения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateIspoln | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <hr class="txt-hr my24" />

      <h2 class="adm-text-big color-dark-light my12">Решение принял</h2>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Личный номер сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ФИО сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostName" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Должность сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostDolz" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Звание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostRang" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Код подразделения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.organSostKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Подразделение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.organSostName" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Место вынесения решения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.placeDecis.placeFull" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <hr class="txt-hr my24" />

      <h2 class="adm-text-big color-dark-light my12">Решение в отношении</h2>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Участник</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.uchastName" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">По пункту Нормативно-Правового Акта</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.pnpaName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">По статье Административного Кодекса</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.stotvKod + ', ' + body.stotvName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дополнительные сведения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dopSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Основное</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.decisFormtxt" placeholder="Enter something..."></Input>
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
    name: "FrmEdDecisShtraf",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        await this.$store.dispatch('frmEdDecisShtrafSetCid', currentForm.cid);

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
      this.$store.dispatch('frmEdDecisShtrafSetCid', null);
      this.$store.dispatch('frmEdDecisShtrafSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDecisShtrafGetData'
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
