<template>
    <div>
        {{dataAdvice}}
        
        
    </div>
</template>

<script>
  import * as funcUtils from "../../../assets/js/utils/funcUtils";
  import * as formStack from '../../../assets/js/api/formStack';
  import RequestApi from "../../../assets/js/api/requestApi";

  export default {
    name: "DlgAdviceEdit",
    async created() {
      try {
        let current = formStack.getCurrent();
        await this.$store.dispatch('dlgAdviceEditSetCid', current.cid);
        let prepareParams = {
          method: 'restore'
        };
        if (funcUtils.isNotEmpty(this.$route.params.node)) {
          prepareParams.method = 'getData';
          prepareParams.params = {
            'node': this.$route.params.node
          };
        }
        let eventResponse = await RequestApi.prepareData(prepareParams);
        let dataAdvice = JSON.parse(eventResponse.response).data;
        
        if (funcUtils.isEmpty(dataAdvice)) {
          let error = JSON.parse(eventResponse.response).error.errorMsg;
          alert(error);
        }else{
            this.dataAdvice = dataAdvice;
        }

      } catch (e) {
        alert(e.message);
      }
    },
    destroyed() {
      this.$store.dispatch('dlgAdviceEditSetCid', null);
      this.$store.dispatch('dlgAdviceEditSetData', null);
    },
    data() {
      return {
        dataAdvice: null
      }
    },
    methods: {
      async save() {
        let eventResponse = await RequestApi.prepareData({
          method: 'update'
        });
        if (eventResponse.response) {
          let error = JSON.parse(eventResponse.response).error;
          alert(error.errorMsg);
        } else {
          this.getPrev();
        }
      },
      getPrev() {
        try {
          formStack.toPrev({
            vm: this
          });
        } catch (e) {
          alert(e.message);
        }
      },
    },
  }

//   export default {
//     name: "DlgAdviceEdit",
//     async created() {
//       try {
//         let current = formStack.getCurrent();
//         let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
//         let currentForm = innerFormStack.getCurrent(uid);
//         await this.$store.dispatch('dlgAdviceEditSetCid', currentForm.cid);

//         let prepareParams = {
//           method: 'restore',
//           cid: currentForm.cid
//         };
//         if (funcUtils.isEmpty(currentForm.restore)) {
//           prepareParams.method = 'getData';
//           prepareParams.params = {
//             'node': currentForm.params
//           };
//         }
//         delete currentForm['restore'];
//         let eventResponse = await RequestApi.prepareData(prepareParams);
//         await this.$store.dispatch('fillModule', {'event': eventResponse});

//         let vm = this;
//         this.$store.watch(this.$store.getters.dlgAdviceEditGetCommand, async () => {
//           try {
//             let current = formStack.getCurrent();
//             let uid = this.$store.state.deloTreeCardView.moduleName + '-' + current.cid;
//             let currentForm = innerFormStack.getCurrent(uid);
//             let eventResponse = await RequestApi.prepareData({
//               cid: currentForm.cid,
//               withSpinner: false
//             });
//             await vm.$store.dispatch('fillModule', {'event': eventResponse});
//           } catch (e) {
//             alert(e.message);
//           }
//         });
//       } catch (e) {
//         alert(e.message);
//       }
//     },
//     destroyed() {
//       this.$store.dispatch('dlgAdviceEditSetCid', null);
//       this.$store.dispatch('dlgAdviceEditSetData', null);
//     },
//     computed: {
//       ...mapGetters({
//         dataStore: 'dlgAdviceEditGetData'
//       }),
//       data() {
//         let res = null;
//         if (this.dataStore) {
//           res = this.dataStore.body;
//         }
//         return res;
//       },
//     },
//   }
</script>
