<template>
  <div>
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

    <div v-if="likedList" class="dashboard likedOfDashboard">
      <div v-for="(item, index) in likedList" :key="index" @click="goToWizard(item.value)" class="liked-item">
        <img class="liked-item-image" :src="imageByWizardName(item.value)" alt="" />
        <span class="liked-item-desc">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import * as formStack from "~/assets/js/api/formStack";
  import * as funcUtils from "~/assets/js/utils/funcUtils";

  export default {
  data() {
    return {
      defoultList: [
        {
          title: "Протоколы",
          desc: "АПН, такси, эвакуация",
          icon: require("~/assets/images/Документ gray.png"),
          value: [
            {
              title: "Об административном правонарушении",
              value: [
                {
                  title: "Такси",
                  value: "CreateProtTaxi",
                  name: "Протокол об административном правонарушении такси",
                },
                {
                  title: "АПН",
                  value: "CreateProtAPN",
                  name: "Протокол об административном правонарушении",
                },
                {
                  title: "КоАП г. Москвы",
                  desc: "статья 8.25. Размещение транспортных средств на территории, занятой зелеными насаждениями)",
                  value: "",
                },
                {
                  title: "20.25",
                  value: "CreateProt2025",
                  desc: "",
                  name: "Статья 20.25(Уклонение от исполнения административного наказания",
                },
              ]
            },
            {
              title: "О задержании ТС",
              value: "CreateProtEvac",
              name: "Протокол о задержании ТС",
            },
            {
              title: "Об изъятии вещей и документов (ТС)",
              value:  "CreateProtIzyat",
              name: "Протокол изъятия вещей и документов",
            }
          ]
        },
        {
          title: "Определения",
          desc: "о возбуждении дела об административном правонарушении",
          icon: require("~/assets/images/Документ_4 gray.png"),
          value: [
            {
              title: "АПН",
              value: "CreateDefinition",
              name: "Определение об административном правонарушении",
            },
            {
              title: "Такси",
              value: "CreateDefinitionTaxi",
              name: "Определение об административном правонарушении такси",
            },
            {
              title: "Эвакуация",
              value: "CreateDefinition",
              name: "Определение об административном правонарушении",
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
          name: "Постановление об административном правонарушении",
          icon: require("~/assets/images/10_Постановление_v1 gray.png"),
          value: "CreatePost"
        }
      ],
      currentList: [],
      breadcrumbs: [],
      likedOfDashboard: {}
    };
  },
  created() {
    this.currentList = this.defoultList;
    this.breadcrumbs.push({
      title: "Возбуждение дела",
      value: this.defoultList
    });
    let likedOfDashboard = funcUtils.getFromSessionStorage('likedOfDashboard');
    if (likedOfDashboard) {
      this.likedOfDashboard = likedOfDashboard;
    }
  },
  computed: {
    likedList() {
      let res = null;
      if (Object.keys(this.likedOfDashboard).length > 0) {
        res = Object.values(this.likedOfDashboard);
        res.sort((a, b) => {
          if (b.count === a.count) {
            return new Date(b.clickedDate).getTime() - new Date(a.clickedDate).getTime();
          }
          return b.count - a.count;
        });
        res = res.slice(0, 5);
      }
      return res;
    },
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
        let likedItem = this.likedOfDashboard[item.value];
        if (!likedItem) {
          this.likedOfDashboard[item.value] = {
            value: item.value,
            count: 0,
            name: item.name,
            clickedDate: new Date()
          };
          likedItem = this.likedOfDashboard[item.value];
        }
        likedItem.count++;
        funcUtils.addToSessionStorage('likedOfDashboard', this.likedOfDashboard);

        this.goToWizard(item.value);
      }
    },
    toListItem(item, index) {
      this.breadcrumbs.splice(index + 1);
      this.currentList = item.value;
    },
    toPrevListItem() {
      this.breadcrumbs.splice(this.breadcrumbs.length - 1);
      this.currentList = this.breadcrumbs[this.breadcrumbs.length - 1].value;
    },
    goToWizard(wizardName) {
      formStack.toNext({
        module: this.$store.state.wizardExecuter,
        vm: this,
        notRemoved: true,
        params: {scenarioName: wizardName},
        withCreate: true
      });
    },
    imageByWizardName(wizardName) {
      switch (wizardName) {
        case 'CreateProtAPN':
        case 'CreateProt2025':
        case 'CreateProtEvac':
        case 'CreateProtIzyat':
        case 'CreateProtTaxi': {
          return require("~/assets/images/Документ gray.png");
        }
        case 'CreateDefinition':
        case 'CreateDefinitionTaxi': {
          return require("~/assets/images/Документ_4 gray.png");
        }
        case 'CreatePost': {
          return require("~/assets/images/10_Постановление_v1 gray.png");
        }
      }
    },
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


.likedOfDashboard {
  display: grid;

  .liked-item {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #ececec;

    .liked-item-desc {
      color: black;
      word-break: break-word;
    }
    .liked-item-image {
      width: 40px;
      height: 40px;
    }
  }
}
</style>

<style lang="scss">
.dashboard .ivu-btn {
  padding: 0;
}
</style>

