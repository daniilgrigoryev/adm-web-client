<template>
  <transition name="overlay">
    <div class="overlay" v-if="status">
      <div class="modal">
        <div class="modal__head">
          <img :src="require('~/assets/images/icons/warning.svg')" alt="">
          <div class="text">Ошибка</div>
          <button class="close" @click="closeModal"/>
        </div>
        <div class="modal__body">
          <div class="text" v-html="content.title"/>
          <button @click="toggleDescShow()" :class="{ show: descShow }" class="desc-show-btn">
            {{descShow? "Скрыть код ошибки" : "Показать код ошибки"}}
          </button>
          <div v-show="descShow" class="desc" v-html="content.desc"/>
        </div>
        <div class="buttons-wrap">
          <button class="close" @click="closeModal">ОК</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("errorsModal");

export default {
  computed: {
    ...mapState(["status", "content", "descShow"])
  },
  methods: {
    ...mapActions(["changeStatus", "toggleDescShow"]),
    closeModal() {
      this.$emit("on-close");
      this.changeStatus(false);
    }
  },
  destroyed() {
    this.changeStatus(false);
  }
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
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
    width: 565px;
    position: absolute;
    top: 25vh;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
    border: 1px solid #dedede;
    .modal__head {
      display: flex;
      align-items: center;
      padding: 20px;
      img {
        flex: none;
        margin: 0 15px;
      }
      .text {
        font-size: 18px;
        color: #17233d;
        font-weight: 700;
        line-height: 1em;
      }
      .close {
        margin-left: auto;
        flex: none;
        position: relative;
        width: 16px;
        height: 16px;
        transition: .3s ease;
        &:before,
        &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 1px;
          background: #000;
          transform: rotate(45deg);
        }
        &:after {
          transform: rotate(135deg);
        }
        &:hover {
          opacity: .7;
        }
      }
    }
    .modal__body {
      max-height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 76px 10px;
      .text {
        font-size: 16px;
        color: #515a6e;
      }
      .desc {
        display: flex;
        overflow: hidden;
        font-size: 12px;
        transition: 0.3s ease;
        position: relative;
        padding-right: 12px;
        color: #515A6E;
      }
      .desc-show-btn {
        margin: 10px 0;
        color: #2D8CF0;
        font-size: 14px;
        position: relative;
        display: flex;
        align-items: center;
        &:after {
          content: "";
          background: url(../../assets/images/icons/controls-switch-chevron-down-blue.svg) center center no-repeat;
          width: 12px;
          height: 5px;
          display: block;
          margin-left: 5px;
        }
        &.show {
          &:after {
            transform: rotate(180deg);
          }
        }
      }
    }
    .buttons-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-top: 1px solid #CCCCCC;
      padding: 20px;
      .close {
        background: #2d8cf0;
        border-radius: 3px;
        color: #fff;
        padding: 5px 25px;
        transition: 0.3s ease;
        &:hover {
          background: #57a3f3;
        }
      }
    }
  }
}
</style>
