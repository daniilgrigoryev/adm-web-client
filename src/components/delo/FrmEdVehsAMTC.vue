<template>
  <div v-if="body" class="ml18 mb18"> <!-- wmax940 mx-auto -->
    <div class="adm-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
          <div class="flex-parent flex-parent--center-cross">
            <Button @click="getVehsAMTCEdit"  type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24 bg-transparent" title="Редактировать">
              <img src='../../assets/images/pen.svg' class="wmax-none">
            </Button>
            <b class="adm-text-big color-dark-lighter">Транспортное средство</b>
          </div>
          <div class="flex-parent flex-parent--end-main">
            <Button type="primary" @click="optionView = 1" class="mx12">v1</Button>
            <Button type="primary" @click="optionView = 2" class="mx12">v2</Button>
          </div>
          <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
            <img src='../../assets/images/wiki.svg' class="wmax-none">
          </Button>
        </div>
    </div>


    <div class="adm-form" v-if="optionView == 1">
      <div class="adm-form__container my6 mx0 py12 px36">
        <div class="adm-form__content">
          <Row type="flex" :gutter="60">
            <Col :xs="24" :md="24" :lg="12">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">ГРЗ</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular err" readonly :value="body.regno" >
                      </Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col :xs="24" :md="24" :lg="12">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">СТС</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.ctc"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row type="flex" :gutter="60">
            <Col :xs="24" :md="24" :lg="24">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Марка, модель</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.markaAvto, body.modavtoName | concatByDelimiter(' ')"></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row type="flex" :gutter="60">
            <Col :xs="24" :md="24" :lg="12">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Цвет</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.color" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Тип двигателя</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.motorTip" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label ">Тип</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.tiptcName" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Масса без нагрузки</small><!-- Снаряженная масса автомобиля (кг.) -->
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.massa" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">VIN</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.vin" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col :xs="24" :md="24" :lg="12">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Год выпуска</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.yearVyp" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Экологический класс</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.motorEcologClass" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Категория</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.katcKod" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Максимальная масса</small><!-- Разрешенная максимальная масса автомобиля (кг.) -->
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.massaMax" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">ПТС</small><!-- Номер ПТС -->
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="14" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.ptcN" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row type="flex" :gutter="60">
            <Col :xs="24" :md="24" :lg="24">
              <div class="adm-form__item">
                <small class="adm-text-small adm-form__label">Владелец</small>
                <div class="adm-form__item_content">
                  <Row type="flex" align="middle">
                    <Col :xs="24" :md="24" :lg="24">
                      <Input class="adm-input adm-input--regular" readonly :value="body.sobstvName" ></Input>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="ml60 pt36" v-if="optionView == 2">
      <div class="ml60">
        <div class="w-full">
          <div class="grid">
            <div class="col col--6">
              <p class="adm-14 color-dark-lighter mb6">Номер ГРЗ</p>
              <p class="adm-text-big color-dark-base">{{body.regno || 'нет информации'}}</p>
            </div>
            <div class="col col--6" v-if="isNotEmptyField(body.ctc)">
              <p class="adm-14 color-dark-lighter mb6">СТС</p>
              <p class="adm-text-big color-dark-base">{{body.ctc}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ml60 my18">
        <div class="w-full">
          <div class="col col--6">
            <p class="adm-14 color-dark-lighter mb6">Марка, модель, год выпуска</p>
            <p class="adm-text-big color-dark-base">{{body.markaAvto, body.modavtoName, body.yearVyp | concatByDelimiter(',') || 'нет информации'}}</p>
          </div>
        </div>
      </div>
      <div class="ml60 my18">
        <div class="w-full">
          <div class="col col--6">
            <p class="adm-14 color-dark-lighter mb6">Цвет ТС</p>
            <p class="adm-text-big color-dark-base">{{body.color || 'нет информации'}}</p>
          </div>
        </div>
      </div>
      <div class="py18" style="border-top: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC;">
        <div class="flex-parent">
          <div class="s40 mt12">
              <img src="../../assets/images/eng.svg" class="mx-auto block" alt="">
          </div>
          <div class="ml18 w-full">
            <div class="grid">
              <div class="col col--6">
                <p class="adm-14 color-dark-lighter mb6">Тип двигателя</p>
                <p class="adm-text-big color-dark-base">{{body.motorTip || 'нет информации'}}</p>
              </div>
              <div class="col col--6">
                <p class="adm-14 color-dark-lighter mb6">Экологический класс</p>
                <p class="adm-text-big color-dark-base">{{body.motorEcologClass || 'нет информации'}}</p>
              </div>
            </div>
            <div class="grid mt18">
              <div class="col col--6">
                <p class="adm-14 color-dark-lighter mb6">Тип ТС</p>
                <p class="adm-text-big color-dark-base">{{body.tiptcName || 'нет информации'}}</p>
              </div>
              <div class="col col--6">
                <p class="adm-14 color-dark-lighter mb6">Категория ТС</p>
                <p class="adm-text-big color-dark-base">{{body.katcKod || 'нет информации'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ml60 mt18">
        <div class="w-full">
          <div class="grid">
            <div class="col col--6">
              <p class="adm-14 color-dark-lighter mb6">Масса без нагрузки</p>
              <p class="adm-text-big color-dark-base">{{body.massa || 'нет информации'}}</p>
            </div>
            <div class="col col--6">
              <p class="adm-14 color-dark-lighter mb6">Максимальная масса</p>
              <p class="adm-text-big color-dark-base">{{body.massaMax || 'нет информации'}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ml60 mt18">
        <div class="w-full">
          <div class="grid">
            <div class="col col--6">
              <p class="adm-14 color-dark-lighter mb6">VIN номер</p>
              <p class="adm-text-big color-dark-base">{{body.vin || 'нет информации'}}</p>
            </div>
            <div class="col col--6">
              <p class="adm-14 color-dark-lighter mb6">ПТС</p>
              <p class="adm-text-big color-dark-base">{{body.ptcN || 'нет информации'}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-parent flex-parent--center-cross py30">
        <div class="s40">
            <img src="../../assets/images/owner.svg" class="mx-auto block" alt="">
        </div>
        <div class="ml18">
          <div>
            <p class="adm-14 color-dark-lighter mb6">Владелец, дата рождения</p>
            <p class="adm-text-big color-dark-base">{{body.sobstvName || 'нет информации'}}</p>
          </div>
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
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
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
            let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
            let currentForm = innerFormStack.getCurrent(uid);
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
        photos: [],
        optionView: 2
      }
    },
    methods: {
      isNotEmptyField(field) {
        if (typeof field === 'string') {
          return funcUtils.isNotEmpty(field) && field.length > 0;
        }
        return funcUtils.isNotEmpty(field);
      },
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
      getVehsAMTCEdit() {
        try {
          let current = formStack.getCurrent();
          let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
          let currentForm = innerFormStack.getCurrent(uid);
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdVehsAMTCEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
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
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 130px;
  }
  .adm-form__item_content{
    width: 100%;
  }
  // .err:after{
  //   content: "";
  //   position: absolute;
  //   width: 12px;
  //   height: 12px;
  //   top: 10px;
  //   right: 10px;
  //   border-radius: 100%;
  //   display: inline-block;
  //   background-color: #6FB81E;
  // }
</style>
