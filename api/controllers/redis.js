const redis = require('redis');
const client = redis.createClient();

module.exports = {
    setState: (req, res) => {
        client.set('state', req.body.state)
        client.set('x', Math.floor(req.body.x))
        client.set('y', Math.floor(req.body.y))
        client.set('w', Math.floor(req.body.w))
        client.set('h', Math.floor(req.body.h))
        res.redirect('/redis/getstate')
    },
    getState: async (req, res) => {
        client.get('state', (err, result) => {
            res.json(result)
        })
    },
    getCount: async (req, res) => {
        client.get('count', (err, result) => {
            res.json(result)
        })
    },
    getAvg: async (req, res) => {
        client.get('avg', (err, result) => {
            res.json(result)
        })
    }
}