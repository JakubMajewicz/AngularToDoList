import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SearchFilterPipe } from './search-filter.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private taskService: TaskService){}
  allTasks!: Task[];
  filteredTasks!: Task[];
  oneTask!: Task; 
  idTask!: number;
  status!: Map<string, number>;
  filterText!: string;
  ngOnInit(){
    this.getTasks();
  }

  public getTasks(): void{
    this.taskService.getTasks().subscribe(
      (response: Task[]) => {
        this.allTasks = response;
        this.filteredTasks = this.allTasks;
        console.log(this.allTasks)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getStatus(): void{
    this.taskService.httpStatus().subscribe(
      (response: Map<string, number>) => {
        this.status = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getTask(taskId: number): void{
    this.taskService.getTask(taskId).subscribe(
      (response: Task) => {
        this.oneTask = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddTask(addForm: NgForm): void{
    document.getElementById('add-task-form')?.click();
    this.taskService.addTask(addForm.value).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onEditTask(idTask: number, task: Task): void{
    document.getElementById('edit-task-form')?.click();
    console.log(task);
    this.taskService.updateTask(idTask, task).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTask(task: Task): void{
    document.getElementById('delete-task-form')?.click();
    this.taskService.deleteTask(task.id).subscribe(
      (response: void) => {
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openModal(task: Task, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'edit'){
      this.oneTask = task;
      this.idTask = task.id;
      button.setAttribute('data-target', '#updateTaskModal');

    }
    if(mode === 'delete'){
      this.oneTask = task;
      button.setAttribute('data-target', '#deleteTaskModal');
    }
    if(mode === 'description'){
      this.oneTask = task;
      button.setAttribute('data-target', '#descriptionModal');
    }
    container?.appendChild(button);
    button.click();
  }
  public openAddModal(mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addTaskModal');
    }
    if(mode === 'status'){
      button.setAttribute('data-target', '#httpModal');
      this.getStatus();
    }
    container?.appendChild(button);
    button.click();
  }
}
