<template>
  <div v-if="body">
    <Form :label-width="180" label-position="right">
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Номер ГРЗ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.regno" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Группа ГРЗ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.regnoGroupName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Водитель</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.uchastName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Владелец</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.sobstvName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Примечание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.vehsRem" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </FormItem>

      <hr class="txt-hr my24">

      <h2 class="adm-text-big color-dark-light my12">Сведения об автомобиле</h2>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">VIN номер</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.vin" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Марка</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.markaAvto" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Модель</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.modavtoName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Год выпуска</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.yearVyp" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Модель двигателя</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.motorModel" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Номер двигателя</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.motorN" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Тип двигателя</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.motorTip" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Объем двигателя (куб.см)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.motorVcm3" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Мощность двигателя (кВт)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.motorPowerLc" placeholder="Enter something..."></Input>
            <Input class="adm-input adm-input--regular" readonly :value="body.motorPowerKwt" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Экологический класс двигателя</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.motorEcologClass" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Номер кузова</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.nkuzov" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Номер шасси</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.nshasi" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Тип автомобиля</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.tiptcName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Вид кузова автомобиля</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.tipkuzName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Категория автомобиля</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.katcKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Снаряженная масса автомобиля (кг.)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.massa" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Разрешенная максимальная масса автомобиля (кг.)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.massaMax" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Расположение водителя</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.prizRightRul" placeholder="Enter something..."></Input>
            <Input class="adm-input adm-input--regular" readonly :value="body.prizRightRulName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Цвет автомобиля</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.color" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Основной цвет 1</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.color1" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Основной цвет 2</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.color2" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <hr class="txt-hr my24">

      <h2 class="adm-text-big color-dark-light my12">Документы автомобиля</h2>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Свидетельство о регистрации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.ctc" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Регион учета</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.tcRegionKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Район учета</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.tcRayon" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Номер ПТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.ptcN" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата выдачи</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.ptcDate | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Орган выдавший ПТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.ptcKemVydan" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Завод изготовитель</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.manufactCountryName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Тип двигателя</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.motorTip" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Объем двигателя (куб.см)</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.motorVcm3" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Номер пиолиса ОСАГО</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.osagoN" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата ОСАГО</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.osagoDate | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Название страховой</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.osagoKemVydan" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Срок действия полиса</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.osagoSrok" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <hr class="txt-hr my24">

      <h2 class="adm-text-big color-dark-light my12">Проверки данных</h2>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Дата проверки</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="checkAMTS.DAT_ISPOLN" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Инициатор проверки</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="checkAMTS.INIT_NAME" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Автомобиль в розыске</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkAMTS.UGON_AMTC).value" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">СТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkAMTS.UDOC_CTC).value" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ПТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkAMTS.UDOC_PTS).value" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">ГРЗ</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="getCheckName(checkAMTS.UDOC_REGNO).value" placeholder="Enter something..."></Input>
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
    name: "FrmEdVehsAMTC",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        await this.$store.dispatch('frmEdVehsAMTCSetCid', currentForm.cid);

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

        eventResponse = await RequestApi.prepareData({
          method: 'checkUchastinc',
          cid: currentForm.cid
        });

        this.checkAMTS = JSON.parse(eventResponse.response).data;
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdVehsAMTCSetCid', null);
      this.$store.dispatch('frmEdVehsAMTCSetData', null);
    },
    data() {
      return {
        checkAMTS: {}
      }
    },
    methods: {
      getCheckName(checkKey) {
        switch (checkKey) {
          case '+': {
            return {
              value: 'В розыске',
              color: ''
            };
          }
          case '-': {
            return {
              value: 'В розыске не значится',
              color: ''
            };
          }
          case '?': {
            return {
              value: 'Подозрение на розыск',
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
        dataStore: 'frmEdVehsAMTCGetData'
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
