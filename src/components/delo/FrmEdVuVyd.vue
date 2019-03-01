<template>
  <div v-if="body">

    <Button @click="getVuVydEdit" type="primary" class="ml12">Редактировать</Button>

    <div class="adm-form">

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Вид предъявленного документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.docTipName" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Номер документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.vuN" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата выдачи</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateVyd | formatDateTime('DD.MM.YYYY HH:mm')" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Срок действия</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateSrok | formatDateTime('DD.MM.YYYY HH:mm')" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Личный номер сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspVydKod" placeholder=""""></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ФИО сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspVydName" placeholder=""""></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Должность сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspVydDolz" placeholder=""""></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Звание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspVydRang" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Кем выдан документ. Код - Название организации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.ogaiVydKod, body.ogaiVydName | concatByDelimiter('-')" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дополнительные сведения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.remarks" placeholder="""" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Предъявленный документ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.vuPred" placeholder="""" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Статус документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.statusName" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата утилизации документа</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateUtil | formatDateTime('DD.MM.YYYY HH:mm')" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdVuVyd",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        await this.$store.dispatch('frmEdVuVydSetCid', currentForm.cid);

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

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdVuVydGetCommand, async () => {
          try {
            let current = formStack.getCurrent();
            let currentForm = innerFormStack.getCurrent({
              uid: current.moduleName
            });
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            alert(e.message);
          }
        });
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdVuVydSetCid', null);
      this.$store.dispatch('frmEdVuVydSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdVuVydGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
    },
    methods: {
      getVuVydEdit() {
        try {
          let current = formStack.getCurrent();
          let currentForm = innerFormStack.getCurrent({
            uid: current.moduleName
          });
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdVuVydEdit,
            vm: this,
            notRemoved: false,
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

<style scoped>

</style>
