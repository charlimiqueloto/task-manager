import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  };
  
  constructor(private taskService: TaskService) { }


  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask() {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask = {
        title: '',
        description: '',
        status: 'pending',
        dueDate: '',
      };
      this.loadTasks();
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);
    });
  }  
}
