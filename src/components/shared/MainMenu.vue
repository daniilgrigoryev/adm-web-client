<template>
  <header>
    <div class="content">
      <div class="logo-wrap">
        <img :src="require('~/assets/images/logo_Madi_red.svg')" alt="" class="logo">
        <h1 class="title">
          <span>Исод</span>
          Мади
        </h1>
      </div>
      <Menu mode="horizontal" active-name="1" :active-name="activeName" @on-select="selectMenu" class="header-menu">
        <MenuItem name="1" class="header-menu__item">Поиск дел</MenuItem>
        <MenuItem name="2" class="header-menu__item">Возбудить дело</MenuItem>
        <MenuItem name="3" class="header-menu__item">Учет спецпродукции</MenuItem>
        <MenuItem name="4" class="header-menu__item">Состояние выгрузки</MenuItem>
        <MenuItem name="5" class="header-menu__item">Обработка документов</MenuItem>
        <MenuItem name="6" class="header-menu__item">Передача материалов в ФССП</MenuItem>
        <li class="header-menu__item ivu-menu-item">
          <Poptip>
            <button>
              Реестры
            </button>
            <div slot="content">
              <li><MenuItem name="7">Документы на подписание</MenuItem></li>
              <li><MenuItem name="8">Почтовые реестры</MenuItem></li>
              <li><MenuItem name="9">Рапорта</MenuItem></li>
            </div>
          </Poptip>
        </li>
      </Menu>
      <div class="sidebar-wrap">
        <img :src="require('~/assets/images/icons/user-avatar.svg')" class="avatar">
        <button type="text" @click="collapsedSider" class="burger">
          <img :src="require('~/assets/images/icons/user-avatar-burger.svg')">
        </button>
      </div>
    </div>
  </header>
</template>


<script>
import * as funcUtils from "~/assets/js/utils/funcUtils";

export default {
  name: "MainMenu",
  mounted() {
    try {
      let activeName = funcUtils.getFromSessionStorage("mainMenuActiveName");
      if (funcUtils.isNotEmpty(activeName)) {
        this.activeName = activeName;
      }
    } catch (e) {
      this.$Notice.warning({
        title: "Ошибка получения данных",
        desc: e.message,
        duration: 10
      });
    }
  },
  data() {
    return {
      activeName: "1"
    };
  },
  methods: {
    collapsedSider() {
      this.$emit("collapsedSider");
    },
    selectMenu(activeName) {
      switch (+activeName) {
        case 1: {
          this.$root.getDeloReestr();
          break;
        }
        case 2: {
          this.$root.getDashBoardReestr();
          break;
        }
        case 7: {
          // this.$root.getDocsForSigning();
        }
        case 8: {
          this.$root.getRegistryReestr();
        }
        case 9: {
          // this.$root.getRegistryReestr();
        }
      }
      funcUtils.addToSessionStorage("mainMenuActiveName", activeName);
    }
  }
};
</script>


<style lang="scss" scoped>
header {
  background: #fff;
  border-bottom: 1px solid #ccc;
  z-index: 88;
  position: sticky;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 30px;
    max-width: 1920px;
    margin: 0 auto;
    height: 66px;
  }
  .logo-wrap {
    flex: none;
    display: flex;
    align-items: center;
    .logo {
      height: 50px;
    }
    .title {
      font-size: 22px;
      color: #868686;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      line-height: 1;
      text-transform: uppercase;
      span {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .header-menu {
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap !important;
    &:after {
      content: none !important;
    }
    .header-menu__item {
      float: none !important;
      border-bottom: 5px solid transparent;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1.2;
      text-align: center;
      &:hover,
      &.ivu-menu-item-active {
        border-bottom: 5px solid #1888cc;
      }
      .ivu-menu-item {
        border: none !important;
        text-align: left;
        padding: 0;
      }
    }
  }
  .sidebar-wrap {
    display: flex;
    align-items: center;
    flex: none;
    .avatar {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      background: #ccc;
      margin-right: 8px;
      img {
        max-width: 100%;
        max-height: 100%;
        height: 100%;
      }
    }
    .burger {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .3s ease;
      &:hover {
        opacity: .7;
      }
    }
  }
}
</style>
