import Vue from 'vue'
import * as funcUtils from "../../assets/js/utils/funcUtils";

// Кастомный фильтр форматирования дат
Vue.filter('formatDateTime', function (dateTime, format) {
  if (funcUtils.isEmpty(dateTime) || funcUtils.isEmpty(format)) {
    return '';
  }
  if (funcUtils.isNumber(dateTime)) {
    dateTime = new Date(dateTime);
  }
  return funcUtils.parseDateTime(dateTime, format);
});

// Кастомный фильтр склеивания значений
Vue.filter('concatByDelimiter', function () {
  let res = [];
  for (let i = 0; i < arguments.length - 1; i++) {
    let value = arguments[i];
    if (funcUtils.isNotEmpty(value)) {
      res.push(value);
    }
  }

  if (res.length > 0) {
    let delimiter = arguments[arguments.length - 1];
    switch (delimiter) {
      case '-': {
        delimiter = ' - ';
        break;
      }
      case ',': {
        delimiter = ', ';
        break;
      }
    }
    res = res.join(delimiter);
  } else {
    res = '';
  }
  return res;
});
