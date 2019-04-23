<template>
  <div v-if="body" class="ml18">

    <div class="amd-title amd-title--sticky px36 pt24 pb18">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getDecisEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../../assets/images/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Решение по делу - {{body.decisName }}</b>
        </div>
      </div>
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item
            label="Срок"
            :value="duration"
            style="grid-column: span 2;"
            :icon="require('../../../assets/images/penalty_gray.svg')"
          />
          <hr>
          <view-data-item 
            label="Дата начала" 
            :value="body.periodStart | formatDateTime('DD.MM.YYYY')" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Дата вручения" 
            :value="body.dateUved | formatDateTime('DD.MM.YYYY')" 
            style="grid-column: span 2;"
          />
          <view-data-item 
            label="Дата вступления" 
            :value="body.dateVstup | formatDateTime('DD.MM.YYYY')" 
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
    name: "FrmEdDecisPost",
    components: {
      ViewDataItem: () => import('~/components/shared/ui/view-data-item'),
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDecisPostGetCommand, async () => {
          try {
            let currentForm = innerFormStack.getCurrent();
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
      this.$store.dispatch('frmEdDecisPostSetCid', null);
      this.$store.dispatch('frmEdDecisPostSetData', null);
		},
		data() {
			return {
				decisKods: {
          lish: 29, // Лишить права управления ТС
          warning: 51, // Предупредить
          shtraf: 65, // Оштрафовать
          arest: 90, // Арестовать
          discval: 91, // Дисквалифицировать
          observ: 99, // Устное замечание
          hoursToWork: 71, // Обязательные работы
          forced: 73, // Принудительные работы
          imprisonment: 74, // Лишение свободы
          withdrawal: 75, // Возмездное изъятие
          confiscation: 76, // Конфискация
          exclusion: 77, // Выдворение за пределы РФ
          stopWorkDay: 78, // Приостановление деятельности
        }
			}
		},
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDecisPostGetData'
      }),
      duration() {
				let months, days;
				switch (this.body.decisKod) {
					case decisKods.discval:
						months = this.body.diskvMes? this.body.diskvMes + " Месяца" : "";
						days = this.body.diskvDay?  ", " + this.body.diskvDay + " Дня" : "";
						break;
					default:
						break;
				}
				return months + days
      },
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
          await this.$store.dispatch('frmEdDecisPostSetCid', currentForm.cid);

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
          alert(e.message);
        }
      },
      getDecisEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDecisEdit,
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

