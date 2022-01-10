import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService extends Socket {
  constructor(private _config: ConfigService) {
    super({ url: _config.get('websocketUrl') });
  }

  subscribeTopic(topic: string) {
    let observable = new EventEmitter<string>();

    this.on(topic, (message: string) => {
      observable.emit(message);
    });

    return observable;
  }
}
