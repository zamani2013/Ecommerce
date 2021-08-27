const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const faker = require('faker');

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});



router.get('/', (req, res)=>{
    res.render('admin/index', {
        title: 'Blog Admin Page'
    });
});

router.post('/generate', (req, res)=>{
    for(let i = 0; i < req.body.amount; i ++){

        const posts = new Post();
        posts.title = faker.name.title();
        posts.status = 'public';
        posts.allowComments = faker.datatype.boolean();
        posts.body = faker.lorem.sentences();

        posts.save(function(err){
            if (err) throw err;
        });
    }
    res.redirect('/admin/posts');
});

module.exports = router;