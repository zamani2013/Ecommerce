const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const becryptjs = require('bcryptjs');
const User = require('../../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'home';
    next();
});


router.get('/', (req, res)=>{
    Post.find({}).lean().then(posts=>{
        Category.find({}).lean().then(categories=>{
            res.render('home/index', {
                title: 'Blog Home Page',
                posts: posts,
                categories: categories
            });
        });
    });
});
router.get('/posts/:id', (req, res)=>{
    Post.findOne({_id: req.params.id}).lean().then(posts=>{
        Category.find({}).lean().then(categories=>{
            res.render('home/posts', {
                title: 'Single post page',
                posts: posts,
                categories: categories
            });
        });
    });
});
router.get('/register', (req, res)=>{
    res.render('home/register', {
        title: 'Register Page'
    });
});

router.post('/register', (req, res)=>{
    const {firstName, lastName, email, password, passwordConfirm} = req.body;


    let errors = [];

    if(!firstName || !lastName || !email || !password || !passwordConfirm){
        errors.push({message: 'Please fill in all fields'});
    }

    if(password !== passwordConfirm){
        errors.push({message: 'Passwords do not match'});
    }

    if(password.length < 6){
        errors.push({message: 'Password should be at least 6 characters'});
    }

    if(errors.length > 0 ){
        res.render('home/register', {
            errors,
            firstName,
            lastName,
            email,
            password,
            passwordConfirm
        });
    }else{
        User.findOne({email : email}).then(user=>{
            if(user){
                req.flash('error', 'Email is already registered, Please login');
                res.redirect('/login')
            }else{
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password
                });

                becryptjs.genSalt(10, (err, salt)=>{
                    becryptjs.hash(newUser.password, salt, (err, hash)=>{
                        // if(err) throw err;
                        newUser.password = hash;

                        newUser.save().then(savedUser=>{
                            req.flash('success', 'Registered successfully, Please login');
                            res.redirect('/login');
                        }).catch(error=>{
                            console.log('Could not saved user', error);
                        });
                    })
                })
            }
        });
    }

});
router.get('/login', (req, res)=>{
    res.render('home/login', {
        title: 'Login Page'
    });
});

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
    User.findOne({email: email}).then(user=>{
        if(!user){
            return done(null, false, {message: 'User not found'});
        }else{

            becryptjs.compare(password, user.password, (err, match)=>{
                if(err) throw err;

                if(match){
                    return done(null, user, {message: `Welcome ${user.firstName}`});
                }else {
                    return done(null, false, {message: 'Incorrect Password'});
                }
            });
        };
    });
}));
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

router.post('/login', (req, res, next)=>{

        passport.authenticate('local', {
            successRedirect: '/admin',
            failureRedirect: '/login',
            failureFlash: true,
            successFlash: true
        })(req, res, next);
});

router.get('/logout', (req, res)=>{
    req.logOut();
    res.redirect('/login');
});

router.get('/about', (req, res)=>{
    res.render('home/about', {
        title: 'Login Page'
    });
});

module.exports = router;