/*
const flatten = require('array-flatten');

var myArr = [
    ["Hello", "world"],
    ["Good bye", "New Paltz"]
];

var arr2 = flatten(myArr);

console.log(myArr);
console.log(arr2);
*/

/*const http = require('http');

//create a server object:
const server = http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
});

server.listen(8080); //the server object listens on port 8080

console.log("Listening on http://localhost:8080");
*/
//express helps with routing. 

//imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');//the library body-parser

const simple = require('./simpleController');
const game = require('./game/controller');

var app = express();

const servername = "localhost";
const port = 8080;


// respond with "hello world" when a GET request is made to the homepage
//doesn't handle everything. only handles ones with exact path with"/""
//These routers are just functions.
app//middleware - thing will work if there is "game" in the url
    .use(bodyParser.json())//just an initializer -> it returns the function that actually does the parsing
    .use(bodyParser.urlencoded({ extended: false}))//just an initialization/ extended - optional default
    .use('/', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");//allow any server and any headers 
        next();//pass on the control to the next function that wants to access the stuff
        //loaded synchronously but running asynchronously. middleware. 
    })//'/' we are going to give to everything.
    .use('/', express.static(path.join(__dirname, "../dist/")))//if file not found, go to the next
    .use('/simple', simple)
    .use('/game', game)
    .use('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, "../dist/index.html"));
    })
    .listen(port);

console.log("running on http://" + servername + ":" + port)

//sending message back and forth
/*
app
    .use(function(req, res, next){
        res.write('This is provided by newpaltz.edu\r\n')
        next();
    })
    .get('/hello', function (req, res) {
        res.send('World');//can't call send twice because it closes server.
        res.end();
    })
    .get('/goodbye', function (req, res) {//.push .patch ...
        res.write('New Paltz');//res.send()
        res.end();
    }).listen(8080);
*/