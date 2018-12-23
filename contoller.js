//mongoose
const mongoose = require('mongoose')
//my consts
const consts = require('./consts')
//my schema file for 'Users' collection in mLab
const Post = require('./post')
//?
const {MLAB_URL, DB_USER, DB_PASS} = consts
const url = MLAB_URL
const options = {
    newUserParser: true,
    newCreateIndex: true,
    useNewUrlParser: true,  
    user: DB_USER,
    pass: DB_PASS
}

module.exports = {
    getAllPosts(req, res, next){
        mongoose
        .connect(url, options)
        .then(async() => {
            const result = await Post.find({});

            if(result) res.json(result);
            else res.status(404).send('not found')
        })
    },
    getPost(req, res, next){
        //connect
        mongoose
        .connect(url, options)
        .then(async() => {
            //get the id
            const {id = null} = req.params
            //find it
            const result = await Post.findOne({id})
            //set result
            if(result) res.json(result);
            else res.status(404).send('not found')
        })
    },
    editPost(req, res, next){
        mongoose
        .connect(url, options)
        .then(async() => {
            const {id = null} = req.params
            const {title = null, body = null} = req.body
            
            const result = await Post.updateOne({id}, {body, title})

            if(result) res.json(result);
            else res.status(404).send('not found')
        })
        .catch(err => {
            console.log('some error occurred', err)
            res.status(500).send(err.message)
        })
    },
    addPost(req, res, next){
        mongoose
        .connect(url, options)
        .then(async() => {
            const{
                id = null,
                userId = null,
                title = null,
                body = null
            } = req.body
            
            const post = new Post({id, userId, title, body})
            const result = await post.save()

            if(result) res.json(result);
            else res.status(404).send('not found')
        })
    },
    removePost(req, res, next){
        mongoose
        .connect(url, options)
        .then(async() => {
            const {id = null} = req.body

            const result = await Post.deleteOne({id});

            if(result) res.json(result);
            else res.status(404).send('not found')
        })
    }
}