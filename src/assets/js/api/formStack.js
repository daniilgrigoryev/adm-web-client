import * as funcUtils from "~/assets/js/utils/funcUtils";
import RequestApi from "~/assets/js/api/requestApi";
import Stack from "~/assets/js/api/stack";
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
    innerStack: new Stack(),
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
          vm.$store.dispatch('errorsModal/changeContent', {
            title: respError.errorMsg,
            desc: respError.errorDesc
          });
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
  return window.open(addr, '_blank');
}

export async function toPrev(payload) {
  let vm = payload.vm;
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  let current = stack.pop();
  let innerStack = new Stack(current.innerStack);
  let withTransition = funcUtils.isEmpty(payload.withTransition) ? true : payload.withTransition;
  let prev = stack.peek();
  prev.current = true;

  if (!current.notRemoved) {
    await RequestApi.prepareData({
      beanName: null,
      method: 'removeCID',
      cid: current.cid,
      withSpinner: false
    });
    while (innerStack.size() !== 0) {
      let innerCurrent = innerStack.pop();
      await RequestApi.prepareData({
        beanName: null,
        method: 'removeCID',
        cid: innerCurrent.cid,
        withSpinner: false
      });
    }
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

export function updateStack(stack) {
  let wid = sessionStorage.getItem('admWid');
  funcUtils.addToSessionStorage(wid, stack);
}

export function getStack() {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  for (let i = 0; i < stack.items.length; i++) {
    let item = stack.items[i];
    if (item) {
      item.innerStack = new Stack(item.innerStack);
    }
  }
  return stack;
}

export function getCurrent() {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  let current = stack.peek();
  if (current) {
    current.innerStack = new Stack(current.innerStack);
  }
  return current;
}

export function stackSize() {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  return stack.size();
}

export function getPrev() {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));
  let prev = stackIndexOf(stack.size() - 2);
  if (prev) {
    prev.innerStack = new Stack(prev.innerStack);
  }
  return prev;
}

export function clearStack(isLogout) {
  let wid = sessionStorage.getItem('admWid');
  let stack = new Stack(funcUtils.getFromSessionStorage(wid));

  while (stack.size() !== 0) {
    let current = stack.pop();
    let innerStack = new Stack(current.innerStack);
    if (!current.notRemoved && !isLogout) {
      RequestApi.prepareData({
        beanName: null,
        method: 'removeCID',
        cid: current.cid
      });
      while (innerStack.size() !== 0) {
        let innerCurrent = innerStack.pop();
        RequestApi.prepareData({
          beanName: null,
          method: 'removeCID',
          cid: innerCurrent.cid,
          withSpinner: false
        });
      }
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
    res.innerStack = new Stack(res.innerStack);
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
      res.innerStack = new Stack(res.innerStack);
      break;
    }
    i--;
  }
  return res;
}
