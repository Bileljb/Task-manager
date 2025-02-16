import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
    trim: true, 
    minlength: 3, 
    maxlength: 100 
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500 
  },
  category: {
    type: String,
    enum: ['Work', 'Personal', 'Study', 'Other'],
    default: 'Other'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Todo', 'In Progress', 'Completed'], 
    default: 'Todo'
  },
  deadline: {
    type: Date, 
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User collection
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  updatedAt: {
    type: Date,
    default: null // Optional, set only when the task is updated
  }
});

export const Task = mongoose.model('Task', taskSchema);


