import { Component, OnInit } from '@angular/core';
import { ParserService } from 'src/app/services/parser/parser.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  transactions$: Observable<string>;
  constructor(private parserService: ParserService) {
    this.transactions$ = parserService.transactionObservable;
  }

  ngOnInit(): void {}

  onChange(event: any) {
    var reader = new FileReader();
    reader.onload = () => {
      this.parserService.read(reader.result);
    };
    reader.readAsText(event.target.files[0]);
  }

  parse(transactions: string) {
    this.parserService.parse(transactions);
  }
}
