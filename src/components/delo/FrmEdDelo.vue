<template>
  <div v-if="body && viol" class="px36 pb6">
    <!-- данные по делу  -->

    <!-- <Button @click="getDeloEdit" type="primary" class="ml12">Редактировать</Button> -->


    <div>

      <div class="flex-parent flex-parent--center-cross">
        <h2 class="adm-15 adm-font-light color-dark-lighter">Основные сведения</h2>
        <Button  @click="getDeloEdit" type="text" style="outline: 0!important;" class="px0 py0 mx12 my6 cursor-pointer border" title="Редактировать">
          <img src='../../assets/images/pen.svg' class="wmax-none">
        </Button>
      </div>

      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">№ дела</small>
                <p class="color-dark-base adm-txt-regular">{{body.deloN}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Стадия дела</small>
                <p class="color-dark-base adm-txt-regular">{{body.dtadDeloName}}</p>
            </div>
          </Col>
        </Row>
      </div>

      <h2 class="adm-15 adm-font-light color-dark-lighter border-t border--gray-light my1 py6">Нарушение</h2>
      
      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Статья АПН</small>
                <p class="color-dark-base adm-txt-regular">{{viol.violStotvKod}}</p>
                <p class="color-dark-base adm-btn-small txt-em wmax240">{{viol.violStotvName}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Документ</small>
                <p class="color-dark-base adm-txt-regular">{{body.docVozbName}}</p>
            </div>
          </Col>
        </Row>
      </div>

      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Место нарушения</small>
                <p class="color-dark-base adm-txt-regular">{{viol.violPlaceNarFull}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Дата и Время нарушения</small>
                <p class="color-dark-base adm-txt-regular">{{viol.violDatNar | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
            </div>
          </Col>
        </Row>
      </div>

      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">ЛВОК</small>
                <p class="color-dark-base adm-txt-regular">{{viol.lvokName}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Транспортное средство, ГРЗ</small>
                <p class="color-dark-base adm-txt-regular">{{viol.vehsName}}</p>
            </div>
          </Col>
        </Row>
      </div>

      <h2 class="adm-15 adm-font-light color-dark-lighter border-t border--gray-light my1 py6">Решение по делу</h2>

      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Дата возбуждения</small>
                <p class="color-dark-base adm-txt-regular">{{body.deloDate | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Орган</small>
                <p class="color-dark-base adm-txt-regular">{{body.organVozbName}}</p>
                <p class="color-dark-base adm-btn-small txt-em wmax240">Код подразделения: {{body.organVozbKod}}</p>
            </div>
          </Col>
        </Row>
      </div>
      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Дело основание</small>
                <p  class="color-dark-base adm-txt-regular">
                  <span v-if="body.deloMainDescr">{{body.deloMainDescr}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">ФИО сотрудника, Звание, Должность</small>
                <p class="color-dark-base adm-txt-regular">{{body.inspVozbName}}</p>
                <p class="color-dark-base adm-btn-small txt-em wmax240">{{ body.inspVozbRang, body.inspVozbDolz | concatByDelimiter(',') }}</p>
            </div>
          </Col>
        </Row>
      </div>

      <h2 class="adm-15 adm-font-light color-dark-lighter border-t border--gray-light my1 py6">Данные видеофиксации</h2>

      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Название комплекса видеофиксации</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.vfixName">{{viol.vfixName}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Уникальный номер комплекса</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.vfixNum">{{viol.vfixNum}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>

      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Название комплекса видеофиксации</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.vfixName">{{viol.vfixName}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Уникальный номер комплекса</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.vfixNum">{{viol.vfixNum}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>

      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">По статье Административного Кодекса</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="body.stotvName">{{body.stotvName}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Вид</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="body.deloVidName">{{body.deloVidName}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>

      <h2 class="adm-15 adm-font-light color-dark-lighter border-t border--gray-light my1 py6">Решение по делу</h2>
      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Личный номер сотрудника</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="body.inspVozbKod">{{body.inspVozbKod}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Стадия приемки</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="body.dtadDeloName">{{body.dtadDeloName}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>
      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Местонахождение</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="body.ogaiNahName">{{body.ogaiNahName}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Примечания</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="body.dopSved">{{body.dopSved}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>
      <h2 class="adm-15 adm-font-light color-dark-lighter border-t border--gray-light my1 py6">Сведения</h2>
      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Уникальный номер административного правонарушения</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.mvidFisFull">{{viol.mvidFisFull}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">По пункту Нормативно-Правового Акта</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.violPnpaName">{{viol.violPnpaName}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>
      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Код бютжетной классификации</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.kbk">{{viol.kbk}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Фактические сведения по нарушению</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.violFactSved">{{viol.violFactSved}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>
      <div class="my18">
        <Row type="flex">
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Дополнительные сведения</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.violDopSved">{{viol.violDopSved}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
          <Col :xs="24" :md="12" :lg="12">
            <div>
                <small class="adm-12 color-dark-lighter">Содержание алкголя в крови %, мг/л</small>
                <p class="color-dark-base adm-txt-regular">
                  <span v-if="viol.alcoholInExpAir">{{viol.alcoholInExpAir}}</span>
                  <span v-else>отсутствует</span>
                </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>



    <h1 class="adm-h1 color-dark-lighter">Ошибки</h1>
    <hr class="txt-hr my12">

    <table class='adm-table-simple table table--fixed border--0'>
      <thead>
        <tr class="bg-white-light">
          <th class="w36"></th>
          <th class="w120">
            <p class="adm-15 txt-normal color-dark-light">Код ошибки</p>
          </th>
          <th class="w180">
            <p class="adm-15 txt-normal color-dark-light">Проверил</p>
          </th>
          <th class="w180">
            <i class="adm-15 txt-normal color-dark-light">Время проверки</i>
          </th>
          <th>
            <p class="adm-15 txt-normal color-dark-light">Ошибка</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(error, index) in errors">
          <td class="align-center align-middle">
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
            <p class="adm-txt-regular">{{error.checkDate | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
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

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDeloGetCommand, async () => {
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
      },
      getDeloEdit() {
        try {
          let current = formStack.getCurrent();
          let currentForm = innerFormStack.getCurrent({
            uid: current.moduleName
          });
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDeloEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
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
