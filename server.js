const express = require('express');
const connectDB = require('./config/db')

const app = express();

// connect Database
connectDB()

// middleware body parser
app.use(express.json({extended:false}))

// Define Routes
app.use('/api/users',require('./routes/api/user'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/post'));
app.use('/api/profile',require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running at PORT ${PORT}`)
})