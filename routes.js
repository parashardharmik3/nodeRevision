import express from 'express';
import { Person } from './person.js';
import passport from 'passport';
import { jwtAuthMiddleware, generateToken } from './jwt.js';

export const routes = express.Router();

// GET all persons with authentication
routes.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        res.json(data);
    } catch (error) {
        console.error("Error fetching persons:", error); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// POST a new person
routes.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        await newPerson.save();
        const token = generateToken({ username: newPerson.username });
        console.log("Generated token is", token);
        res.status(201).json({ newPerson: newPerson, token: token });
    } catch (error) {
        console.error("Error during signup:", error); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
//Login
routes.post('/signin',async(req,res)=> {
    try{
        const {username,password} = req.body;
        const user = await Person.findOne({username:username})
        if(!user || !(await user.comparePassword(password))){
           return res.status(401).json({error: "invalid username or password"})
        }else{
            const payload = {
                id : user.id,
                username: user.username
            }
            const token = generateToken(payload);
            return res.json({token})
        }
    }catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
})

// PUT update a person by name without authentication
routes.put('/:name', async (req, res) => {
    const personName = req.params.name;
    try {
        const response = await Person.findOneAndUpdate({ name: personName }, req.body, { new: true });
        res.json(response);
    } catch (error) {
        console.error("Error updating person:", error); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
