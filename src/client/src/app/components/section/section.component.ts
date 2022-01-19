import { Component, Input } from '@angular/core';

@Component({
  selector: 'bt5-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() name!: string;
  @Input() amountData: number | null | undefined;

  isExpanded = true;

  constructor() {}
}
