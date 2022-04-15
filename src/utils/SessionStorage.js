export default class SessionStorage {
  static setToken(token) {
    window.sessionStorage.setItem("token", token);
  }

  static getToken() {
    return window.sessionStorage.getItem("token");
  }

  static removeToken() {
    window.sessionStorage.removeItem("token");
  }
}
