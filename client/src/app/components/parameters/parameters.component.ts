import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
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
export class ParametersComponent implements OnInit {
  @Input('parameters') parameters!: any;

  treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {}

  ngOnInit() {
    this.dataSource.data = this.parseTree(this.parameters);
    this.treeControl.dataNodes = this.dataSource.data;
    this.treeControl.expandAll();
  }

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

        switch (typeof value) {
          case 'number':
            icon = 'tag';
            break;
          case 'boolean':
            icon = value ? 'toggle_on' : 'toggle_off';
            break;
          case 'string':
            icon = 'abc';
            value = `"${value}"`;
            break;
          default:
            value = `"${value}"`;
        }

        return { name: key, value, icon };
      }
    });
  }
}
