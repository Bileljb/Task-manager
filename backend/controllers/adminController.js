import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

export const getEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'user' })
        if (!employees) {
            return res.status(404).json({
                success: false,
                message: "There is no Employees"
            })
        }
        res.status(200).json({ success: true, message: "Employees loaded successfully!", employees })
    } catch (error) {
        console.log("Something went wrong, Employees did not loaded")
        res.status(400).json({ success: false, message: error.message })
    }
}

export const getEmployee = async (req, res) => {
    const { id } = req.params
    console.log(`Fetching Employee with id = ${id}`)
    try {
        const employee = await User.findById(id)
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "No Employee founded"
            })
        }
        res.status(200).json({ success: true, message: "Employee loaded successfully!", employee })
    } catch (error) {
        console.log("Something went wrong, Employee did not loaded!")
        res.status(400).json({ success: false, message: error.message })
    }
}
export const updatedEmployee = async (req, res) => {
    const { id } = req.params
    const { team, position } = req.body
    try {
        const employee = await User.findByIdAndUpdate(id,
            { $set: { team, position } },
            {new: true}
        )
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "Employee updated successfully!",
            employee
        })


    } catch (error) {
        console.log("Something went wrong when updating!")
        res.status(400).json({success: false, message: error.message})
    }
}

export const deleteEmployee = async (req, res) => {
    const { id } = req.params
    console.log(`Deleting Employee with id = ${id}`)
    try {
        const employee = await User.findByIdAndDelete(id)
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee did not founded!"
            })
        }
        res.status(200).json({ 
            success: true,
            message: `User deleted successfully!, ID: ${id}` 
        })
    } catch (error) {
        console.log("Something went wrong, user did not deleted")
        res.status(400).json({ success })
    }
}

export const setTask = async (req, res) => {
    
    const { title, description, category, priority, deadline, createdBy } = req.body;

    try {
        if (!title || !createdBy) {
            return res.status(400).json({
                success: false,
                message: "Required fields missed!",
            });
        }
        // Create a new task
        const task = new Task({
            title,
            description,
            category,
            priority,
            deadline,
            // createdBy supposed to be setto (the admin will set a task to a specific employee)
            createdBy,
        });

        // Find the user by ID
        const employee = await User.findById(createdBy);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Push task ID to the user's task list
        employee.tasks.push(task._id);

        // Save both task and user
        await task.save();
        await employee.save();

        res.status(201).json({
            success: true,
            message: `Task assigned successfully to the employee: ${employee.firstname}`,
            task: { ...task._doc },

        });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while assigning the task",
            error: error.message,
        });
    }
};