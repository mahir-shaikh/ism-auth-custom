import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.styl']
})
export class UserDashboardComponent implements OnInit {
  user: string;
  userProjects = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private projectService: ProjectService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.user = this.authService.getName()
    this.getProjects()
    // this.pages = this.
  }

  getProjects(){
    this.projectService.getMyProjects().then((response) => {
      if(response.success){
        this.userProjects = response.data;
      }else{
        this.alertService.error(response.message)
      }
    }).catch((err) => {
      this.alertService.error(err)
    })
  }

  logout(){
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  onProjectSelect(id){
    this.projectService.setActiveProjectId = id;
    this.router.navigate(["/project"])
  }

  deleteProject(id){
    //TODO: Create custom confirmation component
    let confirm = window.confirm('Are you sure you want to delete the project? You cannot undo this decision!')
    if(confirm){
      this.projectService.deleteProject(id).then((response)=>{
        if(response.success){
          this.alertService.success(response.message)

          //Get Projects again to get the updated list
          this.getProjects()
        }else{
          this.alertService.error(response.message)
        }
      }).catch((err) => {
        this.alertService.error(err)
      })
    }
  }

  createNewProject(){
    this.router.navigate(['/new-project'])
  }

}