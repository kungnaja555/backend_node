const Rehearsal = require('../model/rehearsal')
const Set = require('../model/set')

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
}