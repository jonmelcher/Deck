const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


module.exports = {
    create() {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use((req, res, next) => {
            res.setHeader('Content-Type', 'application/json');
            next();
        });
        return app;
    }
};
