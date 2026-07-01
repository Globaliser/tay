# AGENTS.md — tay

Instructions for AI coding agents using the `tay` library. Read this file instead of the source; only open the `.ts` files when this document is insufficient.

**Version:** 1.0.1
**Language:** TypeScript → ES6 JavaScript (strict mode)
**Runtime:** Browser only (uses `document`, `HTMLElement`, `XMLHttpRequest`)
**No dependencies.**

---

## What tay is

A tiny jQuery-style DOM/AJAX/cookie helper. It **patches `HTMLElement.prototype`, `NodeList.prototype`, and `Document.prototype`** and exposes a global `t(selector)` function. There is no module wrapper — files are loaded as classic scripts.

Load order in HTML: `tay.js` first, then `tay-ajax.js` and/or `tay-cookie.js` (they're independent of `tay.js` but conventionally shipped together).

```html
<script src="/path/to/tay.min.js"></script>
<script src="/path/to/tay-ajax.min.js"></script>
<script src="/path/to/tay-cookie.min.js"></script>
```

---

## Core: `t(selector)` and prototype methods (`tay.js`)

`t(selector)` returns:
- **A single `HTMLElement`** if exactly one node matches
- **A `NodeList`** if zero or many match

This "auto-unwrap" is the biggest footgun. If the count of matches can vary, wrap defensively or use a selector guaranteed to return multiple. All prototype methods below work on **both** `HTMLElement` and `NodeList` unless noted.

### Method reference

| Method | Signature | Returns | Notes |
|---|---|---|---|
| `addClass` | `(className: string)` | self | chainable |
| `removeClass` | `(className: string)` | self | chainable |
| `toggleClass` | `(className: string)` | self | chainable |
| `hasClass` | `(...classNames: string[])` | `boolean` | AND across all names; HTMLElement only |
| `find` | `(selector: string)` | `HTMLElement \| NodeList` | same auto-unwrap rule as `t()` |
| `next` | `()` | `Node \| null` | `nextSibling` (raw DOM sibling, incl. text nodes) |
| `prev` | `(selector?: string)` | `Node \| null` | no arg = `previousSibling`; with arg = `closest(selector)` (misleading name — it walks up, not back) |
| `parent` | `()` | `HTMLElement` | **throws** if `parentElement` is null |
| `val` | `(setVal?: string)` | value / self | input/select/li/option only; throws otherwise |
| `html` | `(setHtml?: string)` | innerHTML / self | on NodeList get, returns last element's innerHTML |
| `attr` | `(attr, value?)` | value / self | falsy `value` triggers getter — passing `""` or `0` won't set |
| `d` | `(data?, value?)` | dataset / value / self | shortcut for `data-*` attrs; no args returns `dataset` |
| `removeAttr` | `(attr: string)` | self | |
| `css` | `(css: string, value?)` | computed / self | getter uses `getComputedStyle`; setter uses `style.setProperty` |
| `hide` | `(byDisplayNone = false)` | self | default: adds `.hide` class; `true`: sets `display:none` |
| `show` | `(byDisplayNone = false)` | self | default: removes `.hide` class; `true`: sets `display:block` |
| `forEach` | `(callback)` | self | on HTMLElement: calls with `this` (single-element iteration) |
| `on` | `(event, callback)` | self | works on HTMLElement, NodeList, and `document` |
| `trigger` | `(action: string)` | self | dispatches `new Event(action)` — no bubbling/cancelable options |
| `length` | property | `1` on HTMLElement | so `.length` works uniformly |

### Idiomatic usage

```js
t(".btn").addClass("active").on("click", (e) => { /* ... */ });

t(".item").hide();                    // NodeList: hides all
myEl.parent().find(".switch").toggleClass("on");

document.on("keydown", (e) => { /* ... */ });

if (myEl.hasClass("open", "primary")) { /* both classes */ }

myEl.d("user-id", "42");              // sets data-user-id="42"
const id = myEl.d("user-id");         // "42"
```

### Gotchas

1. **`t()` return type varies.** Guard for single vs many before calling `NodeList`-only patterns.
2. **`attr(name, "")` won't set** — the setter checks `!value`. Use `attr(name, " ")` or `setAttribute` directly.
3. **`.hide` class must exist in CSS** if you don't pass `byDisplayNone = true`. tay does not inject a stylesheet.
4. **`prev(selector)` is `closest`, not previous-matching-sibling.** Named for jQuery familiarity, behaves differently.
5. **`next()` returns `nextSibling`, not `nextElementSibling`.** May be a text node.
6. **No support for `off()`, `data()` with objects, event delegation, animations, or promises.** Not a jQuery drop-in.
7. **Global namespace only.** Loading twice or alongside another lib that patches these prototypes will collide.
8. **TypeScript consumers**: the `.ts` file augments the `HTMLElement`/`NodeList`/`Document` global interfaces. Include `tay.ts` in your `tsconfig` `files`/`include`, or copy the `interface` blocks into your project's ambient types.

---

## AJAX: `tAjax` (`tay-ajax.js`)

Thin fluent wrapper around `XMLHttpRequest`. **Not `fetch`-based, no Promise.**

```js
new tAjax("/api/endpoint")
  .add("key", "value")                 // append FormData field
  .setResponseType("json")             // "" | "json" | "text" | "arraybuffer" | "blob" | "document"
  .setTimeout(5000)                    // ms
  .call((response) => { /* ... */ })   // success callback receives xhr.response
  .send();                             // fires the request
```

### Defaults
- `method`: `"POST"` (sends `FormData`)
- `responseType`: `"json"`
- No timeout unless `setTimeout` is called

### Notes

- Method cannot be changed from the public API in 1.0.1 — it's `"POST"` internally, and `GET` branch exists in `init()` but there's no public setter. Treat this as POST-only for now.
- Only the success callback (`.call`) is wired up. `onError` / `onTimeout` are placeholders — they return `this` but don't invoke user callbacks.
- Response is passed as `xhr.response` (already parsed if `responseType === "json"`).

---

## Cookies: `tCookie` (`tay-cookie.js`)

JSON-serializing cookie helper. Values are `JSON.stringify`d on set and `JSON.parse`d on get.

```js
const cookie = new tCookie("/", 365);   // (path, days-to-expire)
cookie.set("user", { id: 1, name: "Ada" });
const user = cookie.get("user");        // { id: 1, name: "Ada" } — or false if missing
```

### Notes
- **Always JSON**. To store a plain string, wrap it: `cookie.set("k", "value")` — reads back as `"value"` string. But `cookie.set("k", "value with ; or =")` may still corrupt because the raw string is inserted into the cookie header; prefer objects.
- **Returns `false`** (not `null`/`undefined`) when the cookie is missing.
- No `delete()` method — set with a past expiry manually if you need to remove one.
- Expiry is a fixed date set at construction, not per-`set` call.

---

## Building

```
tsc
```

`tsconfig.json` compiles `./TypeScript/*.ts` → `./JavaScript/*.js` in strict ES6. Minified files are hand-generated with `terser`:

```
npx terser JavaScript/tay.js -c -m -o JavaScript/tay.min.js
```

Repeat for `tay-ajax.js` and `tay-cookie.js`. Keep min files in sync with sources on every release.

---

## When *not* to use tay

- Node.js / SSR contexts (browser-only globals)
- Anywhere you need `fetch`, Promises, `async/await` idioms, event delegation, or animations
- Codebases already using jQuery (methods collide by name but not always by behavior — e.g. `prev`, `next`)
- Framework-managed DOM (React, Vue, Svelte) — patching prototypes fights the framework
