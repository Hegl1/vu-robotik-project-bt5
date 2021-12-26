import { Component, OnInit } from '@angular/core';
import { ApiService, UpdateInfo } from '../core/api/api.service';
import { Logger, LoggerColor } from '../core/functions';

const StorageNames = {
  autoRefreshEnabled: 'bt5_auto_refresh_enabled',
  refreshInterval: 'bt5_refresh_interval',
};

@Component({
  selector: 'bt5-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  isReloading = false;
  hasError = false;
  data: UpdateInfo | null = null;

  showRefreshMenu = false;

  private _autoRefreshEnabled = true;
  private _refreshInterval: number = 5;

  private refreshTimeout: number | null = null;

  readonly refreshIntervalOptions = [
    {
      seconds: 5,
      label: '5 sec',
    },
    {
      seconds: 10,
      label: '10 sec',
    },
    {
      seconds: 20,
      label: '20 sec',
    },
    {
      seconds: 30,
      label: '30 sec',
    },
    {
      seconds: 60,
      label: '1 min',
    },
  ];

  constructor(private api: ApiService) {}

  get autoRefreshEnabled() {
    return this._autoRefreshEnabled;
  }
  set autoRefreshEnabled(autoRefreshEnabled: boolean) {
    if (autoRefreshEnabled === this._autoRefreshEnabled) return;

    this._autoRefreshEnabled = autoRefreshEnabled;

    localStorage.setItem(StorageNames.autoRefreshEnabled, autoRefreshEnabled.toString());

    this.updateRefreshTimeout();
  }

  get refreshInterval() {
    return this._refreshInterval;
  }
  set refreshInterval(refreshInterval: number) {
    if (refreshInterval === this._refreshInterval) return;

    this._refreshInterval = refreshInterval;

    localStorage.setItem(StorageNames.refreshInterval, refreshInterval.toString());

    this.updateRefreshTimeout();
  }

  ngOnInit() {
    let storageAutoRefreshEnabled = localStorage.getItem(StorageNames.autoRefreshEnabled);
    let storageRefreshInterval = localStorage.getItem(StorageNames.refreshInterval);

    if (storageAutoRefreshEnabled !== null) {
      this._autoRefreshEnabled = storageAutoRefreshEnabled !== 'false';
    }
    if (storageRefreshInterval !== null) {
      this._refreshInterval = parseInt(storageRefreshInterval);

      if (!this.refreshIntervalOptions.some((item) => item.seconds === this._refreshInterval)) {
        this._refreshInterval = 5;
        localStorage.removeItem(StorageNames.refreshInterval);
      }
    }

    this.updateRefreshTimeout(true);
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

  private async updateRefreshTimeout(forceReload = false) {
    if (this.refreshTimeout !== null) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }

    if (!this.autoRefreshEnabled && !forceReload) return;

    await this.reload();

    if (this.autoRefreshEnabled) {
      // @ts-ignore
      this.refreshTimeout = setTimeout(this.updateRefreshTimeout.bind(this), this.refreshInterval * 1000);
    }
  }
}
