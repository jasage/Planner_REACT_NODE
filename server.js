const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const FILE = 'events.json';

const app = express();

var events = [];
fs.readFile(FILE, (err, data)=>{
    events = err ? [] : JSON.parse(data);
});

function writeToFile (data ,res){
    data.sort((a,b)=>a.start-b.start)
    fs.writeFile(FILE,JSON.stringify(data,null,2), err=>{
        if(err){
            res.send(err)
        }else{
            res.send('OK')
        }
    })
}

app.use(bodyParser.json());

app.get('/api/events', (req, res) => {
    res.send(events);
});
app.get('/api/events/:id', function (req, res) {
    const id = req.params.id;
    const event = events[id];

    if (event !== undefined) {
        res.send(event);
    } else {
        res.sendStatus(400);
    }
});

app.post('/api/events', (req, res) => {
    const data = req.body;
    if(data.length !== undefined){
        events = data;
    }else{
        events.push(data);
    }
    writeToFile(events, res);
});

app.put('/api/events/:id', (req, res) => {
    const id = req.params.id;
    events[id] = req.body;
    writeToFile(events,res);
});

app.delete('/api/events/:id', function (req, res) {
    const id = req.params.id;
    events.splice(id, 1);
    writeToFile(events, res);
});

app.use(express.static('client'));
app.listen(3001, () => {
    console.log('Example app listening on port 3001!')
});

