var express = require('express');
var router = express.Router();
var axios = require('axios');

var endpoint = "http://localhost:25000/edicoes";

router.get("/", function(req, res, next) {
  axios.get(endpoint).then(function(response) {
    res.render("edicoesShow", { edicoes: response.data });
  });
});

module.exports = router;