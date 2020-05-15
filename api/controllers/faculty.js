const Faculty = require('../model/faculty')
const Set = require('../model/set')
const Time = require('../model/time')

module.exports = {
    addFaculty: async function (req, res) {
        const newFac = new Faculty({
            id: req.body.id,
            name: req.body.name,
            type: 0
        })
        await newFac.save()
        res.redirect('/faculty/getallfaculty')
    },
    getAllFaculty: async function (req, res) {
        var facultys = await Faculty.find({ type: 0 })
        res.json(facultys)
    },
    editFaculty: async function (req, res) {
        var faculty = await Faculty.findOne({ _id: req.params.id })

        faculty.id = req.body.id
        faculty.name = req.body.name

        faculty.save()
        res.redirect('/faculty/getallfaculty')
    },
    deleteFaculty: async function (req, res) {
        var faculty = await Faculty.findOne({ _id: req.params.id })
        faculty.type = 1
        faculty.save()
        res.redirect('/faculty/getallfaculty')
    },
    getFaculty: async (req, res) => {
        var faculty = await Faculty.findById(req.params.id)
        res.json(faculty)
    },
    getFacultysByRehearsal: async (req, res) => {
        var myfacultys = await Faculty.find({ rehearsals: req.params.re_id }).sort({ type: 1 })
        var facultys = await Faculty.find({ type: 0, rehearsals: { $ne: req.params.re_id } })
        res.json({ myfacultys: myfacultys, facultys: facultys })
    },
    updateSomeAttrRehearsal: async (req, res) => {
        var fac_id = req.body.form.facultys

        for (var i = 0; i < fac_id.length; i++) {
            var faculty = await Faculty.findById(fac_id[i])
            faculty.rehearsals.push(req.params.re_id)
            faculty.save()
        }
        res.redirect('/faculty/getfacultysbyrehearsal/' + req.params.re_id)
    },
    updateAllAttrRehearsal: async (req, res) => {
        var facultys = await Faculty.find({ type: 0, rehearsals: { $ne: req.params.re_id } })

        for (var i = 0; i < facultys.length; i++) {
            facultys[i].rehearsals.push(req.params.re_id)
            facultys[i].save()
        }
        res.redirect('/faculty/getfacultysbyrehearsal/' + req.params.re_id)
    },
    removeRehearsalInFaculty: async (req, res) => {
        await Faculty.update({ _id: req.params.fac_id }, { $pull: { rehearsals: req.params.re_id } })
        res.redirect('/faculty/getfacultysbyrehearsal/' + req.params.re_id)
    },
    addFacultyInRehearsal: async (req, res) => {
        var faculty = new Faculty({
            name: req.body.name,
            type: 2
        })
        faculty = await faculty.save()
        faculty.rehearsals.push(req.params.re_id)
        await faculty.save()
        res.redirect('/faculty/getfacultysbyrehearsal/' + req.params.re_id)
    },
    deleteGroup: async (req, res) => {
        var faculty = await Faculty.findById(req.params.fac_id)
        await faculty.remove()
        res.redirect('/faculty/getfacultysbyrehearsal/' + req.params.re_id)
    },
    editGroup: async (req, res) => {
        var faculty = await Faculty.findById(req.params.fac_id)
        faculty.name = req.body.form.name
        faculty.save()
        res.redirect('/faculty/getfacultysbyrehearsal/' + req.params.re_id)
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