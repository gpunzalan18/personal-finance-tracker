import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from 'src/models/transaction';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  subscriber: any;
  transactionObservable: Observable<any>;

  constructor() {
    this.transactionObservable = new Observable((s) => {
      this.subscriber = s;
    });
  }

  parse(data: any) {
    let cleanUpData: string[] = data.toString().toLowerCase();
    console.log(cleanUpData);
    this.subscriber.next(cleanUpData);
    const headers: string[] = cleanUpData[0].split(',');
  }
}
