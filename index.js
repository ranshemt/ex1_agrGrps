const express = require('express')
const morgan = require('morgan')
const ctrl = require('./controller')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/ageGrp', ctrl.getAllGroups)
app.put('/remove/:id', ctrl.removeGame)
app.get('/remove/:', ctrl.removePost)

app.listen(port,
    () => console.log('Express server ready for requests on port: '), port
)