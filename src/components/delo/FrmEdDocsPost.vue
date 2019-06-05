<template>
  <div v-if="body" class="ml18"><!-- wmax1280 mx-auto -->
    <!-- постановление по делу -->
    <div class="amd-title amd-title--sticky px36 pt24 pb18"><!-- wmax940 mx-auto -->
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button  @click="getDocsPostEdit" type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
            <img src='../../assets/images/icons/pen.svg' class="wmax-none">
          </Button>
          <b class="adm-text-big color-dark-lighter">Постановление  {{ body.docN ? "№" + body.docN : "" }} от {{ body.dateSost | formatDateTime('DD.MM.YYYY') }}</b>
          <Button @click="getSignatureEdit" type="primary" class="ml12">Подписать</Button>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../assets/images/icons/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
      <!-- <div class="adm-nav-jump">
        <a href='#regulation' class='link color-blue-base adm-txt-regular mx18 inline-block'>Постановление составил</a>
        <a href='#violation' class='link color-blue-base adm-txt-regular mx18 inline-block'>Нарушение</a>
        <a href='#decision' class='link color-blue-base adm-txt-regular mx18 inline-block'>Решение по делу</a>
      </div> -->
    </div>

    <div class="view-data">
      <div class="view-data__container">
        <div class="items-wrap">
          <view-data-item
            label="Пункт НПА"
            :value="body.pnpaKod, body.pnpaName | concatByDelimiter(',')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/reshenie-variant-2_1.svg')"
          />
          <view-data-item
            label="Статья КРФоАП"
            :value="body.stotvKod, body.stotvName | concatByDelimiter(',')"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Пояснения нарушителя"
            :value="body.violatorClarification"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Пояснения должностного лица"
            :value="body.officialClarification"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Тип признания вины"
            :value="body.guiltAdmissionTypeName"
            style="grid-column: span 2;"
          />
          <div v-if="body.inculpatoryEvidencesList && body.inculpatoryEvidencesList.length > 0" style="grid-column: span 2;margin: 5px 0;padding-left: 60px;">
            <p class="adm-14 color-dark-lighter ">Список доказательств виновности</p>
            <div v-for="(item, index) in body.inculpatoryEvidencesList" :key="index">
              <p class="adm-text-big color-dark-base">{{ item.name}} (Количество листов - {{item.sheets_quantity}})</p>
            </div>
          </div>
          <div v-if="body.exculpatoryEvidencesList && body.exculpatoryEvidencesList.length > 0" style="grid-column: span 2;margin: 5px 0;padding-left: 60px;">
            <p class="adm-14 color-dark-lighter ">Список доказательств невиновности</p>
            <div v-for="(item, index) in body.exculpatoryEvidencesList" :key="index">
              <p class="adm-text-big color-dark-base">{{ item.name }}</p>
            </div>
          </div>

          <hr>

          <view-data-item
            label="Должностное лицо"
            :value="body.inspSostName, body.inspSostDolz, body.inspSostRang | concatByDelimiter(',')"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/police.svg')"
          />
          <view-data-item
            label="Подразделение"
            :value="body.organSostName || 'нет информации'"
            style="grid-column: span 2;"
          />
          <view-data-item
            label="Место составления"
            :value="body.placeSost.placeFull || 'нет информации'"
            style="grid-column: span 2;"
            :icon="require('../../assets/images/icons/map.svg')"
          />
        </div>
      </div>
    </div>
    <div v-if="docSignatures" class="errors-table errors-table--v2">
      <div class="errors-table__container">
        <h2  @click="hideMore = !hideMore" class="adm-form__headding bg-white cursor-pointer flex-parent flex-parent--space-between-main">
          <span class="adm-h4 color-dark-lighter" style="line-height: inherit;">Подписи</span>
          <Button type="text" class="bg-transparent" style="box-shadow: none;">
            <Icon v-if="hideMore" type="md-remove" class="color-gray" :size="25" title="свернуть" />
            <Icon v-else type="md-add" class="color-gray" :size="25" title="развернуть"/>
          </Button>
        </h2>
        <div class="errors-table__content" v-show="hideMore">
          <table class='adm-table-simple table table--fixed border--0'>
            <thead>
            <tr class="bg-white-light">
              <th class="w180 align-middle">
                <p class="adm-text-big txt-normal color-dark-lighter">Издатель сертификата ключа подписи</p>
              </th>
              <th class="w180 align-middle">
                <p class="adm-text-big txt-normal color-dark-lighter">Владелец сертификата ключа подписи</p>
              </th>
              <th class="w180 align-middle">
                <p class="adm-text-big txt-normal color-dark-lighter">Пользователь, создавший документ</p>
              </th>
              <th class="w180 align-middle">
                <p class="adm-text-big txt-normal color-dark-lighter">Время создания</p>
              </th>
              <th class="w180 align-middle">
                <p class="adm-text-big txt-normal color-dark-lighter">Список файлов</p>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, itemIdx) in docSignatures" :key="itemIdx">
              <td class="align-middle">
                <p class="adm-14 color-dark-base">{{item.sign.certIssuer}}</p>
              </td>
              <td class="align-middle">
                <p class="adm-14 color-dark-base">{{item.sign.certSubject}}</p>
              </td>
              <td class="align-middle">
                <p class="adm-14 color-dark-base">{{item.sign.createIspName}}</p>
              </td>
              <td class="align-middle">
                <p class="adm-14 color-dark-base">{{item.sign.createTime | formatDateTime('DD.MM.YYYY HH:mm')}}</p>
              </td>
              <td class="align-middle">
                <img class="error-image" alt="img" src="../../assets/images/icons/pdf.svg" title="Скачать документ" v-for="(itemMedia, itemMediaIdx) in item.media" :key="itemMediaIdx" @click="downloadMedia(itemMedia.mediaId)" />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as ConstantUtils from '~/assets/js/utils/constantUtils';
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import RequestApi from "~/assets/js/api/requestApi";
  import * as formStack from '~/assets/js/api/formStack';
  import * as innerFormStack from '~/assets/js/api/innerFormStack';
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdDocsPost",
    components: {
    },
    async created() {
      try {
        await this.init();

        let vm = this;
        this.$store.watch(this.$store.getters.frmEdDocsPostGetCommand, async () => {
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
      this.$store.dispatch('frmEdDocsPostSetCid', null);
      this.$store.dispatch('frmEdDocsPostSetData', null);
    },
    data() {
      return {
        docSignatures: null,
        hideMore: false,
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDocsPostGetData'
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
          await this.$store.dispatch('frmEdDocsPostSetCid', currentForm.cid);

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
          this.fillDocSignatures();
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      async fillDocSignatures() {
        let currentForm = innerFormStack.getCurrent();
        let eventResponse = await RequestApi.prepareData({
          method: 'getDocSinatures',
          cid: currentForm.cid
        });
        let responseData = JSON.parse(eventResponse.response).data;
        if (responseData && responseData.length) {
          this.docSignatures = responseData.sort((a,b)=> b.sign.createTime - a.sign.createTime);
        }
      },
      async downloadMedia(mediaId) {
        try {
          let eventResponse = await RequestApi.sendGetMediaFileHttpRequest({
            url: `${ConstantUtils.HTTP_URL_FILES}/${localStorage.getItem('admSid')}/${mediaId}`
          });
          let data = null;
          if (eventResponse.response) {
            data = eventResponse.response;
          }
          if (data) {
            let element = document.createElement("a");
            element.href = window.URL.createObjectURL(data);
            element.setAttribute("download", `${funcUtils.guid()}.pdf`);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }
        } catch (e) {
          this.$Notice.warning({
            title: 'Ошибка получения данных',
            desc: e.message,
            duration: 10
          });
        }
      },
      getDocsPostEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            node: currentForm.params
          };

          formStack.toNext({
            module: this.$store.state.frmEdDocsPostEdit,
            vm: this,
            notRemoved: false,
            params: params,
            withCreate: true
          });
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      getSignatureEdit() {
        try {
          let currentForm = innerFormStack.getCurrent();
          let params = {
            docCID: currentForm.cid
          };

          formStack.toNext({
            module: this.$store.state.frmSignatureEdit,
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

<style lang="scss" scoped>
  .errors-table{
    .table td{
      border-bottom: 0;
    }
    margin-top: 30px;
    margin-bottom: 30px;
    .error-th{
      width: 60px;
    }
    .adm-table-simple thead tr th{
      padding: 8px 12px;
    }
    .adm-form__headding{
      height: 40px;
      line-height: 40px;
      padding-left: 40px;
    }

    .error-image {
      width: 25px;
      height: 25px;
      margin: 5px;
      cursor: pointer;
    }
  }
  .errors-table--v2 .errors-table__container{
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.26), 0 0 4px 0 rgba(0,0,0,0.16);
    background: #fff;
  }
</style>
