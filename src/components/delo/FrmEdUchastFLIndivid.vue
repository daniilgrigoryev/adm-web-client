<template>
  <div v-if="body">
    <Form :label-width="180" label-position="right">
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Правовой статус</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.uchastStatusName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Вид физического лица</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.uchastVidName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Тип физического лица, Код - Тип</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.uchastTip, body.uchastTipName | concatByDelimiter('-')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Транспортное средство</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.vehs_name" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <hr class="txt-hr my24">

      <h2 class="adm-text-big color-dark-light my12">Физическое лицо</h2>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Фамилия</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.firstName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Имя</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.secondName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Отчество</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.thirdName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Пол</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.sex" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата рождения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.birthdayYear" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Гражданство</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.gragdName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Страховое свидетельство - СНИЛС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.sex" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Адрес регистрации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.address.adrFull" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Место фактического проживания</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.factAddr.adrFull" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Контакты</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.contacts" placeholder="Enter something..."></Input>
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
        <small class="adm-text-small color-gray-medium" slot="label">Место работы</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.workName" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Должность</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dolz" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ИНН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.inn" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Кем выдан ИНН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.individ.innKemVydan" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <hr class="txt-hr my24">

      <h2 class="adm-text-big color-dark-light my12">Проверка данных</h2>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата проверки</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="checkUchastinc.DAT_ISPOLN" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Инициатор проверки</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="checkUchastinc.INIT_NAME" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Штрафы</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkUchastinc.VOD_SHTRAF).value" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Права на управление ТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkUchastinc.VOD_LISH).value" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Ответственность по статье 20.25</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkUchastinc.VOD_2025).value" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Лицо в розыске</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkUchastinc.RLIC).value" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Водительское удостоверение в розыске</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkUchastinc.UDOC_VU).value" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Удостоверение личности в розыске</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkUchastinc.UDOC_UD).value" placeholder="Enter something..."></Input>
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
    name: "FrmEdUchastFLIndivid",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });

        let eventResponse = await RequestApi.prepareData({
          method: 'checkUchastinc',
          cid: currentForm.cid
        });

        this.checkUchastinc = JSON.parse(eventResponse.response).data;
      } catch (e) {
        alert(e.message);
      }
    },
    data() {
      return {
        checkUchastinc: {}
      }
    },
    methods: {
      getCheckName(checkKey) {
        switch (checkKey) {
          case '+': {
            return {
              value: 'Да',
              color: ''
            };
          }
          case '-': {
            return {
              value: 'Нет',
              color: ''
            };
          }
          default: {
            return {
              value: 'Нет данных',
              color: ''
            };
          }
        }
      },
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdUchastFLGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      }
    },
  }
</script>

<style scoped>

</style>
