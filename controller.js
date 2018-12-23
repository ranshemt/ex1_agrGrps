//mongoose
const mongoose = require('mongoose')
//my consts
const consts = require('./consts')
//my schema file for 'Users' collection in mLab
const AgeGrp = require('./ageGrp')
//
const {MLAB_URL, DB_USER, DB_PASS} = consts
const url = MLAB_URL
const options = {
    useNewUrlParser: true,  
    user: DB_USER,
    pass: DB_PASS
}
//
//methods
module.exports = {
    //get
    getAllGroups(req, res, next){
        mongoose
        .connect(url, options)
        .then(async() => {
            const result = await AgeGrp.find({})
            
            if(result) res.json(result)
            else res.status(404).send('not found')
        })
    },
    //get/id
    findGame(req, res, next){
        mongoose
        .connect(url, options)
        .then(async() => {
            const {id = null} = req.params
            const ID = parseInt(id)
            //console.log('id: ' + id + 'ID: ' + ID)
            const result = await AgeGrp.find({'games.id': ID})

            if(result) res.json(result);
            else res.status(404).send('not found')
        })
    },
    //post/id
    setPlayersForGrp(req, res, next){
        mongoose
        .connect(url, options)
        .then(async() => {
            const {id = null} = req.params
            const {players = -1} = req.body

            const result = await AgeGrp.updateOne({id}, {players})
            if(result) res.json(result);
            else res.status(404).send('not found')

        })
        .catch(err => {
            console.error('error: ', err)
            res.status(500).send(err.message)
        })
    },
    //get/id&players
    grpsGamePlayers(req, res, next){
        mongoose
        .connect(url, options)
        .then(async() => {
            const {id = null} = req.params
            const ID = parseInt(id)
            //console.log('id: ' + id + 'ID: ' + ID)
            const {players = null} = req.params
            const PLAYERS = parseInt(players)
            //console.log('players: ' + players + 'PLAYERS: ' + PLAYERS)
            
            const result = await AgeGrp.find({'games.id': ID, players: {$gte: PLAYERS}})

            if(result) res.json(result);
            else res.status(404).send('not found')
        })
    }
}