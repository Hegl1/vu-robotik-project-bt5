import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ViewComponent } from './view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

const MATERIAL_MODULES = [MatButtonModule, MatToolbarModule];

@NgModule({
  declarations: [ViewComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ...MATERIAL_MODULES],
  providers: [],
  bootstrap: [ViewComponent],
})
export class AppModule {}
