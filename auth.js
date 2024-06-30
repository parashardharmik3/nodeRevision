import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Person } from './person.js';

passport.use(new LocalStrategy(async (username, password, done) => {
    console.log('Authenticating:', username, password); // Log the username and password
    try {
        const user = await Person.findOne({ username });
        if (!user) {
            console.log('User not found');
            return done(null, false, { message: "Incorrect username" });
        }
        const isPasswordMatch = user.password === password;
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

export { passport };
