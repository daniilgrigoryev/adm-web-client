<template>
  <div v-if="body" class="wmax1280"><!-- mx-auto -->
    <!-- постановление по делу -->

    <Button @click="getDocsPostEdit" type="primary" class="ml12">Редактировать</Button>

  



      <div class="adm-form">
        <div class="adm-form__container">
          <div class="adm-form__content">
            <Row type="flex" :gutter="0">
              <Col :xs="24" :md="24" :lg="12">
                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">Номер постановления</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.docN" ></Input>
                    </Col>
                  </Row>
                </div>
                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">по Постановлению</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.postMainN" ></Input>
                    </Col>
                  </Row>
                </div>
                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">Место составления протокола Постановления</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.placeSost.placeFull"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col :xs="24" :md="24" :lg="12">
                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">Дата постановления</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.dateSost | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
                    </Col>
                  </Row>
                </div>

                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">или по Протоколу</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.protN" ></Input>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div class="adm-form__container">
          <h2 class="adm-text-big color-dark-light adm-form__headding">Постановление составил</h2>
          <div class="adm-form__content">
            <Row type="flex" :gutter="0">
              <Col :xs="24" :md="24" :lg="12">
                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">Личный номер сотрудника</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.inspSostKod" ></Input>
                    </Col>
                  </Row>
                </div>

                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">Должность сотрудника</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.inspSostDolz" ></Input>
                    </Col>
                  </Row>
                </div>
                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">Код подразделения</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.organSostKod" ></Input>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col :xs="24" :md="24" :lg="12">
                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">ФИО сотрудника</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.inspSostName"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                  </Row>
                </div>
                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">Звание</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.inspSostRang" ></Input>
                    </Col>
                  </Row>
                </div>
                <div class="my12 adm-form__item">
                  <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
                  <Row :gutter="16" type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.organSostName"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>

         <div class="adm-form__container">
            <h2 class="adm-text-big color-dark-light adm-form__headding">Нарушение</h2>
            <div class="adm-form__content">
              <Row type="flex" :gutter="0">
                <Col :xs="24" :md="24" :lg="12">
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Дата и Время нарушения</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.dateNar | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
                      </Col>
                    </Row>
                  </div>

                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Участник</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.uchastName" ></Input>
                      </Col>
                    </Row>
                  </div>

                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Адрес прописки</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.placeAdr.placeFull"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                      </Col>
                    </Row>
                  </div>
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Транспортное средство</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.vehsName" ></Input>
                      </Col>
                    </Row>
                  </div>
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">По статье Административного Кодекса</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.stotvName" ></Input>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col :xs="24" :md="24" :lg="12">
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Место нарушения</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.placeNar.placeFull"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                      </Col>
                    </Row>
                  </div>
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Документ участника</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.vuPredN" ></Input>
                      </Col>
                    </Row>
                  </div>
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Местро работы</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.workPlace"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                      </Col>
                    </Row>
                  </div>
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">По пункту Нормативно-Правового Акта</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.pnpaName" ></Input>
                      </Col>
                    </Row>
                  </div>
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Коментарии</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.dopSved"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
         </div>

          <div class="adm-form__container">
            <h2 class="adm-text-big color-dark-light adm-form__headding">Решение по делу</h2>
            <div class="adm-form__content">
              <Row type="flex" :gutter="0">
                  <Col :xs="24" :md="24" :lg="12">
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Решение по правонарушению</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.decisName" ></Input>
                      </Col>
                    </Row>
                  </div>
                  </Col>
                  <Col :xs="24" :md="24" :lg="12">
                  <div class="my12 adm-form__item">
                    <small class="adm-text-small color-gray-medium adm-form__label">Дата вручения постановления</small>
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" readonly :value="body.datUved | formatDateTime('DD.MM.YYYY HH:mm')" ></Input>
                      </Col>
                    </Row>
                  </div>
                  </Col>
              </Row>
            </div>
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

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDocsPostGetCommand, async () => {
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
    methods: {
      getDocsPostEdit() {
        try {
          let current = formStack.getCurrent();
          let currentForm = innerFormStack.getCurrent({
            uid: current.moduleName
          });
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsPostEdit,
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
