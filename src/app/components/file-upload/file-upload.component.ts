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
  @Input('defaultDataStr') defaultDataStr: string = '';
  @Input() dataCaption: string = '';
  @Output() uploadedData: EventEmitter<Transaction[]> = new EventEmitter<
    Transaction[]
  >();
  @Output() defaultData: EventEmitter<Transaction[]> = new EventEmitter();

  data: any;
  dataString: any;
  uploadedCSVData: any;
  default: any;
  file: any;
  reader: any;

  useDefault = false;
  disabled: boolean = false;
  confirmationQuestion: string = '';
  step: number = 1;

  constructor(private parserService: ParserService) {}

  ngOnInit(): void {
    this.default = `\n${this.defaultDataStr}`;
    this.reader = new FileReader();
  }

  onChange(event: any) {
    this.file = event.target.files[0];
    this.parserService.read(this.reader.result);
    this.data = this.reader.result;
    this.reader.onload = () => {
      this.parserService.read(this.reader.result);
      this.data = this.reader.result;
      this.dataString = this.data;
    };
    this.reader.readAsText(this.file);
    event.target.value = '';
    this.step = 2;
  }

  emitData() {
    if ((this.useDefault = true && !this.data)) {
      this.useDefault = true;
      this.defaultData.emit();
      this.data = undefined;
    } else {
      this.useDefault = false;
      this.uploadedData.emit(this.data);
      this.dataString = this.data;
    }
    this.disabled = true;
  }

  getConfirmationQuestion(): string {
    let output: string = '';
    if ((this.useDefault = true && !this.data)) {
      output = 'Would you like to use this demo data?';
    } else {
      output = 'Does this look good to you?';
    }
    return output;
  }
  useDefaultData() {
    this.step = 2;
    this.useDefault = true;
    this.data = undefined;
    this.dataString = this.defaultDataStr;
  }

  emitToUseDefaultData() {
    this.defaultData.emit();
    this.disabled = true;
  }
}
