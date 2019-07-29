import * as ConstantUtils from '~/assets/js/utils/constantUtils';
import * as funcUtils from "~/assets/js/utils/funcUtils";
import * as RequestEntity from "~/assets/js/api/requestEntity";
import * as formStack from "~/assets/js/api/formStack";
import store from '~/store'

export default class RequestApi {
  static sendSocketRequest(payload) {
    let body = payload.body;
    let vm = payload.vm;
    let socket = this._getSocket(vm);

    let wsSend = (data) => {
      if (!socket.readyState) {
        setTimeout(() => {
          wsSend(data);
        }, 100);
      } else {
        socket.send(data);
      }
    };
    wsSend(JSON.stringify(body));
  }

  static closeSocket() {
    if (funcUtils.isNotEmpty(this.socketInstance)) {
      this.socketInstance.close();
    }
  }

  static _setSocket(socket) {
    this.socketInstance = socket;
    return this.socketInstance;
  }

  static _getSocket(vm) {
    if (funcUtils.isEmpty(this.socketInstance)) {
      let wsUrl = vm.$store.state.properties.data.WS_URL;
      let socket = this._setSocket(new WebSocket(wsUrl));

      // When a connection is made
      socket.onopen = () => {
        console.log('Opened connection');
      };

      // When data is received
      socket.onmessage = (event) => {
        console.log('Message in websocket');
        let data = event.data;
        console.log(JSON.parse(data));
        vm.$store.dispatch('fillModule', {'vm': vm, 'event': event});
      };

      // A connection could not be made
      socket.onerror = (event) => {
        console.log('Error in websocket');
        console.log(event);
      };

      // A connection was closed
      socket.onclose = (code, reason) => {
        if (funcUtils.isNotEmpty(localStorage.getItem('admSid'))) {
          this._setSocket(new WebSocket(wsUrl));
        } else {
          console.log(code, reason);
          console.log('Websocket closed');
          this._setSocket(null);
        }
      };
      // Close the connection when the window is closed
      window.addEventListener('beforeunload', () => {
        socket.close();
        this._setSocket(null);
      });
    }
    return this.socketInstance;
  }

  static prepareData(payload) {
    let withSpinner = true;
    let handleError = true;
    if (funcUtils.isNotEmpty(payload.withSpinner)) {
      withSpinner = payload.withSpinner;
    }
    if (funcUtils.isNotEmpty(payload.handleError)) {
      handleError = payload.handleError;
    }
    let methodName = payload.method;
    if (funcUtils.isUndefined(methodName)) {
      methodName = 'restore';
    }
    let paramsData = payload.params;
    if (funcUtils.isEmpty(paramsData)) {
      paramsData = null;
    }
    let sid = payload.sid;
    if (funcUtils.isUndefined(sid)) {
      sid = localStorage.getItem('admSid');
    }
    let cid = payload.cid;
    if (funcUtils.isUndefined(cid)) {
      cid = formStack.getCurrent().cid;
    }
    let beanName = payload.beanName;
    if (funcUtils.isUndefined(beanName)) {
      beanName = '';
    }
    let requestHead = new RequestEntity.RequestHead(sid, sessionStorage.getItem('admWid'), cid, beanName, methodName);
    let requestParam = new RequestEntity.RequestParam(requestHead, paramsData);

    return this.sendHttpRequest({body: requestParam, withSpinner: withSpinner, handleError: handleError});
  }

  static sendHttpRequest(payload) {
    let body = payload.body;
    let url = process.env.devHost || location.origin + ConstantUtils.HTTP_URL;

    let withSpinner = payload.withSpinner;
    let handleError = payload.handleError;
    let spinner;
    if (withSpinner) {
      let target = document.getElementById('indicator');
      if (funcUtils.isNotEmpty(target)) {
        target.appendChild(document.createElement('div'))
        .appendChild(document.createElement('div'))
        .appendChild(document.createElement('div'))
        .appendChild(document.createElement('div'))
        .appendChild(document.createElement('div'))
        .appendChild(document.createElement('div'))
        .appendChild(document.createElement('div'))
        .appendChild(document.createElement('div'))
        .appendChild(document.createElement('div'))
        .appendChild(document.createElement('div'));

        target.style.display = 'block';
      }
    }
    let xhr = new XMLHttpRequest();
    xhr.timeout = 180000;
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(body, funcUtils.undefinedJSONreplacer));

    let hideSpinner = () => {
      let target = document.getElementById('indicator');
      if (withSpinner && funcUtils.isNotEmpty(target)) {
        for (let i = 0; i < target.childNodes.length; i++) {
          target.childNodes[i].remove();
        }
        target.style.display = 'none';
        if (withSpinner && funcUtils.isNotEmpty(spinner)) {
          spinner.stop();
        }
      }
    };

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        // перевод Promise в состояние fulfilled.
        hideSpinner();
        if (xhr.responseText) {
          let response = JSON.parse(xhr.responseText);
          if (response && response.error && handleError) {
            console.log(response.error.errorMsg);
            store.dispatch('errorsModal/changeContent', {
              title: response.error.errorMsg,
              desc: response.error.errorDesc
            });
          }
        }
        resolve({
          status: 200,
          response: xhr.responseText
        });
      };

      xhr.onerror = (e) => {
        // перевод Promise в состояние rejected
        reject(new Error("Network Error"));
        store.dispatch('errorsModal/changeContent', {
          title: 'Ошибка соединения',
          desc: 'Сервер не отвечает'
        });
        console.log(e);
        hideSpinner();
      };

      xhr.ontimeout = (e) => {
        // перевод Promise в состояние rejected
        reject(new Error("TimeOut Error"));
        console.log(e);
        hideSpinner();
      };
    });
  }

  static sendGetMediaFileHttpRequest(payload) {
    let url = payload.url;
    let withSpinner = payload.withSpinner;
    let handleError = payload.handleError;
    let spinner;
    if (withSpinner) {
      let target = document.getElementById('indicator');
      if (funcUtils.isNotEmpty(target)) {
        target.appendChild(document.createElement('div'))
          .appendChild(document.createElement('div'))
          .appendChild(document.createElement('div'))
          .appendChild(document.createElement('div'))
          .appendChild(document.createElement('div'))
          .appendChild(document.createElement('div'))
          .appendChild(document.createElement('div'))
          .appendChild(document.createElement('div'))
          .appendChild(document.createElement('div'))
          .appendChild(document.createElement('div'));

        target.style.display = 'block';
      }
    }
    let xhr = new XMLHttpRequest();
    xhr.timeout = 180000;
    xhr.open('GET', url, true);
    // xhr.responseType = "arraybuffer";
    xhr.responseType = "blob";
    xhr.send();

    let hideSpinner = () => {
      let target = document.getElementById('indicator');
      if (withSpinner && funcUtils.isNotEmpty(target)) {
        for (let i = 0; i < target.childNodes.length; i++) {
          target.childNodes[i].remove();
        }
        target.style.display = 'none';
        if (withSpinner && funcUtils.isNotEmpty(spinner)) {
          spinner.stop();
        }
      }
    };

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        // перевод Promise в состояние fulfilled.
        hideSpinner();
        let res = null;
        if (xhr.response) {
          // res = Array.prototype.slice.call(new Uint8Array(xhr.response));
          res = xhr.response;
        }
        resolve({
          status: 200,
          response: res
        });
      };

      xhr.onerror = (e) => {
        // перевод Promise в состояние rejected
        reject(new Error("Network Error"));
        console.log(e);
        hideSpinner();
      };

      xhr.ontimeout = (e) => {
        // перевод Promise в состояние rejected
        reject(new Error("TimeOut Error"));
        console.log(e);
        hideSpinner();
      };
    });
  }
}
