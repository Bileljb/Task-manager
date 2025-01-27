export class Task {
    _id!: string; 
    title!: string;
    description?: string; 
    category!: 'Work' | 'Personal' | 'Study' | 'Other'; 
    priority!: 'Low' | 'Medium' | 'High'; // Enum
    status!: 'Todo' | 'In Progress' | 'Completed'; // Enum
    deadline?: Date | null; // Optional
    createdBy!: string; 
    createdAt!: Date;
    updatedAt?: Date | null; 
}

export class TaskCategory {
  status!: string;
  tasks!: Task[];
}