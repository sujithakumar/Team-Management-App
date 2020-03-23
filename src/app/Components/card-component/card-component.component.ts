import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.css']
})
export class CardComponentComponent implements OnInit {

  @Input() Data: any = `Information`;
  loginUserInfo: any = JSON.parse(localStorage.getItem('loginInfo'));
  newComment: string;
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {
    this.addNewComments();
  }
  addNewComments() {
    debugger;
    console.log(this.loginUserInfo);
    console.log(this.loginUserInfo[0]);
    console.log(this.loginUserInfo[0].avatar);
  }


}
