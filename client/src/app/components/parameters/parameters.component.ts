import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface TreeNode {
  name: string;
  value?: any;
  icon?: string;
  children?: TreeNode[];
}

@Component({
  selector: 'bt5-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
})
export class ParametersComponent {
  @Input('parameters')
  set parameters(parameters: any) {
    this._parameters = parameters;
    this.dataSource.data = this.parseTree(parameters);
    this.treeControl.dataNodes = this.dataSource.data;

    this.treeControl.expandAll();
  }
  get parameters() {
    return this._parameters;
  }

  private _parameters: any = null;

  treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {}

  hasChild(_: number, node: TreeNode) {
    return !!node.children && node.children.length > 0;
  }

  private parseTree(parameters: any): TreeNode[] {
    if (!parameters) return [];

    return Object.entries(parameters).map(([key, value]) => {
      if (value && typeof value === 'object') {
        // non-leaf-node
        return { name: key, children: this.parseTree(value) };
      } else {
        // leaf-node
        let icon = 'question_mark';

        if (value !== null) {
          switch (typeof value) {
            case 'number':
              icon = 'tag';
              break;
            case 'boolean':
              icon = 'check_circle';
              break;
            case 'string':
              icon = 'abc';
              value = `"${value}"`;
              break;
            default:
              value = `"${value}"`;
          }
        } else {
          icon = 'do_not_disturb_on';
          value = 'null';
        }

        return { name: key, value, icon };
      }
    });
  }
}
