<template>
  <div v-if="body"> <!-- wmax940 mx-auto -->
    <div class="adm-form">
      <div class="adm-form__container" style="padding-left: 90px;">
        <div class="adm-form__content">
          <Row type="flex" :gutter="0">
            <Col :xs="24" :md="24" :lg="12">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">ГРЗ</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.regno" ></Input>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col :xs="24" :md="24" :lg="12">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">СТС</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="getCheckName(checkAMTS.UDOC_CTC).value" ></Input>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row type="flex" :gutter="0">
            <Col :xs="24" :md="24" :lg="24">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Марка, Модель</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular wmax360" readonly :value="body.markaAvto, body.modavtoName | concatByDelimiter(',')"></Input>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row type="flex" :gutter="0">
            <Col :xs="24" :md="24" :lg="12">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Цвет ТС</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.color" ></Input>
                  </Col>
                </Row>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Тип двигателя</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.motorTip" ></Input>
                  </Col>
                </Row>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label ">Тип ТС</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.tiptcName" ></Input>
                  </Col>
                </Row>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Масса без нагрузки</small><!-- Снаряженная масса автомобиля (кг.) -->
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.massa" ></Input>
                  </Col>
                </Row>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">VIN номер</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular" readonly :value="body.vin" ></Input>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col :xs="24" :md="24" :lg="12">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Год выпуска</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.yearVyp" ></Input>
                  </Col>
                </Row>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Экологический класс</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.motorEcologClass" ></Input>
                  </Col>
                </Row>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Категория ТС</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.katcKod" ></Input>
                  </Col>
                </Row>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Максимальная масса</small><!-- Разрешенная максимальная масса автомобиля (кг.) -->
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.massaMax" ></Input>
                  </Col>
                </Row>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">ПТС</small><!-- Номер ПТС -->
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="14" :lg="24">
                    <Input class="adm-input adm-input--regular wmax180" readonly :value="body.ptcN" ></Input>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row type="flex" :gutter="0">
            <Col :xs="24" :md="24" :lg="24">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Владелец</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular wmax360" readonly :value="body.sobstvName" ></Input>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Row type="flex" :gutter="0">
            <Col :xs="24" :md="24" :lg="24">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Водитель</small>
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular wmax360" readonly :value="body.uchastName" ></Input>
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
  import {mapGetters} from 'vuex';

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

        await this.fillComponent({
          vm: this,
          cid: currentForm.cid,
          photos: this.dataStore ? this.dataStore.fotoList : null
        });

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdVehsAMTCGetCommand, async () => {
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

            await this.fillComponent({
              vm: vm,
              cid: currentForm.cid,
              photos: vm.dataStore ? vm.dataStore.fotoList : null
            });
          } catch (e) {
            alert(e.message);
          }
        });
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
        checkAMTS: {},
        photos: []
      }
    },
    methods: {
      async fillComponent(params) {
        let cid = params.cid;
        let photos = params.photos;
        let vm = params.vm;

        /*let eventResponse = await RequestApi.prepareData({
          method: 'checkUchastinc',
          cid: cid
        });
        vm.checkAMTS = JSON.parse(eventResponse.response).data;*/

        vm.photos = [];
        if (photos && photos.length > 0) {
          let item;
          let eventResponse;
          let photo;
          for (let i = 0; i < photos.length; i++) {
            item = photos[i];
            eventResponse = await RequestApi.prepareData({
              method: 'getPhotoBody',
              params: {
                'node': item.id
              },
              cid: cid
            });
            if (eventResponse.response) {
              photo = JSON.parse(eventResponse.response).data;
              vm.photos.push('data:image/jpeg;base64,' + photo);
            }
          }
        }
      },
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

<style scoped lang="scss">

</style>
