import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/core/api/api.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'bt5-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input('topic') topic!: Topic;
  @Input('disabled') isDisabled = false;

  constructor(private websocket: WebsocketService) {}

  ngOnInit() {
    this.websocket.subscribeTopic(this.topic.name).subscribe((message) => {
      this.topic.content.push(message);
    });
  }
}
