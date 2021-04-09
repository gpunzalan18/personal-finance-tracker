import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { ChartComponent } from './charts/chart.component';
import { ChartService } from './services/chart.service';

const routes = [{ path: '', component: HomePageComponent }];
@NgModule({
  declarations: [AppComponent, ChartComponent, HomePageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ChartService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
