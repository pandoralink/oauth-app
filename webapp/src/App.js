const GithubSDK = require("../../csrf-github-oauth-sdk/index.js");

// redirect_uri 处页面执行检测
GithubSDK.checkLogin((code) => {
  // 成功后获取 token
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/authorization/redirect");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.response);
      }
    }
  };
  xhr.send(JSON.stringify({ code }));
});

window.handleGithubLoginClick = () => {
  GithubSDK.login({
    client_id: "b351931efd1203b2230e",
    redirect_uri: "http://localhost:8080/login.html",
  });
};
