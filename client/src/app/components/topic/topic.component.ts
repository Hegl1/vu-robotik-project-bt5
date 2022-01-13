import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Topic } from 'src/app/core/api/api.service';
import { SubSink } from 'src/app/core/functions';
import { WebsocketService } from 'src/app/core/services/websocket.service';

const MAX_CONTENT = 500;

@Component({
  selector: 'bt5-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit, OnDestroy {
  @Input('topic') topic!: Topic;

  private subSink = new SubSink();

  constructor(private websocket: WebsocketService) {}

  ngOnInit() {
    this.subSink.push(
      this.websocket.subscribeTopic(this.topic.name).subscribe((message) => {
        this.addContent(message);
      })
    );
  }

  addContent(content: string) {
    this.topic.content.unshift(content);

    if (this.topic.content.length > MAX_CONTENT) {
      this.topic.content.splice(MAX_CONTENT);
    }
  }

  ngOnDestroy() {
    this.subSink.clear();
  }
}
