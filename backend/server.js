const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const upload = multer({dest: 'upload/'});

const dir = path.join(__dirname, 'public');

app.use(cors());
app.use(express.json());
app.use(upload.array('files'));
app.use(express.static('public'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const authenticationRouter = require('./routes/authentication');
const recipesRouter = require('./routes/recipes');
const starsRouter = require('./routes/stars');

app.use('/api', authenticationRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/stars', starsRouter);

app.listen(port);