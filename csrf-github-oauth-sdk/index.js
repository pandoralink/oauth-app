const md5 = require("blueimp-md5");

const checkLogin = (callback) => {
  /**
   * 获取URL参数
   * @param 参数名
   */
  function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
  function getLocalState() {
    return localStorage.getItem("state");
  }
  const code = getQueryString("code");
  const state = getQueryString("state");
  if (code && state === getLocalState()) {
    callback(code);
  }
};
const login = async ({ client_id, redirect_uri }) => {
  const timestamp = new Date().getTime();
  const state = md5(timestamp);
  localStorage.setItem("state", state);
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
};

module.exports = {
  checkLogin,
  login,
};
