import app from "./app.js";
import { dbConnection } from "./utility/dbConnection.js";

const port = process.env.PORT || 5000

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
