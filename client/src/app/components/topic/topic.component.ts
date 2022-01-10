import { Component, Input } from '@angular/core';
import { Topic } from 'src/app/core/api/api.service';

@Component({
  selector: 'bt5-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent {
  @Input('topic') topic!: Topic;
  @Input('disabled') isDisabled = false;

  constructor() {}
}
