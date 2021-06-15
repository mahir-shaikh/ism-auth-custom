import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.styl']
})
export class NewProjectComponent implements OnInit {
  user: string;
  projectName
  projectType
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private projectService: ProjectService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.user = this.authService.getName()
    // this.pages = this.
  }

  logout(){
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  backToProjects(){
    this.router.navigate(["/user-dashboard"])
  }

  createNewProject() {
    if (this.projectName && this.projectType) {
      this.projectService.addNewProject(this.projectName, this.projectType).then((res)=>{
        if (res.success) {
          this.alertService.success("New Project created successfully", {autoClose: true, keepAfterRouteChange: true})
          let project = res.data
          this.projectService.setActiveProjectId = project._id;
          this.router.navigate(['/project']);
        } else {
          this.alertService.error(res.message)
          console.log(res.error)
        }
      }).catch((error)=>{
        this.alertService.error(error.message)
      })
    }

  }
}
