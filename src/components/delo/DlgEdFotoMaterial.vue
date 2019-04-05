<template>

  <div v-if="body" class="ml18 mb18">

    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button> -->
          <b class="adm-text-big color-dark-lighter">Фотофиксация нарушения</b>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
    </div>


    <div class="adm-form">
      <div class="adm-form__container mt6">
        <div class="adm-form__content px36">
          <div class="adm-form__item">
            <small class="adm-form__label">Номер нарушения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.docN"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Дата и время съемки</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.dateSost | formatDateTime('DD.MM.YYYY HH:mm')"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Дополнительные сведения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.dopSved" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>

      <div class="adm-form__container">
        <h2 class="adm-text-big color-dark-light adm-form__headding">Фотоматериалы</h2>
        <div class="adm-form__content px36">
          <div v-if="photos && photos.length > 0">
            <div class="active-photo">
              <img :src="acitveGalleryItem" alt="">
            </div>
            <div class="view-photos">
              <div class="view-photos__min-section ">
                <div class="view-photos_container flex-parent scroll-styled scroll-auto">
                  <div v-for="image in photos" :key="image" @click="acitveGalleryItem = image" class="view-photos__item flex-parent flex-parent--center-cross flex-parent--center-main">
                    <img alt="img" @load="checkPic($event.target)" :src="image"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div class="adm-form__container">
        <h2 class="adm-text-big color-dark-light adm-form__headding">Должностное лицо</h2>
        <div class="adm-form__content px36">
          <div class="adm-form__item">
            <small class="adm-form__label">Личный номер сотрудника</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.inspSostKod"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">ФИО сотрудника</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.inspSostName" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Должность сотрудника</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.inspSostDolz"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Звание</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.inspSostRang"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Код подразделения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.organSostKod"></Input>
                </Col>
              </Row>
            </div>
          </div>
          <div class="adm-form__item">
            <small class="adm-form__label">Подразделение</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" readonly :value="body.organSostName" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </Col>
              </Row>
            </div>
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
  import $ from "jquery";

  export default {
    name: "DlgEdFotoMaterial",
    async created() {
      try {
        let current = formStack.getCurrent();
        let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
        let currentForm = innerFormStack.getCurrent(uid);
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
            if (eventResponse.response) {
              photo = JSON.parse(eventResponse.response).data;
              vm.photos.push('data:image/jpeg;base64,' + photo);
              this.acitveGalleryItem = vm.photos[0];
            }
          }
        }
      },
    },
    data() {
      return {
        photos: [],
        acitveGalleryItem: ""
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

<style scoped lang="scss">
  .active-photo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;
    border-radius: 2px;
    margin: 20px 0;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>

