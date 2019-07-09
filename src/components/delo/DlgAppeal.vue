<template>
  <div v-if="body" class="mb18"> 
    <div class="adm-title amd-title--sticky px36 py24">
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
          <div class="flex-parent flex-parent--center-cross">
            <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24 bg-transparent" title="Редактировать">
              <!-- <img src='../../assets/images/icons/pen.svg' class="wmax-none"> -->
            </Button>
            <b class="adm-text-big color-dark-lighter">Жалоба</b>
          </div>
        </div>
    </div>


    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item
            label="Дата регистрации обращения"
            :value="body.dateSost | formatDateTime('DD.MM.YYYY HH:mm')"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Входящий номер"
            :value="body.claimThemeId"
            style="grid-column: span 2;"
          />
          <!-- TODO -->
          <view-data-item
            label="Дата контроля"
            :value="null"
            style="grid-column: span 2;"
          />
          <!-- TODO -->
          <view-data-item
            label="Тема"
            :value="null"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="ФИО ответственного"
            :value="body.inspSostKod, body.inspSostName  | concatByDelimiter('-')"
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
  import { mapGetters } from 'vuex';

  export default {
    name: "DlgAppeal",
    props: {
      delo: Object
    },
    components: {
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.dlgAppealGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('dlgAppealSetCid', null);
      this.$store.dispatch('dlgAppealSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'dlgAppealGetData'
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
      async init() {
        try {
          let currentForm = innerFormStack.getCurrent();
          await this.$store.dispatch('dlgAppealSetCid', currentForm.cid);

          let prepareParams = {
            method: 'restore',
            cid: currentForm.cid,
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
        } catch (e) {
          this.$store.dispatch('errorsModal/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>
