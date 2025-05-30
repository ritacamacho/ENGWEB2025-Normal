const express = require('express');
const router = express.Router();

const Edicao = require('../controllers/edicao');

router.get('/edicoes', function(req, res, next) {
    if (req.query.org) {
        Edicao.listByOrg(req.query.org)
        .then(dados => {res.jsonp(dados)})
        .catch(erro => res.status(500).jsonp(erro));
        
        return;
    }

    Edicao.list()
        .then(dados => {res.jsonp(dados)})
        .catch(erro => res.status(500).jsonp(erro));
});

router.get('/edicoes/:id', function(req, res, next) {
    Edicao.findById(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
);

router.get('/paises', function(req, res, next) {
    if (req.query.papel === 'org') {
        Edicao.paisesOrganizadores()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro));
    } else if (req.query.papel === 'venc') {
        Edicao.paisesVencedores()
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro));
    } else {
        res.status(400).jsonp({ erro: "Parâmetro 'papel' inválido ou em falta." });
    }
});

router.get('/interpretes', function(req, res, next) {
    Edicao.listaInterpretes()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro));
});

router.post('/edicoes', function(req, res, next) {
Edicao.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => {
    if (erro.message && erro.message.includes('já existe')) {
        res.status(409).jsonp({ error: erro.message });
    } else if (erro.name === 'ValidationError') {
        res.status(400).jsonp({ error: erro.message });
    }
    });
});

router.delete('/edicoes/:id', function(req, res, next) {
    Edicao.remove(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
});

router.put('/edicoes/:id', function(req, res, next) {
    Edicao.update(req.params.id, req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
    }
);

module.exports = router;