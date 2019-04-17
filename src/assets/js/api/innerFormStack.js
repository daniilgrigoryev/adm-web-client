import * as funcUtils from "~/assets/js/utils/funcUtils";
import RequestApi from "~/assets/js/api/requestApi";
import * as formStack from '~/assets/js/api/formStack';

export async function toNext(payload) {
  let moduleName = payload.moduleName;
  let beanName = payload.beanName;
  let routeName = payload.routeName;
  let params = payload.params;

  let currentForm = formStack.getCurrent();
  let stack = currentForm.innerStack;
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
  formStack.updateCurrent(currentForm);

  return next;
}

export async function toPrev() {
  let currentForm = formStack.getCurrent();
  let stack = currentForm.innerStack;
  let current = stack.pop();
  let prev = stack.peek();
  prev.current = true;

  await RequestApi.prepareData({
    beanName: null,
    method: 'removeCID',
    cid: current.cid,
    withSpinner: false
  });

  formStack.updateCurrent(currentForm);

  return current;
}

export function getCurrent() {
  let currentForm = formStack.getCurrent();
  let stack = currentForm.innerStack;
  return stack.peek();
}

export function stackSize() {
  let currentForm = formStack.getCurrent();
  let stack = currentForm.innerStack;
  return stack.size();
}

export function getPrev() {
  let currentForm = formStack.getCurrent();
  let stack = currentForm.innerStack;
  return stackIndexOf(stack.size() - 2);
}

export async function clearStack() {
  let currentForm = formStack.getCurrent();
  let stack = currentForm.innerStack;

  while (stack.size() !== 0) {
    let current = stack.pop();
    await RequestApi.prepareData({
      beanName: null,
      method: 'removeCID',
      cid: current.cid
    });
  }

  formStack.updateCurrent(currentForm);
}

export function stackIndexOf(index) {
  let res = null;
  let currentForm = formStack.getCurrent();
  let stack = currentForm.innerStack;
  if (index <= stack.size()) {
    res = stack.indexOf(index);
  }
  return res;
}

export function searchByCid(cid) {
  let res = null;
  let currentForm = formStack.getCurrent();
  let stack = currentForm.innerStack;
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
