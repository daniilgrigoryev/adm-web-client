<template>
  <div>
    <div class="buttons-wrap">
      <label>
        <input type="radio" name="da" value="DashBoardOld" v-model="picked" />
        <div class="radio-text">Old</div>
      </label>
      <label>
        <input type="radio" name="da" value="DashBoardNew" v-model="picked" />
        <div class="radio-text">New</div>
      </label>
    </div>
    <component :is="picked"></component>
  </div>
</template>

<script>
import DashBoardOld from "./DashBoard_old.vue";
import DashBoardNew from "./DashBoard_new.vue";

export default {
  components: {
    DashBoardOld,
    DashBoardNew
  },
  data() {
    return {
      picked: DashBoardOld
    };
  }
};
</script>

<style lang="scss" scoped>
.buttons-wrap {
  display: grid;
  grid-gap: 10px;
  grid-auto-flow: column;
  justify-content: center;
  padding: 10px 0 0;
  label {
    cursor: pointer;
    input {
      display: none;
      &:checked {
        & ~ .radio-text {
          background: #1888CC;
        }
      }
    }
    .radio-text {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      color: #ffffff;
      background: rgb(160, 160, 160);
      height: 30px;
      border-radius: 5px;

    }
  }
}
</style>
