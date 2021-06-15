import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectConfig;
  activeProjectId;  
  public get getActiveProjectId() {
    return this.activeProjectId
  }
  public set setActiveProjectId(v) {
    this.activeProjectId = v;
    localStorage.setItem('ProjectId', v)
    // fetch config
    if(v != null){
      this.getConfig()
    }else{
      this.projectConfig = null;
    }
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

  getConfig(){
    this.httpWrapper.getJson("/projects/getProjectConfig/"+this.activeProjectId, null).then((response)=>{
      if(response.success){
        this.projectConfig = response.response
      }
    })
  }

  setConfig(){
    this.httpWrapper.postJson("/projects/setProjectConfig/"+this.activeProjectId, {data: this.projectConfig})
  }

  getColors(){
    return this.projectConfig && this.projectConfig.colors ? this.projectConfig.colors : null;
  }

  setColors(data){
    this.projectConfig.colors = data;
    this.setConfig()
  }

  getLayout(){

  }

  setLayout(){

  }

  getDetails(){

  }

  setDetails(){

  }


}
