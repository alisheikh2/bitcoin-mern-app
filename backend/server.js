require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bitcoinRoutes = require('./routes/bitcoinRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('🎯 MongoDB Atlas Cloud se Connection Kamyab Ho Gaya!'))
.catch((err) => console.error('❌ Database connection mein error aaya:', err));

// Routes Middleware Register karna
app.use('/api/bitcoin', bitcoinRoutes);

app.get('/', (req, res) => {
    res.send('🚀 Bitcoin Full-Stack Backend Server Bilkul Sahi Chal Raha Hai!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`⚡ Server port number ${PORT} par active hai.`);
});