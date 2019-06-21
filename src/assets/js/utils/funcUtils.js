import * as ConstantUtils from '~/assets/js/utils/constantUtils';
import $ from "jquery";
import moment from 'moment';
import Stack from "~/assets/js/api/stack";

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function webGlId() {
  String.prototype.hashCode = function () {
    let hash = 0;
    if (this.length === 0)
      return hash;
    for (let i = 0; i < this.length; i++) {
      let character = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + character;
      hash = hash & hash;
    }
    return hash;
  };
  let canvas = $('<canvas />', {width: '1', height: '1'}).appendTo('body');
  let gl = canvas[0].getContext("webgl");
  let sum = '';
  for (let a in gl) {
    if (gl.hasOwnProperty(a) && typeof gl[a] !== 'function') {
      sum += a + ':' + gl[a] + '\n';
    }
  }
  canvas.remove();
  return sum.hashCode();
}

export function isUndefined(obj) {
  return undefined === obj;
}

export function isNull(obj) {
  return null === obj;
}

export function isEmpty(obj) {
  return isUndefined(obj) || isNull(obj);
}

export function isNotEmpty(obj) {
  return !isUndefined(obj) && !isNull(obj);
}

export function addToLocalStorage(key, value) {
  if (isNotEmpty(key) && isNotEmpty(value)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function addToSessionStorage(key, value) {
  if (isNotEmpty(key) && isNotEmpty(value)) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getfromLocalStorage(key) {
  let res = null;
  let item = localStorage.getItem(key);
  if (isNotEmpty(item)) {
    res = JSON.parse(item);
  }
  return res;
}

export function getFromSessionStorage(key) {
  let res = null;
  let item = sessionStorage.getItem(key);
  if (isNotEmpty(item)) {
    res = JSON.parse(item);
  }
  return res;
}

export function lookupValue(dictName, key) {
  let res = {
    label: '',
    value: ''
  };
  let dict = ConstantUtils[dictName];
  for (let i = 0; i < dict.length; i++) {
    let object = dict[i];
    if (object.value == key) {
      return object;
    }
  }
  return res;
}

export function newExternalSessionStorage() {
  let sessionStorageCopy = JSON.parse(JSON.stringify(sessionStorage));
  let copyWid = sessionStorageCopy['admWid'];
  let copyStack = sessionStorageCopy[copyWid];
  delete sessionStorageCopy[copyWid];
  copyWid = guid();
  sessionStorageCopy['admWid'] = copyWid;
  sessionStorageCopy[copyWid] = new Stack(JSON.parse(copyStack));
  return sessionStorageCopy;
}

export function clearAll() {
  localStorage.removeItem('admSid');
  localStorage.removeItem('admLastActive');
  localStorage.removeItem('admDeloReestr');
  localStorage.removeItem('admRegistryReestr');
  localStorage.removeItem('admDocsReestr');
  localStorage.removeItem('admDeloReestrForPost');
  localStorage.removeItem('admUserInfo');
  sessionStorage.removeItem('admAuthSid');
  sessionStorage.removeItem('mainMenuActiveName');
  sessionStorage.removeItem('likedOfDashboard');
}

export function parseDateTime(dateTime, format) {
  return moment(dateTime).format(format);
}

export function formatDateTime(dateTime, format) {
  return moment(dateTime, format);
}

export function isString(value) {
  if (isEmpty(value)) {
    return false;
  }
  return typeof value === 'string' || value instanceof String;
}

export function isNumber (value) {
  if (isEmpty(value)) {
    return false;
  }
  return typeof value === 'number' && isFinite(value);
}

export function isArray (value) {
  if (isEmpty(value)) {
    return false;
  }
  return value && typeof value === 'object' && value.constructor === Array;
}

export function isFunction (value) {
  if (isEmpty(value)) {
    return false;
  }
  return typeof value === 'function';
}

export function isObject (value) {
  if (isEmpty(value)) {
    return false;
  }
  return value && typeof value === 'object' && value.constructor === Object;
}

export function isBoolean (value) {
  if (isEmpty(value)) {
    return false;
  }
  return typeof value === 'boolean';
}

export function isDate (value) {
  if (isEmpty(value)) {
    return false;
  }
  return value instanceof Date;
}

export function undefinedJSONreplacer(key, value) {
  if (isUndefined(value) || isString(value) && value === 'null') {
    return null;
  }
  return value;
}
