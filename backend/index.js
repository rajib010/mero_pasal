import app from "./app.js";
import { configDotenv } from 'dotenv';
import { dbConnection } from "./utility/index.js";

configDotenv();

const port = process.env.PORT

dbConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`App is running on ${port}`);
        })
    })
    .catch((e)=>{
        console.log('Error',e)
        process.exit(1)
    })
