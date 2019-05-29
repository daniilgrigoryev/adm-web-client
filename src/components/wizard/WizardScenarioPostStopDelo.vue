<template>
	<aside-template :listSectionNav="listSectionNav()" title="Постановление о прекращении дела об АПН">
		<div class="layout-wrap">
			<Layout ref="Main" class="layout">
				<div class="adm-form">
					<wizard-item-doc-post-first-stop-delo id="head" v-if="isVisible('DocPostFirst')" ref="DocPostFirst" :info="getInfo('DocPostFirst')" @storeElementData="storeElementData" @updateComponents="updateComponents">
						<wizard-item-place v-if="isVisible('DocPostFirst.PlaceSost')" ref="DocPostFirst.PlaceSost" :info="getInfo('DocPostFirst.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
					</wizard-item-doc-post-first-stop-delo>
				</div>

        <div v-if="isVisible('Present')" class="adm-form">
          <div class="adm-form__container">
            <h2 id="pres" class="adm-form__headding">Сведения о явке</h2>
            <div class="adm-form__content">
              <wizard-item-present id="Present" ref="Present" :info="getInfo('Present')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-present>
              <wizard-item-pred-doc v-if="isVisible('Present.PredDoc')" ref="Present.PredDoc" :info="getInfo('Present.PredDoc')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pred-doc>
              <wizard-item-individual v-if="isVisible('Present.Repres')" ref="Present.Repres" :info="getInfo('Present.Repres')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
              <wizard-item-address v-if="isVisible('Present.Repres.regAddr')" ref="Present.Repres.regAddr" :info="getInfo('Present.Repres.regAddr')" title="Адрес регистрации" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
          </div>
        </div>

				<div class="adm-form">
					<div class="adm-form__container">
						<h2 class="adm-form__headding" id="stop">Решение о прекращении производства по делу</h2>
						<div class="adm-form__content">
							<wizard-item-doc-post-stop-delo id="DocPostStop" v-if="isVisible('DocPostStop')" ref="DocPostStop" :info="getInfo('DocPostStop')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-doc-post-stop-delo>
						</div>
					</div>
				</div>
			</Layout>
		</div>
		<div class="bot-wrap">
			<Button @click="getPrev" type="text">Отменить изменения</Button>
			<Button @click="save" type="primary" class="ml12">Сохранить</Button>
		</div>
	</aside-template>
</template>

<script>
import * as funcUtils from "~/assets/js/utils/funcUtils";
import * as formStack from '~/assets/js/api/formStack';
import RequestApi from "~/assets/js/api/requestApi";

export default {
	name: "WizardScenarioPostStopDelo",
	props: {
		pathes: Object
	},
	components: {
		AsideTemplate: () => import ('~/components/templates/AsideTemplate'),
		MaskedInput: () => import ('~/components/shared/MaskedInput'),
		WizardItemDocPostFirstStopDelo: () => import('~/components/wizard/items/postStopDelo/WizardItemDocPostFirstStopDelo.vue'),
		WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
    WizardItemPresent: () => import('~/components/wizard/items/WizardItemPresent'),
    WizardItemPredDoc: () => import('~/components/wizard/items/WizardItemPredDoc'),
		WizardItemIndividual: () => import('~/components/wizard/items/WizardItemIndividual'),
		WizardItemAddress: () => import('~/components/wizard/items/WizardItemAddress'),
		WizardItemDocPostStopDelo: () => import('~/components/wizard/items/WizardItemDocPostStopDelo'),
	},
	data() {
		return {
			maskInputProt: {
				regex: '[0-9]+',
				casing: 'upper',
				placeholder: ''
			},
		}
	},
	methods: {
		listSectionNav(){
			return [
				{
					title: "Ввод данных постановления о прекращении дела",
					name: "head",
				},
        {
          title: "Сведения о явке",
          name: "pres",
          hide: !this.isVisible('Present')
        },
				{
					title: "Решение о прекращении производства по делу",
					name: "stop",
				},
			]
		},
		isNotEmptyParentNode(path) {
			if (funcUtils.isEmpty(this.pathes)) {
				return false;
			} else {
				return funcUtils.isNotEmpty(this.pathes[path].parentNode);
			}
		},
		isVisible(path) {
			if (funcUtils.isEmpty(this.pathes)) {
				return false;
			} else {
				return funcUtils.isNotEmpty(this.pathes[path]);
			}
		},
		getInfo(path) {
			if (funcUtils.isEmpty(this.pathes)) {
				return false;
			} else {
				return this.pathes[path];
			}
		},
    async storeElementData(params) {
      await this.$emit('storeElementData', params);
    },
		updateComponents(cids) {
			this.$emit('updateComponents', cids);
		},
    async save() {
      let eventResponse = await RequestApi.prepareData({
        method: 'make'
      });
      let eventResp =  JSON.parse(eventResponse.response);
      if (eventResp.error && eventResp.error.errorId) {
        this.$store.dispatch('errors/changeContent', {title: eventResp.error.errorMsg, desc: eventResp.error.errorDesc,});
      } else {
        let response = await RequestApi.prepareData({
          method: 'getDeloId'
        });
        let resp = null;
        if (response.response) {
          resp = JSON.parse(response.response);
        }
        if (resp && resp.data) {
          this.getPrev(false);
          let params = {
            deloId: resp.data,
            scenarioResult: eventResp.data,
          };

          formStack.toNext({
            module: this.$store.state.deloTreeCardView,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } else {
          let stack = formStack.getStack();
          let prev = stack.indexOf(stack.size() - 2);
          prev.params.scenarioResult = eventResp.data;
          formStack.updateStack(stack);
          this.getPrev();
        }
      }
    },
		getPrev(withTransition) {
			try {
				formStack.toPrev({
					vm: this,
					withTransition: withTransition || true
				});
			} catch (e) {
				this.$store.dispatch('errors/changeContent', {title: e.message,});
			}
		},
	}
}
</script>

