const express=require('express');
const router=express.Router();
const {ensureAuth,ensureGuest}=require('../middleware/auth');
const Story = require('../models/Story')

//@desc show stories
//@route GET/stories/add

router.get('/add',ensureAuth,(req,res)=>{
    res.render('stories/add')
});

//@desc post stories
//@route POSt/stories

router.post('/',ensureAuth,async (req,res)=>{
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
      } catch (err) {
        console.error(err)
        res.render('error/500')
      }
});

module.exports=router;
