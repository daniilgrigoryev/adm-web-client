export default {
  data() {
    return {}
  },
  methods: {
    filterStotv(label, value) {
      let stotvKod = label.split(',').getFirst();
      return stotvKod.replace(/^[а-яА-Я][^\-]{1,}|\D/g,'');
    },
  }
}
