import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  activeProjectId;  
  public get getActiveProjectId() {
    return this.activeProjectId
  }
  public set setActiveProjectId(v) {
    this.activeProjectId = v;
    localStorage.setItem('ProjectId', v)
  }

  constructor(
    private httpWrapper: HttpWrapperService,
    private authService: AuthService
  ) { 
    if(this.activeProjectId == null || this.activeProjectId == undefined){
      this.setActiveProjectId = localStorage.getItem('ProjectId')
    }    
  }

  addNewProject(projectName, projectType){
    let data = {
      name: projectName,
      type: projectType,
      user: this.authService.getActiveUser()
    }
    return this.httpWrapper.postJson("/projects/add", data);
  }

  getMyProjects(){
    let user= this.authService.getActiveUser();
    return this.httpWrapper.getJson("/projects/getProjectsByAuthor/"+user._id, null);
  }

  deleteProject(_id){
    return this.httpWrapper.delete("/projects/delete/"+_id);
  }

}
