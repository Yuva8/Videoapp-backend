const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const signUprouter = require('./routes/signUp.js');
const signInrouter = require('./routes/signIn.js');
const upload = require('./routes/upload.js');
const videoList = require('./routes/videoList.js');

const morgan = require('morgan');
const mongoose = require('mongoose');

dotenv.config();


const app = express();

app.use(express.json());

const checkAuth = require('./middleware/check-auth');

const connect = () => {
    mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log('connected to database');
}).catch((err) => {
   console.log(err);
})

}

app.use(morgan('dev'));

app.use(cors());

app.use('/api/videos',express.static('./media/uploads'));

app.use('/api/signUp',signUprouter);
app.use('/api/signIn',signInrouter);
app.use('/api/upload',checkAuth,upload);
app.use('/api/videolist',checkAuth,videoList);

app.get("/", function (req, res) {
    res.send("server is running!!!");
  });


app.listen(process.env.PORT  || 3015);

console.log('server is running on port ' + process.env.PORT);

connect();