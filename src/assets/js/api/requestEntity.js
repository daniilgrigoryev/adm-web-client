/**
 * Заголовок запроса
 */
export class RequestHead {
  constructor(sid, wid, cid, bean, method) {
    /**
     * Код сессии
     */
    this.sid = sid;
    /**
     * Код окна
     */
    this.wid = wid;
    /**
     * Код компонента
     */
    this.cid = cid;
    /**
     * Имя бина (если нужно создать новый компонент)
     */
    this.bean = bean;
    /**
     * Метод в готовом компоненте
     */
    this.method = method;
  }
}

/**
 * параметры логина
 */
export class LoginParams {
  constructor(jsFingerPrint, webGlId, platform, userAgent, cookieValue, username, databaseLabel, password) {
    this.jsFingerPrint = jsFingerPrint;
    this.webGlId = webGlId;
    this.platform = platform;
    this.userAgent = userAgent;
    this.cookieValue = cookieValue;
    this.username = username;
    this.databaseLabel = databaseLabel;
    this.password = password;
  }
}

export class LoginParamsSID {
  constructor(jsFingerPrint, webGlId, platform, userAgent, cookieValue, databaseLabel, sid) {
    this.jsFingerPrint = jsFingerPrint;
    this.webGlId = webGlId;
    this.platform = platform;
    this.userAgent = userAgent;
    this.cookieValue = cookieValue;
    this.databaseLabel = databaseLabel;
    this.sid = sid;
  }
}

/**
 * Форма запроса
 */
export class RequestParam {
  constructor(head, body) {
    this.head = head;
    this.body = body;
  }
}
