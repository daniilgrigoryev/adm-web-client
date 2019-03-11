import * as funcUtils from "../utils/funcUtils";
import RequestApi from "./requestApi";
import Stack from "./stack";

export async function toNext(payload) {
  let module = payload.module;
  let beanName = module.bean;
  let routeName = module.routeName;

  let notRemoved = payload.notRemoved;
  let vm = payload.vm;
  let cid = payload.cid;
  let withCreate = payload.withCreate;
  let params = payload.params;

  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  let prev = stack.peek();
  if (prev) {
    prev.current = false;
  }
  let next = {
    beanName: beanName,
    routeName: routeName,
    params: payload.params,
    moduleName: module.moduleName,
    notRemoved: notRemoved,
    cid: cid,
    current: true
  };
  if (withCreate) {
    let eventResponse = await RequestApi.prepareData({
      beanName: beanName,
      method: null,
      cid: null
    });
    let data = eventResponse.response;
    if (data.length > 0) {
      let dataJson = JSON.parse(data);
      let respData = dataJson.data;
      let respError = dataJson.error;
      if (!funcUtils.isNull(respData)) {
        next.cid = respData.cid;
      } else {
        if (!funcUtils.isNull(respError)) {
          alert(respError.errorMsg);
        }
      }
    }
  }

  stack.push(next);
  funcUtils.addToSessionStorage(wid, stack);

  vm.$router.push({name: routeName, params});

  return next;
}

export function toPrev(payload) {
  let vm = payload.vm;
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  let current = stack.pop();
  let prev = stack.peek();
  prev.current = true;

  if (!current.notRemoved) {
    RequestApi.prepareData({
      beanName: null,
      method: 'removeCID',
      cid: current.cid,
      withSpinner: false
    });
  }

  funcUtils.addToSessionStorage(wid, stack);
  vm.$router.push({name: prev.routeName});

  return current;
}

export function getCurrent() {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  return stack.peek();
}

export function stackSize() {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  return stack.size();
}

export function getPrev() {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  return this.stackIndexOf(stack.size() - 2);
}

export function clearStack(isLogout) {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));

  while (stack.size() !== 0) {
    let current = stack.pop();
    if (!current.notRemoved && !isLogout) {
      RequestApi.prepareData({
        beanName: null,
        method: 'removeCID',
        cid: current.cid
      });
    }
  }

  let current = stack.peek();
  if (funcUtils.isNotEmpty(current)) {
    current.current = true;
  }
  funcUtils.addToSessionStorage(wid, stack);
}

export function stackIndexOf(index) {
  let res = null;
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  if (index <= stack.size()) {
    res = stack.indexOf(index);
  }
  return res;
}

export function searchByCid(payload) {
  let res = null;
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  let cid = payload.cid;
  let i = stack.size() - 1;
  while (i !== 0) {
    let item = stack.indexOf(i);
    if (item.cid === cid) {
      res = item;
      break;
    }
    i--;
  }
  return res;
}
