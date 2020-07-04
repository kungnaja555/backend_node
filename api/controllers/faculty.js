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
   
}