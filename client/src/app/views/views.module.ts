import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
//To maintain proper moduler structure declare and export all component in this module and import this module in root module

import { NgModule } from '@angular/core';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NewProjectComponent } from './new-project/new-project.component';

@NgModule({
    imports: [RouterModule, CommonModule, FormsModule],
    exports: [
        NewProjectComponent,
        UserDashboardComponent,
        ProjectDashboardComponent,
        PageNotFoundComponent,
        LoginComponent
    ],

    declarations: [
        NewProjectComponent,
        UserDashboardComponent,
        ProjectDashboardComponent,
        PageNotFoundComponent,
        LoginComponent
],
    providers: [],
})
export class ViewModule { }
