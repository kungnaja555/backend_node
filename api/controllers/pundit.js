const Pundit = require('../model/pundit')
const Set = require('../model/set')

module.exports = {
    getAllPundit: async (req, res) => {
        var pundits = await Pundit.find({ set: req.params.set_id }).sort({ 'no': 1 })
        res.json(pundits)
    },
    addPundit: async (req, res) => {
        var findpundit = await Pundit.findOne({ id: req.body.pundit.id })

        if (!findpundit) {
            var pundit = new Pundit({
                no: req.body.pundit.no,
                id: req.body.pundit.id,
                title: req.body.pundit.title,
                firstname: req.body.pundit.firstname,
                lastname: req.body.pundit.lastname,
                level: req.body.pundit.level,
                honour: req.body.pundit.honour,
                set: req.params.set_id,
            })
            pundit.save()
        }

        res.redirect('/pundit/getallpundit/' + req.params.set_id)
    },
    deletePundit: async (req, res) => {
        var pundit = await Pundit.findById(req.params.id)
        pundit.remove()
        res.redirect('/pundit/getallpundit/' + req.params.set_id)
    },
    editPundit: async (req, res) => {
        await Pundit.findOneAndUpdate({ _id: req.params.id }, req.body.pundit)
        res.redirect('/pundit/getallpundit/' + req.params.set_id)
    },
    uploadFile: async (req, res) => {
        var data = req.body.data

        for (var i = 1; i < data.length; i++) {
            var pundit = await Pundit.findOne({ id: data[i][1] })
            if (pundit) {
                pundit.no = data[i][0]
                pundit.id = data[i][1]
                pundit.title = data[i][2]
                pundit.firstname = data[i][3]
                pundit.lastname = data[i][4]
                pundit.level = data[i][5]
                if (data[i][6] != null) pundit.honour = data[i][6]
                pundit.save()
            } else {
                p = {
                    no: '',
                    id: '',
                    title: '',
                    firstname: '',
                    lastname: '',
                    level: '',
                    honour: '',
                    set: req.params.set_id
                }
                p.no = data[i][0]
                p.id = data[i][1]
                p.title = data[i][2]
                p.firstname = data[i][3]
                p.lastname = data[i][4]
                p.level = data[i][5]
                if (data[i][6] != null) p.honour = data[i][6]
                var newpundit = new Pundit(p)
                await newpundit.save()
            }
        }
        res.redirect('/pundit/getallpundit/' + req.params.set_id)
    },
    clearPunditBySet: async (req, res) => {
        await Pundit.deleteMany({set: req.params.set_id})
        res.redirect('/pundit/getallpundit/' + req.params.set_id)
    }
}