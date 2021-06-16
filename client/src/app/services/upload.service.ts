import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private http: HttpWrapperService,
    private projectService: ProjectService
  ) { }

  uploadImage(formData){
    // let data = {
    //   projectId: this.projectService.getActiveProjectId,
    //   data: formData
    // }
    let data= new FormData();
    data.append('projectId', this.projectService.getActiveProjectId)
    data.append('files',formData.files)
    return this.http.postJson('/projects/uploadImages', formData, {projectId: this.projectService.getActiveProjectId});

  }

  getImages(){
    return this.http.getJson('/projects/getAllImages/'+ this.projectService.getActiveProjectId ,null)
  }

  deleteImage(relativePath){
    let obj = {
      projectId: this.projectService.getActiveProjectId,
      path: relativePath
    }
    return this.http.postJson('/projects/deleteImage', obj)
  }

}
