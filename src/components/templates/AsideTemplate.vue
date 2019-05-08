<template>
  <div class="aside-template">
    <aside>
      <h3>
        <Button @click="getPrev" type="text" title="вернуться назад">
          <Icon type="ios-arrow-dropleft" :size="30" />
        </Button>
        {{ title }}
      </h3>
      <h3 v-if="listSectionNav && listSectionNav.length">Список подразделов</h3>
      <ul v-if="listSectionNav">
        <li v-for="item in listSectionNav" :key="item.id" v-if="!item.hide">
          <a :href="'#' + item.name" >{{ item.title }}</a>
        </li>
      </ul>
    </aside>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<script>
import * as formStack from '~/assets/js/api/formStack';

export default {
  props: {
    listSectionNav: {
      type: Array
    },
    title: {
      type: String
    }
  },
  methods: {
    getPrev() {
      try {
        formStack.toPrev({
          vm: this
        });
      } catch (e) {
        this.$store.dispatch('errors/changeContent', {title: e.message.error,});
      }
    }
  },
};
</script>

<style lang="scss">
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
        &:disabled {
          opacity: .5;
          pointer-events: none;
        }
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
