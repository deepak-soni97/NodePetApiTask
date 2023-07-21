const express = require('express');
const router = express.Router();
const User = require('../module/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


router.post('/user/createWithArray', async (req, res) => {

    const users = req.body;

    try {
        const user = await Promise.all(
            users.map(async (user) =>{
                const hasedPassword = await bcrypt.hash(user.password, 10);

                return{ ...user, password: hasedPassword };
            })
        )
        const createUsers = await User.insertMany(user);

        res.status(200).json({

            "code": 200,
            "type": "success",
            "message": "ok"

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' })
    }
})

router.post('/user/createWithList', async (req, res) => {

    const users = req.body;

    try {
       const user = await Promise.all(
        users.map(async (user) => {
            const hasedPassword = await(user.password,10);

            return{...user,password:hasedPassword}
        })
       )
        const createUsers = await User.insertMany(users)
        res.status(200).json({

            "code": 200,
            "type": "success",
            "message": "ok"

        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' })
    }
})

//create user api
router.post('/user', async (req, res) => {
    const users = req.body; 

    try {
    for(const users of users){
    const excitingUser =await User.findOne( { username: users.username})

    if(excitingUser){
        return res.status(409).json({error: `Usernaem : '${users.username} already exists.`});
    }
    const hasedPassword = await bcrypt.hash(users.password,10);
    const createUsers = new User(users)
    await newUser.save();

}
        res.status(200).json({

            "code": 200,
            "type": "success",
            "message": "ok"

        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create user' })
    }
})

//get userd data
router.get('/user/:username', async (req, res) => {
    const { username } = req.params;
    try {

        const user = await User.findOne({username:username});
        if (!user) {
            return res.status(404).json({
                code: 404,
                type: 'error',
                message: 'User not found'
            })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

//update user api
router.put('/user/:username', async (req, res) => {
    const username = req.params.username;
    console.log(username);
    const updatedUser = req.body;

    try {

        const user = await User.findOneAndUpdate({username:username}, updatedUser, { new: true });
console.log(user);
        if (!user) {
            return res.json({
                code: 404,
                type: 'error',
                message: 'Pet not found'
            });
        }

        res.status(200).json({
            code:200,
            status:"success",
            message:"user update successfully."
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

//delete user aPi
router.delete('/user/:username', async (req, res) => {
    const { username } = req.params;
    try {
console.log(username);
        const user = await User.findOneAndDelete({ username:username });
console.log(user);
        if (!user) {
            return res.json({
                code: 404,
                type: 'error',
                message: ' user not found'
            })
        }
        res.status(200).json({
            code:200,
            type:"success",
            message:"User deleted succefully"
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

//user login Api
router.post('/user/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)
    try {
        
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(401).Json({ error: 'Invaliad credentials.' });
            }

            const isPasswordVaild = await bcrypt.compare(password, user.password);

            if (!isPasswordVaild) {
                return res.status(401).json({ error: 'Invalid credentials' })
            }
            const token = jwt.sign({ username: user.username },process.env.SECERTY_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        
        } catch (error) {
        res.status(500).json({ error: 'Error authenticating user.' });
    }
});

//user logout api
router.post('/user/logout', async(req,res)=>{
   const token = req.headers.authorization;
   if(token){
    authenticatedUser.delete(token);
   }
   res.status(200).json({ message: 'Logged out successfully. '});
})


const authenticatedUser = new Set(); 
module.exports = router;