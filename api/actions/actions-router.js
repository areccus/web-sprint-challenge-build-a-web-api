// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')

const {
    validateActId,
    validateAct,
} = require('./actions-middlware')

const router = express.Router()

router.get('/', async(req, res, next) => {
    try {
        const actions = await Action.get()
        res.json(actions)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validateActId, (req, res, next) => {
    try {
        res.json(req.act)
    } catch(err) {
        next(err)
    }
})

router.post('/', validateAct, async(req, res, next) => {
    try {
        const {id} = req.params
        const newAct = await Action.insert({
        description: req.desc, notes: req.note, completed: req.done, project_id: req.pid
        })
        res.json(newAct)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validateActId, validateAct, async(req, res, next) => {
    const {id} = req.params
    try {
        const updateAct = await Action.update(id, {description: req.desc, notes: req.note, completed: req.done, project_id: req.pid})
        const act = await Action.get(updateAct.id)
        res.json(act)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', validateActId, async(req, res, next) => {
    try {
        const {id} = req.params
        await Action.remove(id)
        res.json(req.act)
    } catch(err) {
        next(err)
    }
})
module.exports = router