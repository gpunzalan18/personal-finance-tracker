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
  useDefault = false;
  default: any;
  constructor(private parserService: ParserService) {}

  ngOnInit(): void {
    this.default = `\n${this.defaultDataStr}`;
    console.log(this.defaultDataStr);
  }

  onChange(event: any) {
    var reader = new FileReader();
    reader.onload = () => {
      this.parserService.read(reader.result);
      this.data = reader.result;
    };
    reader.readAsText(event.target.files[0]);
  }

  emitToParseData(data: any) {
    this.uploadedData.emit(data);
    this.disabled = true;
  }

  useDefaultData() {
    this.useDefault = true;
  }

  emitToUseDefaultData() {
    this.defaultData.emit();
    this.disabled = true;
  }
}
