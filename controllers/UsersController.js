const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userAuth = require('../middleware/userAuth');
const User = require('../models/User');


router.post('/user/login', (req, res)=>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email: email}}).then(user=>{
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password);
            var id = user.id;

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
                res.redirect(`/profile/${id}`);
            }else{
                res.redirect('/');
            }
        }else{
            res.redirect('/');
        }
    });
});

router.get('/profile/:id', userAuth,(req, res)=>{
        var id = req.params.id;
    User.findByPk(id).then(user =>{
        res.render('users/intologin', {user: user});
    });
       
});

router.get('/logout', (req, res)=>{
    req.session.user = undefined;
    res.redirect('/');
})

router.get('/user/create', (req, res)=>{
    res.render('users/create');
});

router.post('/user/new', (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({where: {email: email}}).then(user=>{
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email: email,
                password: hash,
                name: name
            }).then(()=>{
                res.redirect('/');
            }).catch((err)=>{
                res.redirect('/user/create');
            });

        }else{
           res.redirect('/user/create');
        }
    });
});



module.exports = router;