<template>
  <div v-if="body" class="ml18 mb18">
    <div class="amd-title amd-title--sticky px36 py24"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getPetitionEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Ходатайство  {{ body.docN ? "№" + body.docN : "" }} от {{ body.dateSost | formatDateTime('DD.MM.YYYY') }}</b>
        </div>
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item
            label="Дата и время рассмотрения"
            :value="body.dateRasm | formatDateTime('DD.MM.YYYY HH:mm')"
            :icon="require('../../assets/images/map.svg')"
          />
          <view-data-item
            label="Дата и время вручения"
            :value="body.dateUved | formatDateTime('DD.MM.YYYY HH:mm')"
            style="grid-column: span 2;"
          />
          <hr>
          <view-data-item
            label="Код сотрудника - ФИО"
            :value="body.inspSostKod, body.inspSostName  | concatByDelimiter('-')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/police.svg')"
          />
          <view-data-item
            label="Звание, Должность"
            :value="body.inspSostRang, body.inspSostDolz | concatByDelimiter(',')"
            style="grid-column: span 2;"
          />
          <hr>
          <view-data-item
            label="Место составления извещения"
            :value="body.placeSost.placeFull"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Статья-основание"
            :value="body.stotvKod, body.stotvName | concatByDelimiter(',')"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Код сотрудника, утвердившего документ - ФИО"
            :value="body.inspUtvKod, body.inspUtvName  | concatByDelimiter('-')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/police.svg')"
          />
          <view-data-item
            label="Звание, Должность"
            :value="body.inspUtvRang, body.inspUtvDolz | concatByDelimiter(',')"
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
  import docVidEnum from "~/assets/js/utils/docVidEnum";
  import {mapGetters} from 'vuex';

  export default {
    name: "FrmEdPetition",
    components: {
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdPetitionGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
            let eventResponse = await RequestApi.prepareData({
              cid: currentForm.cid,
              withSpinner: false
            });
            await vm.$store.dispatch('fillModule', {'event': eventResponse});
          } catch (e) {
            this.$store.dispatch('errors/changeContent', {title: e.message,});
          }
        });
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message,});
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdPetitionSetCid', null);
      this.$store.dispatch('frmEdPetitionSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdPetitionGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
    },
    data() {
      return {
        docVid: docVidEnum
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
          await this.$store.dispatch('frmEdPetitionSetCid', currentForm.cid);

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
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      getPetitionEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsPetitionEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>


