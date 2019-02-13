<template>
    <div class="header">
        <Row type="flex" align="middle" justify="space-between" class="wmax1280 mx-auto">
            <Col>
                <div class="flex-parent flex-parent--center-cross mr64">
                    <Button type="text" style="outline: 0!important;" class="icon-main px0 py0 mx12 my6 cursor-pointer" @click.native="collapsedSider">
                        <img src='../assets/images/burger.svg' class="wmax-none">
                    </Button>
                    <div>
                        <h1 class="adm-h2 color-dark-light txt-uppercase">Исод Мади</h1>
                    </div>
                </div>
            </Col>
            <Col>
                <Menu mode="horizontal" active-name="1" class="header-menu">
                    <div class="grid">
                        <MenuItem name="1" class="header-menu__item">Административный учет</MenuItem>
                        <MenuItem name="2" class="header-menu__item">Возбудить дело</MenuItem>
                        <MenuItem name="3" class="header-menu__item">Учет спецпродукции</MenuItem>
                        <MenuItem name="4" class="header-menu__item">Состояние выгрузки</MenuItem>
                        <MenuItem name="5" class="header-menu__item">Обработка документов</MenuItem>
                        <MenuItem name="6" class="header-menu__item">Почтовые реестры</MenuItem>
                    </div>
                </Menu>
            </Col>
        </Row>
    </div>
</template>



<script>
export default {
    name: 'MainMenu',
    methods: {
		collapsedSider () {
			this.$emit('collapsedSider');
		}
    }
}
</script>
