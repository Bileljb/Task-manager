import express from 'express'
import { createTask, deleteTask, getAllTasks, getTask, searchTask, updateTask } from '../controllers/taskControllers.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const taskRoutes = express.Router()

taskRoutes.post('/create-new-task',  createTask)
taskRoutes.get('/', getAllTasks)
taskRoutes.get('/search', searchTask)
taskRoutes.get('/:id', getTask)
taskRoutes.delete('/delete/:id', deleteTask)
taskRoutes.put('/update/:id', updateTask)


export default taskRoutes