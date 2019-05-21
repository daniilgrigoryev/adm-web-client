<template>
  <section class="dashboard">
    <div class="dashboard__breadcrumbs">
      <Button
        v-if="breadcrumbs.length > 1"
        class="prev"
        @click="toPrevListItem()"
        type="text"
        title="вернуться назад"
      >
        <Icon type="ios-arrow-dropleft" :size="30" />
      </Button>
      <ul>
        <li
          v-for="(item, index) in breadcrumbs"
          :key="item.id"
          @click="toListItem(item, index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <ul class="dashboard__list">
      <li v-for="item in currentList" :key="item.id" @click="openItem(item)">
        <div :class="{ gridWrap: item.icon }">
          <div v-if="item.icon" class="img-wrap">
            <img :src="item.icon" alt="" />
          </div>
          <div
            v-if="item.title"
            class="title"
          >
            <!-- :class="{ tdu: !Array.isArray(item.value), empty: !item.value.length }" -->
            {{ item.title }}
          </div>
          <div v-if="item.desc" class="desc">{{ item.desc }}</div>
        </div>
        <Button v-if="Array.isArray(item.value)" type="text">
          <Icon type="ios-arrow-dropright" :size="30" />
        </Button>
      </li>
    </ul>
  </section>
</template>

<script>
import * as formStack from "~/assets/js/api/formStack";

export default {
  data() {
    return {
      defoultList: [
        {
          title: "Протоколы",
          desc: "Общая форма, такси, эвакуация",
          icon: require("../../assets/images/Документ gray.png"),
          value: [
            {
              title: "Об административном правонарушении",
              value: [
                {
                  title: "Такси",
                  value: "CreateProtTaxi"
                },
                {
                  title: "Эвакуация",
                  value: "CreateProtAPN"
                },
                {
                  title: "КоАП г. Москвы",
                  desc: "статья 8.25. Размещение транспортных средств на территории, занятой зелеными насаждениями)",
                  value: "",
                },
                {
                  title: "20.25",
                  value: "CreatePost",
                },
              ]
            },
            {
              title: "О задержании ТС",
              value: "CreateProtEvac"
            },
            {
              title: "Об изъятии вещей и документов (ТС)",
              value:  "CreateProtIzyat"
            }
          ]
        },
        {
          title: "Определения",
          desc: "о возбуждении дела об административном расследовании",
          icon: require("../../assets/images/Документ_4 gray.png"),
          value: [
            {
              title: "Такси",
              value: "CreateDefinitionTaxi"
            },
            {
              title: "Эвакуация",
              value: "CreateDefinition"
            },
            {
              title: "КоАП г. Москвы",
              desc: "статья 8.25. Размещение транспортных средств на территории, занятой зелеными насаждениями)",
              value: "",
            },
          ]
        },
        {
          title: "Постановление",
          desc: "об административном правонарушении",
          icon: require("../../assets/images/10_Постановление_v1 gray.png"),
          value: "CreatePost"
        }
      ],
      currentList: [],
      breadcrumbs: []
    };
  },
  created() {
    this.currentList = this.defoultList;
    this.breadcrumbs.push({
      title: "Возбуждение дела",
      value: this.defoultList
    });
  },
  methods: {
    openItem(item) {
      if (!item.value.length) {
        alert("В разработке");
        return;
      }
      if (Array.isArray(item.value)) {
        this.currentList = item.value;
        this.breadcrumbs.push(item);
      } else {
        formStack.toNext({
          module: this.$store.state.wizardExecuter,
          vm: this,
          notRemoved: true,
          params: {scenarioName: item.value},
          withCreate: true
        });
      }
    },
    toListItem(item, index) {
      this.breadcrumbs.splice(index + 1);
      this.currentList = item.value;
    },
    toPrevListItem() {
      this.breadcrumbs.splice(this.breadcrumbs.length - 1);
      this.currentList = this.breadcrumbs[this.breadcrumbs.length - 1].value;
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  margin: 100px auto;
  background: #fff;
  width: 729px;
  border-radius: 4px;
  border: 1px solid #ececec;
  .dashboard__breadcrumbs {
    border-bottom: 1px solid #ececec;
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 30px;
    ul {
      display: flex;
      align-items: center;
      font-size: 18px;
      li {
        padding: 0 5px;
        position: relative;
        cursor: pointer;
        line-height: 24px;
        &:hover {
          text-decoration: underline;
        }
        &:after {
          content: "/";
          position: absolute;
          right: -2px;
          top: 0;
          bottom: 0;
          margin: auto;
        }
        &:last-child {
          color: #1888cc;
          font-weight: 500;
          pointer-events: none;
          &:after {
            content: none;
          }
        }
        &:first-child {
          color: #8c8c8c;
        }
      }
    }
  }
  .dashboard__list {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ececec;
      cursor: pointer;
      padding: 20px;
      padding-left: 36px;
      .title {
        color: #1888cc;
        font-size: 20px;
        font-weight: 600;
        &.empty {
          opacity: 0.5;
        }
        &.tdu {
          text-decoration: underline;
          &:hover {
            text-decoration: none;
          }
        }
      }
      .gridWrap {
        display: grid;
        grid-template-columns: 56px 1fr;
        grid-gap: 5px 30px;
        .img-wrap {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          grid-row: span 2;
          opacity: 0.6;
        }
        .title {
          grid-column: 2;
        }
        .desc {
          color: #c6c6c6;
          font-size: 16px;
          line-height: 18px;
        }
      }
      button {
        color: #57a3f3;
      }
    }
  }
}
</style>

<style lang="scss">
.dashboard .ivu-btn {
  padding: 0;
}
</style>

