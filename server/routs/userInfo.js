const express = require('express');
const UsersInfo = require('../models/userInfoSchema');
const nodeMailer = require('nodemailer');

const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const users = await UsersInfo.find();
        res.json(users)
        // res.send(`
        // <p>${users}</p>
        // `)

    } catch (error) {
        console.log(error)
    }
});

router.get('/:userID', async (req, res) => {
    try{
    const posts = await UsersInfo.findById(req.params.userID);

    res.send(`
    <h1>
    Name: ${posts.name}<br>
    Course: ${posts.course}<br>
    ID: ${posts._id}
    </h1>
    `)
    }catch(err){
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    console.log('New User', req.body);
    const userInfo = new UsersInfo({
        name: req.body.name,
        phoneno: req.body.phoneno,
        email: req.body.email,
        hobbies: req.body.hobbies
    });

    try{
        const savedPost = await userInfo.save();
        console.log('Added to database..')
        res.json(savedPost)
    }catch (err) {
        console.log(err)
    }

})



router.delete('/:userID', async (req, res) => {
    try{
        const removedPost = await UsersInfo.remove({_id: req.params.userID});
        console.log(req.params.userID)
        res.status(200).send("Info Deleted Successfully")
        }catch(err){
            console.log(err)
            res.json({message: err})
        }
})
router.patch('/:id', async (req, res) => {
    try{
        console.log(req.params.id)
        const updatedPost = await UsersInfo.updateOne(
            {_id: req.params.id}, 
            { $set: { 
                name: req.body.name,
                phoneno: req.body.phoneno,
                email: req.body.email,
                hobbies: req.body.hobbies,
            } });

            console.log(req.body)
            console.log("updated", updatedPost)
    
        res.send(`
        <h1>
            ${updatedPost}
        </h1>
        `)
        }catch(err){
            res.json({message: err})
        }
})


router.post('/sendMail', async(req,res) =>{
    console.log(req.body)
    let ids = req.body;
    const posts = await UsersInfo.find({_id: ids});
    console.log(posts)
    
    let mailTransporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.email,
            pass: process.env.pass
        }
    })

    let details = {
        from: process.env.EMAIL,
        to: process.env.mailTo,
        subject: "Table Data",
        text: "Test Node",
        html: `<i>${posts}</i>`
    }

    mailTransporter.sendMail(details, err => {
        if(err){
            console.log("mail error", err)
            res.status(500).send('Mail Not Sent');
        }else{
            console.log('Mail sent')
            res.status(200).send('Mail Sent');
        }
    })
})


module.exports = router;