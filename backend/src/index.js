const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, (err) => {
    if(err) console.log('error');

    else console.log('server is running on port ' + 3333);
});