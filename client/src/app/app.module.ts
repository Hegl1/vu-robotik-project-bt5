import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ViewComponent } from './view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { ConfigService } from './core/config/config.service';

const MATERIAL_MODULES = [MatButtonModule, MatToolbarModule, MatSnackBarModule, MatIconModule];

export function setupConfig(config: ConfigService) {
  return config.load();
}

@NgModule({
  declarations: [ViewComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, ...MATERIAL_MODULES],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setupConfig,
      deps: [ConfigService],
    },
  ],
  bootstrap: [ViewComponent],
})
export class AppModule {}
