import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { ProjectDashboardComponent } from './views/project-dashboard/project-dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { ProjectGuard } from './guards/project.guard';
import { NewProjectComponent } from './views/new-project/new-project.component';

const appRoutes: Routes = [
    {
        path : "project-dashboard",
        component : ProjectDashboardComponent,
        canActivate: [AuthGuard, ProjectGuard]
    },
    {
        path : "user-dashboard",
        component : UserDashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path : "new-project",
        component : NewProjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path : "login",
        component : LoginComponent,
    },
    {
        path : "",
        redirectTo : "/project-dashboard",
        pathMatch : "full"
    },
    {
        path : "**",
       component : PageNotFoundComponent
    },
]

export const routing = RouterModule.forRoot(appRoutes, { useHash: true});