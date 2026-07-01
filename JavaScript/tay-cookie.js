"use strict";
class tCookie {
    constructor(path = "/", expires = 365) {
        this.path = path;
        this.expires = "";
        this.setExpires(expires);
    }
    setExpires(expires) {
        const expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + expires * 24 * 60 * 60 * 1000);
        this.expires = "expires=" + expireDate.toUTCString();
    }
    set(name, value) {
        document.cookie =
            name +
                "=" +
                JSON.stringify(value) +
                ";" +
                this.expires +
                ";path=" +
                this.path;
    }
    get(name) {
        name += "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return JSON.parse(c.substring(name.length, c.length));
            }
        }
        return false;
    }
}
