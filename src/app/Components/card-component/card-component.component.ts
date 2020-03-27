import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../Services/task.service';
@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {

  @Input() Data: any = `Information`;
  @Output() passBack: EventEmitter<any> = new EventEmitter();

  loginUserInfo: any = JSON.parse(localStorage.getItem('loginInfo'));
  newComment: string;
  adminId: string = localStorage.getItem('adminID');
  todayDate = new Date();

  constructor(public activeModal: NgbActiveModal, private TaskService: TaskService, private route: Router, private activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {

  }
  addNewComments() {
    if (this.newComment && this.newComment.length > 0) {
      var newData = {
        "commented-by": this.loginUserInfo[0].id,
        "userAvatar": this.loginUserInfo[0].avatar,
        "comments": this.newComment,
        "commentedOn": this.todayDate
      };
      this.Data['Comments'].push(newData);

    }
    this.TaskService.updateTask(this.Data).subscribe(results => {

      this.passBack.emit("reload");
      this.activeModal.dismiss('Cross click');

    });


  }


}
