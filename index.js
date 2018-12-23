const express = require('express')
const ctrl = require('./controller')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/ageGroups', ctrl.getAllGroups)
app.get('/findGame/:id', ctrl.findGame)
app.post('/setPlayers/:id', ctrl.setPlayersForGrp)
app.get('/findByGameAndPlayers/:id&:players', ctrl.grpsGamePlayers)
//
app.listen(port,
    () => console.log('Express server ready for requests on port: '), port
)