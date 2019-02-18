<template>
  <div v-if="data">
    <!-- данные по делу  -->
    <!-- {{data}} -->
    <Form :label-width="180" label-position="right">
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Номер Дела</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дата возбуждения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <DatePicker type="date" format="dd-MM-yyyy"  placeholder="Select date" class="wmin120 wmax180"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">По статье Административного Кодекса</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Вид</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="wmax240 wmin180" placeholder="" filterable clearable>
                <Option value="l" class="wmax360 txt-break-word">1</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Стадия дела</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Select class="wmax240 wmin180" placeholder="" filterable clearable>
                <Option value="l" class="wmax360 txt-break-word">1</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <hr class="txt-hr my24">

        <h2 class="adm-text-big color-dark-light my12">Решение по делу</h2>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Документ возбудивший дело</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>
        
        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Личный номер сотрудника</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">ФИО сотрудника, Звание, Должность</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Код подразделения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Подразделение</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Стадия приемки</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Местонахождение</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дело основание</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Примечания</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <hr class="txt-hr my24">
        <h2 class="adm-text-big color-dark-light my12">Сведенья</h2>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Уникальный номер административного правонарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дата и Время нарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <DatePicker type="datetime" format="dd-MM-yyyy HH:mm" placeholder="Select date" class="wmin120 wmax180"></DatePicker>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Место нарушения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Лицо в отношении которого ведется дело</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Транспортное средство, ГРЗ</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">По пункту Нормативно-Правового Акта</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">По статье Административного Кодекса</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Код бютжетной классификации</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Фактические сведения по нарушению</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>


        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Дополнительные сведения</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Содержание алкголя в крови %, мг/л</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <hr class="txt-hr my24">
        <h2 class="adm-text-big color-dark-light my12">Данные видеофиксации</h2>


        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Название комплекса видеофиксации</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Уникальный номер комплекса</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Серитфикат поверки комплекса</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
              <Input placeholder="Enter something..."></Input>
            </Col>
          </Row>
        </FormItem>

        <FormItem class="my12">
          <small class="adm-text-small color-gray-medium" slot="label">Серитфикат действителен до</small>
          <Row :gutter="16" type="flex" align="middle">
            <Col :xs="24" :md="14" :lg="16">
               <DatePicker type="date" format="dd-MM-yyyy"  placeholder="Select date" class="wmin120 wmax180"></DatePicker>
            </Col>
          </Row>
        </FormItem>

    </Form>

    <hr class="txt-hr my24">
    <h2 class="adm-text-big color-dark-light my12">Ошибки</h2>


    <table class='table table--fixed border--0'>
      <thead>
        <tr class="bg-white-light">
          <th class="w36">
            
          </th>
          <th class="w120">
            <p class="adm-txt-regular color-dark-light">Код ошибки</p>
          </th>
          <th class="w180">
            <p class="adm-txt-regular color-dark-light">Проверил</p>
            <i class="adm-btn-small color-dark-light">Время проверки</i>
          </th>
          <th>
            <p class="adm-txt-regular color-dark-light">Ошибка</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="align-center">
            <div class="round-full bg-yellow w12 h12"></div>
          </td>
          <td>
            <p class="adm-txt-regular">9-14</p>
          </td>
          <td>
            <p class="adm-txt-regular">Иванов В. М.</p>
            <p class="adm-text-small">12.09.2019</p>
          </td>
          <td>
            <p class="adm-txt-regular">Дата вступления в законную силу решения с кодом 65  больше предпологаемой</p>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import * as innerFormStack from '../../assets/js/api/innerFormStack';
  import RequestApi from "../../assets/js/api/requestApi";
  import { mapGetters } from 'vuex';

  export default {
    name: "FrmEdDelo",
    async created() {
      try {
        let current = formStack.getCurrent();
        let currentForm = innerFormStack.getCurrent({
          uid: current.moduleName
        });
        await this.$store.dispatch('frmEdDeloSetCid', currentForm.cid);

        let prepareParams = {
          method: 'restore',
          cid: currentForm.cid
        };
        if (funcUtils.isEmpty(currentForm.restore)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'node': currentForm.params
          };
        }
        delete currentForm['restore'];
        let eventResponse = await RequestApi.prepareData(prepareParams);
        await this.$store.dispatch('fillModule', {'event': eventResponse});
      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('frmEdDeloSetCid', null);
      this.$store.dispatch('frmEdDeloSetData', null);
    },
    computed: {
      ...mapGetters({
        dataStore: 'frmEdDeloGetData'
      }),
      data() {
        let res = null;
        if (this.dataStore) {
          res = this.dataStore.body;
        }
        return res;
      },
    },
  }
</script>

<style scoped>

</style>
