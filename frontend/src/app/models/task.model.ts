export class Task {
    _id!: string; 
    title!: string;
    description?: string; 
    category!: 'Work' | 'Personal' | 'Study' | 'Other'; 
    priority!: 'Low' | 'Medium' | 'High'; // Enum
    status!: 'Todo' | 'In Progress' | 'Completed'; // Enum
    deadline?: Date | null; // Optional
    createdBy!: string; // ObjectId (as a string in TypeScript)
    createdAt!: Date;
    updatedAt?: Date | null; // Optional
}

export class TaskCategory {
  status!: string;
  tasks!: Task[];
}