const mongoose = require('mongoose');
var Edicao = require('../models/edicao');

module.exports.list = () => {
    return Edicao.find().select('-musicas').exec();
};

module.exports.listByOrg = (org) => {
    return Edicao.find({ organizacao: org }).select('-musicas').exec();
};

module.exports.findById = (id) => {
    return Edicao.findOne({ _id: id }).exec();
}

module.exports.paisesOrganizadores = () => {
    return Edicao.aggregate([
        {
            $group: {
                _id: "$organizacao",
                anos: { $addToSet: "$anoEdicao" }
            }
        },
        {
            $project: {
                _id: 0,
                pais: "$_id",
                anos: 1
            }
        },
        {
            $sort: { pais: 1 }
        }
    ]).exec();
};

module.exports.paisesVencedores = () => {
    return Edicao.aggregate([
        {
            $match: {
                vencedor: { $ne: null }
            }
        },
        {
            $group: {
                _id: "$vencedor",
                anos: { $addToSet: "$anoEdicao" }
            }
        },
        {
            $project: {
                _id: 0,
                pais: "$_id",
                anos: 1
            }
        },
        {
            $sort: { pais: 1 }
        }
    ]).exec();
};

module.exports.listaInterpretes = () => {
    return Edicao.aggregate([
      { $unwind: "$musicas" },
      { 
        $group: {
          _id: { nome: "$musicas.interprete", pais: "$musicas.pais" }
        }
      },
      { 
        $project: {
          _id: 0,
          nome: "$_id.nome",
          pais: "$_id.pais"
        }
      },
      { $sort: { nome: 1 } }
    ]).exec();
};

module.exports.insert = async (edicao) => {
    const existsById = await Edicao.find({ _id: edicao._id }).exec();
    const existsByYear = await Edicao.find({ anoEdicao: edicao.anoEdicao }).exec();

    if (existsById.length === 0 && existsByYear.length === 0) {
        const newEdicao = new Edicao(edicao);
        return newEdicao.save();
    }

    console.log("[ERROR] Edição já existe.");
    return Promise.reject(new Error('Edição já existe.'));
}
  
module.exports.remove = (id) => {
    return Edicao.find({ _id: id }).deleteOne().exec();
}

module.exports.update = (id, edicao) => {
    return Edicao.findByIdAndUpdate(id, edicao, { new: true }).exec();
}