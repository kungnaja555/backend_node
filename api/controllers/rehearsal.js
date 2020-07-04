const Rehearsal = require('../model/rehearsal')
const Set = require('../model/set')
const Faculty = require('../model/faculty')
const Time = require('../model/time')

module.exports = {
    editRehearsal: async (req, res) => {
        var rehearsal = await Rehearsal.findOne({ _id: req.params.id })

        rehearsal.years = req.body.years
        rehearsal.name = req.body.name
        rehearsal.date = req.body.date

        rehearsal.save()
        res.redirect('/rehearsal/getallrehearsal')
    },
    deleteRehearsal: async (req, res) => {
        var rehearsal = await Rehearsal.findOne({ _id: req.params.id })
        rehearsal.remove()
        res.redirect('/rehearsal/getallrehearsal')
    },
    getAllRehearsal: async (req, res) => {
        var rehearsal = await Rehearsal.find().sort({ years: -1 })
        res.json(rehearsal)
    },
    addRehearsal: async (req, res) => {
        var newRHS = new Rehearsal({
            years: req.body.years,
            name: req.body.name,
            date: req.body.date
        })
        newRHS.save()
        res.redirect('/rehearsal/getallrehearsal')
    },
    getRehearsal: async (req, res) => {
        var rehearsal = await Rehearsal.findById(req.params.id)
        res.json(rehearsal)
    },
    report: async (req, res) => {
        var facultys = await Faculty.find({ rehearsals: req.params.re_id }).sort({ type: 1 })
        var fac_times = []
        var set_times = []
        for (var i = 0; i < facultys.length; i++) {
            var sets = await Set.find({ faculty: facultys[i]._id, 'contents.rehearsal': req.params.re_id }).sort({ status: 1 })
            var sum = 0
            var sumpundit = 0
            var countset = 0
            for (var j = 0; j < sets.length; j++) {
                var times = await Time.find({ rehearsal: req.params.re_id, set: sets[j]._id }).sort({ time: 1 })
                var length = times.length
                if (length <= 1) {
                    set_times.push({ _id: sets[j]._id, time: 0, minutePerPundit: 0 })
                } else {
                    var start = times[0].time
                    var last = times[length - 1].time
                    var avg = (new Date(last) - new Date(start)) / (length - 1) / 1000
                    var mpp = 60 / avg
                    set_times.push({ _id: sets[j]._id, time: avg.toFixed(2), minutePerPundit: Math.round(mpp) })
                    sum = sum + avg
                    sumpundit = sumpundit + Math.round(mpp)
                    countset++
                }
            }
            if (sum == 0) {
                fac_times.push({ _id: facultys[i]._id, time: 0, minutePerPundit: 0 })
            } else {
                var length = parseFloat(countset)
                var avg = sum / length
                var mpp = sumpundit / countset
                fac_times.push({ _id: facultys[i]._id, time: avg.toFixed(2), minutePerPundit: Math.round(mpp) })
            }
        }
        res.json({ fac_times: fac_times, set_times: set_times })
    },
    reportName: async (req, res) => {
        var facultys = await Faculty.find({ rehearsals: req.params.re_id }).sort({ type: 1 })
        var reportName = []
        for (var i = 0; i < facultys.length; i++) {
            reportName.push({ _id: facultys[i]._id, name: facultys[i].name, id: facultys[i].id, type: facultys[i].type })
            var sets = await Set.find({ faculty: facultys[i]._id, 'contents.rehearsal': req.params.re_id }).sort({ status: 1 })
            for (var j = 0; j < sets.length; j++) {
                var content = sets[j].contents.find(el => el.rehearsal == req.params.re_id)
                reportName.push({ _id: sets[j]._id, name: content.name, status: sets[j].status })
            }
        }
        res.json(reportName)
    }
}