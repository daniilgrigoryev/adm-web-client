<script>
  import Vue from 'vue'
  import moment from 'moment';
  import * as funcUtils from "~/assets/js/utils/funcUtils";

  moment.locale('ru');

  // Кастомный фильтр форматирования дат
  Vue.filter('formatDateTime', function (dateTime, format) {
    if (funcUtils.isEmpty(dateTime) || funcUtils.isEmpty(format)) {
      return '';
    }
    return moment(dateTime).format(format);
  });

  // Кастомный фильтр склеивания значений
  Vue.filter('concatByDelimiter', function (value1, value2, delimiter) {
    let res = '';
    if (funcUtils.isNotEmpty(value1) && funcUtils.isEmpty(value2)) {
      return value1;
    } else if (funcUtils.isNotEmpty(value2) && funcUtils.isEmpty(value1)) {
      return value2;
    } else if (funcUtils.isNotEmpty(value1) && funcUtils.isNotEmpty(value2)) {
      switch (delimiter) {
        case '-': {
          res = value1 + ' - ' + value2;
          break;
        }
        case ',': {
          res = value1 + ', ' + value2;
          break;
        }
        default: {
          res = value1 + delimiter + value2;
          break;
        }
      }
    }

    return res;
  });
</script>
