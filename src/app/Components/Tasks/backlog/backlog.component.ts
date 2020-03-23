import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { task } from '../../../Models/task';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {

  Count: number;
  UsersCommented: any = [];
  Description: string = "";
  dueDate: any;
  colorCode: string;

  @Input() backlogTasks: task;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    var CurrvalLen = 0;
    if (changes.backlogTasks.currentValue && changes.backlogTasks.currentValue.length > 0) {
      CurrvalLen = changes.backlogTasks.currentValue.length;
      for (var i = 0; i < CurrvalLen; i++) {
        this.setData(changes.backlogTasks.currentValue[i]);
      }

    }
  }

  setData(inputData) {
    this.Count = inputData.Comments.length || 0;
    this.Description = inputData.Description || undefined;
    this.dueDate = inputData["Due-date"] || undefined;
    if (this.Count > 0) {
      this.UsersCommented = inputData.Comments;
    }
    this.colorCode = inputData["color-code"];
  }
}
