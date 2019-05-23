  <template>
  <div class="aside-template">
    <aside>
      <h3>
        <Button @click="getPrev" type="text" title="вернуться назад">
          <Icon type="ios-arrow-dropleft" :size="30" />
        </Button>
        Список подразделов
      </h3>
      <ul>
        <li v-for="item in listSectionNav" :key="item.id">
          <a :href="'#' + item.name">{{item.title}}</a>
        </li>
      </ul>
    </aside>
    <main>
      <div class="layout-wrap">
        <Layout ref="Main" class="layout">
          <div class="adm-form">
            <div class="adm-form__container">
              <h2 class="adm-form__headding" id="uchast">Участник</h2>
              <wizard-item-add-uchast v-if="isVisible('Uchast')" ref="Uchast" :info="getInfo('Uchast')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-add-uchast>
            </div>
            <div class="adm-form__container" v-if="isVisible('Uchast.Individual')">
              <h2 class="adm-form__headding" id="individual">Физическое лицо</h2>
              <wizard-item-individual v-if="isVisible('Uchast.Individual')" ref="Uchast.Individual" :info="getInfo('Uchast.Individual')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-individual>
            </div>
            <div class="adm-form__container" v-if="isVisible('Uchast.Individual.regAddr')">
              <wizard-item-address title="Адрес регистрации" v-if="isVisible('Uchast.Individual.regAddr')" ref="Uchast.Individual.regAddr" :info="getInfo('Uchast.Individual.regAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
            <div class="adm-form__container" v-if="isVisible('Uchast.Individual.factAddr')">
              <wizard-item-address title="Фактический адрес" v-if="isVisible('Uchast.Individual.factAddr')" ref="Uchast.Individual.factAddr" :info="getInfo('Uchast.Individual.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
            <div class="adm-form__container" v-if="isVisible('Uchast.Organization')">
              <h2 class="adm-form__headding" id="organization">Организация</h2>
              <wizard-item-organization-uchast v-if="isVisible('Uchast.Organization')" ref="Uchast.Organization" :info="getInfo('Uchast.Organization')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-organization-uchast>
            </div>
            <div class="adm-form__container" v-if="isVisible('Uchast.Organization.regAddr')">
              <wizard-item-address title="Адрес регистрации" v-if="isVisible('Uchast.Organization.regAddr')" ref="Uchast.Organization.regAddr" :info="getInfo('Uchast.Organization.regAddr')"  @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
            <div class="adm-form__container" v-if="isVisible('Uchast.Organization.factAddr')">
              <wizard-item-address title="Фактический адрес" v-if="isVisible('Uchast.Organization.factAddr')" ref="Uchast.Organization.factAddr" :info="getInfo('Uchast.Organization.factAddr')" @storeElementData="storeElementData" @updateComponents="updateComponents"></wizard-item-address>
            </div>
          </div>
        </Layout>
      </div>
      <div class="bot-wrap">
        <Button @click="getPrev" type="text">Отменить добавление участника</Button>
        <Button @click="save" type="primary" class="ml12">Добавить</Button>
      </div>
    </main>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";

  export default {
    name: "WizardScenarioAddUchast",
    components: {
      WizardItemAddUchast: () => import('~/components/wizard/items/WizardItemAddUchast'),
      WizardItemAddress: () => import('~/components/wizard/items/WizardItemAddress'),
      WizardItemIndividual: () => import('~/components/wizard/items/WizardItemIndividual'),
      WizardItemOrganizationUchast: () => import('~/components/wizard/items/addUchast/WizardItemOrganizationUchast'),
    },
    data() {
      return {
        mode: 0,
        listSectionNav: [
          // {
          //   title: "Участник",
          //   name: "uchast",
          // },
          // {
          //   title: "Физическое лицо",
          //   name: "individual",
          // },
          // {
          //   title: "Организация",
          //   name: "organization",
          // },
        ]
      }
    },
    props: {
      pathes: Object
    },
    methods: {
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
          this.getPrev();
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


<style lang="scss" scoped>
.aside-template {
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-auto-rows: calc(100vh - 66px);
  overflow: hidden;
}
aside {
  border-right: 1px solid #d9d9d9;
  height: 100%;
  h3 {
    background: #fff;
    color: #6b94c2;
    font-size: 16px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 46px;
    letter-spacing: 0.1px;
    line-height: 26px;
    border-bottom: 1px solid #d9d9d9;
    font-weight: 600;
    button {
      padding: 0 5px 0 0 !important;
    }
  }
  ul {
    padding: 10px 0;
    li {
      a {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #797979;
        border-left: 4px solid transparent;
        transition: 0.3s ease;
        padding: 3px 20px 3px 20px;
        font-weight: 500;
        &:hover {
          border-color: #1888cc;
          color: #1888cc;
        }
      }
    }
  }
}
main {
  display: grid;
  grid-template-rows: 1fr 55px;
  .layout-wrap {
    overflow-y: scroll;
    .layout {
      max-width: 1000px;
    }
  }
  .bot-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 36px;
    border-top: 1px solid #d9d9d9;
  }
}
h4.h4 {
  color: #6b94c2;
  font-size: 14px;
}
</style>
