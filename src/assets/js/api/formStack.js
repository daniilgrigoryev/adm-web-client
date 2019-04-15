import * as funcUtils from "~/assets/js/utils/funcUtils";
import RequestApi from "~/assets/js/api/requestApi";
import Stack from "./stack";
import * as constantUtils from "~/assets/js/utils/constantUtils";

export async function toNext(payload) {
  let module = payload.module;
  let beanName = module.bean;
  let routeName = module.routeName;

  let notRemoved = payload.notRemoved;
  let vm = payload.vm;
  let cid = payload.cid;
  let withCreate = payload.withCreate;
  let params = payload.params;
  let withTransition = payload.withTransition || true;
  let externalSessionStorage = payload.externalSessionStorage;
  let externalStack;
  if (funcUtils.isNotEmpty(externalSessionStorage)) {
    externalStack = externalSessionStorage[externalSessionStorage.admWid];
  }

  let wid = sessionStorage.getItem('admWid');
  let stack = externalStack || new Stack(funcUtils.getFromSessionStorage(wid));
  let prev = stack.peek();
  if (prev) {
    prev.current = false;
  }
  let next = {
    beanName: beanName,
    routeName: routeName,
    params: params,
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
  if (!externalStack) {
    funcUtils.addToSessionStorage(wid, stack);
  }
  if (!externalStack && withTransition) {
    vm.$router.replace({name: routeName, params});
  }

  return next;
}

export async function toNextNewTab(payload) {
  payload.externalSessionStorage = funcUtils.newExternalSessionStorage();
  await toNext(payload);
  funcUtils.addToLocalStorage('admWidNew', payload.externalSessionStorage);

  let addr = location.origin + constantUtils.contextPath + payload.module.routeName;
  window.open(addr, '_blank');
}

export function toPrev(payload) {
  let vm = payload.vm;
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  let current = stack.pop();
  let withTransition = payload.withTransition || true;
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
  if (withTransition) {
    vm.$router.replace({name: prev.routeName});
  }

  return current;
}

export function updateCurrent(current) {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  stack.pop();
  stack.push(current);
  funcUtils.addToSessionStorage(wid, stack);
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
  return stackIndexOf(stack.size() - 2);
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

export function searchByCid(cid) {
  let res = null;
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
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
