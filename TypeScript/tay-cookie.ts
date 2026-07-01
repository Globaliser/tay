class tCookie {
  private path: string;
  private expires: string;

  constructor(path = "/", expires = 365) {
    this.path = path;
    this.expires = "";
    this.setExpires(expires);
  }

  private setExpires(expires: number) {
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + expires * 24 * 60 * 60 * 1000);
    this.expires = "expires=" + expireDate.toUTCString();
  }

  public set(name: string, value: object) {
    document.cookie =
      name +
      "=" +
      JSON.stringify(value) +
      ";" +
      this.expires +
      ";path=" +
      this.path;
  }

  public get(name: string) {
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
