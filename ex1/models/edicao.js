const mongoose = require('mongoose');

const musicaSchema = new mongoose.Schema({
  id: String,
  titulo: String,
  pais: String,
  link: String,
  compositor: String,
  interprete: String,
  letra: { type: String, default: null }
}, { _id: false });

const edicaoSchema = new mongoose.Schema({
  _id: String,
  anoEdicao: String,
  organizacao: String,
  vencedor: String,
  musicas: [musicaSchema]
}, { versionKey: false });

module.exports = mongoose.model('edicoes', edicaoSchema);