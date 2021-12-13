import { Component, OnInit } from '@angular/core';
import { ApiService, UpdateInfo } from '../core/api/api.service';
import { Logger, LoggerColor } from '../core/functions';

@Component({
  selector: 'bt5-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  isReloading = false;
  hasError = false;
  data: UpdateInfo | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.reload();
  }

  async reload() {
    this.isReloading = true;
    this.hasError = false;

    await new Promise<void>((res) => setTimeout(() => res(), 1000));

    let response = await this.api.getUpdate();

    if (response.isOK()) {
      this.data = response.value;
    } else {
      this.hasError = true;
      Logger.error(
        'ViewComponent',
        LoggerColor.orange,
        `Could not refresh from API (code: ${response.status})`,
        response.error
      );
    }

    this.isReloading = false;
  }
}
