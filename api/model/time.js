var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var time = new Schema({
    time: Date,
    set: {
        type: Schema.Types.ObjectId,
        ref: 'sets'
    },
    rehearsal:  {
        type: Schema.Types.ObjectId,
        ref: 'rehearsals'
    },
})

var Time = mongoose.model('times', time, 'times')

module.exports = Time