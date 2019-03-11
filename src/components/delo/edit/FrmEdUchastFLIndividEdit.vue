<template>
  <div v-if="uchastIndivid">
    <Button @click="getPrev" type="text">Назад</Button>
    <Button @click="save" type="text">Сохранить</Button>

    <div class="adm-form">

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">АМТС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastIndivid.vehsId" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in vehsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Вид участника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastIndivid.uchastVid" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in vidList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Тип участника</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastIndivid.uchastTip" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in tipList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">СНИЛС</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.snils" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Ранг</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.rang" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Фамилия</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.individ.firstName" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Имя</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.individ.secondName" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Отчество</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.individ.thirdName" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Дата рождения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <input-mask v-model="uchastIndivid.individ.birthdayDay" :maskProps="maskInputBirthday" :value="uchastIndivid.individ.birthdayDay" inputClass="adm-input adm-input--regular" @onInputChange="store" :clearable="true"></input-mask>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Пол</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastIndivid.individ.sex" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Место рождения</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastIndivid.individ.birthMestoKod" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in birthMestoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Адрес регистрации</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" disabled v-model="uchastIndivid.individ.address.adrFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="getregAddr" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Адресный справочник</a>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Фактический адрес</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" disabled v-model="uchastIndivid.factAddr.adrFull" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </Col>
          <Col :xs="24" :md="14" :lg="8">
            <a href="#" @click="getFactAddr" class="link color-blue-base adm-txt-regular txt-underline-on-hover block">Адресный справочник</a>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Гражданство</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Select class="adm-input adm-input--regular wmax240 wmin180" placeholder="" v-model="uchastIndivid.individ.gragdKod" clearable filterable @on-change="store">
              <Option class="wmax360 txt-break-word" v-for="item in gragdanstvoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">ИНН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.individ.inn" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Кем выдан ИНН</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.individ.innKemVydan" ></Input>
          </Col>
        </Row>
      </div>

      <div class="my12 adm-form__item">
        <small class="adm-text-small color-gray-medium adm-form__label">Телефон</small>
        <Row :gutter="16" type="flex" align="middle">
          <Col :xs="24" :md="14" :lg="16">
            <Input class="adm-input adm-input--regular" @on-input-change="store" v-model="uchastIndivid.individ.phone" ></Input>
          </Col>
        </Row>
      </div>

    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import InputMask from "../../InputMask";

  export default {
    name: "FrmEdUchastFLIndividEdit",
    components: {
      InputMask
    },
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('frmEdUchastFLIndividEditSetCid', current.cid);
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.node)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'node': this.$route.params.node
          };
        }
        let eventResponse = await RequestApi.prepareData(prepareParams);
        let uchastIndivid = JSON.parse(eventResponse.response).data;

        if (funcUtils.isEmpty(uchastIndivid)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        } else {
          await this.fillVehsList();
          await this.fillTipList();
          await this.fillVidList();
          await this.fillBirthMestoList();
          await this.fillGragdanstvoList();

          this.uchastIndivid = uchastIndivid;
        }
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdUchastFLIndividEditSetCid', null);
      this.$store.dispatch('frmEdUchastFLIndividEditSetData', null);
    },
    data() {
      return {
        maskInputBirthday: {
          alias: "datetime",
          inputFormat: 'dd/mm/yyyy'
        },
        uchastIndivid: null,
        vehsList: null,
        tipList: null,
        vidList: null,
        birthMestoList: null,
        gragdanstvoList: null,
        sexList: [
          {
            label: 'Мужской',
            value: 'М'
          },
          {
            label: 'Женский',
            value: 'Ж'
          },
        ],
      }
    },
    methods: {
      async fillVehsList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getVehs'
        });
        let vehsList = [];
        let vehsDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < vehsDict.length; i++) {
          let vehs = vehsDict[i];
          vehsList.push({
            label: vehs.vehsName,
            value: vehs.id
          });
        }
        this.vehsList = vehsList;
      },
      async fillTipList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getTipFLDictionary'
        });
        let tipList = [];
        let tipDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < tipDict.length; i++) {
          let tip = tipDict[i];
          tipList.push({
            label: tip.UCHAST_TIP_NAME,
            value: tip.UCHAST_TIP
          });
        }
        this.tipList = tipList;
      },
      async fillVidList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getVidDictionary'
        });
        let vidList = [];
        let vidDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < vidDict.length; i++) {
          let vid = vidDict[i];
          vidList.push({
            label: vid.UCHAST_VID_NAME,
            value: vid.UCHAST_VID
          });
        }
        this.vidList = vidList;
      },
      async fillBirthMestoList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getBirthMestoDictionary'
        });
        let birthMestoList = [];
        let birthMestoDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < birthMestoDict.length; i++) {
          let birthMesto = birthMestoDict[i];
          birthMestoList.push({
            label: birthMesto.BIRTH_MESTO,
            value: birthMesto.BIRTH_MESTO_KOD
          });
        }
        this.birthMestoList = birthMestoList;
      },
      async fillGragdanstvoList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getGragdanstvoDictionary'
        });
        let gragdanstvoList = [];
        let gragdanstvoDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < gragdanstvoDict.length; i++) {
          let gragdanstvo = gragdanstvoDict[i];
          gragdanstvoList.push({
            label: gragdanstvo.GRAGD_NAME,
            value: gragdanstvo.GRAGD_KOD
          });
        }
        this.gragdanstvoList = gragdanstvoList;
      },
      async getFactAddr() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getFactAddrCID'
        });
        let cid = JSON.parse(eventResponse.response).data;

        formStack.toNext({
          module: this.$store.state.addressViewEdit,
          vm: this,
          notRemoved: false,
          withCreate: false,
          cid: cid
        });
      },
      async getregAddr() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getRegAddrCID'
        });
        let cid = JSON.parse(eventResponse.response).data;

        formStack.toNext({
          module: this.$store.state.addressViewEdit,
          vm: this,
          notRemoved: false,
          withCreate: false,
          cid: cid
        });
      },
      store() {
        RequestApi.prepareData({
          method: 'store',
          params: {
            data: this.uchastIndivid
          }
        });
      },
      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'update'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          alert(error.errorMsg);
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
          alert(e.message);
        }
      },
    },
  }
</script>

<style scoped>

</style>
