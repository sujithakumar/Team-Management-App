import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { LoginService } from '../../Services/login.service';
import { TeamDataService } from '../../Services/team-data.service';
import { login } from '../../Models/login';
import { teamData } from '../../Models/teamData';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  teamData: teamData[];
  login: login[];
  adminId: string = localStorage.getItem('adminID');
  showNotifications = false;
  teamName: string;
  adminAvatar;
  adminName;

  constructor(private TeamDataService: TeamDataService, private loginservice: LoginService) { }

  ngOnInit(): void {

    this.loginservice.getloginDetails().subscribe(loginData => {
      this.setLoginInfo(loginData);
    });

    this.TeamDataService.getTeamData().subscribe(data => {
      this.filterResults(data);
    });
  }

  setLoginInfo(loginResponse) {
    this.teamName = loginResponse[0].BelongsTo;
    this.adminAvatar = loginResponse[0].avatar;
    this.adminName = loginResponse[0].name;
    if (loginResponse[0].notifications > 0) {
      this.showNotifications = true;
    }
  }
  filterResults(responseData) {
    const unFormattedData = of(responseData);
    unFormattedData.pipe(
      map(data => {
        return data.filter(item => {
          return item.reportingTo === parseInt(this.adminId);
        });
      })
    ).subscribe(results => {
      this.teamData = results;
    })
  }

}

