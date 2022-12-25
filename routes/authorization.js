const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();

router.post("/redirect", function (req, res, next) {
  const { code } = req.body;
  axios({
    method: "POST",
    url: "https://github.com/login/oauth/access_token",
    headers: {
      Accept: "application/json",
    },
    timeout: 60 * 1000,
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((e) => {
      res.status(404);
      res.send();
    });
});

module.exports = router;
