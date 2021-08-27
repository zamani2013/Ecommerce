const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const {isEmpty} = require('../../helpers/uploads');
const {Authentication} = require('../../helpers/UserAuthentication');

router.all('/*',Authentication, (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});



router.get('/', (req, res)=>{
    Post.find({}).lean().then(posts=>{
    res.render('admin/posts', {
        title: 'Blog Admin Posts',
        posts: posts
    });
    })
});

router.get('/create', (req, res)=>{
    res.render('admin/posts/create');
});

router.post('/create', (req, res)=>{

    let filename = '';

    if(!isEmpty(req.files)){
            
        let file = req.files.file;
        filename = Date.now() + "-" + file.name;
        file.mv('./public/uploads/' + filename, (err)=>{
            if(err) return err;
        });

    }

    let allowComments = true;
    if(req.body.allowComments){
        allowComments = true;
    }else{
        allowComments = false;
    }
    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body,
        file: filename
    });
    
    newPost.save().then(savedPost=>{
        req.flash('success', `${savedPost.title} saved successfully`)
        res.redirect('/admin/posts');
    }).catch(error=>{
        console.log('Could not saved Post', error);
    });
});

router.get('/edit/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).lean().then(posts=>{
        res.render('admin/posts/edit', {
            posts: posts
        });
    })
});

router.put('/edit/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).then(posts=>{
        let allowComments = true;
        if(req.body.allowComments){
            allowComments = true;
        }else{
            allowComments = false;
        }

        posts.title = req.body.title;
        posts.status = req.body.status;
        posts.allowComments = allowComments;
        posts.body = req.body.body;

        posts.save().then(updatePosts=>{
            req.flash('success', `${posts.title} updated successfully`);
            res.redirect('/admin/posts');
        }).catch(error =>{
            console.log('Could not update post', error);
        });
    });
});

router.delete('/delete/:id', (req, res)=>{
    Post.findByIdAndRemove({_id: req.params.id}).then(results=>{
        req.flash('success', `Post deleted successfully`);
        res.redirect('/admin/posts');
    });
});

module.exports = router;