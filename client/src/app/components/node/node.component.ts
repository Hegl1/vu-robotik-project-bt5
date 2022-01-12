import { Component, Input } from '@angular/core';
import { ApiService, Node } from 'src/app/core/api/api.service';
import { Logger, LoggerColor } from 'src/app/core/functions';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'bt5-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent {
  @Input('node') node!: Node;
  @Input('disabled') isDisabled = false;

  isToggling = false;

  constructor(private api: ApiService, private snackbar: SnackbarService) {}

  async toggleNode() {
    this.isToggling = true;
    let response = await this.api.toggleNode(this.node.package, this.node.name);

    await new Promise<void>((res) => setTimeout(() => res(), 1000));

    if (response.isOK()) {
      if (typeof response.value === 'boolean') {
        this.node.running = response.value;
      }
    } else {
      Logger.error(
        'NodeComponent',
        LoggerColor.orange,
        `Could not toggle node (code: ${response.status})`,
        response.error
      );

      this.snackbar.warn('Could not toggle node!');
    }

    this.isToggling = false;
  }
}
