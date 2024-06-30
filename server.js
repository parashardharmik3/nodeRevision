import express from 'express';
import bodyParser from 'body-parser';
import { connectDb } from './db.js';
import { routes } from './routes.js';
import {passport} from './auth.js';
import local from 'passport-local';
import { Person } from './person.js';

const LocalStrategy = local.Strategy; 
const app = express();
app.use(bodyParser.json());

// Middleware function to log requests
const logreq = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
    next();
};
app.use(logreq);

passport.use(new LocalStrategy(async (username, password, done) => {
    console.log('Authenticating:', username, password); // Log the username and password
    try {
        const user = await Person.findOne({ username });
        if (!user) {
            console.log('User not found');
            return done(null, false, { message: "Incorrect username" });
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            console.log('Password match');
            return done(null, user);
        } else {
            console.log('Incorrect password');
            return done(null, false, { message: "Incorrect password" });
        }
    } catch (error) {
        console.log('Error during authentication');
        return done(error);
    }
}));

app.use(passport.initialize());
const localAuth = passport.authenticate('local', { session: false })
connectDb().then(() => {
    console.log('Connected to MongoDB');
    
    // Define routes
    app.get('/',localAuth,async (req, res) => {
        try {
            const data = await Person.find();
            res.json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    });

    app.use('/person', routes);

    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
}).catch(error => {
    console.error('Failed to connect to the database', error);
});
