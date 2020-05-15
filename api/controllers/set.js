const Set = require('../model/set')
const Rehearsal = require('../model/rehearsal')

module.exports = {
    getAllSet: async (req, res) => {
        var sets = await Set.find({ faculty: req.params.fac_id, status: 0, contents: { $elemMatch: { rehearsal: null } } })
        res.json(sets)
    },
    addSet: async (req, res) => {
        var set = new Set({
            faculty: req.params.fac_id,
            status: 0
        })
        set = await set.save()
        var content = {
            name: req.body.set.name,
            years: req.body.set.years,
            rehearsal: null
        }
        set.contents.push(content)
        set.save()
        res.redirect('/set/getallset/' + req.params.fac_id)
    },
    editSet: async (req, res) => {
        await Set.updateOne(
            { faculty: req.params.fac_id, _id: req.body.set._id, 'contents._id': req.body.set.con_id },
            { $set: { 'contents.$.name': req.body.set.name, 'contents.$.years': req.body.set.years } }
        )

        res.redirect('/set/getallset/' + req.params.fac_id)
    },
    deleteSet: async (req, res) => {
        var set = await Set.findById(req.params.set_id)
        var content = set.contents.find(el => el.rehearsal == null)
        set.contents.pull(content._id)
        set.save()
        res.redirect('/set/getallset/' + req.params.fac_id)
    },
    getSet: async (req, res) => {
        var set = await Set.findOne({ _id: req.params.set_id })
        res.json(set)
    },
    getSetsByFaculty: async (req, res) => {
        var rehearsal = await Rehearsal.findById(req.params.re_id)
        var mysets = await Set.find({ faculty: req.params.fac_id, 'contents.rehearsal': req.params.re_id }).sort({ status: 1 })
        var sets = await Set.find({ faculty: req.params.fac_id, 'contents.years': rehearsal.years, 'contents.rehearsal': { $ne: req.params.re_id } })
        res.json({ mysets: mysets, sets: sets })
    },
    addAllContentInSet: async (req, res) => {
        var rehearsal = await Rehearsal.findById(req.params.re_id)
        var sets = await Set.find({ faculty: req.params.fac_id, 'contents.years': rehearsal.years, 'contents.rehearsal': { $ne: req.params.re_id } })

        for (var i = 0; i < sets.length; i++) {
            var content = sets[i].contents.find(el => el.rehearsal == null)
            var obj = { name: '', years: '', rehearsal: '' }
            obj.name = content.name
            obj.years = content.years
            obj.rehearsal = req.params.re_id
            sets[i].contents.push(obj)
            await sets[i].save()
        }

        res.redirect(`/set/getsetsbyfaculty/${req.params.re_id}/${req.params.fac_id}`)
    },
    addSomeContentInSet: async (req, res) => {
        var sets = req.body.form.sets

        for (var i = 0; i < sets.length; i++) {
            var set = await Set.findById(sets[i])
            var content = set.contents.find(el => el.rehearsal == null)
            var obj = { name: '', years: '', rehearsal: '' }
            obj.name = content.name
            obj.years = content.years
            obj.rehearsal = req.params.re_id
            set.contents.push(obj)
            await set.save()
        }

        res.redirect(`/set/getsetsbyfaculty/${req.params.re_id}/${req.params.fac_id}`)
    },
    removeContentInSet: async (req, res) => {
        var set = await Set.findById(req.params.set_id)
        var content = set.contents.find(el => el.rehearsal == req.params.re_id)
        set.contents.pull(content._id)
        set.save()
        res.redirect(`/set/getsetsbyfaculty/${req.params.re_id}/${req.params.fac_id}`)
    },
    addNewContentInSet: async (req, res) => {
        var set = new Set({
            faculty: req.params.fac_id,
            status: 1
        })
        set = await set.save()
        var content = {
            name: req.body.form.name,
            rehearsal: req.params.re_id
        }
        set.contents.push(content)
        set.save()
        res.redirect(`/set/getsetsbyfaculty/${req.params.re_id}/${req.params.fac_id}`)
    },
    deleteNewContentInSet: async (req, res) => {
        var set = await Set.findById(req.params.set_id)
        set.remove()
        res.redirect(`/set/getsetsbyfaculty/${req.params.re_id}/${req.params.fac_id}`)
    },
    editNewContentInSet: async (req, res) => {
        var set = await Set.findById(req.params.set_id)
        var content = set.contents.find(el => el.rehearsal == req.params.re_id)
        content.name = req.body.editname
        set.save()
        res.redirect(`/set/getsetsbyfaculty/${req.params.re_id}/${req.params.fac_id}`)
    }
}