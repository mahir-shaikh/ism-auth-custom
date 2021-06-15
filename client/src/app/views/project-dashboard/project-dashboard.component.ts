import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from 'src/app/services/project.service';
@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.styl']
})
export class ProjectDashboardComponent implements OnInit {
  user: string;
  pages;

  constructor(
    private authService: AuthService,
    private router: Router,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.user = this.authService.getName()
    // this.pages = this.
  }

  backToProjects(){
    this.projectService.setActiveProjectId = null
    this.router.navigate(["/user-dashboard"])
  }

}