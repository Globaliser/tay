# Tay

Super slim & fast javascript library which includes most used jQuery methods written on Typescript

Currently minified, gzipped version is under **1KB**.

2.5x faster than jQuery, 25x less file size.

**tay.js** file is the output created by TypeScript compiler for **strict mode** and **ES6** Standards. If you want to support all browsers, you can use **tay.ts** file and set your output to **ES5** at your **tsconfig.json** file.

# Project website

https://www.globaliser.com/tay/

# Blog post about tay

https://www.globaliser.com/javascript-for-e-commerce/

# Examples

**jQuery code example**

$(".myclass").addClass("example");

**Tay version:**

t(".myclass").addClass("example");

# Use on Elements directly

myElement.parent().find(".switch").toggleClass("example");
