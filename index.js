"use strict"
require('custom-env').env('api');
//Express setup
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//mongooes setup 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
mongoose.set('debug', process.env.NODE_ENV === 'development');



const { Response } = require('./lib/http-response');
if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    const swaggerDocument = YAML.load('./docs/swagger.yaml');
    const path = require('path');

    app.use(
        '/api/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            customfavIcon: '/favicon-32x32.png',
            customSiteTitle: process.env.SITE_TITLE,
            authorizeBtn: false,
            swaggerOptions: {
                filter: true,
                displayRequestDuration: true,
            },
        })
    );
}

app.use((req, res, next) => {

    for (const method in Response) {
        if (Response.hasOwnProperty(method)) res[method] = Response[method];
    }
    next();
});
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use('/api', require('./routes'));

app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    if (res.headersSent) {
        return next(err);
    }

    if (err.message === 'EntityNotFound') {
        return res.notFound('', 'NOT_FOUND');
    }

    return res.status(err.status || 500).send({
        success: false,
        data: [],
        message: __('GENERAL_ERROR'),
    });
});

app.use(function (req, res) {
    return res.status(404).send({
        success: false,
        data: [],
        message: 'NOT_FOUND_ERR',
    });
});

const port = process.env.PORT || 3000;
const http = require('http');

// clustring and server listening 
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
 console.log(`Master ${process.pid} is running`);
  
 // Fork workers.
 for (let i = 0; i < numCPUs; i++) {
  cluster.fork();
 }
  
 cluster.on('exit', (worker, code, signal) => {
  console.log(`worker ${worker.process.pid} died`);
 });
  
} else {
  
 // Workers can share any TCP connection
 // In this case it is an HTTP server
 let server;
server = http.createServer(app);
server.listen(port, async function () {
    // eslint-disable-next-line no-console
    console.info(`Server Started on port ${port}`);
});
}