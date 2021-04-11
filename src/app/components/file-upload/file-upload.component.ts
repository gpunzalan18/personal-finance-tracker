import { Component, OnInit } from '@angular/core';
import { Transaction } from 'backend/src/model/helpers/transaction';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  constructor(private fileUploadService: FileUploadService) {
    this.transactions$ = fileUploadService.transactionObservable 
  }

  ngOnInit(): void {}

  onChange(event: any) {
    var reader = new FileReader();
    reader.onload = () => {
      this.fileUploadService.parse(reader.result);
    };
    reader.readAsText(event.target.files[0]);
  }
}
