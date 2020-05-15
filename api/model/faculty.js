var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var faculty = new Schema({
    id: String,
    name: String,
    type: Number,
    rehearsals: [{
        type: Schema.Types.ObjectId,
        ref: 'rehearsals'
    }]
})

var Faculty = mongoose.model('facultys', faculty, 'facultys')

module.exports = Faculty