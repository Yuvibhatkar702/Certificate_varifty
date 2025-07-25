const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://yuvi7767055408:HZaANM9sxi8rKgVR@cluster0.gqehu6m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const verifyRouter = require('./routes/verify');
const certificateRouter = require('./routes/certificates');

app.use('/verify', verifyRouter);
app.use('/certificates', certificateRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
