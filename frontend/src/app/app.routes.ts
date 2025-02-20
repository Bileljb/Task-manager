import { Routes } from '@angular/router';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { LoginComponent } from './auth pages/login/login.component';
import { SignupComponent } from './auth pages/signup/signup.component';
import { EmailVerificationComponent } from './auth pages/email-verification/email-verification.component';
import { HomeComponent } from './components/home-page/home-page.component';
import { authGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'',
        pathMatch:"full"

    },
    {
        path: '',
        component: HomeComponent

    },
    {
        path:'task-board',
        component:TaskBoardComponent,
        canActivate: [authGuard],
    },
    {
        path:'task-details/:id',
        component:TaskDetailsComponent,
        canActivate: [authGuard],
    },
    {
        path:'create-new-task',
        component: CreateTaskComponent,
        canActivate: [authGuard],
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'tm-admin',
        component:AdminDashboardComponent,
        canActivate: [authGuard]
    },
    {
        path:'employee-profile/:id',
        component: ProfilePageComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'verify-email',
        component:EmailVerificationComponent
    }
];
