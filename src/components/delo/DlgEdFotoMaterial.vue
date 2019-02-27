<template>

  <div v-if="body">
    <div class="adm-form">

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Номер нарушения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.docN" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата и время съемки</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateSost | formatDateTime('DD.MM.YYYY HH:mm')" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дополнительные сведения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dopSved" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>

      <hr class="txt-hr my24" />

      <h2 class="adm-text-big color-dark-light my12">Должностное лицо</h2>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Личный номер сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ФИО сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostName" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Должность сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostDolz" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Звание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostRang" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Код подразделения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.organSostKod" placeholder="Enter something..."></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.organSostName" placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>

      <div v-if="photos && photos.length > 0">

        <hr class="txt-hr my24" />

        <h2 class="adm-text-big color-dark-light my12">Фотоматериалы</h2>

        <div class="my12 adm-form__item">

          <img v-for="(item, index) in photos" :key="index" :src="item" />

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
    name: "DlgEdFotoMaterial",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        await this.$store.dispatch('dlgEdFotoMaterialSetCid', currentForm.cid);

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
          photos: this.dataStore.fotoList
        });

        let vm = this;
        this.$store.watch(this.$store.getters.dlgEdFotoMaterialGetCommand, async () => {
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
              photos: vm.dataStore.fotoList
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
      this.$store.dispatch('dlgEdFotoMaterialSetCid', null);
      this.$store.dispatch('dlgEdFotoMaterialSetData', null);
    },
    methods: {
      async fillComponent(params) {
        let cid = params.cid;
        let photos = params.photos;
        let vm = params.vm;

        vm.photos = [];
        if (photos.length > 0) {
          let item;
          let eventResponse;
          let photo;
          for (let i = 0; i < photos.length; i++) {
            item = photos[i];
            eventResponse = await RequestApi.prepareData({
              method: 'getPhotoBody',
              params: {
                'node': item.fotoId
              },
              cid: cid
            });
            photo = JSON.parse(eventResponse.response).data;
            vm.photos.push(photo);
          }
        }
      },
    },
    data() {
      return {
        photos: []
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'dlgEdFotoMaterialGetData'
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
