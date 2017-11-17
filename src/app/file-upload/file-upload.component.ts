import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {  

  @ViewChild('fileInput') public fileUpload;
  @ViewChild('filePreview') public filePreview;

  constructor() { }

  ngOnInit() {
  }

  public onChange(event) {
    const fileBrowser = this.fileUpload.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.filePreview.nativeElement.classList.add('obj');
      this.filePreview.nativeElement.file = fileBrowser.files[0];

      var reader = new FileReader();
      reader.onload = (function(aImg) { 
        return function(e) { 
          aImg.src = e.target.result; 
        }; 
      })(this.filePreview.nativeElement);
      reader.readAsDataURL(fileBrowser.files[0]);
    }  
  }

  public upload(fileInput, onLoad) {
    const fileBrowser = fileInput.fileUpload.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('files', fileBrowser.files[0]);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', environment.serverUrl + environment.pathImage, true);
      xhr.onload = onLoad;
      xhr.send(formData);
    }
  }

}
