import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const createTask = async (req, res) => {
    
    const { title, description, category, priority,status, deadline } = req.body;

    try {
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }
        // Create a new task

        const task = new Task({
            title,
            description,
            category,
            priority,
            deadline,
            createdBy: req.userId,
            status
        });

        
        await task.save();
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: { ...task._doc },

        });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the task",
            error: error.message,
        });
    }
};

export const getAllTasks = async (req, res) => {
    try {

        const tasks = await Task.find({createdBy: req.userId}).populate('createdBy');
        if(tasks.length === 0){
            return res.status(400).json({
                success: false,
                message: "There is no tasks!"
            })
        }
        res.status(200).json({success: true, message: "Tasks loaded successfully!",tasks})
    } catch (error) {
        console.log("Something wrong, Tasks did not loaded!")
        res.status(400).json({success: false, message: error.message})
    }
}

export const getTask = async (req, res) => {

    const  {id} = req.params;
    console.log("Fetching task with ID:", id);
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found!",
            });
        }
        res.status(200).json({ success: true, message: "Task: ", task });
    } catch (error) {
        console.error("Error fetching task:", error.message); // Log errors
        res.status(400).json({ success: false, message: "Cannot get task!" });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `Task deleted successfully, ID: ${id}`,
        });
    } catch (error) {
        console.error("Error deleting task:", error);

        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the task",
        });
    }
};


export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, category, priority, deadline, status } = req.body;
    // const BODY = [...req.body];

    try {
        const task = await Task.findByIdAndUpdate(
            id, 
            {
                title,
                description,
                category,
                priority,
                deadline,
                status,
                updatedAt: Date.now()
            },
            { new: true } 
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully!",
            task,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const searchTask = async (req, res) => {
    const { query } = req.query; 
    
    const regex = new RegExp(query, 'i'); 
  
    try {
      const tasks = await Task.find({
        $or: [
          { title: regex },
          { description: regex },
          { category: regex },
          { priority: regex },
          { createdBy}
        ],
      });

      if(tasks.length === 0){
        return res.status(404).json({
            success: false,
            message: "Task not found!"
        })
      }
      res.status(200).json({
        success: true,
        tasks, 
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

