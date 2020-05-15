var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pundit = new Schema({
    no: Number,
    id: String,
    title: String,
    firstname: String,
    lastname: String,
    level: String,      //ระดับปริญญา
    honour: Number,     //เกียรตินิยม
    set: {
        type: Schema.Types.ObjectId,
        ref: 'sets'
    },
})

var Pundit = mongoose.model('pundits', pundit, 'pundits')

module.exports = Pundit