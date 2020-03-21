const express = require('express');
const app = express();

app.get('/', (req, res) => { // req = request sent from object m
    res.send({ hi: 'there' });
});

const PORT = process.env.PORT || 5000; // if environment variable has not been provided by Heroku, then assign to 5000
app.listen(PORT);