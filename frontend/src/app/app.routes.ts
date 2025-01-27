import { Routes } from '@angular/router';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'task-board',
        pathMatch:"full"

    },
    {
        path:'task-board',
        component:TaskBoardComponent
    },
    {
        path:'task-details/:id',
        component:TaskDetailsComponent
    },
    {
        path:'create-new-task',
        component: CreateTaskComponent
    }
];
