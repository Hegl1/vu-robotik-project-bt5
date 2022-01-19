import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ViewComponent } from './view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTreeModule } from '@angular/material/tree';

import { ConfigService } from './core/config/config.service';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { NodeComponent } from './components/node/node.component';
import { FormsModule } from '@angular/forms';
import { TopicComponent } from './components/topic/topic.component';
import { SocketIoModule } from 'ngx-socket-io';
import { WebsocketService } from './core/services/websocket.service';
import { ParametersComponent } from './components/parameters/parameters.component';
import { SectionComponent } from './components/section/section.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatTreeModule,
];

export function setupConfig(config: ConfigService) {
  return () => config.load();
}

@NgModule({
  declarations: [ViewComponent, SkeletonComponent, NodeComponent, TopicComponent, ParametersComponent, SectionComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, SocketIoModule, ...MATERIAL_MODULES],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setupConfig,
      deps: [ConfigService],
      multi: true,
    },
    WebsocketService,
  ],
  bootstrap: [ViewComponent],
})
export class AppModule {}
