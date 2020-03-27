import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { task } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  TaskStatus = ['Backlog', 'Todo', 'Done', 'In Progress'];
  Categories = [
    {
      "name": "category 1",
      "color": "red"
    },
    {
      "name": "category 2",
      "color": "blue"
    },
    {
      "name": "category 3",
      "color": "orange"
    },
    {
      "name": "category 4",
      "color": "yellow"
    }
  ]

  constructor(private http: HttpClient) {
  }

  url = "https://5e72ed33942d92001611b168.mockapi.io/dashboard/api/tasks"
  //fetch all tasks
  public fetchAllTasks(): Observable<any> {
    return this.http.get<task[]>(this.url);
  }

  public postNewTask(postData: any): Observable<task> {
    return this.http.post<any>(this.url, postData);
  }

  public updateTask(data: any): Observable<void> {
    return this.http.put<any>(`${this.url}/${data.id}`, data);
  }


}
