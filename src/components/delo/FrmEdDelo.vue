<template>
  <div v-if="body && viol">
    <!-- данные по делу  -->
    <Form :label-width="180" label-position="right">
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Номер Дела</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.deloN" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дата возбуждения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.deloDate | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
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
        <small class="adm-text-small color-gray-medium" slot="label">Вид</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.deloVidName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Стадия дела</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dtadDeloName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>
        <hr class="txt-hr my24">

        <h2 class="adm-text-big color-dark-light my12">Решение по делу</h2>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Документ возбудивший дело</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.docVozbName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Личный номер сотрудника</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.inspVozbKod" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">ФИО сотрудника, Звание, Должность</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.inspVozbName + ', ' + body.inspVozbRang + ', ' + body.inspVozbDolz" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Код подразделения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.organVozbKod" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Подразделение</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.organVozbName" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Стадия приемки</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.dtadDeloName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Местонахождение</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.ogaiNahName" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дело основание</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.deloMainDescr" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Примечания</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.dopSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <hr class="txt-hr my24">
        <h2 class="adm-text-big color-dark-light my12">Сведения</h2>

      <FormItem class="my12">
        <small class="adm-text-small color-gray-medium" slot="label">Уникальный номер административного правонарушения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="viol.mvidFisFull" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дата и Время нарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.violDatNar | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Место нарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.violPlaceNarFull" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Лицо в отношении которого ведется дело</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.lvokName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Транспортное средство, ГРЗ</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.vehsName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">По пункту Нормативно-Правового Акта</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.violPnpaName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">По статье Административного Кодекса</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.violStotvKod + ', ' +viol.violStotvName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Код бютжетной классификации</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.kbk" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Фактические сведения по нарушению</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.violFactSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>


        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дополнительные сведения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.violDopSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Содержание алкголя в крови %, мг/л</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.alcoholInExpAir" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <hr class="txt-hr my24">
        <h2 class="adm-text-big color-dark-light my12">Данные видеофиксации</h2>


        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Название комплекса видеофиксации</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.vfixName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Уникальный номер комплекса</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.vfixNumb" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Серитфикат поверки комплекса</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.vfixAkt" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Серитфикат действителен до</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.vfixDatend | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

    </Form>

    <hr class="txt-hr my24">
    <h2 class="adm-text-big color-dark-light my12">Ошибки</h2>


    <table class='table table--fixed border--0'>
      <thead>
        <tr class="bg-white-light">
          <th class="w36">
            
          </th>
          <th class="w120">
            <p class="adm-txt-regular color-dark-light">Код ошибки</p>
          </th>
          <th class="w180">
            <p class="adm-txt-regular color-dark-light">Проверил</p>
          </th>
          <th class="w180">
            <i class="adm-btn-small color-dark-light">Время проверки</i>
          </th>
          <th>
            <p class="adm-txt-regular color-dark-light">Ошибка</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(error, index) in errors">
          <td class="align-center">
            <div class="round-full w12 h12" :class="changeClass(error.priority)">
            </div>
          </td>
          <td>
            <p class="adm-txt-regular">{{error.kod}}</p>
          </td>
          <td>
            <p class="adm-txt-regular">{{error.checkIspName}}</p>
          </td>
          <td>
            <p class="adm-text-small">{{error.checkDate | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
          </td>
          <td>
            <p class="adm-txt-regular">{{error.mesg}}</p>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdDelo",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        await this.$store.dispatch('frmEdDeloSetCid', currentForm.cid);

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
      this.$store.dispatch('frmEdDeloSetCid', null);
      this.$store.dispatch('frmEdDeloSetData', null);
    },
    methods: {
      changeClass(errorPriority) {
        if (funcUtils.isNotEmpty(errorPriority)) {
          switch (errorPriority) {
            case 1: {
              return "bg-red";
            }
            case 2: {
              return "bg-orange";
            }
            case 3: {
              return "bg-yellow";
            }
            case 4: {
              return "bg-green";
            }
            case 5: {
              return "bg-blue";
            }
            case 6: {
              return "bg-purple";
            }
            case 7: {
              return "bg-gray";
            }
            case 8: {
              return "bg-black";
            }
            case 9: {
              return "bg-blue-faint";
            }
            default: {
              return "";
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDeloGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
      viol() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.viol;
        }
        return res;
      },
      errors() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.errors;
        }
        return res;
      },
    },
  }
</script>

<style scoped>

</style>
