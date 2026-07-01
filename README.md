# Tay

**Version:** 1.0.1

Super slim & fast JavaScript library with the most used jQuery methods, written in TypeScript.

Minified + gzipped core is under **1 KB**. Roughly **2.5x faster than jQuery** at **~25x smaller** file size.

`tay.js` is compiled from `tay.ts` in **strict mode** targeting **ES6**. If you need older-browser support, edit `tay.ts` with `tsconfig.json` targeting **ES5**.

## Project website

https://www.globaliser.com/tay/

## Blog post

https://www.globaliser.com/javascript-for-e-commerce/

## Files

### `TypeScript/` (source)
- `tay.ts` — core DOM library (jQuery-style helpers)
- `tay-ajax.ts` — `tAjax` class, chainable XHR wrapper (POST/GET, JSON/text/blob/etc.)
- `tay-cookie.ts` — `tCookie` class, JSON-friendly cookie get/set with expiry & path

### `JavaScript/` (compiled)
- `tay.js` / `tay.min.js`
- `tay-ajax.js` / `tay-ajax.min.js`
- `tay-cookie.js` / `tay-cookie.min.js`

## Build

```
tsc
```

`tsconfig.json` points `rootDir` → `./TypeScript/` and `outDir` → `./JavaScript/`.

## Usage

### Core (`tay.js`)

jQuery:
```js
$(".myclass").addClass("example");
```

Tay:
```js
t(".myclass").addClass("example");
```

Chain on any element directly:
```js
myElement.parent().find(".switch").toggleClass("example");
```

### AJAX (`tay-ajax.js`)

```js
new tAjax("/api/endpoint")
  .add("key", "value")
  .setResponseType("json")
  .setTimeout(5000)
  .call((response) => {
    console.log(response);
  })
  .send();
```

### Cookies (`tay-cookie.js`)

```js
const cookie = new tCookie("/", 365); // path, days-to-expire

cookie.set("user", { id: 1, name: "Ada" });
const user = cookie.get("user"); // { id: 1, name: "Ada" } or false
```

## Changelog

### 1.0.1
- Added `tay-ajax` (`tAjax`) module
- Added `tay-cookie` (`tCookie`) module
- Regenerated `tay.min.js`; added `tay-ajax.min.js` and `tay-cookie.min.js`
- `tsconfig.json` uses in-repo relative paths (`./TypeScript/` → `./JavaScript/`) so `tsc` works out of the box

### 1.0.0
- Initial `tay.js` core library
