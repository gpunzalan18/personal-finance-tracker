import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Personal Finance Tracker';
  year = new Date().getFullYear();
  reload() {
    window.location.reload();
  }
}
