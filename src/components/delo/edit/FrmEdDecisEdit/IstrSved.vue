<template>
  <div>
    <list-items-docs :items="decis.provideMaterialsList" title="Список требуемых документов" :disabledFields="{ quantity: true, check: true }" @change="store"></list-items-docs>
    <list-items-docs :items="decis.providePresenceList" title="Обеспечить явку" :disabledFields="{ quantity: true, check: true }" @change="store"></list-items-docs>
  </div>
</template>

<script>
  import mixins from "./mixins.js";
  export default {
    mixins: [mixins],
  }
</script>