const express =  require('express')
const dotenv = require('dotenv')
const cors =  require('cors')
const connectDatabase = require('./config/database.js')
const todoRoutes = require('./routes/todoRoutes.js')
const logger = require('./middleware/logger.js')

// load env file 
dotenv.config()

// create express app
const app = express()

connectDatabase()

app.use(cors())
app.use(express.json())
app.use(logger)

// Routes
app.use('/api',todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    
})