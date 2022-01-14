// add middlewares here related to actions
const Actions = require('../actions/actions-model')

async function validateActId(req, res, next) {
    try {
        const {id} = req.params
        const action = await Actions.get(id)
        if(!action) {
            res.status(404).json({
                message: 'Action not found'
            })
        } else {
            req.act = action
            next()
        }
    } catch(err) {
        next(err)
    }
}

function validateAct(req, res, next) {
    try {
    const {completed, description, notes, project_id} = req.body
    if (completed !== true && completed !== false || !description || !notes || !project_id) {
        res.status(400).json({
            message: 'missing description, notes, completed status, or project_id'
        })
    } else {
    req.desc = description
    req.done = completed
    req.note = notes
    req.pid = project_id
    next()
    }
    } catch(err) {
        next(err)
}
}

module.exports = {
    validateActId,
    validateAct
}