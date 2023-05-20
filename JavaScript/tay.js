"use strict";
Element.prototype.trigger = function (action) {
  this.dispatchEvent(new Event(action));
  return this;
};
Element.prototype.addClass = function (className) {
  this.classList.add(className);
  return this;
};
Element.prototype.removeClass = function (className) {
  if (this.classList.contains(className)) this.classList.remove(className);
  return this;
};
NodeList.prototype.removeClass = function (className) {
  this.forEach((e) => e.removeClass(className));
  return this;
};
Element.prototype.toggleClass = function (className) {
  this.classList.toggle(className);
  return this;
};
NodeList.prototype.toggleClass = function (className) {
  this.forEach((e) => e.toggleClass(className));
  return this;
};
Element.prototype.find = function (selector) {
  let elements = this.querySelectorAll(selector);
  if (elements.length === 1) return elements[0];
  else return elements;
};
NodeList.prototype.find = function (selector) {
  let uniqueId = Math.floor(Date.now() / 1000);
  this.forEach((e) => {
    let newElements = e.find(selector);
    if (newElements.childNodes.length > 0)
      newElements.forEach((el) => el.attr("tayNodeList", uniqueId));
    else newElements.attr("tayNodeList_" + uniqueId, uniqueId);
  });
  let myNodeList = document.querySelectorAll(`[tayNodeList_${uniqueId}]`);
  myNodeList.removeAttr("tayNodeList_" + uniqueId);
  return myNodeList;
};
Element.prototype.next = function () {
  return this.nextSibling;
};
Element.prototype.prev = function (selector) {
  if (selector === undefined) return this.previousSibling;
  else return this.closest(selector);
};
Element.prototype.val = function (setVal) {
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
  if (setVal === undefined) return this.value;
  else this.value = setVal;
  return this;
};
NodeList.prototype.val = function (setVal) {
  if (setVal === undefined) this.forEach((e) => e.val());
  else this.forEach((e) => e.val(setVal));
};
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
NodeList.prototype.hide = function (byDisplayNone = false) {
  this.forEach((e) => e.hide(byDisplayNone));
  return this;
};
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
NodeList.prototype.show = function (byDisplayNone = false) {
  this.forEach((e) => e.show(byDisplayNone));
  return this;
};
Element.prototype.html = function (setHtml) {
  if (setHtml === undefined) return this.innerHTML;
  else this.innerHTML = setHtml;
  return this;
};
NodeList.prototype.html = function (setHtml) {
  if (setHtml === undefined) {
    let myInnerHTML = "";
    this.forEach((e) => {
      myInnerHTML = e.innerHTML;
    });
    return myInnerHTML;
  } else {
    this.forEach((e) => e.html(setHtml));
    return this;
  }
};
Element.prototype.hasClass = function (...classNames) {
  let me = this;
  return [...classNames].every((c) => me.classList.contains(c));
};
Element.prototype.parent = function () {
  if (this.parentElement !== null) return this.parentElement;
  else throw new Error(" [TAY] Parent element is null");
};
Element.prototype.attr = function (attr, value) {
  if (!value) return this.getAttribute(attr);
  else this.setAttribute(attr, value);
  return this;
};
NodeList.prototype.attr = function (attr, value) {
  if (!value) this.forEach((e) => e.attr(attr));
  else this.forEach((e) => e.attr(attr, value));
  return this;
};
Element.prototype.removeAttr = function (attr) {
  this.removeAttribute(attr);
  return this;
};
NodeList.prototype.removeAttr = function (attr) {
  this.forEach((e) => e.removeAttribute(attr));
  return this;
};
Element.prototype.css = function (css = "", value) {
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
NodeList.prototype.css = function (css = "", value) {
  if (!value) this.forEach((e) => e.css(css));
  else this.forEach((e) => e.css(css, value));
  return this;
};
Element.prototype.forEach = function (myFunction) {
  myFunction(this);
  return this;
};
Element.prototype.on = function (event, callback) {
  this.addEventListener(event, function () {
    callback(this);
  });
  return this;
};
NodeList.prototype.on = function (event, callback) {
  this.forEach((e) => e.on(event, callback));
  return this;
};
function tay(selector) {
  let elements = document.querySelectorAll(selector);
  if (elements.length === 1) return elements[0];
  return elements;
}
