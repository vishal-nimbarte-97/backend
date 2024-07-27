const express = require('express');
const cors = require('cors');

const { sequelize, connection } = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, async () => {
    try {
        // Test database connection
        await connection();
        
        // Sync models with the database
        await sequelize.sync({force:true});
        console.log('Database synchronized successfully.');
        
        console.log(`Server is running on port http://localhost:${port}`);
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});
