import { Component, Input, OnInit } from '@angular/core';
import { ParserService } from 'src/app/services/parser/parser.service';
import { Subject } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { Transaction } from 'src/app/services/models/transaction';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  @Input('heading') heading: string = '';
  @Input('subHeading') subHeading: string = '';
  @Input('btnTitle') btnTitle: string = '';
  @Output() uploadedData: EventEmitter<Transaction[]> = new EventEmitter<
    Transaction[]
  >();

  data: any;
  constructor(private parserService: ParserService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    var reader = new FileReader();
    reader.onload = () => {
      this.parserService.read(reader.result);
      this.data = reader.result;
    };
    reader.readAsText(event.target.files[0]);
  }

  emitToParseTransactions(data: any) {
    this.uploadedData.emit(data);
  }
}
