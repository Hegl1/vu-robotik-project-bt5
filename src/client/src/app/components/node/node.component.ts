import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output('isToggling') isToggling = new EventEmitter<boolean>();

  _isToggling = false;

  constructor(private api: ApiService, private snackbar: SnackbarService) {}

  async toggleNode() {
    this._isToggling = true;
    this.isToggling.emit(true);
    let response = await this.api.toggleNode(this.node.package, this.node.name);

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

    this._isToggling = false;
    this.isToggling.emit(false);
  }
}
