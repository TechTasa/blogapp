const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const authRoutes = require('./routes/authRoutes');
const postRoutes=require('./routes/postRoutes')
const { connect} = require('./config/db');
const bodyParser = require('body-parser');
const path = require("path");

require('dotenv').config();

const app = express();


app.set('view engine', 'ejs');

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static('uploads'));
// Connect Database
connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
  });

  app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    store: store
  }));
  
  app.use('/auth', authRoutes);
  app.use('/posts', postRoutes);

  

  app.get('/', (req, res) => {
   res.redirect("/posts")
  });
  

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
