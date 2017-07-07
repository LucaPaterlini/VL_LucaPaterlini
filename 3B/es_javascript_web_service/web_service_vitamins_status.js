const express = require('express');
const cors = require('cors');
const functions = require('./lib/functions');
let app = express();
app.use(cors());

//index: return a standard message to show that the service is active
function index(req, res) {res.send("Hi to everyone. I' am alive!! :)")}


/* response_moves: create a web service on  "EXECUTION_DOMAIN:PORT/vitamin/moves"
 getting as input the configuration of the vitamins eg: "3B 4B 5G 6W"
 and returning the list of moves to make the colors of the shapes white */

function response_moves(req, res) {
    res.send(JSON.stringify(functions.makeAllWhite(req.param("vitamins")),null,null))
}

/* response_status: create a web service on  "EXECUTION_DOMAIN:PORT/vitamin/status"
 getting as input the configuration of the vitamins eg: "3B 4B 5G 6W" and a list
 and returning the list of status changed during the transition
 to make the colors of the shapes white */

function response_status(req, res) {
    let vitamin_s = req.param("vitamins").trim();
    res.send(JSON.stringify(functions.makeAllWhiteStatus(vitamin_s,functions.makeAllWhite(vitamin_s)),null,null))
}
app.post("/",index);
app.get('/', index);
app.post('/vitamin/moves', response_moves);
app.get('/vitamin/moves', response_moves);
app.post('/vitamin/statuses', response_status);
app.get('/vitamin/statuses', response_status);

app.listen(5000);