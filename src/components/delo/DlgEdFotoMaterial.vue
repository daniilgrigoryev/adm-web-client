<template>

  <div v-if="body">
    <div class="adm-form">

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Номер нарушения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.docN" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата и время съемки</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dateSost | formatDateTime('DD.MM.YYYY HH:mm')" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дополнительные сведения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.dopSved" placeholder="""" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>

      <hr class="txt-hr my24" />

      <h2 class="adm-text-big color-dark-light my12">Должностное лицо</h2>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Личный номер сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostKod" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ФИО сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostName" placeholder="""" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Должность сотрудника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostDolz" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Звание</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.inspSostRang" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Код подразделения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.organSostKod" placeholder=""""></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Подразделение</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" readonly :value="body.organSostName" placeholder="""" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
        </Row>
      </div>

      <div v-if="photos && photos.length > 0">
        <hr class="txt-hr my24">
        <h2 class="adm-text-big color-dark-light my12">Фотоматериалы</h2>


        <div class="view-photos flex-parent flex-parent--wrap flex-parent--space-between-main mb24">
          <div class="view-photos__min-section scroll-styled scroll-auto align-center">

            <Button type="text" class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover px0 py6 align-center' style="box-shadow: none">
              <span>Добавить фотографию</span>
            </Button>

            <div v-for="(item, index) in photos" :key="index" @click="selectImage(item)" class="view-photos__item flex-parent flex-parent--center-cross flex-parent--center-main">
              <img alt="img" @load="checkPic($event.target)" :src="item" />
            </div>
          </div>


          <div>
            <Button type="text" class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover px0 py6 mx12 align-center' style="box-shadow: none">
              <span>Изменить</span>
            </Button>
            <Button type="text" class='bg-transparent border--0 link color-blue-base adm-12 txt-underline-on-hover px0 py6 mx12 align-center' style="box-shadow: none">
              <span>Удалить</span>
            </Button>

            <div v-if="selectedImage" class="view-photos__full-section flex-parent flex-parent--center-cross flex-parent--center-main border border--gray-light">
              <img alt="img" :src="selectedImage" @click="clearSelectedImage" />
            </div>
            <div v-else class="view-photos__full-section border border--gray-light flex-parent flex-parent--center-cross flex-parent--center-main">
              <p>фото не выбрано</p>
            </div>
          </div>

        </div>





        <div>
          <!-- <div class="my12 adm-form__item" style="width: 15%;">
            <div v-for="(item, index) in photos" :key="index" style="margin: 10px 0; background: rgb(234, 232, 232); height: 250px; width: 250px; display: flex; align-items: center; justify-content: center;">
              <img alt="img" @load="checkPic($event.target)" @click="selectImage(item)" :src="item" />
            </div>
          </div> -->

          <!-- <div v-if="selectedImage">
            <img alt="img" :src="selectedImage" @click="clearSelectedImage" />
          </div> -->
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
  import $ from "jquery";
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
          photos: this.dataStore ? this.dataStore.fotoList : null
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
      this.$store.dispatch('dlgEdFotoMaterialSetCid', null);
      this.$store.dispatch('dlgEdFotoMaterialSetData', null);
    },
    methods: {
      checkPic(imageDomEl) {
        let setAttr;
        let naturalWidth = imageDomEl.naturalWidth;
        let naturalHeight = imageDomEl.naturalHeight;
        let pic = $(imageDomEl).css({'height': 'auto', 'width': 'auto'});
        let wrap = pic.parent();

        if (naturalHeight < wrap.height()) {
          wrap.css('height', naturalHeight + 20);
          return;
        }
        let picAspect = naturalHeight / naturalWidth;
        let wrapAspect = wrap.height() / wrap.width();

        pic.css({'max-width': '100%', 'max-height': '100%'});
        if (picAspect < 1) {
          setAttr = (wrapAspect <= picAspect) ? 'height' : 'width';
        } else { // portrait + square
          setAttr = (wrapAspect >= picAspect) ? 'height' : 'width';
        }
        pic.css(setAttr, '100%');
        if (pic.width() > naturalWidth) {
          pic.css('width', naturalWidth);
        }
        if (pic.height() > naturalHeight) {
          pic.css('height', naturalHeight);
        }
      },
      selectImage(image) {
        this.selectedImage = image;
      },
      clearSelectedImage() {
        this.selectedImage = null;
      },
      async fillComponent(params) {
        let cid = params.cid;
        let photos = params.photos;
        let vm = params.vm;

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
            photo = JSON.parse(eventResponse.response).data;
            vm.photos.push('data:image/jpeg;base64, ' + photo);
          }
        }
      },
    },
    data() {
      return {
        photos: [],
        selectedImage: null
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
