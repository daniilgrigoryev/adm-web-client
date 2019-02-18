import * as funcUtils from "../utils/funcUtils";
import RequestApi from "./requestApi";
import Stack from "./stack";

export async function toNext(payload) {
  let moduleName = payload.moduleName;
  let beanName = payload.beanName;
  let routeName = payload.routeName;
  let params = payload.params;

  let uid = payload.uid + '-' + sessionStorage.getItem('wid');
  let stack = new Stack(funcUtils.getFromSessionStorage(uid));
  let prev = stack.peek();
  if (prev) {
    prev.current = false;
  }
  let next = {
    beanName: beanName,
    routeName: routeName,
    params: params,
    moduleName: moduleName,
    current: true
  };
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
  stack.push(next);
  funcUtils.addToSessionStorage(uid, stack);

  return next;
}

export async function toPrev(payload) {
  let uid = payload.uid + '-' + sessionStorage.getItem('wid');
  let stack = new Stack(funcUtils.getFromSessionStorage(uid));
  let current = stack.pop();
  let prev = stack.peek();
  prev.current = true;

  await RequestApi.prepareData({
    beanName: null,
    method: 'removeCID',
    cid: current.cid,
    withSpinner: false
  });

  funcUtils.addToSessionStorage(uid, stack);

  return current;
}

export function getCurrent(payload) {
  let uid = payload.uid + '-' + sessionStorage.getItem('wid');
  let stack = new Stack(funcUtils.getFromSessionStorage(uid));
  return stack.peek();
}

export function stackSize(payload) {
  let uid = payload.uid + '-' + sessionStorage.getItem('wid');
  let stack = new Stack(funcUtils.getFromSessionStorage(uid));
  return stack.size();
}

export function getPrev(payload) {
  let uid = payload.uid + '-' + sessionStorage.getItem('wid');
  let stack = new Stack(funcUtils.getFromSessionStorage(uid));
  return this.stackIndexOf(stack.size() - 2);
}

export async function clearStack(payload) {
  let uid = payload.uid + '-' + sessionStorage.getItem('wid');
  let stack = new Stack(funcUtils.getFromSessionStorage(uid));

  while (stack.size() !== 0) {
    let current = stack.pop();
    await RequestApi.prepareData({
      beanName: null,
      method: 'removeCID',
      cid: current.cid
    });
  }

  funcUtils.addToSessionStorage(uid, stack);
}

export function stackIndexOf(payload) {
  let res = null;
  let uid = payload.uid + '-' + sessionStorage.getItem('wid');
  let stack = new Stack(funcUtils.getFromSessionStorage(uid));
  if (payload.index <= stack.size()) {
    res = stack.indexOf(payload.index);
  }
  return res;
}

export function searchByCid(payload) {
  let res = null;
  let uid = payload.uid + '-' + sessionStorage.getItem('wid');
  let stack = new Stack(funcUtils.getFromSessionStorage(uid));
  let cid = payload.cid;
  for (let i = stack.size() - 1; i >= 0; i--) {
    let item = stack.indexOf(i);
    if (item.cid === cid) {
      res = item;
      break;
    }
  }
  return res;
}
