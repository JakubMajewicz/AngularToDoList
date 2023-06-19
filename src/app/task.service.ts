import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task} from './task';
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class TaskService {

    private apiServerUrl = 'http://localhost:8080';

    constructor(private http: HttpClient){}

    public getTasks(): Observable<Task[]>{
        return this.http.get<Task[]>(`${this.apiServerUrl}/tasks`);
    }
    public getTask(taskId: number): Observable<Task>{
        return this.http.get<Task>(`${this.apiServerUrl}/tasks/${taskId}`);
    }
    public addTask(task: Task): Observable<Task>{
        return this.http.post<Task>(`${this.apiServerUrl}/tasks`, task);
    }
    public updateTask(taskId: number, task: Task): Observable<Task>{
        return this.http.put<Task>(`${this.apiServerUrl}/tasks/${taskId}`, task);
    }
    public deleteTask(taskId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/tasks/${taskId}`);
    }
    public httpStatus():Observable<Map<string, number>>{
        return this.http.get<Map<string, number>>(`${this.apiServerUrl}/tasks/status`);
    }
}