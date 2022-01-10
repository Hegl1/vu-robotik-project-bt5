import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService extends Socket {
  constructor(private _config: ConfigService) {
    super({ url: _config.get('apiUrl') });
  }

  subscribeTopic(topic: string) {
    return new Observable<string>((subscriber) => {
      this.on(`topics/${topic}`, (message: string) => {
        subscriber.next(message);
      });
    });
  }
}
