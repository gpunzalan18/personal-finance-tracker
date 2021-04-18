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
  @Input('defaultDataStr') defaultDataStr: string = '';
  @Input() dataCaption: string = '';
  @Output() uploadedData: EventEmitter<Transaction[]> = new EventEmitter<
    Transaction[]
  >();
  @Output() defaultData: EventEmitter<Transaction[]> = new EventEmitter();

  disabled = false;
  data: any;
  uploadedCSVData: any;
  useDefault = false;
  default: any;
  file: any;
  reader = new FileReader();
  constructor(private parserService: ParserService) {}

  ngOnInit(): void {
    this.default = `\n${this.defaultDataStr}`;
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.parserService.read(this.reader.result);
    this.data = this.reader.result;
    this.reader.onload = () => {
      this.parserService.read(this.reader.result);
      this.data = this.reader.result;
    };
    this.reader.readAsText(this.file);
    event.target.value = '';
  }

  emitToParseData() {
    this.uploadedData.emit(this.data);
    this.disabled = true;
  }

  useDefaultData() {
    this.useDefault = true;
    this.data = undefined;
    console.log(document.getElementById('file-upload'));
  }

  emitToUseDefaultData() {
    this.defaultData.emit();
    this.disabled = true;
  }
}
