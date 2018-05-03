import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {  

  @ViewChild('fileInput') public fileUpload;
  @ViewChild('filePreview') public filePreview;  

  @Input('srcImageIn') srcImageIn: string;
  @Input('srcImageOut') public srcImageOut: string;

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
          if (e.target.result) {
            aImg.src = e.target.result;
            this.srcImageIn = aImg.src;
            this.srcImageOut = aImg.src;
          }
        }; 
      })(this.filePreview.nativeElement);
      reader.readAsDataURL(fileBrowser.files[0]);
    }  
  }
}

