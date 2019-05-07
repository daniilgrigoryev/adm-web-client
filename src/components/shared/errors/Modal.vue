<template>
  <transition name="overlay">
    <div class="overlay" v-if="status">
      <div class="modal">
        <div class="title">{{ content.title }}</div>
        <div class="desc">{{ content.desc }}</div>
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
    ...mapState(["status", "content"])
  },
  methods: {
    ...mapActions(["changeStatus"])
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 90;
  &-enter-active,
  &-leave-active {
    transition: background .5s;
  }
  &-enter,
  &-leave-to {
    background: rgba(0, 0, 0, 0);
  }
  &-enter-active .modal{
    animation: modal-in .3s forwards;
  }
  &-leave-active .modal {
    animation: modal-in .3s reverse forwards;
  }
  .modal {
    background: #fff;
    width: 400px;
    min-height: 180px;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    margin: auto;
    padding: 20px;
    padding-bottom: 70px;
    border-radius: 5px;
    border: 1px solid #DEDEDE;
    .title {
      font-size: 22px;
      font-weight: 700;
      line-height: 1em;
      margin-bottom: 10px;
    }
    .desc {
      font-size: 14px;
      line-height: 1em;
    }
    .close {
      position: absolute;
      bottom: 20px;
      right: 20px;
      border: 1px solid #dcdee2;
      border-radius: 3px;
      color: #515a6e;
      padding: 5px 25px;
      transition: .3s ease;
      &:hover {
        color: #57a3f3;
        border-color: #57a3f3;
      }
    }
  }
}

</style>
