import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { task } from '../../../Models/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  Count: number;
  UsersCommented: any = [];
  Description: string = "";
  dueDate: any;
  colorCode: string;

  @Input() todoTasks: task;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    var CurrvalLen = 0;
    if (changes.todoTasks.currentValue && changes.todoTasks.currentValue.length > 0) {
      CurrvalLen = changes.todoTasks.currentValue.length;
      for (var i = 0; i < CurrvalLen; i++) {
        this.setData(changes.todoTasks.currentValue[i]);
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
