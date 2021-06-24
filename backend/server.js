const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const upload = multer({dest: 'upload/'});

app.use(cors());
app.use(express.json());
app.use(upload.array('files'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const authenticationRouter = require('./routes/authentication');
const recipesRouter = require('./routes/recipes');

app.use('/api', authenticationRouter);
app.use('/api/recipes', recipesRouter);

app.listen(port);