<template>
  <div class="adm-form">
    <div class="adm-form__container">
      <h2 class="adm-form__headding">
        {{title}}
      </h2>
      <div class="adm-form__content">
        <div class="list-docs">
          <div v-for="(item, index) in items" :key="item.id" class="doc-item">
            <label class="list-docs__checkbox" :class="{ checked: item.checked}" v-if="item.checked">
              <input type="checkbox"  v-model="item.checked">
              <div class="check-block">
                <Icon type="md-checkmark" :size="16"/>
              </div>
            </label>
            <Input class="adm-input adm-input--regular name" 
                    type="text" 
                    v-model="item.name" 
                    @on-input-change="change()"
                    @on-blur="change()"
            />
            <div class="quantity" v-if="item.quantity.visible">
              Количество листов
              <Input 
                class="adm-input adm-input--regular" 
                v-model="item.quantity.value" 
                type="number"
                @on-input-change="change()"
                @on-blur="change()"
              />
            </div>
            <button class="remove" @click="removeItem(index)"></button>
          </div>
          <button class="add-new-doc" @click="addNewDoc()">
            <div class="icon"/>
            Новый документ
          </button>
        </div>  
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  props: {
    disabledCheckboxes: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      title: "Документы",
      itemTemplate: {
        name: "",
        checked: true,
        quantity: {
          visible: false,
          value: null
        }
      },
      items: []
    };
  },
  created() {
    this.disabledCheckboxes? delete this.itemTemplate.checked : '';
    const RequestArray = [
      { name: 1 },
      { name: 2 },
      { name: 3, quantity: { visible: true, value: 2 } }
    ];
    this.init(RequestArray);
  },
  methods: {
    init(payload) {
      payload.forEach(element => {
        let item = { ...this.itemTemplate };
        Object.assign(item, element);
        this.items.push(item);
      });
    },
    removeItem(index) {
      this.items.splice(index, 1)
    },
    addNewDoc() {
      this.items.push({...itemTemplate})
    },
    change() {
      this.$emit("change");
    }
  }
};
</script>

<style lang="scss">
.name {
  .ivu-input {
    background-color: transparent !important;
    &:focus {
      background-color: #fff !important;
    }
  }
}
</style>


<style lang="scss" scoped>
.list-docs {
  display: grid;
  justify-content: center;
  grid-gap: 10px;
  .doc-item {
    position: relative;
    width: 500px;
    display: flex;
    align-items: center;
    .list-docs__checkbox {
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      left: -32px;
      margin: auto;
      display: flex;
      align-items: center;
      input {
        display: none;
      }
      .check-block {
        width: 22px;
        height: 22px;
        background: #fff;
        border: 1px solid #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          transform: scale(0);
          transition: 0.3s ease;
        }
      }
      &.checked {
        .check-block {
          i {
            transform: scale(1);
          }
        }
      }
    }
    .name {
      width: 100%;
    }
    .quantity {
      margin-left: 14px;
      display: flex;
      align-items: center;
      flex: none;
      .adm-input {
        margin-left: 14px;
        width: 60px;
      }
    }
    .remove {
      right: -40px;
      top: 0;
      bottom: 0;
      margin: auto;
      position: absolute;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #e6e6e6;
      width: 25px;
      height: 25px;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 50%;
        height: 2px;
        background: #797979;
      }
    }
  }
  .add-new-doc {
    position: relative;
    color: #6b94c2;
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    margin: 10px 0;
    .icon {
      display: block;
      border-radius: 50%;
      background: #fff;
      border: 1px solid #6b94c2;
      width: 26px;
      height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-right: 8px;
      &:before,
      &:after {
        content: "";
        width: 60%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 2px;
        background: #6b94c2;
      }
      &:after {
        width: 2px;
        height: 60%;
      }
    }
  }
}
</style>
