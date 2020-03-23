import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';



import { teamData } from '../Models/teamData';


@Injectable({
  providedIn: 'root'
})
export class TeamDataService {

  teamData: teamData[];

  constructor(private http: HttpClient) {
  }

  //get all team data
  public getTeamData(): Observable<any> {
    return this.http.get<teamData[]>("https://5e72ed33942d92001611b168.mockapi.io/dashboard/api/UserList");
  }
}
