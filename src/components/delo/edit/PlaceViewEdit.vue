<template>
  <div v-if="data" class="wmax940 mx-auto">


    <div class="amd-title amd-title--sticky px36 py24 bg-white-light">
      <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
        <div class="flex-parent flex-parent--center-cross">
          <Button @click="getPrev" type="text" style="outline: 0!important;" class=" bg-transparent-on-hover color-blue-on-hover color-gray-light transition color-blue-on-focus" title="редактирование постановления">
            <Icon type="ios-arrow-dropleft" class=" " :size="35" />
          </Button>
          <b class="adm-text-big color-dark-lighter">Редактирование адреса</b>
        </div>
        <!-- <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
          <img src='../../../assets/images/wiki.svg' class="wmax-none">
        </Button> -->
      </div>
    </div>
      
    <div class="adm-form">
      <div class="adm-form__container mt0">
        <h2 class="adm-text-big color-dark-light adm-form__headding">{{title}}</h2>
        <div class="adm-form__content">
          <div class="adm-form__item">
            <small class="adm-form__label">Регион</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Select class="adm-input adm-input--regular wmin180" v-model="data.adr.regionId" filterable clearable @on-change="changeRegion">
                    <Option class="txt-break-word" v-for="item in regionsList" :value="item.regionId" :key="item.regionId">{{item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>

          <div class="adm-form__item">
            <small class="adm-form__label">Район</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Select class="adm-input adm-input--regular wmin180" v-model="data.adr.rayonId" filterable clearable :disabled="!isNotEmptyRegionId()" @on-change="changeRayon">
                    <Option class="txt-break-word" v-for="item in rayonsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>

          <div class="adm-form__item">
            <small class="adm-form__label">Населенный пункт</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Select class="adm-input adm-input--regular wmin180" v-model="data.adr.cityId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId()" @on-clear="changeCity" remote :remote-method="changeCity">
                    <Option class="txt-break-word" v-for="item in citiesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>


          <div class="adm-form__item">
            <small class="adm-form__label">Улица</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Select class="adm-input adm-input--regular wmin180" v-model="data.adr.streetId" filterable clearable :disabled="!isNotEmptyRegionId() && !isNotEmptyRayonId() && !isNotEmptyCityId()" @on-clear="changeStreet" remote :remote-method="changeStreet">
                    <Option class="txt-break-word" v-for="item in streetsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>


          <div class="flex-parent flex-parent--center-cross flex-parent--space-between-main">
            <div class="adm-form__item">
              <small class="adm-form__label">Дом</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular wmin60" v-model="data.adr.ndom" @on-input-change="store" :maxlength="5"></Input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-form__label">Корпус</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular wmin60" v-model="data.adr.nkorpus" @on-input-change="store" :maxlength="5"></Input>
                  </Col>
                </Row>
              </div>
            </div> 
            <div class="adm-form__item">
              <small class="adm-form__label">Строение</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular wmin60" v-model="data.adr.nstroenie" @on-input-change="store" :maxlength="5"></Input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-form__label">Индекс</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular wmin120" v-model="data.adr.pindex" disabled ></Input>
                  </Col>
                </Row>
              </div>
            </div>
          </div>



          <div class="adm-form__item mt24">
            <small class="adm-form__label">Место</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <!-- <Input class="adm-input adm-input--regular" v-model="data.placeId" ></Input> -->
                  <Select class="adm-input adm-input--regular wmin180" v-model="data.placeId" filterable clearable @on-query-change="changePlace" @on-clear="changePlace">
                    <Option class="txt-break-word" v-for="item in placesList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </Col>
              </Row>
            </div>
          </div>


          <div class="flex-parent flex-parent--center-cross">
            <div class="adm-form__item">
              <small class="adm-form__label">км, метр</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <masked-input inputClass="adm-input adm-input--regular" v-model="data.km" :maskProps="{casing: 'upper', regex: '[0-9]+', placeholder: ''}" @onInputChange="store" ></masked-input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-form__label wmin60">МГО</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular" v-model="data.machta" @on-input-change="store" ></Input>
                  </Col>
                </Row>
              </div>
            </div>
            <div class="adm-form__item">
              <small class="adm-form__label wmin60">МГТ</small>
              <div class="adm-form__item_content">
                <Row :gutter="16" type="flex" align="middle">
                  <Col :xs="24" :md="24" :lg="24">
                    <Input class="adm-input adm-input--regular" v-model="data.mgt" @on-input-change="store" ></Input>
                  </Col>
                </Row>
              </div>
            </div>
          </div>

          <div class="adm-form__item">
            <small class="adm-form__label">Доп. сведения</small>
            <div class="adm-form__item_content">
              <Row :gutter="16" type="flex" align="middle">
                <Col :xs="24" :md="24" :lg="24">
                  <Input class="adm-input adm-input--regular" v-model="data.dopSved" @on-input-change="store"></Input>
                </Col>
              </Row>
            </div>
          </div>

          <div class="mt24">
            <Row :gutter="16" type="flex" align="middle" >
              <Col :xs="12" :md="12" :lg="12">
                <div class="adm-form__item">
                  <small class="adm-form__label">Широта</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" v-model="data.y" @on-input-change="store" disabled></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col :xs="12" :md="12" :lg="12">
                <div class="adm-form__item">
                  <small class="adm-form__label">Долгота</small>
                  <div class="adm-form__item_content">
                    <Row :gutter="16" type="flex" align="middle">
                      <Col :xs="24" :md="24" :lg="24">
                        <Input class="adm-input adm-input--regular" v-model="data.x" @on-input-change="store" disabled></Input>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div class="flex-parent flex-parent--center-cross flex-parent--end-main px36 my24">
        <Button @click="getPrev" type="text" class="adm-btn adm-btn-small bg-transparent">Отменить изменения</Button>
        <Button @click="save" type="text" class="adm-btn adm-btn-regular color-blue-base adm-btn-border txt-uppercase">Сохранить</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";
  import MaskedInput from "~/components/shared/MaskedInput";
  
  export default {
    name: "PlaceViewEdit",
    components: {MaskedInput},
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('placeViewEditSetCid', current.cid);


        if(funcUtils.isNotEmpty(current.params.type)){
          switch (current.params.type) {
            case 'placeSost':
              this.title = "Редактирование адреса места вынесения";
            break;
            case 'placeNar':
              this.title = "Редактирование адреса места нарушения";
            break;
          }
        }

        let eventResponse = await RequestApi.prepareData({
          method: 'restore'
        });
        let data = JSON.parse(eventResponse.response).data;

        await this.initData(data);
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('placeViewEditSetCid', null);
      this.$store.dispatch('placeViewEditSetData', null);
    },
    data() {
      return {
        data: null,
        regionsList: null,
        rayonsList: null,
        citiesList: null,
        streetsList: null,
        roadsList: null,
        placesList: null,
        dopStreetsList: null,
        dopRoadsList: null,
        dopPlacesList: null,
        title: 'Редактирование адреса места нарушения / места составления'
      }
    },
    computed: {
      showDopAddress() {
        let res = false;
        if (this.data) {
          res = this.data.placeTip5 === true || this.data.placeTip6 === true || this.data.placeTip8 === true;
        }
        return res;
      }
    },
    methods: {
      async initData(data) {
        data['placeTip1'] = data['placeTip1'] == 1;
        data['placeTip2'] = data['placeTip2'] == 1;
        data['placeTip3'] = data['placeTip3'] == 1;
        data['placeTip4'] = data['placeTip4'] == 1;
        data['placeTip5'] = data['placeTip5'] == 1;
        data['placeTip6'] = data['placeTip6'] == 1;
        data['placeTip7'] = data['placeTip7'] == 1;
        data['placeTip8'] = data['placeTip8'] == 1;

        this.data = data;

        await this.fillRegionList();
        await this.fillRayonList();
        await this.fillCityList();
        await this.fillRoadList();
        await this.fillPlaceList();
        await this.fillStreetList();

        if (this.showDopAddress) {
          await this.fillDopRoadList();
          await this.fillDopPlaceList();
          await this.fillDopStreetList();
        }
      },
      async changeRegion() {
        this.rayonsList = null;
        this.citiesList = null;
        this.streetsList = null;
        this.data.adr.rayonId = null;
        this.data.adr.cityId = null;
        this.data.adr.streetId = null;

        await this.fillRayonList();

        this.store();
      },
      changeRayon() {
        this.citiesList = null;
        this.streetsList = null;
        this.data.adr.cityId = null;
        this.data.adr.streetId = null;

        this.store();
      },
      async changeCity(query) {
        let limit;
        if (this.isNotEmptyRayonId()) {
          limit = 1;
        } else if (this.isNotEmptyRegionId()) {
          limit = 2;
        }
        if ((funcUtils.isEmpty(query) || query.length === 0)) {
          this.citiesList = null;
          this.streetsList = null;
          this.data.adr.cityId = null;
          this.data.adr.streetId = null;
        } else if (query.length > limit) {
          await this.fillCityList(query);
        }

        this.store();
      },
      async changeStreet(query) {
        let limit;
        if (this.isNotEmptyCityId()) {
          limit = 1;
        } else if (this.isNotEmptyRayonId()) {
          limit = 2;
        } else if (this.isNotEmptyRegionId()) {
          limit = 3;
        }
        if ((funcUtils.isEmpty(query) || query.length === 0)) {
          this.streetsList = null;
          this.data.adr.streetId = null;
        } else if (query.length > limit) {
          await this.fillStreetList(query);
        }

        this.store();
      },
      changePlace(query) {
        if ((funcUtils.isEmpty(query) || query.length === 0)) {
          this.data.placeId = null;
        }
        this.store();
      },
      changeRoad(query) {
        if ((funcUtils.isEmpty(query) || query.length === 0)) {
          this.data.roadId = null;
        }
        this.store();
      },

      async changeDopStreet(query) {
        let limit;
        if (this.isNotEmptyCityId()) {
          limit = 1;
        } else if (this.isNotEmptyRayonId()) {
          limit = 2;
        } else if (this.isNotEmptyRegionId()) {
          limit = 3;
        }
        if ((funcUtils.isEmpty(query) || query.length === 0)) {
          this.dopStreetsList = null;
          this.data.adrDop.streetId = null;
        } else if (query.length > limit) {
          await this.fillDopStreetList(query);
        }

        this.store();
      },
      changeDopPlace(query) {
        if ((funcUtils.isEmpty(query) || query.length === 0)) {
          this.data.dopPlaceId = null;
        }
        this.store();
      },
      changeDopRoad(query) {
        if ((funcUtils.isEmpty(query) || query.length === 0)) {
          this.data.dopRoadId = null;
        }
        this.store();
      },
      async changePlaceTip(placeTip) {
        let val = this.data[placeTip];
        if (placeTip === 'placeTip5' || placeTip === 'placeTip6' || placeTip === 'placeTip8') {
          this.data['placeTip1'] = false;
          this.data['placeTip2'] = false;
          this.data['placeTip3'] = false;
          this.data['placeTip4'] = false;
          this.data['placeTip7'] = false;
          this.clearDopAddress();

          if (val) {
            this.data['placeTip5'] = placeTip === 'placeTip5' ? val : false;
            this.data['placeTip6'] = placeTip === 'placeTip6' ? val : false;
            this.data['placeTip8'] = placeTip === 'placeTip8' ? val : false;
            if (funcUtils.isEmpty(this.dopStreetsList) && funcUtils.isEmpty(this.dopPlacesList)) {
              await this.fillDopRoadList();
              await this.fillDopPlaceList();
            }
          }
        } else if (placeTip !== 'placeTip5' && placeTip !== 'placeTip6' && placeTip !== 'placeTip8' && this.showDopAddress) {
          this.data['placeTip5'] = false;
          this.data['placeTip6'] = false;
          this.data['placeTip8'] = false;
          this.clearDopAddress();
        }

        this.store();
      },
      clearDopAddress() {
        this.data.adrDop.streetId = null;
        this.data.dopRoadId = null;
        this.data.dopPlaceId = null;
        this.data.dopMachta = null;
        this.data.dopMgt = null;
        this.data.dopKm = null;
        this.data.adrDop.ndom = null;
        this.data.adrDop.nkorpus = null;
        this.data.adrDop.nstroenie = null;
        this.data.dopDopSved = null;
      },

      async fillRegionList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getRegionDict'
        });
        let regionsList = [];
        let regionsDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < regionsDict.length; i++) {
          let region = regionsDict[i];
          regionsList.push({
            label: region.REGION_NAME,
            value: region.RESP_KOD,
            regionId: region.REGION_ID,
          });
        }
        this.regionsList = regionsList;
      },
      async fillRayonList() {
        if (this.isNotEmptyRegionId()) {
          let eventResponse = await RequestApi.prepareData({
            method: 'getRayonDict',
            params: {
              regionId: this.data.adr.regionId
            }
          });
          let rayonsList = [];
          let rayonsDict = JSON.parse(eventResponse.response).data;
          for (let i = 0; i < rayonsDict.length; i++) {
            let rayon = rayonsDict[i];
            rayonsList.push({
              label: rayon.name,
              value: rayon.id
            });
          }
          this.rayonsList = rayonsList;
        }
      },
      async fillCityList(query = '') {
        let eventResponse;
        if (this.isNotEmptyRayonId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getCitiesDictByRayon',
            params: {
              rayonId: this.data.adr.rayonId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRegionId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getCitiesDictByRegion',
            params: {
              regionId: this.data.adr.regionId,
              substr: query
            },
            withSpinner: false
          });
        }

        if (eventResponse) {
          let citiesList = [];
          let citiesDict = JSON.parse(eventResponse.response).data;
          for (let i = 0; i < citiesDict.length; i++) {
            let citi = citiesDict[i];
            if (funcUtils.isNotEmpty(this.data.adr.cityId) && citi.id != this.data.adr.cityId) {
              continue;
            }
            citiesList.push({
              label: citi.name,
              value: citi.id
            });
          }
          this.citiesList = citiesList;
        }
      },
      async fillRoadList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getRoads'
        });
        let roadsList = [];
        let roadsDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < roadsDict.length; i++) {
          let road = roadsDict[i];
          roadsList.push({
            label: road.NAME,
            value: road.ID
          });
        }
        this.roadsList = roadsList;
      },
      async fillPlaceList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getPlaces'
        });
        let placesList = [];
        let placesDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < placesDict.length; i++) {
          let place = placesDict[i];
          let label;
          if (funcUtils.isNotEmpty(place.PLACE_KOD)) {
            label = place.PLACE_KOD + ', ' + place.PLACE_NAME;
          } else {
            label = place.PLACE_NAME;
          }
          placesList.push({
            label: label,
            value: place.PLACE_ID
          });
        }
        this.placesList = placesList;
      },
      async fillStreetList(query = '') {
        let eventResponse;
        if (this.isNotEmptyCityId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByCity',
            params: {
              cityId: this.data.adr.cityId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRayonId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByRayon',
            params: {
              rayonId: this.data.adr.rayonId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRegionId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByRegion',
            params: {
              regionId: this.data.adr.regionId,
              substr: query
            },
            withSpinner: false
          });
        }

        if (eventResponse) {
          let streetsList = [];
          let streetsDict = JSON.parse(eventResponse.response).data;
          for (let i = 0; i < streetsDict.length; i++) {
            let street = streetsDict[i];
            if (funcUtils.isNotEmpty(this.data.adr.streetId) && street.id != this.data.adr.streetId) {
              continue;
            }
            streetsList.push({
              label: street.name,
              value: street.id
            });
          }
          this.streetsList = streetsList;
        }
      },

      async fillDopRoadList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getRoads'
        });
        let roadsList = [];
        let roadsDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < roadsDict.length; i++) {
          let road = roadsDict[i];
          roadsList.push({
            label: road.NAME,
            value: road.ID
          });
        }
        this.dopRoadsList = roadsList;
      },
      async fillDopPlaceList() {
        let eventResponse = await RequestApi.prepareData({
          method: 'getPlaces'
        });
        let placesList = [];
        let placesDict = JSON.parse(eventResponse.response).data;
        for (let i = 0; i < placesDict.length; i++) {
          let place = placesDict[i];
          placesList.push({
            label: place.PLACE_NAME,
            value: place.PLACE_ID
          });
        }
        this.dopPlacesList = placesList;
      },
      async fillDopStreetList(query = '') {
        let eventResponse;
        if (this.isNotEmptyCityId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByCity',
            params: {
              cityId: this.data.adr.cityId,
              substr: query
            },
            withSpinner: false
          });
        } else if (this.isNotEmptyRayonId()) {
          eventResponse = await RequestApi.prepareData({
            method: 'getStreetsDictByRayon',
            params: {
              rayonId: this.data.adr.rayonId,
              substr: query
            },
            withSpinner: false
          });
        }

        if (eventResponse) {
          let streetsList = [];
          let streetsDict = JSON.parse(eventResponse.response).data;
          for (let i = 0; i < streetsDict.length; i++) {
            let street = streetsDict[i];
            if (funcUtils.isNotEmpty(this.data.adrDop.streetId) && street.id != this.data.adrDop.streetId) {
              continue;
            }
            streetsList.push({
              label: street.name,
              value: street.id
            });
          }
          this.dopStreetsList = streetsList;
        }
      },

      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'save'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          alert(error.errorMsg);
        } else {
          this.getPrev();
        }
      },
      isNotEmptyRegionId() {
        return funcUtils.isNotEmpty(this.data.adr.regionId);
      },
      isNotEmptyCityId() {
        return funcUtils.isNotEmpty(this.data.adr.cityId);
      },
      isNotEmptyRayonId() {
        return funcUtils.isNotEmpty(this.data.adr.rayonId);
      },
      async store() {
        let copyData = JSON.parse(JSON.stringify(this.data));
        copyData['placeTip1'] = copyData['placeTip1'] ? 1 : null;
        copyData['placeTip2'] = copyData['placeTip2'] ? 1 : null;
        copyData['placeTip3'] = copyData['placeTip3'] ? 1 : null;
        copyData['placeTip4'] = copyData['placeTip4'] ? 1 : null;
        copyData['placeTip5'] = copyData['placeTip5'] ? 1 : null;
        copyData['placeTip6'] = copyData['placeTip6'] ? 1 : null;
        copyData['placeTip7'] = copyData['placeTip7'] ? 1 : null;
        copyData['placeTip8'] = copyData['placeTip8'] ? 1 : null;

        let eventResponse = await RequestApi.prepareData({
          method: 'store',
          params: {
            data: copyData
          }
        });
        if (eventResponse.response) {
          let data = JSON.parse(eventResponse.response).data;
          await this.initData(data);
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
    }
  }
</script>

<style scoped lang="scss">
  .adm-form-content{

  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 12px;
    // outline: 1px solid red;
    padding-bottom: 12px;
    // min-height: 90px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 130px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>
