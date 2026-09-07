import { ApiError } from '../helper/apiError.js'
import { selectAllTasks } from '../models/Task.js'
import { insertTask } from '../models/Task.js'
import { deleteTask } from '../models/Task.js'

const getTasks = async(req, res, next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(result.rows || [])
    } catch(error) {
        return next(error)
    }
}

const createTask = async (req, res, next) => {
    const { task } = req.body
    console.log("Task to create:", task)
    try {
        if (!task || !task.description || task.description.trim().length === 0) {
            return next(new ApiError('Task description is required', 400))
        }
        const result = await insertTask(task.description)
        return res.status(201).json(result.rows[0])
    } catch (error) {
        return next(error)
    }
   /*try {
        const description = req.body.task?.description?.trim()
        if (!description) {
            return next(new ApiError('Task description is required', 400))
            const error = new Error('Task description is required')
            error.status = 400
            return next(error)
    }
    const result = await insertTask(description)
    return res.status(201).json(result.rows[0])
    } catch (error) {
        return next(error)
    }*/
}

const removeTask = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await deleteTask(id)
        if (result.rowCount === 0) {
            return next(new ApiError('Task not found', 404))
        }
        return res.status(200).json({ id: id})
    } catch (error) {
        return next(error)
    }
}

export {getTasks, createTask, removeTask}