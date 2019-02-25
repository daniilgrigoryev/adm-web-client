<template>
  <div v-if="body && viol">
    <!-- данные по делу  -->


    <div>
      <h2 class="adm-h1 adm-font-light color-dark-lighter border-b border--gray-light my18 py6">Основные сведения</h2>
      
      <div class="my24">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">№ дела</small>
                <p class="color-dark-base adm-h3">{{body.deloN}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Стадия дела</small>
                <p class="color-dark-base adm-h3">{{body.dtadDeloName}}</p>
            </div>
          </Col>
        </Row>
      </div>

      <h2 class="adm-h1 adm-font-light color-dark-lighter border-b border--gray-light my18 py6">Нарушение</h2>
      
      <div class="my24">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Статья АПН</small>
                <p class="color-dark-base adm-h3">{{viol.violStotvKod}}</p>
                <p class="color-dark-base adm-btn-small txt-em wmax240">{{viol.violStotvName}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Документ</small>
                <p class="color-dark-base adm-h3">{{body.docVozbName}}</p>
            </div>
          </Col>
        </Row>
      </div>

      <div class="my24">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Место нарушения</small>
                <p class="color-dark-base adm-h3">{{viol.violPlaceNarFull}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Дата и Время нарушения</small>
                <p class="color-dark-base adm-h3">{{viol.violDatNar | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
            </div>
          </Col>
        </Row>
      </div>

      <div class="my24">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">ЛВОК</small>
                <p class="color-dark-base adm-h3">{{viol.lvokName}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Транспортное средство, ГРЗ</small>
                <p class="color-dark-base adm-h3">{{viol.vehsName}}</p>
            </div>
          </Col>
        </Row>
      </div>

      <h2 class="adm-h1 adm-font-light color-dark-lighter border-b border--gray-light my18 py6">Решение по делу</h2>

      <div class="my24">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Дата возбуждения</small>
                <p class="color-dark-base adm-h3">{{body.deloDate | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Орган</small>
                <p class="color-dark-base adm-h3">{{body.organVozbName}}</p>
                <p class="color-dark-base adm-btn-small txt-em wmax240">Код подразделения: {{body.organVozbKod}}</p>
            </div>
          </Col>
        </Row>
      </div>
      <div class="my24">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Дело основание</small>
                <p  class="color-dark-base adm-h3">
                  <span v-if="body.deloMainDescr">{{body.deloMainDescr}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">ФИО сотрудника, Звание, Должность</small>
                <p class="color-dark-base adm-h3">{{body.inspVozbName}}</p>
                <p class="color-dark-base adm-btn-small txt-em wmax240">{{ body.inspVozbRang, body.inspVozbDolz | concatByDelimiter(',') }}</p>
            </div>
          </Col>
        </Row>
      </div>

      <h2 class="adm-h1 adm-font-light color-dark-lighter border-b border--gray-light my18 py6">Данные видеофиксации</h2>

      <div class="my24">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Название комплекса видеофиксации</small>
                <p class="color-dark-base adm-h3">
                  <span v-if="viol.vfixName">{{viol.vfixName}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Уникальный номер комплекса</small>
                <p class="color-dark-base adm-h3">
                  <span v-if="viol.vfixNum">{{viol.vfixNum}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>

      <div class="my24">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Серитфикат поверки комплекса</small>
                <p class="color-dark-base adm-h3">
                  <span v-if="viol.vfixAkt">{{viol.vfixAkt}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-text-small color-dark-base">Серитфикат действителен до</small>
                <p class="color-dark-base adm-h3">
                  <span v-if="viol.vfixDatend">{{viol.vfixDatend | formatDateTime('DD.MM.YYYY HH:mm')}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>




    <div class="adm-form">
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">По статье Административного Кодекса</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.stotvName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Вид</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.deloVidName" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>
        <hr class="txt-hr my24">
        <h2 class="adm-text-big color-dark-light my12">Решение по делу</h2>
        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Личный номер сотрудника</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.inspVozbKod" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </div>


        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Стадия приемки</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.dtadDeloName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Местонахождение</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.ogaiNahName" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Примечания</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="body.dopSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </div>

        <hr class="txt-hr my24">
        <h2 class="adm-text-big color-dark-light my12">Сведения</h2>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Уникальный номер административного правонарушения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="viol.mvidFisFull" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>


        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">По пункту Нормативно-Правового Акта</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.violPnpaName" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </div>


        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Код бютжетной классификации</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.kbk" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Фактические сведения по нарушению</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.violFactSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </div>


        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Дополнительные сведения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.violDopSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </div>

        <div class="my12 adm-form__item">
          <small class="adm-text-small color-gray-medium adm-form__label">Содержание алкголя в крови %, мг/л</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input class="adm-input adm-input--regular" readonly :value="viol.alcoholInExpAir" placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </div>
    </div>

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
