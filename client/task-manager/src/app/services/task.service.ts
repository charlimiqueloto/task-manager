import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task.interface'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/task';

  constructor(private http: HttpClient) { }

  getAllTasksWithPager(page: number = 1, limit: number = 5): Observable<any> {
    console.log(page);
    const params = new HttpParams().set('page', page).set('limit', limit);
    console.log(params);
    return this.http.get(`${this.apiUrl}/`, {params})
  }

  // getTasks(): Observable<Task[]> {
  // return this.http.get<Task[]>(this.apiUrl)
  // }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`)
  }
  
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTaskById(id: string, task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}


