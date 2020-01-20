const express = require('express');
const dotEnv = require('dotenv');

const App = express();
dotEnv.config({path: './config/config.env'});


const PORT = process.env.PORT || 5000;

App.listen(PORT, 
    () => {console.log(`Server running in ${process.env.MODE} Mode on port ${PORT}`)}
)