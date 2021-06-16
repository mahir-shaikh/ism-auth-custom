import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EVENTS } from 'src/app/constants';
import { UploadService } from 'src/app/services/upload.service';
import { AlertService } from 'src/app/services/alert.service';
import { CommunicatorService } from 'src/app/services/communicator.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.styl']
})
export class ImageUploadComponent implements OnInit {
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  images;
  fileInputLabel;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private alertService: AlertService,
    private communicator: CommunicatorService
  ) { }

  ngOnInit() {
  }

  onFileSelect(event) {
    if(event.target.files.length > 0){
      const files = event.target.files;
      this.images = files;

      
      this.fileInputLabel = Array.from(files).reduce((total, currentValue, currentIndex, arr)=>{
        return total ? total + ', ' +currentValue['name'] : currentValue['name']
      },'');
    }
  }

  onSubmit() {
    const formData = new FormData();
    for(let img of this.images){
      formData.append('files', img);
    }


   this.uploadService.uploadImage(formData).then((response)=>{
    if(response.success){
      this.alertService.success(response.message)
      this.communicator.trigger(EVENTS.REFRESH_GALLERY)
      this.images = undefined
      this.fileInputLabel = ''
    }
  }).catch((err)=>{
    if(err.message){
      this.alertService.error(err.message)
    }else{
      this.alertService.error(err)
    }
   })
  }

}
