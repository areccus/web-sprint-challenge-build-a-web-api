// add middlewares here related to projects
const Project = require('../projects/projects-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const method = req.method
  const url = req.originalUrl
  const timestamp = new Date().toLocaleString()
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

async function validatePrjId(req, res, next) {
    try {
        const {id} = req.params
        const projects = await Project.get(id)
        if(!projects) {
            res.status(404).json({
                message: 'Project not found'
            })
        } else {
            req.prj = projects
            next()
        }
    } catch(err) {
        next(err)
    }
}

function validatePrj(req, res, next) {
    try {
        const {name, description, completed} = req.body
        if(!name || !description || completed !== true && completed !== false ) {
            res.status(400).json({
            message: 'Please type a name, description, and completed status.'
            })
        } else {
            req.name = name
            req.desc = description
            req.done = completed
            next()
        }
    } catch(err) {
        next(err)
    }
}

function validateAction(req, res, next) {
    try {
    const {completed, description, notes} = req.body
    req.desc = description
    req.done = completed
    req.note = notes
    next()
    } catch(err) {
        next(err)
}
}

module.exports = {
    logger,
    validatePrjId,
    validatePrj,
    validateAction,
}