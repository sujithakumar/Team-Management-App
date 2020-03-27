import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CardComponentComponent } from '../card-component/card-component.component';
import { AddCardComponent } from '../add-card/add-card.component';

import { TaskService } from '../../Services/task.service';
import { task } from '../../Models/task';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  backlogTasks: task[];
  todoTasks: task[];
  doneTasks: task[];
  inProgressTasks: task[];
  statusArray = ["backlog", "todo", "in progress", "done"];


  adminId: string = localStorage.getItem('adminID');

  constructor(private TaskService: TaskService, private modalService: NgbModal) { }

  ngOnInit(): void {
    //get all tasks and filter backlog items based on status and assignedby values

    this.initializeData();

  }

  initializeData() {
    this.TaskService.fetchAllTasks().subscribe(data => {
      this.filterBacklogResults(data);
      this.filterTodoResults(data);
      this.filterDoneResults(data);
      this.filterInProgressResults(data);
    });
  }

  filterDoneResults(responseData) {
    const unFormattedData = of(responseData);
    unFormattedData.pipe(
      map(data => {
        return data.filter(item => {
          return (item["Assigned-By"] == parseInt(this.adminId) && ((item.Status).toUpperCase() === "DONE"));
        });
      })
    ).subscribe(results => {
      this.doneTasks = results;
    });
  }


  filterTodoResults(responseData) {
    const unFormattedData = of(responseData);
    unFormattedData.pipe(
      map(data => {
        return data.filter(item => {
          return (item["Assigned-By"] == parseInt(this.adminId) && ((item.Status).toUpperCase() === "TODO"));
        });
      })
    ).subscribe(results => {
      this.todoTasks = results;
    });
  }


  filterInProgressResults(responseData) {
    const unFormattedData = of(responseData);
    unFormattedData.pipe(
      map(data => {
        return data.filter(item => {
          return (item["Assigned-By"] == parseInt(this.adminId) && (item.Status.toUpperCase() === "INPROGRESS" || item.Status.toUpperCase() === "IN PROGRESS"));
        });
      })
    ).subscribe(results => {
      this.inProgressTasks = results;
    });
  }


  filterBacklogResults(responseData) {
    const unFormattedData = of(responseData);
    unFormattedData.pipe(
      map(data => {
        return data.filter(item => {
          return (item["Assigned-By"] == parseInt(this.adminId) && ((item.Status).toUpperCase() === "BACKLOG"));
        });
      })
    ).subscribe(results => {
      this.backlogTasks = results;
    });
  }

  cardClick(values) {
    const modalreference = this.modalService.open(CardComponentComponent);
    modalreference.componentInstance.Data = values;
    this.checkValuesFromModal(modalreference);
  }

  addTask(info) {
    const modalreference = this.modalService.open(AddCardComponent);
    modalreference.componentInstance.statusFromCallingEvent = info;
    this.checkValuesFromModal(modalreference);
  }

  checkValuesFromModal(refModel) {
    refModel.componentInstance.passBack.subscribe((receivedEntry) => {
      if (receivedEntry === "reload") {
        this.initializeData();
      }
    });
  }


}
