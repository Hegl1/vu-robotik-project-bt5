import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';

const MATERIAL_MODULES = [MatButtonModule];

@NgModule({
  declarations: [AppComponent, ViewComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ...MATERIAL_MODULES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
