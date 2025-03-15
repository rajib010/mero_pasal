import mongoose from 'mongoose'

export const dbConnection = async function () {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}`)
        if(!response){
            console.log("failed db connection");
            return false;
        }
        console.log('Connected to db successfully');
    } catch (error) {
        console.log('failed to connect to the db', error);
    }
}