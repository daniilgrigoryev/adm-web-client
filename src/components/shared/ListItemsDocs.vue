<template>
  <div class="adm-form__item container">
    <small class="adm-form__label">{{title}}</small>
    <div class="adm-form__item_content">
      <Row :gutter="16" type="flex" align="middle">
        <Col :xs="22" :md="22" :lg="22">
          <div class="list-docs">
            <div v-for="(item, index) in items" :key="item.index" class="doc-item">
              <label class="list-docs__checkbox" :class="{ checked: item.check}" v-if="!disabledFields.checkbox">
                <input type="checkbox" v-model="item.check" @change="change">
                <div class="check-block">
                  <Icon type="md-checkmark" :size="16"/>
                </div>
              </label>
              <Input class="adm-input adm-input--regular name"
                     type="text"
                     :style="!disabledFields.checkbox ? 'margin-left: 14px' : ''"
                     v-model="item.name"
                     @on-input-change="change"
                     @on-blur="change"
              />
              <div class="quantity" v-if="!disabledFields.quantity">
                Количество листов
                <masked-input inputClass="adm-input adm-input--regular" :maskProps="{regex: '[0-9]+', placeholder: ''}" v-model="item.sheets_quantity" @onBlur="change" @onInputChange="change"></masked-input>
              </div>
              <button class="remove" @click="removeItem(index)"></button>
            </div>
            <button class="add-new-doc" @click="addNewDoc">
              <div class="icon"/>
              Новый документ
            </button>
          </div>
        </Col>
      </Row>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      disabledFields: {
        type: Object,
        default: () => ({
          quantity: false,
          checkbox: false,
        })
      },
      title: {
        type: String,
        default: "Документы"
      },
      items: {
        type: Array,
        default: () => ([
          {name: 1},
          {name: 2, check: true},
          {name: 3, sheets_quantity: 2}
        ])
      }
    },
    data() {
      return {
        itemTemplate: {
          name: "",
          check: true,
          sheets_quantity: 0
        }
      };
    },
    created() {
      this.disabledFields.checkbox ? delete this.itemTemplate.check : '';
      this.disabledFields.quantity ? delete this.itemTemplate.sheets_quantity : '';
    },
    methods: {
      removeItem(index) {
        this.items.splice(index, 1);
        this.change();
      },
      addNewDoc() {
        this.items.push({...this.itemTemplate});
        this.change();
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
  .container {
    align-items: flex-start;
    .list-docs {
      display: grid;
      justify-content: flex-start;
      grid-gap: 10px;

      .doc-item {
        position: relative;
        width: 500px;
        display: flex;
        align-items: center;

        .list-docs__checkbox {
          cursor: pointer;
          position: relative;
          top: 0;
          bottom: 0;
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
  }
</style>
