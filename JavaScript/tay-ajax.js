"use strict";
class tAjax {
    constructor(url) {
        this.isInline = false;
        this.inlineFunction = () => { };
        this.method = "POST";
        this.responseType = "json";
        this.url = url;
        this.ajaxRequest = new XMLHttpRequest();
        this.formData = new FormData();
    }
    send() {
        this.open(this.method, this.url);
        this.ajaxRequest.responseType = this.responseType;
        if (this.ajaxRequest.timeout)
            this.onTimeout();
        this.ajaxRequest.onreadystatechange = () => {
            this.handleStateChange();
        };
        this.init();
    }
    call(inlineFunction) {
        this.isInline = true;
        this.inlineFunction = inlineFunction;
        return this;
    }
    onError() {
        return this;
    }
    onTimeout() {
        return this;
    }
    add(key, value) {
        this.formData.append(key, value);
        return this;
    }
    setTimeout(timeout) {
        this.ajaxRequest.timeout = timeout;
        return this;
    }
    setResponseType(responseType) {
        this.responseType = responseType;
        return this;
    }
    handleStateChange() {
        if (this.ajaxRequest.readyState === XMLHttpRequest.DONE) {
            const status = this.ajaxRequest.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                this.onSuccess();
            }
            else {
                this.onError();
            }
        }
    }
    onSuccess() {
        if (this.isInline === true)
            this.inlineFunction(this.ajaxRequest.response);
    }
    open(method, url) {
        this.ajaxRequest.open(method, url);
    }
    init() {
        switch (this.method) {
            case "POST":
                this.ajaxRequest.send(this.formData);
                break;
            case "GET":
                this.ajaxRequest.send();
                break;
        }
    }
}
