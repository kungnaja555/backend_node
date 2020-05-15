var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var set = new Schema({
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'facultys'
    },
    contents: [{
        name: String,
        years: Number,
        rehearsal: {
            type: Schema.Types.ObjectId,
            ref: 'rehearsals'
        }
    }],
    status: Number // 0 - เลือกที่มี, 1 - สร้างใหม่
})

var Set = mongoose.model('sets', set, 'sets')

module.exports = Set