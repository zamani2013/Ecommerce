const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const exphbrs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodeOverride = require('method-override');
const upload = require('express-fileupload');
const passport = require('passport');
const {databaseURI} = require('./config/database');

mongoose.Promise = global.Promise;

mongoose.connect(databaseURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((db)=>{
    console.log('Mongo Connected');
}).catch(error =>{
    console.log('Could not connect', error);
});

const {select, generateDate} = require('./helpers/handlebars');

app.engine('handlebars', exphbrs({defaultLayout: 'home', helpers: ({select: select, generateDate, generateDate})}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(methodeOverride('_method'));

app.use(upload());

app.use(session({
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/home/index'));
app.use('/admin', require('./routes/admin/index'));
app.use('/admin/posts', require('./routes/admin/posts'));
app.use('/admin/categories', require('./routes/admin/categories'));





app.listen(port, ()=>{
    console.log(`Listenning to port ${port}`);
});