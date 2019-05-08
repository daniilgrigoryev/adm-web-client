<template>
  <transition name="overlay">
    <div class="overlay" v-if="status">
      <div class="modal">
        <div class="wrap">
          <div class="title">{{ content.title }}</div>
          <div
            v-for="item in content.desc"
            :key="item.id"
            class="desc-item"
            :class="{ open: item.open }"
            @click="toggleSize(item)"
          >
            {{ item.text }}
            <button class="toggle-size" :class="{ open: item.open }" />
          </div>
        </div>
        <button class="close" @click="changeStatus(false)">ОК</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("errors");

export default {
  
  computed: {
    ...mapState(["status", "content"]),
    items() {
      return this.testItems.map(el => {
        return {
          open: true,
          text: el
        };
      });
    }
  },
  methods: {
    ...mapActions(["changeStatus", "toggleSize"]),
  },
  destroyed() {
    this.changeStatus(false);
  },
};
</script>

<style lang="scss" scoped>
@keyframes modal-in {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  70% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.overlay {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 90;
  &-enter-active,
  &-leave-active {
    transition: background 0.5s;
  }
  &-enter,
  &-leave-to {
    background: rgba(0, 0, 0, 0);
  }
  &-enter-active .modal {
    animation: modal-in 0.3s forwards;
  }
  &-leave-active .modal {
    animation: modal-in 0.3s reverse forwards;
  }
  .modal {
    background: #fff;
    width: 600px;
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    margin: auto;
    padding: 20px;
    padding-bottom: 70px;
    border-radius: 5px;
    border: 1px solid #dedede;
    .wrap {
      max-height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .title {
      font-size: 22px;
      font-weight: 700;
      line-height: 1em;
      margin-bottom: 10px;
    }
    .desc-item {
      display: flex;
      margin: 8px 0;
      overflow: hidden;
      font-size: 12px;
      height: 1.5em;
      transition: 0.3s ease;
      position: relative;
      padding-right: 12px;
      cursor: pointer;
      &.open {
        height: auto;
      }
      .toggle-size {
        position: absolute;
        right: 0;
        top: 4px;
        width: 10px;
        height: 10px;
        &:before,
        &:after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 100%;
          height: 100%;
          background: #2d8cf0;
        }
        &:before {
          height: 2px;
        }
        &:after {
          width: 2px;
        }
        &.open {
          &:after {
            content: none;
          }
        }
      }
    }
    .close {
      position: absolute;
      bottom: 20px;
      right: 20px;
      border: 1px solid #dcdee2;
      border-radius: 3px;
      color: #515a6e;
      padding: 5px 25px;
      transition: 0.3s ease;
      &:hover {
        color: #57a3f3;
        border-color: #57a3f3;
      }
    }
  }
}
</style>
