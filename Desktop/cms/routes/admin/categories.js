const express = require('express');
const router = express.Router();
const Category = require('../../models/Category');
const {Authentication} = require('../../helpers/UserAuthentication');

router.all('/*', Authentication, (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{
    Category.find({}).lean().then(categories=>{      
        res.render('admin/categories', {
            categories: categories
        });
    });
});

router.post('/', (req, res)=>{
    const newCategory = new Category({
        title: req.body.title
    });

    newCategory.save().then(savedCategory=>{
        req.flash('success', `${savedCategory.title} saved successfully`);
        res.redirect('/admin/categories');
    }).catch(error =>{
        console.log('Could not saved category', error);
    });
});

router.get('/edit/:id', (req, res)=>{
    Category.findOne({_id: req.params.id}).lean().then(categories=>{
        res.render('admin/categories/edit', {
            categories: categories
        });
    });
});

router.put('/edit/:id', (req, res)=>{
    Category.findOne({_id: req.params.id}).then(categories=>{
        categories.title = req.body.title;

        categories.save().then(updateCategory=>{
            req.flash('success', `${categories.title} updated successfully`);
            res.redirect('/admin/categories');
        });
    });
});

router.delete('/delete/:id', (req, res)=>{
    Category.findByIdAndRemove({_id: req.params.id}).then(results=>{
        req.flash('success', 'Category deleted successfully');
        res.redirect('/admin/categories');
    });
})

module.exports = router;