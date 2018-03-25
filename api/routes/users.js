const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(doc => {
        if (doc.length >= 1) {
            return res.status(409).json({
                message: 'Email already exists'
            })
        } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({
                error: error
            })
        } else {
            const  user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(result => {
                console.log(result)
                res.status(201).json({
                    message: 'User Created'
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error: error
                })
            })
        }
        })
        }
    });
});

router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
        message: 'User Deleted'
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
})

router.get('/', (req, res, next) => {

})

module.exports = router