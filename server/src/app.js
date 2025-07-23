const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const postRoutes = require('./routes/post.routes');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI, () =>
  console.log('MongoDB Connected')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
