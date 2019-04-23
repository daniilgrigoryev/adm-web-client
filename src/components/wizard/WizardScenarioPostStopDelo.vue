<template>
	<aside-template :listSectionNav="listSectionNav" title="Постановление о прекращении дела об АПН">
		<div class="layout-wrap">
			<Layout ref="Main" class="layout">
				<div class="adm-form">
					<wizard-item-doc-post-first-stop-delo id="head" v-if="isVisible('DocPostFirst')" ref="DocPostFirst" :info="getInfo('DocPostFirst')" @storeElementData="storeElementData" @updateComponents="updateComponents">
						<wizard-item-place v-if="isVisible('DocPostFirst.PlaceSost')" ref="DocPostFirst.PlaceSost" :info="getInfo('DocPostFirst.PlaceSost')" title="Место вынесения" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
					</wizard-item-doc-post-first-stop-delo>
				</div>
				
				<wizard-item-lvok-exists v-if="isVisible('LVOK')" ref="LVOK" :info="getInfo('LVOK')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-lvok-exists>
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
		WizardItemLvokExists: () => import('~/components/wizard/items/WizardItemLvokExists'),
	  // WizardItemAddPredDoc: () => import('~/components/wizard/items/addPredDoc/WizardItemAddPredDoc'),
	},
	data() {
		return {
			listSectionNav: [{
					title: "Ввод данных по ПЗТС",
					name: "head",
				},
				{
					title: "Транспортное средство",
					name: "vehs",
				},
				{
					title: "Сведения о нарушении",
					name: "nar",
				},
				{
					title: "Сведения об эвакуации",
					name: "evac",
				},
				{
					title: "Понятые",
					name: "witness",
				},
			],
			maskInputProt: {
				regex: '[0-9]+',
				casing: 'upper',
				placeholder: ''
			},
		}
	},
	methods: {
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
		storeElementData(params) {
			this.$emit('storeElementData', params);
		},
		updateComponents(cids) {
			this.$emit('updateComponents', cids);
		},
		async save() {
			let eventResponse = await RequestApi.prepareData({
				method: 'make'
			});
			let resp = JSON.parse(eventResponse.response);
			if (resp.error && resp.error.errorId) {
				let error = '';
				funcUtils.isNotEmpty(resp.error.errorMsg) ? error += `ErrorMsg: ${resp.error.errorMsg}\n` : null;
				funcUtils.isNotEmpty(resp.error.errorDesc) ? error += `ErrorDesc: ${resp.error.errorDesc}\n` : null;
				alert(error);
			} else {
				eventResponse = await RequestApi.prepareData({
					method: 'getDeloId'
				});
				resp = null;
				if (eventResponse.response) {
					resp = JSON.parse(eventResponse.response);
				}
				if (resp && resp.data) {
					this.getPrev(false);
					let params = {
						deloId: resp.data
					};

					formStack.toNext({
						module: this.$store.state.deloTreeCardView,
						vm: this,
						notRemoved: false,
						params: params,
						withCreate: true
					});
				} else {
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
				alert(e.message);
			}
		},
	}
}
</script>

