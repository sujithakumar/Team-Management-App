import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { TeamDataService } from '../../Services/team-data.service';
import { TaskService } from '../../Services/task.service'

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  addCardForm: FormGroup;
  submitted = false;
  TeamMembers = [];
  taskNumber: string;
  colorCode: string = "red";
  statuses = [];
  Categories = [];
  loginUserInfo: any = JSON.parse(localStorage.getItem('loginInfo'));
  adminId: string = localStorage.getItem('adminID');
  Task: String;
  Category: string;
  status: string;
  AssignedTo: String;
  description: string;
  DueDate: Date;
  WatchList: String;
  WatchListArr: any = [];
  SubTask: string;
  SubTaskArr: any = [];
  newComments: string;
  newCommentsArr = [];
  tempArr = [];
  checklist = [];
  MockData: any;
  todayDate = new Date();
  subtaskArrLen: number;
  subtaskErr = false;


  @Input() statusFromCallingEvent: any = `Information`;
  @Output() passBack: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    public activeModal: NgbActiveModal, private TeamDataService: TeamDataService, private TaskService: TaskService) { }

  ngOnInit(): void {
    this.TeamDataService.getFilteredTeamDetails().subscribe(data => {
      this.TeamMembers = data;
    });

    this.setStatus(this.statusFromCallingEvent);
    this.statuses = this.TaskService.TaskStatus;
    this.Categories = this.TaskService.Categories;

    this.addCardForm = this.formBuilder.group({
      taskNumber: ['', Validators.required],
      Category: ['', Validators.required],
      status: ['', Validators.required],
      Task: ['', Validators.required],
      AssignedTo: ['', Validators.required],
      description: [],
      DueDate: ['', Validators.required],
      WatchList: ['', Validators.required],
      SubTask: [],
      newComments: []
    });

  }

  get f() {
    return this.addCardForm.controls;
  }


  close() {
    if (this.addCardForm.dirty) {
      confirm("would you like to save the changes?");
      var res = confirm("would you like to save the changes?");
      if (res) {
        this.onSubmit();
      } else {
        this.activeModal.dismiss('Cross click');
      }
    }

  }

  onSubmit() {
    this.submitted = true;
    //return on errors
    if (this.addCardForm.invalid) {
      return;
    }
    this.constructCommentArray();
    this.constructWatchList();
    this.subtaskArrLen = this.SubTaskArr.length;
    if (this.SubTaskArr && this.subtaskArrLen > 0) {
      this.constructSubTask();
    } else {
      this.subtaskErr = true;
      return;
    }
    this.prepareData();
    this.postData();
  }
  constructCommentArray() {
    if (this.newComments && this.newComments.length > 0) {
      var newData = {
        "commented-by": this.adminId,
        "userAvatar": this.loginUserInfo[0].avatar,
        "comments": this.newComments,
        "commentedOn": this.todayDate
      };
      this.newCommentsArr.push(newData);
    }
  }
  onChangeWatchList(itemselected, e) {
    const unFormattedData = of(this.TeamMembers);
    unFormattedData.pipe(
      map(data => {
        return data.filter(item => {
          return (item.id === itemselected.id);
        });
      })
    ).subscribe(results => {
      results[0]["isSelected"] = e.target.checked;
      this.tempArr.push(results[0]);
    });

  }
  constructWatchList() {
    const unFormattedData = of(this.tempArr);
    unFormattedData.pipe(
      map(data => {
        return data.filter(item => {
          return (item.isSelected);
        });
      })
    ).subscribe(results => {
      this.WatchListArr = results;

    });

  }


  addItem() {
    if ((this.SubTask).trim().length > 0) {
      this.SubTaskArr.push(this.SubTask);
      this.SubTask = "";
    }
  }

  removeItem(index) {
    this.SubTaskArr.splice(index, 1);
  }

  constructSubTask() {
    var newData = {};

    for (let i = 0; i < this.subtaskArrLen; i++) {
      newData = {
        "desc": this.SubTaskArr[0],
        "iscompleted": false
      }
    }

    this.checklist.push(newData);

  }
  onChangestatus(value) {
    this.status = this.statuses[value.target.selectedIndex];
  }

  onChangeAssignedTo(value) {
    this.AssignedTo = this.TeamMembers[value.target.selectedIndex].id;
  }

  onChangeCategory(value) {
    this.Category = this.Categories[value.target.selectedIndex].name;
    this.colorCode = this.Categories[value.target.selectedIndex].color;
  }

  setStatus(val) {

    switch (val.toLowerCase()) {
      case 'blank':
        this.status = ' ';
        break;
      case 'backlog':
        this.status = 'Backlog';
        break;
      case 'todo':
        this.status = 'Todo ';
        break;
      case 'done':
        this.status = 'Done ';
        break;
      case 'inprogress':
        this.status = 'In Progress ';
        break;
      default:
        this.status = '';
        break;
    }

  }

  prepareData() {
    this.MockData = {
      "id": this.taskNumber,
      "Assigned-To": this.AssignedTo,
      "Assigned-on": this.todayDate,
      "Assigned-By": this.adminId,
      "Status": this.status,
      "Due-date": this.DueDate,
      "Description": this.Task,
      "category": this.Category,
      "color-code": this.colorCode,
      "detailed-Description": this.description,
      "Comments": this.newCommentsArr,
      "watch-list": this.WatchListArr,
      "Check-list": this.checklist
    };

  }

  postData() {
    this.TaskService.postNewTask(this.MockData).subscribe(resp => {
      this.passBack.emit("reload");
      this.activeModal.dismiss('Cross click');

    });
  }

}
