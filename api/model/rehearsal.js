var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rehearsal = new Schema({
    name: String,
    years: Number,
    date: Date
})

var Rehearsal = mongoose.model('rehearsals', rehearsal, 'rehearsals')

module.exports = Rehearsal