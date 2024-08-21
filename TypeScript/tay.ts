interface HTMLElement {
  trigger(action: string): any;
  addClass(className: string): HTMLElement;
  removeClass(className: string): HTMLElement;
  toggleClass(className: string): HTMLElement;
  find(selector: string): NodeList | HTMLElement | null;
  next(): any | null;
  prev(selector?: string): any | null;
  val(setVal?: string): any;
  html(setHtml?: string): HTMLElement | string;
  hide(byDisplayNone?: boolean): HTMLElement | any;
  show(byDisplayNone?: boolean): HTMLElement | any;
  parent(): HTMLElement;
  hasClass(...arg: string[]): boolean;
  attr(attr: string, value?: string): any;
  d(data?: string, value?: string): any;
  removeAttr(attr: string): any;
  forEach(callback: Function): any;
  css(css: string, value?: string): HTMLElement | any;
  on(action: string, callback: Function): any;
  length: number;
}

interface NodeList extends HTMLElement {}

interface Document {
  on(action: string, callback: Function): any;
}

HTMLElement.prototype.length = 1;

HTMLElement.prototype.trigger = function (action: string) {
  this.dispatchEvent(new Event(action));
  return this;
};

HTMLElement.prototype.addClass = function (className: string) {
  this.classList.add(className);
  return this;
};

HTMLElement.prototype.removeClass = function (className: string) {
  if (this.classList.contains(className)) this.classList.remove(className);
  return this;
};

NodeList.prototype.removeClass = function (className: string) {
  this.forEach((e: any) => e.removeClass(className));
  return this;
};

HTMLElement.prototype.toggleClass = function (className: string) {
  this.classList.toggle(className);
  return this;
};

NodeList.prototype.toggleClass = function (className: string) {
  this.forEach((e: any) => e.toggleClass(className));
  return this;
};

HTMLElement.prototype.find = function (selector: string) {
  let elements = this.querySelectorAll(selector);
  if (elements.length === 1) return elements[0] as HTMLElement;
  else return elements;
};

NodeList.prototype.find = function (selector: string) {
  let uniqueId = Math.floor(Date.now() / 1000);

  this.forEach((e: any) => {
    let newElements = e.find(selector);
    if (newElements.childNodes)
      newElements.forEach((el: any) =>
        el.attr("tayNodeList_" + uniqueId, uniqueId)
      );
    else newElements.attr("tayNodeList_" + uniqueId, uniqueId);
  });

  let myNodeList = document.querySelectorAll(`[tayNodeList_${uniqueId}]`);
  myNodeList.removeAttr("tayNodeList_" + uniqueId);

  return myNodeList;
};

HTMLElement.prototype.next = function () {
  return this.nextSibling;
};

HTMLElement.prototype.prev = function (selector?) {
  if (selector === undefined) return this.previousSibling;
  else return this.closest(selector);
};

HTMLElement.prototype.val = function (setVal?: string) {
  if (
    !(
      this instanceof HTMLInputElement ||
      this instanceof HTMLSelectElement ||
      this instanceof HTMLLIElement ||
      this instanceof HTMLOptionElement
    )
  )
    throw new Error(
      `Expected e to be an HTMLInputElement, HTMLSelectElement, HTMLLIElement or HTMLOptionElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`
    );

  if (setVal === undefined) return this.value;
  else this.value = setVal;
  return this;
};

NodeList.prototype.val = function (setVal?: string) {
  if (setVal === undefined) this.forEach((e: any) => e.val());
  else this.forEach((e: any) => e.val(setVal));
};

/**
 *  Adds .hide class to element or display:none if byDisplayNone is true
 * @param byDisplayNone
 * @returns {HTMLElement}
 */

HTMLElement.prototype.hide = function (byDisplayNone = false) {
  if (!(this instanceof HTMLElement))
    throw new Error(
      `Expected e to be an HTMLElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`
    );
  if (byDisplayNone === true) this.style.display = "none";
  else this.classList.add("hide");
  return this;
};

/**
 *  Adds .hide class to elements or display:none if byDisplayNone is true
 * @param byDisplayNone
 * @returns {NodeList}
 */

NodeList.prototype.hide = function (byDisplayNone = false) {
  this.forEach((e: any) => e.hide(byDisplayNone));
  return this;
};

/**
 *  Remove .hide class from element or set display:block if byDisplayNone is true
 * @param byDisplayNone
 * @returns {HTMLElement}
 */

HTMLElement.prototype.show = function (byDisplayNone = false) {
  if (!(this instanceof HTMLElement))
    throw new Error(
      `Expected e to be an HTMLElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`
    );
  if (byDisplayNone === true) this.style.display = "block";
  else this.classList.remove("hide");
  return this;
};

/**
 *  Remove .hide class from elements or set display:block if byDisplayNone is true
 * @param byDisplayNone
 * @returns {NodeList}
 */

NodeList.prototype.show = function (byDisplayNone = false) {
  this.forEach((e: any) => e.show(byDisplayNone));
  return this;
};

HTMLElement.prototype.html = function (setHtml?) {
  if (setHtml === undefined) return this.innerHTML;
  else this.innerHTML = setHtml;
  return this;
};

NodeList.prototype.html = function (setHtml?): NodeList | string {
  if (setHtml === undefined) {
    let myInnerHTML = "";
    this.forEach((e: any) => {
      myInnerHTML = e.innerHTML;
    });
    return myInnerHTML;
  } else {
    this.forEach((e: any) => e.html(setHtml));
    return this;
  }
};

/**
 *
 * @param classNames Multiple ClassNames separate as "classA", "classB"
 * @returns Boolean
 */
HTMLElement.prototype.hasClass = function (...classNames) {
  let me = this;
  return [...classNames].every((c) => me.classList.contains(c));
};

HTMLElement.prototype.parent = function () {
  if (this.parentElement !== null) return this.parentElement as HTMLElement;
  else throw new Error(" [TAY] Parent element is null");
};

HTMLElement.prototype.attr = function (attr: string, value?) {
  if (!value) return this.getAttribute(attr);
  else this.setAttribute(attr, value);
  return this;
};

NodeList.prototype.attr = function (attr: string, value?) {
  if (!value) this.forEach((e: any) => e.attr(attr));
  else this.forEach((e: any) => e.attr(attr, value));
  return this;
};

HTMLElement.prototype.d = function (data?: string, value?) {
  if (!data && !value) return this.dataset;
  else if (!value) return this.getAttribute("data-" + data);
  else {
    this.setAttribute("data-" + data, value);
    return this;
  }
};
NodeList.prototype.d = function (data?: string, value?) {
  if (!data && !value) {
    let dataArray: Array<string> = [];
    this.forEach((e: any) => dataArray.push(e.d()));
    return dataArray;
  } else if (!value) {
    let dataArray: Array<string> = [];
    this.forEach((e: any) => dataArray.push(e.d(data)));
    return dataArray;
  } else {
    this.forEach((e: any) => e.d(data, value));
    return this;
  }
};

HTMLElement.prototype.removeAttr = function (attr: string) {
  this.removeAttribute(attr);
  return this;
};

NodeList.prototype.removeAttr = function (attr: string) {
  this.forEach((e: any) => e.removeAttribute(attr));
  return this;
};

HTMLElement.prototype.css = function (css = "", value?) {
  if (!(this instanceof HTMLElement))
    throw new Error(
      `Expected e to be an HTMLElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`
    );
  if (!value) return window.getComputedStyle(this).getPropertyValue(css);
  else this.style.setProperty(css, value);
  return this;
};

NodeList.prototype.css = function (css = "", value?) {
  if (!value) this.forEach((e: any) => e.css(css));
  else this.forEach((e: any) => e.css(css, value));
  return this;
};

HTMLElement.prototype.forEach = function (myFunction: Function) {
  myFunction(this as HTMLElement);
  return this;
};

/**
 *  @param event is a string event name, e.g. change, click ,mouseover
 *  @param callback is an inline function like function(){ alert("hello") } or inside a class : this.method without parantheses
 */

HTMLElement.prototype.on = function (event: string, callback: Function) {
  this.addEventListener(event, function (event) {
    callback(event);
  });
  return this;
};

/**
 *  @param event is a string event name, e.g. change, click ,mouseover
 *  @param callback is an inline function like function(){ alert("hello") } or inside a class : this.method without parantheses
 */

Document.prototype.on = function (event: string, callback: Function) {
  document.addEventListener(event, function (event) {
    callback(event);
  });
  return this;
};

/**
 *  @param event is a string event name, e.g. change, click ,mouseover
 *  @param callback is an inline function like function(){ alert("hello") } or inside a class : this.method without parantheses
 */

NodeList.prototype.on = function (event: string, callback: Function) {
  this.forEach((e: any) => e.on(event, callback));
  return this;
};

/**
 *
 * @param selector Accepts multiple selector separated by , (comma)
 * @returns
 */
function t(selector: string) {
  let elements = document.querySelectorAll(selector);
  if (elements.length === 1) return elements[0] as HTMLElement;
  return elements;
}
