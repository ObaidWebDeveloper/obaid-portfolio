const express = require('express');
const app = express();
const port = 3000;;
const path = require('path');
const routes = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/database', express.static(path.join(__dirname, 'database')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',routes);

// app.listen(port,() => {
//     console.log(`Example app listening on port ${port}`);
// });

module.exports = app;