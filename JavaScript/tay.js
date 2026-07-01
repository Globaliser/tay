"use strict";
HTMLElement.prototype.length = 1;
HTMLElement.prototype.trigger = function (action) {
    this.dispatchEvent(new Event(action));
    return this;
};
HTMLElement.prototype.addClass = function (className) {
    this.classList.add(className);
    return this;
};
HTMLElement.prototype.removeClass = function (className) {
    if (this.classList.contains(className))
        this.classList.remove(className);
    return this;
};
NodeList.prototype.removeClass = function (className) {
    this.forEach((e) => e.removeClass(className));
    return this;
};
HTMLElement.prototype.toggleClass = function (className) {
    this.classList.toggle(className);
    return this;
};
NodeList.prototype.toggleClass = function (className) {
    this.forEach((e) => e.toggleClass(className));
    return this;
};
HTMLElement.prototype.find = function (selector) {
    let elements = this.querySelectorAll(selector);
    if (elements.length === 1)
        return elements[0];
    else
        return elements;
};
NodeList.prototype.find = function (selector) {
    let uniqueId = Math.floor(Date.now() / 1000);
    this.forEach((e) => {
        let newElements = e.find(selector);
        if (newElements.childNodes)
            newElements.forEach((el) => el.attr("tayNodeList_" + uniqueId, uniqueId));
        else
            newElements.attr("tayNodeList_" + uniqueId, uniqueId);
    });
    let myNodeList = document.querySelectorAll(`[tayNodeList_${uniqueId}]`);
    myNodeList.removeAttr("tayNodeList_" + uniqueId);
    return myNodeList;
};
HTMLElement.prototype.next = function () {
    return this.nextSibling;
};
HTMLElement.prototype.prev = function (selector) {
    if (selector === undefined)
        return this.previousSibling;
    else
        return this.closest(selector);
};
HTMLElement.prototype.val = function (setVal) {
    if (!(this instanceof HTMLInputElement ||
        this instanceof HTMLSelectElement ||
        this instanceof HTMLLIElement ||
        this instanceof HTMLOptionElement))
        throw new Error(`Expected e to be an HTMLInputElement, HTMLSelectElement, HTMLLIElement or HTMLOptionElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`);
    if (setVal === undefined)
        return this.value;
    else
        this.value = setVal;
    return this;
};
NodeList.prototype.val = function (setVal) {
    if (setVal === undefined)
        this.forEach((e) => e.val());
    else
        this.forEach((e) => e.val(setVal));
};
HTMLElement.prototype.hide = function (byDisplayNone = false) {
    if (!(this instanceof HTMLElement))
        throw new Error(`Expected e to be an HTMLElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`);
    if (byDisplayNone === true)
        this.style.display = "none";
    else
        this.classList.add("hide");
    return this;
};
NodeList.prototype.hide = function (byDisplayNone = false) {
    this.forEach((e) => e.hide(byDisplayNone));
    return this;
};
HTMLElement.prototype.show = function (byDisplayNone = false) {
    if (!(this instanceof HTMLElement))
        throw new Error(`Expected e to be an HTMLElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`);
    if (byDisplayNone === true)
        this.style.display = "block";
    else
        this.classList.remove("hide");
    return this;
};
NodeList.prototype.show = function (byDisplayNone = false) {
    this.forEach((e) => e.show(byDisplayNone));
    return this;
};
HTMLElement.prototype.html = function (setHtml) {
    if (setHtml === undefined)
        return this.innerHTML;
    else
        this.innerHTML = setHtml;
    return this;
};
NodeList.prototype.html = function (setHtml) {
    if (setHtml === undefined) {
        let myInnerHTML = "";
        this.forEach((e) => {
            myInnerHTML = e.innerHTML;
        });
        return myInnerHTML;
    }
    else {
        this.forEach((e) => e.html(setHtml));
        return this;
    }
};
HTMLElement.prototype.hasClass = function (...classNames) {
    let me = this;
    return [...classNames].every((c) => me.classList.contains(c));
};
HTMLElement.prototype.parent = function () {
    if (this.parentElement !== null)
        return this.parentElement;
    else
        throw new Error(" [TAY] Parent element is null");
};
HTMLElement.prototype.attr = function (attr, value) {
    if (!value)
        return this.getAttribute(attr);
    else
        this.setAttribute(attr, value);
    return this;
};
NodeList.prototype.attr = function (attr, value) {
    if (!value)
        this.forEach((e) => e.attr(attr));
    else
        this.forEach((e) => e.attr(attr, value));
    return this;
};
HTMLElement.prototype.d = function (data, value) {
    if (!data && !value)
        return this.dataset;
    else if (!value)
        return this.getAttribute("data-" + data);
    else {
        this.setAttribute("data-" + data, value);
        return this;
    }
};
NodeList.prototype.d = function (data, value) {
    if (!data && !value) {
        let dataArray = [];
        this.forEach((e) => dataArray.push(e.d()));
        return dataArray;
    }
    else if (!value) {
        let dataArray = [];
        this.forEach((e) => dataArray.push(e.d(data)));
        return dataArray;
    }
    else {
        this.forEach((e) => e.d(data, value));
        return this;
    }
};
HTMLElement.prototype.removeAttr = function (attr) {
    this.removeAttribute(attr);
    return this;
};
NodeList.prototype.removeAttr = function (attr) {
    this.forEach((e) => e.removeAttribute(attr));
    return this;
};
HTMLElement.prototype.css = function (css = "", value) {
    if (!(this instanceof HTMLElement))
        throw new Error(`Expected e to be an HTMLElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`);
    if (!value)
        return window.getComputedStyle(this).getPropertyValue(css);
    else
        this.style.setProperty(css, value);
    return this;
};
NodeList.prototype.css = function (css = "", value) {
    if (!value)
        this.forEach((e) => e.css(css));
    else
        this.forEach((e) => e.css(css, value));
    return this;
};
HTMLElement.prototype.forEach = function (myFunction) {
    myFunction(this);
    return this;
};
HTMLElement.prototype.on = function (event, callback) {
    this.addEventListener(event, function (event) {
        callback(event);
    });
    return this;
};
Document.prototype.on = function (event, callback) {
    document.addEventListener(event, function (event) {
        callback(event);
    });
    return this;
};
NodeList.prototype.on = function (event, callback) {
    this.forEach((e) => e.on(event, callback));
    return this;
};
function t(selector) {
    let elements = document.querySelectorAll(selector);
    if (elements.length === 1)
        return elements[0];
    return elements;
}
