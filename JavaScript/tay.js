"use strict";
function t(t) {
  return 1 === (t = document.querySelectorAll(t)).length ? t[0] : t;
}
(HTMLElement.prototype.length = 1),
  (HTMLElement.prototype.trigger = function (t) {
    return this.dispatchEvent(new Event(t)), this;
  }),
  (HTMLElement.prototype.addClass = function (t) {
    return this.classList.add(t), this;
  }),
  (HTMLElement.prototype.removeClass = function (t) {
    return this.classList.contains(t) && this.classList.remove(t), this;
  }),
  (NodeList.prototype.removeClass = function (n) {
    return this.forEach((t) => t.removeClass(n)), this;
  }),
  (HTMLElement.prototype.toggleClass = function (t) {
    return this.classList.toggle(t), this;
  }),
  (NodeList.prototype.toggleClass = function (n) {
    return this.forEach((t) => t.toggleClass(n)), this;
  }),
  (HTMLElement.prototype.find = function (t) {
    return 1 === (t = this.querySelectorAll(t)).length ? t[0] : t;
  }),
  (NodeList.prototype.find = function (e) {
    let i = Math.floor(Date.now() / 1e3),
      t =
        (this.forEach((t) => {
          let n = t.find(e);
          n.childNodes
            ? n.forEach((t) => t.attr("tayNodeList_" + i, i))
            : n.attr("tayNodeList_" + i, i);
        }),
        document.querySelectorAll(`[tayNodeList_${i}]`));
    return t.removeAttr("tayNodeList_" + i), t;
  }),
  (HTMLElement.prototype.next = function () {
    return this.nextSibling;
  }),
  (HTMLElement.prototype.prev = function (t) {
    return void 0 === t ? this.previousSibling : this.closest(t);
  }),
  (HTMLElement.prototype.val = function (t) {
    if (
      this instanceof HTMLInputElement ||
      this instanceof HTMLSelectElement ||
      this instanceof HTMLLIElement ||
      this instanceof HTMLOptionElement
    )
      return void 0 === t ? this.value : ((this.value = t), this);
    throw new Error(`Expected e to be an HTMLInputElement, HTMLSelectElement, HTMLLIElement or HTMLOptionElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`);
  }),
  (NodeList.prototype.val = function (n) {
    void 0 === n ? this.forEach((t) => t.val()) : this.forEach((t) => t.val(n));
  }),
  (HTMLElement.prototype.hide = function (t = !1) {
    if (this instanceof HTMLElement)
      return (
        !0 === t ? (this.style.display = "none") : this.classList.add("hide"),
        this
      );
    throw new Error(`Expected e to be an HTMLElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`);
  }),
  (NodeList.prototype.hide = function (n = !1) {
    return this.forEach((t) => t.hide(n)), this;
  }),
  (HTMLElement.prototype.show = function (t = !1) {
    if (this instanceof HTMLElement)
      return (
        !0 === t
          ? (this.style.display = "block")
          : this.classList.remove("hide"),
        this
      );
    throw new Error(`Expected e to be an HTMLElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`);
  }),
  (NodeList.prototype.show = function (n = !1) {
    return this.forEach((t) => t.show(n)), this;
  }),
  (HTMLElement.prototype.html = function (t) {
    return void 0 === t ? this.innerHTML : ((this.innerHTML = t), this);
  }),
  (NodeList.prototype.html = function (n) {
    if (void 0 !== n) return this.forEach((t) => t.html(n)), this;
    {
      let n = "";
      return (
        this.forEach((t) => {
          n = t.innerHTML;
        }),
        n
      );
    }
  }),
  (HTMLElement.prototype.hasClass = function (...t) {
    let n = this;
    return [...t].every((t) => n.classList.contains(t));
  }),
  (HTMLElement.prototype.parent = function () {
    if (null !== this.parentElement) return this.parentElement;
    throw new Error(" [TAY] Parent element is null");
  }),
  (HTMLElement.prototype.attr = function (t, n) {
    return n ? (this.setAttribute(t, n), this) : this.getAttribute(t);
  }),
  (NodeList.prototype.attr = function (n, e) {
    return (
      e ? this.forEach((t) => t.attr(n, e)) : this.forEach((t) => t.attr(n)),
      this
    );
  }),
  (HTMLElement.prototype.d = function (t, n) {
    return t || n
      ? n
        ? (this.setAttribute("data-" + t, n), this)
        : this.getAttribute("data-" + t)
      : this.dataset;
  }),
  (NodeList.prototype.d = function (e, n) {
    if (e || n) {
      if (n) return this.forEach((t) => t.d(e, n)), this;
      {
        let n = [];
        return this.forEach((t) => n.push(t.d(e))), n;
      }
    }
    {
      let n = [];
      return this.forEach((t) => n.push(t.d())), n;
    }
  }),
  (HTMLElement.prototype.removeAttr = function (t) {
    return this.removeAttribute(t), this;
  }),
  (NodeList.prototype.removeAttr = function (n) {
    return this.forEach((t) => t.removeAttribute(n)), this;
  }),
  (HTMLElement.prototype.css = function (t = "", n) {
    if (this instanceof HTMLElement)
      return n
        ? (this.style.setProperty(t, n), this)
        : window.getComputedStyle(this).getPropertyValue(t);
    throw new Error(`Expected e to be an HTMLElement, but was t{
        (this && this.constructor && this.constructor.name) || this
      }`);
  }),
  (NodeList.prototype.css = function (n = "", e) {
    return (
      e ? this.forEach((t) => t.css(n, e)) : this.forEach((t) => t.css(n)), this
    );
  }),
  (HTMLElement.prototype.forEach = function (t) {
    return t(this), this;
  }),
  (HTMLElement.prototype.on = function (t, n) {
    return (
      this.addEventListener(t, function (t) {
        n(t);
      }),
      this
    );
  }),
  (Document.prototype.on = function (t, n) {
    return (
      document.addEventListener(t, function (t) {
        n(t);
      }),
      this
    );
  }),
  (NodeList.prototype.on = function (n, e) {
    return this.forEach((t) => t.on(n, e)), this;
  });
