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
          <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
            <img src='../../assets/images/wiki.svg' class="wmax-none">
          </Button> -->
        </div>
    </div>


    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item 
            label="ГРЗ" 
            :value="body.regno" 
            :icon="require('../../assets/images/vehicle_passport.svg')"
          />
          <view-data-item 
            label="VIN" 
            :value="body.vin" 
          />
          <view-data-item 
            label="Марка, модель, год выпуска" 
            :value="body.markaAvto, body.modavtoName, body.yearVyp | concatByDelimiter(',')" 
          />
          <view-data-item 
            label="СТС" 
            :value="body.ctc" 
          />
          <view-data-item 
            label="Цвет ТС" 
            :value="body.color" 
          />
          <view-data-item 
            label="ПТС" 
            :value="body.ptcN" 
          />
          <hr>
          <view-data-item 
            label="Тип двигателя" 
            :value="body.motorTip" 
            :icon="require('../../assets/images/eng.svg')"
          />
          <view-data-item 
            label="Экологический класс" 
            :value="body.motorEcologClass" 
          />
          <view-data-item 
            label="Тип ТС" 
            :value="body.tiptcName" 
          />
          <view-data-item 
            label="Категория ТС" 
            :value="body.katcKod" 
          />
          <hr>
          <view-data-item 
            label="Масса без нагрузки" 
            :value="body.massa"
            :icon="require('../../assets/images/car_weight.svg')"
          />
          <view-data-item 
            label="Максимальная масса" 
            :value="body.massaMax" 
          />
          <hr>
          <view-data-item 
            label="Владелец" 
            :value="body.sobstvName"
            :icon="require('../../assets/images/owner.svg')"
            style="grid-column: span 2;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import {mapGetters} from 'vuex';

  export default {
    name: "FrmEdVehsAMTC",
    components:{
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdVehsAMTCGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});

            await vm.fillComponent({
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
      }
    },
    methods: {
      isNotEmptyField(field) {
        if (typeof field === 'string') {
          return funcUtils.isNotEmpty(field) && field.length > 0;
        }
        return funcUtils.isNotEmpty(field);
      },
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
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
            currentForm.restore = true;
          } else {
            delete currentForm['restore'];
          }
          innerFormStack.updateCurrent(currentForm);
          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});

          await this.fillComponent({
            vm: this,
            cid: currentForm.cid,
            photos: this.dataStore ? this.dataStore.fotoList : null
          });
        } catch (e) {
          alert(e.message);
        }
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
          let currentForm = innerFormStack.getCurrent();
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
