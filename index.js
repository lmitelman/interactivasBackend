// Required imports
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

// Express
const app = express();
console.log(swaggerUi.serve);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS & Environment
app.use(cors());

// Request's Body parsing
app.use(express.json());

// Database
dbConnection();

// Default GET method
app.get('/', function (req, res) {
    res.json({
        ok: true,
        msg: 'Welcome to Aplicaciones Interactivas Backend',
    });
});

// Paths
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/forms', require('./routes/forms.routes'));

// Listening port
app.listen(process.env.PORT, () => {
    console.log('Example app listening on port ' + process.env.PORT);
});