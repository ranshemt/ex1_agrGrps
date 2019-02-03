const express = require('express')
const ctrl = require('./controller')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
    (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/json");
    next();
});
   

app.get('/ageGroups', ctrl.getAllGroups)
app.get('/findGame/:id', ctrl.findGame)
app.post('/setPlayers/:id', ctrl.setPlayersForGrp)
app.get('/findByGameAndPlayers/:id&:players', ctrl.grpsGamePlayers)
//
app.listen(port,
    () => console.log('Express server ready for requests on port: '), port
)