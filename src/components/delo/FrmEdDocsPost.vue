<template>
  <div v-if="body">
    <!-- постановление по делу -->

    <Form :label-width="180" label-position="right">
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Номер постановления</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.docN" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дата постановления</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.dateSost | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">по Постановлению</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.postMainN" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">или по Протоколу</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.protN" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Место составления протокола Постановления</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.placeSost.placeFull" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <hr class="txt-hr my24">

        <h2 class="adm-text-big color-dark-light my12">Дело составил</h2>

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

        <hr class="txt-hr my24">

        <h2 class="adm-text-big color-dark-light my12">Нарушение</h2>



        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дата и Время нарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.dateNar | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Место нарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.placeNar.placeFull" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Участник</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.uchastName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>



        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Документ участника</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <!--<Input class="adm-input adm-input--regular" readonly :value="body.docTipName" placeholder="Enter something..."></Input>-->
            </Col>
          </Row>
        </FormItem>


        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Адрес прописки</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.placeAdr.placeFull" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>


        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Местро работы</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.workPlace" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>


        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Транспортное средство</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.vehsName" placeholder="Enter something..."></Input>
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
              <Input class="adm-input adm-input--regular" readonly :value="body.stotvName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Коментарии</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.dopSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>


        <hr class="txt-hr my24">

        <h2 class="adm-text-big color-dark-light my12">Решение по делу</h2>


        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Решение по правонарушению</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.decisName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дата вручения постановления</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.datUved | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
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
    name: "FrmEdDocsPost",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        await this.$store.dispatch('frmEdDocsPostSetCid', currentForm.cid);

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
      this.$store.dispatch('frmEdDocsPostSetCid', null);
      this.$store.dispatch('frmEdDocsPostSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDocsPostGetData'
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
