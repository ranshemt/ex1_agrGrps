//mongoose
const mongoose = require('mongoose')
//creating schema for the collection 'ageGrp' in mLab
const schema = {
    id: {type: Number, required: true},
    name: {type: String, required: true},//kids, junior, adults...
    comment: String,
    players: Number,
    //embbeded document
    games: [{
        id: Number,
        name: String,
        type: String //couples, single, groups
    }]
}

const ageGrp_schema = new mongoose.Schema(schema)
const AgeGrp = mongoose.model('Agegroup', ageGrp_schema)

module.exports = AgeGrp