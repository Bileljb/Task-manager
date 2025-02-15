import express from 'express'
import { deleteEmployee, getEmployee, getEmployees, setTask, updatedEmployee } from '../controllers/adminController.js'
const adminRoutes = express.Router()

adminRoutes.get('/employees', getEmployees)
adminRoutes.post('/setTask', setTask)
adminRoutes.get('/employee/:id', getEmployee)
adminRoutes.put('/updatemp/:id', updatedEmployee)
adminRoutes.delete('/deletemp/:id', deleteEmployee)


export default adminRoutes