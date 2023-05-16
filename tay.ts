interface Element {
  trigger(action: string): any;
  addClass(className: string): Element;
  removeClass(className: string): Element;
  toggleClass(className: string): Element;
  find(selector: string): Element | NodeList | HTMLElement | null;
  next(): any | null;
  prev(selector?: string): any | null;
  val(setVal: string): any;
  html(setHtml?: string): Element | string;
  hide(byDisplayNone?: boolean): Element | any;
  show(byDisplayNone?: boolean): Element | any;
  parent(): HTMLElement;
  hasClass(...arg: string[]): boolean;
  attr(attr: string, value?: string): any;
  removeAttr(attr: string): any;
  forEach(callback: Function): any;
  css(css: string, value?: string): HTMLElement | any;
}

interface NodeList extends Element {}
interface HTMLElement extends Element {}

Element.prototype.trigger = function (action: string) {
  this.dispatchEvent(new Event(action));
  return this;
};

Element.prototype.addClass = function (className: string) {
  this.classList.add(className);
  return this;
};

Element.prototype.removeClass = function (className: string) {
  if (this.classList.contains(className)) this.classList.remove(className);
  return this;
};

NodeList.prototype.removeClass = function (className: string) {
  this.forEach((e: any) => e.removeClass(className));
  return this;
};

Element.prototype.toggleClass = function (className: string) {
  this.classList.toggle(className);
  return this;
};

NodeList.prototype.toggleClass = function (className: string) {
  this.forEach((e: any) => e.toggleClass(className));
  return this;
};

Element.prototype.find = function (selector: string) {
  let elements = this.querySelectorAll(selector);
  if (elements.length === 1) return this.querySelector(selector);
  else return elements;
};

Element.prototype.next = function () {
  return this.nextSibling;
};

Element.prototype.prev = function (selector = "") {
  if (selector === "") return this.previousSibling;
  else return this.closest(selector);
};

Element.prototype.val = function (setVal: string = "") {
  if (
    !(
      this instanceof HTMLInputElement ||
      this instanceof HTMLSelectElement ||
      this instanceof HTMLLIElement ||
      this instanceof HTMLOptionElement
    )
  )
    throw new Error(
      `Expected e to be an HTMLInputElement, HTMLSelectElement, HTMLLIElement or HTMLOptionElement, but was ${
        (this && this.constructor && this.constructor.name) || this
      }`
    );

  if (setVal === "") return this.value;
  else this.value = setVal;
  return this;
};

NodeList.prototype.val = function (setVal: string = "") {
  this.forEach((e: any) => e.val(setVal));
};

/**
 *  Adds .hide class to element or display:none if byDisplayNone is true
 * @param byDisplayNone
 * @returns {Element}
 */

Element.prototype.hide = function (byDisplayNone = false) {
  if (!(this instanceof HTMLElement))
    throw new Error(
      `Expected e to be an HTMLElement, but was ${
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
 * @returns {Element}
 */

Element.prototype.show = function (byDisplayNone = false) {
  if (!(this instanceof HTMLElement))
    throw new Error(
      `Expected e to be an HTMLElement, but was ${
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

Element.prototype.html = function (setHtml?) {
  if (setHtml === undefined) return this.innerHTML;
  else this.innerHTML = setHtml;
  return this;
};

NodeList.prototype.html = function (setHtml?) {
  if (setHtml === undefined) this.forEach((e: any) => e.html());
  else this.forEach((e: any) => e.html(setHtml));
  return this;
};

/**
 *
 * @param classNames Multiple ClassNames separate as "classA", "classB"
 * @returns Boolean
 */
Element.prototype.hasClass = function (...classNames) {
  let me = this;
  return [...classNames].every((c) => me.classList.contains(c));
};

Element.prototype.parent = function () {
  if (this.parentElement !== null) return this.parentElement as HTMLElement;
  else throw new Error(" [TAY] Parent element is null");
};

Element.prototype.attr = function (attr: string, value?) {
  if (!value) return this.getAttribute(attr);
  else this.setAttribute(attr, value);
  return this;
};

NodeList.prototype.attr = function (attr: string, value?) {
  if (!value) this.forEach((e: any) => e.attr(attr));
  else this.forEach((e: any) => e.attr(attr, value));
  return this;
};

Element.prototype.removeAttr = function (attr: string) {
  this.removeAttribute(attr);
  return this;
};

NodeList.prototype.attr = function (attr: string) {
  this.forEach((e: any) => e.removeAttribute(attr));
};

Element.prototype.css = function (css = "", value?) {
  if (!(this instanceof HTMLElement))
    throw new Error(
      `Expected e to be an HTMLElement, but was ${
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
};

Element.prototype.forEach = function (myFunction: Function) {
  myFunction(this as Element);
};

/**
 *
 * @param selector Accepts multiple selector separated by , (comma)
 * @returns
 */
function tay(selector: string) {
  let elements = document.body.querySelectorAll(selector);
  if (elements.length === 1) return elements[0] as Element;
  return elements;
}
