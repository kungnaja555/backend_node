const Timestamp = require('../model/time')

module.exports = {
    setTimeGroup: async (req, res) => {
        await Timestamp.updateMany(
            { time: { $gte: req.body.start, $lte: req.body.end }, set: null },
            { rehearsal: req.body.re_id, set: req.body.set_id }
        )
        res.redirect('/time/getalltimes')
    },
    getAllTimes: async (req, res) => {
        // var start = new Date()
        // start.setHours(0, 0, 0, 0)

        // var end = new Date()
        // end.setDate(start.getDate() + 1);
        // end.setHours(0, 0, 0, 0)

        var times = await Timestamp.find({ set: null }).sort({ time: 1 })
        res.json(times)
    },
    setOneTimeGroup: async (req, res) => {
        var time = await Timestamp.findById(req.params.id)
        time.rehearsal = req.body.re_id
        time.set = req.body.set_id
        time.save()
        res.redirect('/time/getalltimes')
    },
    deleteTime: async (req, res) => {
        var time = await Timestamp.findById(req.params.id)
        time.remove()
        res.redirect('/time/getalltimes')
    },
    searchTime: async (req, res) => {
        var times = await Timestamp.find({ time: { $gte: req.params.start, $lte: req.params.end }, set: null }).sort({ time: 1 })
        res.json(times)
    },
    moveTimeOut: async (req, res) => {
        var time = await Timestamp.findById(req.params.time_id)
        time.rehearsal = null
        time.set = null
        time.save()
        res.redirect(`/time/gettimeforreport/${req.params.re_id}/${req.params.set_id}`)
    },
    getTimeForReport: async (req, res) => {
        var re_id = req.params.re_id
        var set = req.params.set_id
        var times = await Timestamp.find({ rehearsal: re_id, set: set }).sort({ time: 1 })
        res.json(times)
    },
    getTimeForAvg: async (req, res) => {
        var start = new Date()
        start.setHours(0, 0, 0, 0)

        var end = new Date()
        end.setDate(start.getDate() + 1);
        end.setHours(0, 0, 0, 0)
        var times = await Timestamp.find({ time: { $gte: start, $lte: end } }).sort({ time: 1 })
        var length = times.length
        var sum = 0
        if (length > 2) {
            for (var i = length - 1; i >= 1; i--) {
                var x = times[i].time
                var y = times[i - 1].time
                var temp = new Date(x) - new Date(y)
                sum = (sum + temp) / 1000
                if (sum >= 60) {
                    res.json({ amount: sum })
                    break
                }
            }
            res.json({ amount: 0 })
        }

    }
}