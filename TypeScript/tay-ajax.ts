class tAjax {
  private url: string;
  private ajaxRequest: XMLHttpRequest;
  private formData: FormData;
  /*private callback: Function = () => {};
  private isCall: boolean = false;*/
  private isInline: boolean = false;
  private inlineFunction: Function = () => {};
  /*private errorCallback: string = "";
  private timeoutCallback: string = "";*/
  private method: string = "POST";
  private responseType:
    | ""
    | "json"
    | "text"
    | "arraybuffer"
    | "blob"
    | "document" = "json";

  constructor(url: string) {
    this.url = url;
    this.ajaxRequest = new XMLHttpRequest();
    this.formData = new FormData();
  }

  public send() {
    this.open(this.method, this.url);

    // Response Type, default Json
    this.ajaxRequest.responseType = this.responseType;

    // Handle Timeout
    if (this.ajaxRequest.timeout) this.onTimeout();

    // Handles Ajax Success or Error
    this.ajaxRequest.onreadystatechange = () => {
      this.handleStateChange();
    };

    this.init(); // Send the request
  }

  public call(inlineFunction: Function) {
    this.isInline = true;
    this.inlineFunction = inlineFunction;
    return this;
  }

  /**
   *  Calls function(XMLHttpRequest : string) or Class@method(XMLHttpRequest : string)
   *
   */

  public onError() {
    /*this.runClassOrFunction(
      this.errorCallback,
      JSON.stringify(this.ajaxRequest)
    );*/
    return this;
  }
  /**
   *  Calls function(XMLHttpRequest : string) or Class@method(XMLHttpRequest : string)
   */

  public onTimeout() {
    /*this.runClassOrFunction(
      this.errorCallback,
      JSON.stringify(this.ajaxRequest)
    );*/
    return this;
  }

  public add(key: string, value: string) {
    this.formData.append(key, value);
    return this;
  }
  /**
   * 1000 for 1 second
   * @param timeout
   */
  public setTimeout(timeout: number) {
    this.ajaxRequest.timeout = timeout;
    return this;
  }

  public setResponseType(
    responseType: "" | "json" | "text" | "arraybuffer" | "blob" | "document"
  ) {
    this.responseType = responseType;
    return this;
  }

  private handleStateChange() {
    // In local files, status is 0 upon success in Mozilla Firefox
    if (this.ajaxRequest.readyState === XMLHttpRequest.DONE) {
      const status = this.ajaxRequest.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        // The request has been completed successfully
        this.onSuccess();
      } else {
        this.onError();
      }
    }
  }
  private onSuccess() {
    // Call method of function
    /* if (this.isCall === true) this.callback();*/

    // Call inline function
    if (this.isInline === true) this.inlineFunction(this.ajaxRequest.response);
  }

  private open(method: string, url: string) {
    this.ajaxRequest.open(method, url);
  }

  private init() {
    switch (this.method) {
      case "POST":
        this.ajaxRequest.send(this.formData);
        /*this.ajaxRequest.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );*/
        break;
      case "GET":
        /* this.ajaxRequest.setRequestHeader("Content-Type", "application/json");*/
        this.ajaxRequest.send();
        break;
    }
  }
}
