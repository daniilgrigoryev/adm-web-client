<template>
  <!-- Форма возбуждения Ходатайство о продлении сроков -->
  <aside-template :listSectionNav="listSectionNav()" title="Ходатайство о продлении сроков">
    <div class="layout-wrap">
      <Layout ref="Main" class="layout">
        <div class="adm-form">
          <div class="adm-form__container">
            <h2 class="adm-form__headding" id="head">
              Ввод данных по Ходатайству о продлении сроков
            </h2>
            <div class="adm-form__content">
              <wizard-item-pet-one  id="DocPetOne" v-if="isVisible('DocPetOne')" ref="DocPetOne" :info="getInfo('DocPetOne')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pet-one>
              <wizard-item-place v-if="isVisible('DocPetOne.PlaceSost')" ref="DocPetOne.PlaceSost" :info="getInfo('DocPetOne.PlaceSost')" title="Место составления" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-place>
              <wizard-item-prot-two id="DocPetTwo" v-if="isVisible('DocPetTwo')" ref="DocPetTwo" :info="getInfo('DocPetTwo')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-prot-two>
            </div>
          </div>
          <div class="adm-form__container">
            <h2 id="pet" class="adm-form__headding">Сведения о продлении сроков</h2>
            <div class="adm-form__content">
              <wizard-item-pet-five id="PetitionFive" v-if="isVisible('PetitionFive')" ref="PetitionFive" :info="getInfo('PetitionFive')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-pet-five>
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
    name: "WizardScenarioAddPetition",
    props: {
      pathes: Object
    },
    components: {
      AsideTemplate: () => import('~/components/templates/AsideTemplate'),
      WizardItemPetOne: () => import('~/components/wizard/items/petition/WizardItemPetOne'),
      WizardItemPlace: () => import('~/components/wizard/items/WizardItemPlace'),
      WizardItemProtTwo: () => import('~/components/wizard/items/WizardItemProtTwo'),
      WizardItemPetFive: () => import('~/components/wizard/items/petition/WizardItemPetFive'),
    },
    methods: {
      listSectionNav() {
        return [
          {
            title: "Ввод данных по ходатайству",
            name: "head",
          },
          {
            title: "Сведения о продлении сроков",
            name: "pet",
          },
        ]
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
        let resp =  JSON.parse(eventResponse.response);
        if (resp.error && resp.error.errorId) {
          this.$store.dispatch('errors/changeContent', {title: resp.error.errorMsg, desc: resp.error.errorDesc,});
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
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
    }
  }
</script>

<style scoped>

</style>
