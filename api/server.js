const express = require('express');
const server = express();
const {logger} = require('./projects/projects-middleware')
const prjRouter = require('./projects/projects-router')
const actRouter = require('./actions/actions-router')
// Configure your server here
server.use(express.json())
server.use('/api/projects', prjRouter)
server.use('/api/actions', actRouter)
// Build your actions router in /api/actions/actions-router.js



// Build your projects router in /api/projects/projects-router.js



// Do NOT `server.listen()` inside this file!

module.exports = server;
