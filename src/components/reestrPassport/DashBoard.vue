<template>
    <div>
      <div class="wmax1920 mx-auto">
        <!-- <a href="#" @click="getPrev()">Назад</a> -->
		
		<div class="flex-parent flex-parent--center-main flex-parent--center-cross" style="margin-top: 6%"><!-- style="height: calc(100vh - 66px);" -->
			<div>
				<Row type="flex" justify="center">
					<Col>
						<Card class="truck-card px24 my12 mx12" style="min-width: 550px">
							<p class="adm-txt-regular color-dark-light my18">Эвакуация автомобиля</p>
							<ul>
								<li class="my18">
									<a href="#" @click="createWizardScenarioPZTC" class="adm-text-big link color-blue-base txt-underline-on-hover">Протокол о задержании автомобиля</a>
								</li>
								<li class="my18">
									<a href="#" @click="createWizardScenarioAPN" class="adm-text-big link color-blue-base txt-underline-on-hover">Протокол об административном правонарушении</a>
								</li>
								<li class="my18">
									<a href="" class="adm-text-big link color-blue-base txt-underline-on-hover">Определение об эвакуации автомобиля</a>
									<p class="adm-text-small color-gray-medium">по обращению граждан или Московского паркинга</p>
								</li>
							</ul>
						</Card>
					</Col>
					<Col>
						<Card class="taxi-card px24 my12 mx12" style="min-width: 320px">
							<p class="adm-txt-regular color-dark-light my18">Дело в отношеннии Такси</p>
							<ul>
								<li class="my18">
									<a href="" class="adm-text-big link color-blue-base txt-underline-on-hover">Извещением</a>
								</li>
								<li class="my18">
									<a href="" class="adm-text-big link color-blue-base txt-underline-on-hover">Протоколом</a>
								</li>
							</ul>
						</Card>
					</Col>
				</Row>

				<Row type="flex" justify="center">
					<Col>
						<Card class="px24 my12 mx12" style="min-width: 255px">
							<div class="flex-parent flex-parent--column flex-parent--center-cross">
								<div class="mb12">
									<img src="../../assets/images/camera.png" alt="">
								</div>
								<a href="" class="adm-text-big link color-blue-base txt-underline-on-hover">Фотофиксация нарушения</a>
							</div>
						</Card>
					</Col>
					<Col>
						<Card class="px24 my12 mx12" style="min-width: 255px">
							<div class="flex-parent flex-parent--column flex-parent--center-cross">
								<div class="mb12">
									<img src="../../assets/images/tax.png" alt="">
								</div>
								<a href="" class="adm-text-big link color-blue-base txt-underline-on-hover">Неуплата штрафа</a>
							</div>
						</Card>
					</Col>
					<Col>
						<Card class="px24 my12 mx12" style="min-width: 320px">
							<div class="flex-parent flex-parent--column flex-parent--center-cross">
								<div class="mb12">
									<img src="../../assets/images/police.png" alt="">
								</div>
								<a href="" class="adm-text-big link color-blue-base txt-underline-on-hover">Служба судебных приставов</a>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>

      </div>
    </div>
</template>

<script>
  import * as funcUtils from "../../assets/js/utils/funcUtils";
  import * as formStack from '../../assets/js/api/formStack';
  import RequestApi from "../../assets/js/api/requestApi";

  export default {
    name: "DashBoard",
    data() {
		  return {}
    },
    methods: {
      createWizardScenarioPZTC() {
        try {
          let params = {
            scenarioName: 'CreateProtPZTC'
          };

          formStack.toNext({
            module: this.$store.state.wizardExecuter,
            vm: this,
            notRemoved: true,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
      createWizardScenarioAPN() {
        try {
          let params = {
            scenarioName: 'CreateProtAPN'
          };

          formStack.toNext({
            module: this.$store.state.wizardExecuter,
            vm: this,
            notRemoved: true,
            params: params,
            withCreate: true
          });
        } catch (e) {
          alert(e.message);
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
	.truck-card{
		background-image: url('../../assets/images/truck.png');
		background-repeat: no-repeat;
		background-position:  97% 97%;
	}
	.taxi-card{
		background-image: url('../../assets/images/taxi.png');
		background-repeat: no-repeat;
		background-position:  97% 97%;
	}
</style>

