<template>
  <div v-if="body" class="ml18">
    <div class="px36 py18"><!-- wmax940 mx-auto -->
        <div class="flex-parent flex-parent--space-between-main flex-parent--center-cross">
          <div class="flex-parent flex-parent--center-cross">
            <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer mr24" title="Редактировать">
              <img src='../../assets/images/pen.svg' class="wmax-none">
            </Button>
            <b class="adm-text-big color-dark-lighter">Участник дела</b>
          </div>
          <Button type="text" style="outline: 0!important;" class="px0 py0 cursor-pointer">
            <img src='../../assets/images/wiki.svg' class="wmax-none">
          </Button>
        </div>
    </div>


    <div class="adm-form">
      <div class="adm-form__container my0 mx0 py12 px36">
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Фамилия Имя Отчество лица - год рождения (возраст)</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Input class="adm-input adm-input--regular" readonly :value="body.individ.firstName + ' ' + body.individ.secondName + ' ' + body.individ.thirdName, body.individ.birthdayYear | concatByDelimiter('-') + ' г.р'" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              </Col>
            </Row>
          </div>
        </div>
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Пол</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Input class="adm-input adm-input--regular" readonly :value="body.individ.sex" ></Input>
              </Col>
            </Row>
          </div>
        </div>


        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Место рождения</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Input class="adm-input adm-input--regular" readonly :value="body.individ.birthMesto"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              </Col>
            </Row>
          </div>
        </div>
        
        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Гражданство</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Input class="adm-input adm-input--regular" readonly :value="body.individ.gragdName" ></Input>
              </Col>
            </Row>
          </div>
        </div>


        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Адрес регистрации</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Input class="adm-input adm-input--regular" readonly :value="body.individ.address.adrFull"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              </Col>
            </Row>
          </div>
        </div>

        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Место фактического проживания</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Input class="adm-input adm-input--regular" readonly :value="body.factAddr.adrFull"  type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              </Col>
            </Row>
          </div>
        </div>

        <div class="adm-form__item">
          <small class="adm-text-small adm-form__label">Телефон</small>
          <div class="adm-form__item_content">
            <Row :gutter="16" type="flex" align="middle">
              <Col :xs="24" :md="14" :lg="16">
                <Input class="adm-input adm-input--regular" readonly :value="body.individ.address.phone"></Input>
              </Col>
            </Row>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdUchastFLIndivid",
    data() {
      return {
      }
    },
    methods: {},
    computed: {
      ...mapGetters({
        dataStore: 'frmEdUchastFLGetData'
      }),
      body() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      }
    },
  }
</script>

<style scoped lang="scss">
  .adm-form-content{

  }
  .adm-form__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 20px;
    // outline: 1px solid red;
    padding-bottom: 20px;
    // min-height: 90px;
  }
  .adm-form__label{
    padding: 0;
    padding-right: 12px;
    min-width: 210px;
  }
  .adm-form__item_content{
    width: 100%;
  }
</style>