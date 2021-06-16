import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EVENTS } from 'src/app/constants';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UploadService } from 'src/app/services/upload.service';
import { CommunicatorService } from 'src/app/services/communicator.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.styl']
})
export class ImageViewerComponent implements OnInit {
  @Input() isFileChooser = false;
  @Output() fileSelected = new EventEmitter();

  imageData: Array<string> = [];
  URL = environment.serverURL + "/";
  imageIndex = 0;
  isModalVisible = false;
  @ViewChild('ImageModal', {static: false}) public ImageModalRef: ElementRef;
  // private modal: ElementRef;
  modalRef: BsModalRef;
  modalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg image-details',
    keyboard: true
  };

  constructor(
    private uploadService: UploadService,
    private communicator: CommunicatorService,
    private alertService: AlertService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.fetchImages()
    this.communicator.getEmitter(EVENTS.REFRESH_GALLERY).subscribe(()=>{
      this.fetchImages();
    })

  }

  fetchImages() {
    this.uploadService.getImages().then((response) => {
      this.imageData = []
      if(response && response.data){
        this.imageData = response.data.map((image) => {
          return this.URL + image;
        })
      }
      console.log(this.imageData)
    }).catch((err)=>{
      this.alertService.error(err)
    })
  }

  openModal() {
    // this.ImageModalRef.nativeElement.style.display = "block";
    
    // var body = document.getElementsByTagName("body")[0];
    // this.modal = this.ImageModalRef;
    // if (this.modal) {
      //   body.appendChild(this.modal.nativeElement);
      // }
    this.isModalVisible = true;
    this.modalRef = this.modalService.show(this.ImageModalRef, this.modalConfig);
  }

  closeModal() {
    // this.ImageModalRef.nativeElement.style.display = "none";
    
    // var body = document.getElementsByTagName("body")[0];
    // if (this.modal) {
      //     body.removeChild(this.modal.nativeElement);
      // }
    this.isModalVisible = false;
    if(this.modalRef){
      this.modalRef.hide();
    }
  }

  setSelection(index){
    this.imageIndex = index;
    this.openModal();
  }

  deleteImage(){
    // "http://localhost:9999/uploads/images/logo_autodesk.png",
    let relativeUrl = this.imageData[this.imageIndex].replace(this.URL, '')
    this.uploadService.deleteImage(relativeUrl).then((response)=>{
      if(response.success){
        this.alertService.success(response.message)
        this.closeModal();
        this.fetchImages();
      }else{
        this.closeModal();
        this.alertService.error(response.message)
      }
    }).catch((err)=>{
      this.closeModal();
      this.alertService.error(err)
    })
  }

  CopyToClipboard(value) {
    var tempInput = document.createElement("input");
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  onColorChange(e){
    // debugger
  }

  selectImage(){
    this.closeModal();
    
    let currentObj = this.imageData[this.imageIndex] // "http://localhost:9999/uploads/images/logo_autodesk.png",
    let currentUrl = currentObj['url']

    this.fileSelected.emit(currentUrl);
  }

}
