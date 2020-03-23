import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { task } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(private http: HttpClient) {
  }

  //fetch all tasks
  public fetchAllTasks(): Observable<any> {
    return this.http.get<task[]>("https://5e72ed33942d92001611b168.mockapi.io/dashboard/api/tasks");
  }
}
