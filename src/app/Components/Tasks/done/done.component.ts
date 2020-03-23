import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { task } from '../../../Models/task';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {

  Count: number;
  UsersCommented: any = [];
  Description: string = "";
  dueDate: any;
  colorCode: string;

  @Input() doneTasks: task;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    var CurrvalLen = 0;
    if (changes.doneTasks.currentValue && changes.doneTasks.currentValue.length > 0) {
      CurrvalLen = changes.doneTasks.currentValue.length;
      for (var i = 0; i < CurrvalLen; i++) {
        this.setData(changes.doneTasks.currentValue[i]);
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
