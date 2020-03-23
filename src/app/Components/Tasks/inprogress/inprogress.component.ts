import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { task } from '../../../Models/task';

@Component({
  selector: 'app-inprogress',
  templateUrl: './inprogress.component.html',
  styleUrls: ['./inprogress.component.css']
})
export class InprogressComponent implements OnInit {

  Count: number;
  UsersCommented: any = [];
  Description: string = "";
  dueDate: any;
  colorCode: string;

  @Input() inProgressTasks: task;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    var CurrvalLen = 0;
    if (changes.inProgressTasks.currentValue && changes.inProgressTasks.currentValue.length > 0) {
      CurrvalLen = changes.inProgressTasks.currentValue.length;
      for (var i = 0; i < CurrvalLen; i++) {
        this.setData(changes.inProgressTasks.currentValue[i]);
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
