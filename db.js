import mongoose from 'mongoose';

const mongoURL = 'mongodb://localhost:27017/family';


async function connectDb() {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

const mongooseDb = mongoose.connection;

mongooseDb.on('connected', () => {
    console.log('MongoDB connection established');
});

export { connectDb };
