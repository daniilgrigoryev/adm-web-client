import {Spinner} from 'spin.js';
import * as ConstantUtils from './../utils/constantUtils';
import * as funcUtils from "./../utils/funcUtils";
import * as RequestEntity from "./requestEntity";
import * as formStack from "./formStack";

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
      let socket = this._setSocket(new WebSocket(ConstantUtils.WS_URL));

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
          this._setSocket(new WebSocket(ConstantUtils.WS_URL));
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
    let cid = payload.cid;
    if (funcUtils.isUndefined(cid)) {
      cid = formStack.getCurrent().cid;
    }
    let beanName = payload.beanName;
    if (funcUtils.isUndefined(beanName)) {
      beanName = '';
    }
    let requestHead = new RequestEntity.RequestHead(localStorage.getItem('admSid'), sessionStorage.getItem('admWid'), cid, beanName, methodName);
    let requestParam = new RequestEntity.RequestParam(requestHead, paramsData);

    return this.sendHttpRequest({body: requestParam, withSpinner: withSpinner, handleError: handleError});
  }

  static sendHttpRequest(payload) {
    let body = payload.body;
    let withSpinner = payload.withSpinner;
    let handleError = payload.handleError;
    let spinner;
    if (withSpinner) {
      let opts = {
        lines: 13, // The number of lines to draw
        length: 38, // The length of each line
        width: 17, // The line thickness
        radius: 45, // The radius of the inner circle
        scale: 0.85, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        color: '#ffffff', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        speed: 0.7, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        className: 'spinner', // The CSS class to assign to the spinner
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        position: 'absolute' // Element positioning
      };
      let target = document.getElementById('indicator');
      if (funcUtils.isNotEmpty(target)) {
        for (let i = 0; i < target.childNodes.length; i++) {
          target.childNodes[i].remove();
        }
        target.style.display = 'block';
        spinner = new Spinner(opts).spin(target);
      }
    }
    let xhr = new XMLHttpRequest();
    xhr.timeout = 180000;
    xhr.open('POST', ConstantUtils.HTTP_URL, true);
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
            console.error(response.error.errorMsg);
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
