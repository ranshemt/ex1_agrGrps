//mongoose
const mongoose = require('mongoose')
//creating schema for the collection 'ageGrp' in mLab
const schema = {
    id: {type: Number, required: true},
    name: {type: String, required: true},//kids, junior, adults...
    minAge: {type: Number, required: true},
    maxAge: {type: Number, required: true},
    comment: String,
    //embbeded document
    games: [{
        id: Number,
        name: String,
        type: String //couples, single, groups
    }]
}

const ageGrp_schema = new mongoose.Schema(schema)
const AgeGrp = mongoose.model('AgeGrp', ageGrp_schema)

module.exports = AgeGrp