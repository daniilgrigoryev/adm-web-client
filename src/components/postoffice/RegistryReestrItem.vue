<!-- prettier-ignore -->
<template>
  <div v-if="dataStore && body" class="layout">
    <Layout class="layout--inner" style="min-height: calc(100vh - 66px);">
      <div class="bg-white deloContext-sticky">
        <div class="flex-parent flex-parent--center-cross pl60 py6">
          <div class="flex-parent flex-parent--center-cross">

            <Button @click="getPrev" type="text" style="outline: 0!important;"
                    class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus" title="вернуться назад">
              <Icon type="ios-arrow-dropleft"
                    class="  px0 py0 mx0 my0" :size="30"/>
            </Button>

            <div class="color-dark-lighter">
              <span class="adm-h3">Почтовый реестр №</span>
              <span class="adm-h2">{{body.curIssue}}</span>
            </div>
          </div>
          <DateRangePickerMask class="adm-input adm-input--big adm-input-data" :valueFirst="findDeloListDateBeg" :valueSecond="findDeloListDateEnd"
                               clearable type="date" placeholder="дд/мм/гггг" @change="changeDateRange"
                               momentFormat="DD/MM/YYYY" maskFormat="dd/mm/yyyy"></DateRangePickerMask>
          <p class="ml24 flex-parent flex-parent--center-cross">
            <Button class="append-custom" icon="ios-search" @click="findDeloList" type="primary" :disabled="!findDeloListDateBeg || !findDeloListDateEnd">Найти список дел для создания отправлений</Button>
          </p>
          <div class="delo-menu">
            <div class="delo-menu--body-wrap">
            </div>
          </div>
        </div>
        <hr class="txt-hr my0">
      </div>


      <div v-if="visibleSendingDeloList" style="position: absolute; width: 70vw; height: 70vh; top: 15%; left: 15%; z-index: 10; background: gainsboro;">
        <Button @click="visibleSendingDeloList = false" type="primary">Закрыть</Button>
        <Button @click="checkDeloFromRegistry" type="primary">Проверить выбранные дела на возможность включения в реестр</Button>
        <Button @click="addDeloToRegistry" type="primary">Добавить выбранные дела в реестр</Button>
        <span v-if="freeSlotCount">Количество свободных слотов в реестре: {{ freeSlotCount }}</span>

        <ul v-if="sendingDeloList">
          <li v-for="(item, itemIdx) in sendingDeloList" :key="itemIdx">
           <div style="display: flex; align-items: center;">
             <Checkbox v-model="item.select" />
             <div style="display: flex; align-items: center;">
               <p class="adm-text-big txt-normal color-dark-lighter">Дело №</p>
               <p class="adm-14 color-dark-base">{{item.deloN}}</p>
             </div>
           </div>
            <ul v-if="item.checked">
              <li v-if="item.hasWarning" style="color: red">
                {{ item.warning }}
              </li>
              <li v-if="item.hasError" style="color: orange">
                {{ item.Error }}
              </li>
              <li v-if="!item.hasError && !item.hasWarning" style="color: limegreen">
                Успешно
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <Row type="flex">
          <Col class="col":xs="24" :sm="24" :md="24" :lg="24">
            <div class="mx-auto">
              <div>
                <div class="view-data">
                  <div class="view-data__container">
                    <div class="items-wrap">
                      <view-data-item
                        label="Исходящий номер"
                        :value="body.curIssue"
                        style="grid-column: span 2;"
                      />
                      <view-data-item
                        label="Время создания реестра"
                        :value="body.creationDate | formatDateTime('DD.MM.YYYY HH:mm')"
                        style="grid-column: span 2;"
                        :icon="require('../../assets/images/icons/time.svg')"
                      />
                      <view-data-item
                        label="Автор, создавший реестр"
                        :value="body.authorName"
                        style="grid-column: span 2;"
                      />
                      <view-data-item
                        label="Тип реестра"
                        :value="body.regTypeName"
                        style="grid-column: span 2;"
                        :icon="require('../../assets/images/icons/reshenie-variant-2_1.svg')"
                      />
                      <view-data-item
                        label="Статус реестра"
                        :value="body.statusName"
                        style="grid-column: span 2;"
                      />

                      <div v-if="sendings && sendings.length > 0" style="grid-column: span 2;margin: 5px 0;padding-left: 60px;">
                        <p class="adm-14 color-dark-lighter ">Список отправлений</p>
                        <div v-for="(item, index) in sendings" :key="index">
                          <p class="adm-text-big color-dark-base">{{ item }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  </div>
</template>

<script>
  import * as funcUtils from "~/assets/js/utils/funcUtils";
  import * as formStack from '~/assets/js/api/formStack';
  import RequestApi from "~/assets/js/api/requestApi";
  import {mapGetters} from 'vuex';

  export default {
    name: "RegistryReestrItem",
    components: {
      DateRangePickerMask: () => import('~/components/shared/dateTimeRangePicker/DateRangePickerMask')
    },
    async created() {
      await this.init();
      let vm = this;
      this.$store.watch(this.$store.getters.registryReestrItemGetCommand, async () => {
        try {
          await vm.init();
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      });
    },
    async destroyed() {
      this.$store.dispatch('registryReestrItemSetCid', null);
      this.$store.dispatch('registryReestrItemSetData', null);
    },
    data() {
      return {
        findDeloListDateBeg: null,
        findDeloListDateEnd: null,
        sendingDeloList: null,
        visibleSendingDeloList: false,
        freeSlotCount: null
      }
    },
    computed: {
      ...mapGetters({
        dataStore: 'registryReestrItemGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
      sendings() {
        let res = [];
        if (this.dataStore) {
          for (let i = 0; i < this.dataStore.sendings.length; i++) {
            let item = this.dataStore.sendings[i];
            res.push(item);
          }
        }
        return res;
      },
    },
    methods: {
      async init() {
        try {
          let current = formStack.getCurrent();
          await this.$store.dispatch('registryReestrItemSetCid', current.cid);
          let prepareParams = {
            method: 'restore'
          };
          let id = this.$route.params.id;
          if (funcUtils.isNotEmpty(id)) {
            prepareParams.method = 'getData';
            prepareParams.params = {
              'id': id
            };
          }

          let eventResponse = await RequestApi.prepareData(prepareParams);
          await this.$store.dispatch('fillModule', {'event': eventResponse});

          await this.fillFreeSlotCount();
        } catch (e) {
          this.$store.dispatch('errors/changeContent', {title: e.message,});
        }
      },
      changeDateRange(e) {
        this.findDeloListDateBeg = e.valueFirst;
        this.findDeloListDateEnd = e.valueSecond;
      },
      async fillFreeSlotCount() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getFreeSlotCount'
        });
        let responseData = JSON.parse(eventResponse.response).data;
        if (responseData) {
          this.freeSlotCount = responseData;
        }
      },
      async findDeloList() {
        this.visibleSendingDeloList = true;
        let eventResponse = await RequestApi.prepareData({
          method: 'getSendingDeloList',
          params: {
            dateBeg: this.findDeloListDateBeg,
            dateEnd: this.findDeloListDateEnd
          },
        });
        let responseData = JSON.parse(eventResponse.response).data;
        if (responseData) {
          this.sendingDeloList = responseData.body;
        }
      },
      async checkDeloFromRegistry() {
        for (let i = 0; i < this.sendingDeloList.length; i++) {
          let sendingDelo = this.sendingDeloList[i];
          if (sendingDelo.select && !sendingDelo.checked) {
            let eventResponse = await RequestApi.prepareData({
              method: 'checkDeloFromRegistry',
              params: {
                deloId: sendingDelo.deloId
              },
            });
            let responseData = JSON.parse(eventResponse.response).data;
            if (responseData) {
              sendingDelo.checked = true;
              switch (responseData.res) {
                case 1: {
                  sendingDelo.hasWarning = true;
                  sendingDelo.warning = responseData.warning;
                  break;
                }
                case 2: {
                  sendingDelo.hasError = true;
                  sendingDelo.Error = responseData.Error;
                  break;
                }
              }
            }
          }
        }
      },
      async addDeloToRegistry() {
        for (let i = 0; i < this.sendingDeloList.length; i++) {
          let sendingDelo = this.sendingDeloList[i];
          if (sendingDelo.select && sendingDelo.checked && !sendingDelo.hasError) {
            let eventResponse = await RequestApi.prepareData({
              method: 'addDeloToRegistry',
              params: {
                delo: sendingDelo
              },
            });

          }
        }
      },
      async getPrev() {
        try {
          await formStack.toPrev({
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
  .delo__headding {
    border-bottom: 2px solid transparent;
  }

  .delo__headding:hover {
    border-bottom: 2px solid #00b1ff;
  }

  .delo-menu {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 80px;
    align-items: center;
    @media screen and (max-width: 1300px) {
      grid-gap: 10px;
    }
    .delo-menu--body-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .delo-menu--poptip {
        display: flex;
        align-items: center;
        .search-wrap {
          border-bottom: 1px solid #CCCCCC;
          height: 40px;
          padding: 5px 15px;
          display: flex;
          align-items: center;
          img {
            margin-right: 10px;
          }
          .search {
            width: 100%;
            height: 100%;
            border: none;
            font-size: 14px;
            &::placeholder {
              font-style: italic;
              color: #CCCCCC;
            }
          }
        }
        .delo-menu__poptip-list {
          width: 350px;
          padding: 10px 0;
          li {
            display: flex;
            align-items: center;
            button {
              text-align: left;
              white-space: normal;
              border-radius: 0;
              width: 100%;
              margin: 3px 0;
              padding: 3px 15px;
            }
          }
        }
      }
    }
    .action-button {
      display: flex;
      align-items: center;
      color: #1888cc;
      margin: 0 10px;
      transition: .3s ease;
      &:disabled {
        opacity: .3;
        .ivu-icon-md-arrow-dropdown {
          opacity: 0;
        }
      }
      img {
        width: 1em;
        height: 1em;
        font-size: 36px;
      }
      .text {
        padding: 0 5px 0 5px;
      }
    }
    .special-buttons-wrap {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 20px;
      align-items: center;
      padding: 0 20px;
      button {
        width: 1em;
        height: 1em;
        font-size: 48px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        img {
          position: relative;
        }
        &:before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 0;
          height: 0;
          transition: .3s ease;
          background: #DCE4F7;
          border-radius: 50%;
          z-index: -1;
        }
        &:hover {
          &:before {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
