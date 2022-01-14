// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const Action = require('../actions/actions-model')
const {
    validatePrjId,
    validatePrj,
    validateAction,
} = require('../projects/projects-middleware')

const router = express.Router()

router.get('/', async(req, res, next) => {
    try {
        const projects = await Project.get()
        res.json(projects)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validatePrjId, (req, res, next) => {
    try {
        res.json(req.prj)
    } catch(err) {
        next(err)
    }
})

router.post('/', validatePrj, async(req, res, next) => {
    try {
    const newPrj = await Project.insert({name: req.name, description: req.desc, completed: req.done})
    res.json(newPrj)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validatePrjId, validatePrj, async(req, res, next) => {
    const {id} = req.params
    try {
        const updatePrj = await Project.update(id, {name: req.name, description: req.desc, completed: req.done})
        const prj = await Project.get(updatePrj.id)
        res.json(prj)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', validatePrjId, async(req, res, next) => {
    try {
        const {id} = req.params
        await Project.remove(id)
        res.json(req.prj)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', validatePrjId, async(req, res, next) => {
    try {
        const {id} = req.params 
        const action = await Project.getProjectActions(id)
        const actions = Array.from(action)
        res.json(actions)
    } catch(err) {
        next(err)
    }
})


router.use((err, req, res, next) => {
    res.status(err.status ||500).json({
        message: err.message
    })
})

module.exports = router