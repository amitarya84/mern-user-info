const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({path: __dirname+'/../.env'});
connectDB();
const app = express();

app.use(cors({
    origin: "*"
}))

app.use(express.json());

app.use(express.static('../client/build'));


const userInfoRout = require('./routs/userInfo');

app.use('/api/userInfo', userInfoRout);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log('Server Runnig on port', PORT)
})

