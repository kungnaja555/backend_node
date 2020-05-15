const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')

const app = express()

mongoose.connect('mongodb://localhost:27017/mydb');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/faculty', require('./api/router/faculty'))
app.use('/rehearsal', require('./api/router/rehearsal'))
app.use('/redis', require('./api/router/redis'))
app.use('/set', require('./api/router/set'))
app.use('/time', require('./api/router/time'))
app.use('/pundit', require('./api/router/pundit'))

app.listen(8000, () => {
    console.log('connect at port 8000');
})

