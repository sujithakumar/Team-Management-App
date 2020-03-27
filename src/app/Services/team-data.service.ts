import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { teamData } from '../Models/teamData';


@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

  teamData: teamData[];
  adminId: string = localStorage.getItem('adminID');

  public FilteredTeamDetails: BehaviorSubject<teamData[]> = new BehaviorSubject<any>({
  });

  constructor(private http: HttpClient) {
  }

  //get all team data
  getTeamData(): Observable<any> {
    return this.http.get<teamData[]>("https://5e72ed33942d92001611b168.mockapi.io/dashboard/api/UserList");
  }

  //passing data between components:
  setFilteredTeamDetails(FilteredTeamDetails: teamData[]) {
    this.FilteredTeamDetails.next(FilteredTeamDetails);
  }

  getFilteredTeamDetails() {
    return this.FilteredTeamDetails.asObservable();
  }


}
