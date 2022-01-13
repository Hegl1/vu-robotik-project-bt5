import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService extends Socket {
  private topicObservables: Map<string, Observable<string>> = new Map();

  constructor(_config: ConfigService) {
    super({ url: _config.get('apiUrl') });
  }

  subscribeTopic(topic: string) {
    let observable = this.topicObservables.get(topic);

    if (observable) {
      return observable;
    }

    observable = new Observable<string>((subscriber) => {
      this.on(`topics/${topic}`, (message: string) => {
        subscriber.next(message);
      });
    });

    this.topicObservables.set(topic, observable);

    return observable;
  }
}
