const express = require('express');
const bodyParser = require('body-parser');
const appRouter = require('../../../routes');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('./public'));

appRouter.configure(app);

app.get("/", (request, response) => {
    response.render("index.html");
})

module.exports = app